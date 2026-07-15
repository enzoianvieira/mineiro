import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
} from "three";

const vertex = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Warm ember smoke: fbm noise drifting upward, terracotta glow
// rising from the bottom edge, vignette, in-shader grain.
const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(13.7, 7.1);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.045;

    // mouse parallax drift
    vec2 m = (uMouse - 0.5) * 0.18;

    // layered smoke rising
    float smoke = fbm(p * 2.1 + vec2(m.x, -t * 2.2 + m.y));
    smoke += 0.5 * fbm(p * 4.4 + vec2(-t * 0.8, -t * 3.1));
    smoke *= 0.62;

    // palette
    vec3 base = vec3(0.051, 0.043, 0.035);   // #0d0b09
    vec3 brown = vec3(0.16, 0.10, 0.06);
    vec3 clay = vec3(0.776, 0.353, 0.180);   // #c65a2e
    vec3 brass = vec3(0.776, 0.631, 0.357);  // #c6a15b

    vec3 col = mix(base, brown, smoke);

    // ember glow anchored bottom-left, breathing
    float breath = 0.85 + 0.15 * sin(uTime * 0.4);
    float glow = smoothstep(1.15, 0.0, distance(uv, vec2(0.22 + m.x * 0.4, -0.12)));
    glow = pow(glow, 2.6) * breath;
    col += clay * glow * (0.34 + smoke * 0.5);

    // faint brass rim upper-right
    float rim = smoothstep(1.3, 0.2, distance(uv, vec2(0.95, 1.05)));
    col += brass * pow(rim, 3.0) * 0.10 * smoke;

    // vignette
    float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.45)));
    col *= mix(0.72, 1.0, vig);

    // grain
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.028;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function initHeroGL({ reducedMotion }) {
  const canvas = document.querySelector("[data-hero-canvas]");
  if (!canvas) return;

  // escape hatch for GPU-constrained environments / debugging
  if (new URLSearchParams(location.search).has("nogl")) {
    canvas.style.background =
      "radial-gradient(120% 90% at 20% 110%, rgba(198,90,46,.22), transparent 60%), #0d0b09";
    return;
  }

  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: "low-power" });
  } catch {
    canvas.style.background =
      "radial-gradient(120% 90% at 20% 110%, rgba(198,90,46,.22), transparent 60%), #0d0b09";
    return;
  }

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uTime: { value: 0 },
    uRes: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0.5, 0.5) },
  };
  scene.add(new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment })));

  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  window.addEventListener("pointermove", (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  io.observe(canvas);

  const start = performance.now();
  function frame() {
    if (!visible || document.hidden) return;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uTime.value = (performance.now() - start) / 1000;
    renderer.render(scene, camera);
  }

  if (reducedMotion) {
    // single static frame
    renderer.render(scene, camera);
    return;
  }

  renderer.setAnimationLoop(frame);
}

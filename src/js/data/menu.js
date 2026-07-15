// Category header images (Unsplash CDN, validated)
const IMG = {
  churrasco: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1100&q=80&auto=format&fit=crop",
  assado: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1100&q=80&auto=format&fit=crop",
  frango: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1100&q=80&auto=format&fit=crop",
  panela: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1100&q=80&auto=format&fit=crop",
  peixe: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1100&q=80&auto=format&fit=crop",
  feijoada: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1100&q=80&auto=format&fit=crop",
  massa: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900&q=80&auto=format&fit=crop",
  sopa: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80&auto=format&fit=crop",
  guarnicao: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80&auto=format&fit=crop",
};

// Dishes sourced from the real rotating menus at restaurantejeitomineiro.com.br
export const WEEK = [
  {
    id: "seg",
    label: "Segunda",
    groups: [
      { name: "Carnes", img: IMG.assado, dishes: [
        "Bife à parmegiana",
        "Filé de frango grelhado",
        "Carne de panela com batatas",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Tutu de feijão",
        "Couve refogada",
        "Batata rústica assada",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão ao alho dourado",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Sopa de legumes",
      ]},
    ],
  },
  {
    id: "ter",
    label: "Terça",
    groups: [
      { name: "Carnes", img: IMG.churrasco, dishes: [
        "Fraldinha na cerveja preta",
        "Frango assado com maionese",
        "Lombo suíno em cubos",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Batata rústica assada",
        "Acelga com tomates",
        "Cenouras salteadas",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão com pesto de tomate",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Sopa de batata com frango",
      ]},
    ],
  },
  {
    id: "qua",
    label: "Quarta",
    groups: [
      { name: "Carnes", img: IMG.feijoada, dishes: [
        "Feijoada completa",
        "Costelinha suína ao barbecue",
        "Frango frito com especiarias",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Couve na manteiga",
        "Farofa de ovo",
        "Torresmo",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão na manteiga com ervas",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Caldo verde",
      ]},
    ],
  },
  {
    id: "qui",
    label: "Quinta",
    groups: [
      { name: "Carnes", img: IMG.panela, dishes: [
        "Barreado",
        "Dobradinha com legumes",
        "Fricassê de frango",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Abóbora refogada",
        "Banana à milanesa",
        "Couve refogada",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Risoto de beterraba",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Sopa de mandioquinha",
      ]},
    ],
  },
  {
    id: "sex",
    label: "Sexta",
    groups: [
      { name: "Carnes", img: IMG.peixe, dishes: [
        "Peixe frito na massa de tempurá",
        "Filé de peixe assado",
        "Bife de fígado acebolado",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Feijão tropeiro",
        "Batata rústica assada",
        "Acelga com tomates",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão com pesto de tomate",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Sopa de legumes",
      ]},
    ],
  },
  {
    id: "sab",
    label: "Sábado",
    groups: [
      { name: "Carnes", img: IMG.feijoada, dishes: [
        "Feijoada completa",
        "Frango caipira com quiabo",
        "Costelinha suína ao barbecue",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Torresmo",
        "Couve fininha e laranja",
        "Farofa crocante",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Caldo de feijão",
      ]},
    ],
  },
];

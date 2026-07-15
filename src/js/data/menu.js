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
        "Lombo suíno em cubos",
        "Filé de frango grelhado",
        "Bife de fígado acebolado",
        "Fricassê de frango",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Abobrinha",
        "Feijão carioca",
        "Feijão preto",
        "Arroz Branco",
        "Arroz Integral",
        "Farofa",
        "Couve à mineira",
        "Ovos fritos",
        "Torresmo",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão com ragu de rabada",
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
        "Dobradinha com legumes",
        "Frango assado com maionese",
        "Peixe frito na massa de tempurá",
        "Escondidinho de carne suína",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Quiabo com jiló",
        "Batata rústica assada com especiarias",
        "Quirela com suã",
        "Pastel de Barreado",
        "Feijão carioca",
        "Feijão preto",
        "Arroz Branco",
        "Arroz Integral",
        "Farofa",
        "Couve à mineira",
        "Ovos fritos",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão com tomate confitado",
      ]},
      { name: "Sopas", img: IMG.sopa, dishes: [
        "Sopa (batatas, frango e macarrão)",
      ]},
    ],
  },
  {
    id: "qua",
    label: "Quarta",
    groups: [
      { name: "Carnes", img: IMG.feijoada, dishes: [
        "Paleta suína com molho barbecue",
        "Hambúrguer de picanha com cebola dourada",
        "Filé de frango grelhado",
        "Barreado",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Nachos",
        "Cenouras",
        "Batata frita",
        "Torresmo",
        "Arroz com calabresa",
        "Feijão carioca",
        "Feijão preto",
        "Arroz Branco",
        "Arroz Integral",
        "Farofa",
        "Couve à mineira",
        "Ovos fritos",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão da Nona",
      ]},
    ],
  },
  {
    id: "qui",
    label: "Quinta",
    groups: [
      { name: "Carnes", img: IMG.panela, dishes: [
        "Costelinha suína à pururuca",
        "Filé de frango grelhado",
        "Filé de peixe à portuguesa",
        "Rabada com agrião",
        "Canelone de presunto e queijo",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Nachos",
        "Acelga com tomates",
        "Polenta",
        "Feijão carioca",
        "Feijão preto",
        "Arroz Branco",
        "Arroz Integral",
        "Farofa",
        "Couve à mineira",
        "Ovos fritos",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão com pesto de tomate",
      ]},
    ],
  },
  {
    id: "sex",
    label: "Sexta",
    groups: [
      { name: "Carnes", img: IMG.peixe, dishes: [
        "Costelinha suína ao barbecue",
        "Frango frito com especiarias",
        "Filé de peixe assado",
        "Carne de panela com batatas",
        "Escondidinho de abóbora e carne desfiada",
      ]},
      { name: "Guarnições", img: IMG.guarnicao, dishes: [
        "Acelga",
        "Pastel de frango com requeijão",
        "Abóbora caramelizada",
        "Torresmo",
        "Feijão carioca",
        "Feijão preto",
        "Arroz Branco",
        "Arroz Integral",
        "Farofa",
        "Couve à mineira",
        "Ovos fritos",
      ]},
      { name: "Massas", img: IMG.massa, dishes: [
        "Macarrão à carbonara",
        "Risoto de beterraba com rúcula",
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

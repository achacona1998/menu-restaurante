import { MenuData } from "../types/menu";

// Mock data for the restaurant menu
export const menuData: MenuData = {
  restaurantName: "L'ORO",
  logoUrl: "/favicon.svg",
  currency: "EUR",
  locale: "es-ES",
  sections: [
    {
      id: "recomendaciones",
      title: "Recomendaciones del Chef",
      icon: "⭐",
      items: [
        {
          id: 101,
          name: "Risotto de Mariscos",
          description:
            "Arroz arborio cremoso con langostinos, calamares y almejas en salsa de azafrán.",
          fullDescription:
            "Nuestro chef selecciona los mariscos más frescos de la bahía para crear este risotto tradicional italiano. Cocinado a fuego lento con caldo de pescado casero, finalizado con mantequilla fría y Parmigiano Reggiano añejado 24 meses.",
          price: 28.9,
          currency: "EUR",
          isFeatured: true,
          tags: ["destacado", "premium"],
          imageUrl:
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop",
          ingredients: [
            "Arborio rice",
            "Langostinos",
            "Calamares",
            "Azafrán",
            "Parmigiano",
            "Mantequilla",
          ],
        },
        {
          id: 102,
          name: "Filete de Wagyu",
          description:
            "Corte premium A5 con guarnición de verduras de temporada y reducción de vino tinto.",
          fullDescription:
            "El Wagyu más puro de Kobe, marmoleado excepcional con puntuación BMS 12. Servido en su punto justa de cocinado, acompañado de nuestra guarnición de temporada y reducción de Cabernet Sauvignon de 48 horas.",
          price: 89.0,
          currency: "EUR",
          isFeatured: true,
          tags: ["premium", "destacado"],
          imageUrl:
            "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop",
          ingredients: [
            "Wagyu A5",
            "Vino tinto",
            "Verduras temporada",
            "Hierbas frescas",
          ],
        },
      ],
    },
    {
      id: "entrantes",
      title: "Aperitivos & Entrantes",
      icon: "🥗",
      items: [
        {
          id: 1,
          name: "Bruschetta de Tomate",
          description:
            "Pan artesanal tostado con tomate fresco, albahaca y aceite de oliva extra virgen.",
          fullDescription:
            "Pan ciabatta horneado a diario, frotado con ajo y cubierto con mezcla de tomates cherry, albahaca fresca y nuestro aceite de oliva premium de Umbría.",
          price: 6.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["vegano", "ligero"],
          imageUrl:
            "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
          ingredients: [
            "Pan ciabatta",
            "Tomates cherry",
            "AOVE",
            "Ajo",
            "Albahaca",
          ],
        },
        {
          id: 2,
          name: "Burrata con Prosciutto",
          description:
            "Crema de burrata Italiana con jamón ibérico y rúcula fresca.",
          fullDescription:
            "Burrata de Apulia servida sobre Prosciutto di Parma 24 meses, acompañada con rúcula baby y chips de pan integral.",
          price: 14.9,
          currency: "EUR",
          isFeatured: true,
          tags: ["premium", "sin-gluten"],
          imageUrl:
            "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop",
          ingredients: [
            "Burrata",
            "Prosciutto di Parma",
            "Rúcula",
            "Aceite frutos rojos",
          ],
        },
        {
          id: 3,
          name: "Croquetas de Jamón",
          description:
            "Seis unidades de croquetas artesanales con jamón ibérico y alioli de ajo negro.",
          fullDescription:
            "Croquetas hechas a mano con jamón ibérico 100% bellota, bechamel cremosa y rebozado panko. Servidas con alioli de ajo negro fermentado.",
          price: 10.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop",
          ingredients: ["Jamón ibérico", "Bechamel", "Panko", "Ajo negro"],
        },
        {
          id: 4,
          name: "Carpaccio de Res",
          description:
            "Finas lonchas de res madurada 30 días con parmesano y alcaparras.",
          fullDescription:
            "Ribeye madurado 30 días, cortado finamente y aderezado con aceite de trufa, alcaparras y láminas de Parmigiano 36 meses.",
          price: 16.9,
          currency: "EUR",
          isFeatured: false,
          tags: ["premium"],
          imageUrl:
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
          ingredients: [
            "Ribeye aged",
            "Parmigiano 36m",
            "Alcaparras",
            "Aceite trufa",
          ],
        },
        {
          id: 5,
          name: "Gyoza de Cerdo",
          description: "Dumplings japoneses con cerdo braseado y salsa ponzu.",
          fullDescription:
            "Masa hecha a mano, rellena con mezcla de cerdo y verduras, frita hasta dorar y servida con ponzu y aceite de sésamo.",
          price: 9.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
          ingredients: ["Cerdo molido", "Col china", "Salsa ponzu", "Sésamo"],
        },
      ],
    },
    {
      id: "principales",
      title: "Platos Principales",
      icon: "🍽️",
      items: [
        {
          id: 201,
          name: "Pasta Trufada",
          description:
            "Fettuccine casero con salsa de trufa negra y parmesano añejado.",
          fullDescription:
            "Pasta fresca hecha a diario, salteada en nuestra salsa de trufa negra de Alba (30 g por porción), finalizada con mantequilla noisette y láminas de trufa.",
          price: 24.9,
          currency: "EUR",
          isFeatured: true,
          tags: ["premium", "destacado"],
          imageUrl:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
          ingredients: [
            "Fettuccine",
            "Trufa negra",
            "Parmigiano 36m",
            "Mantequilla",
          ],
        },
        {
          id: 202,
          name: "Paella Valenciana",
          description: "Paella tradicional con mariscos, pollo y conejo.",
          fullDescription:
            "Arroz de Calasparra cocinado en paella de acero al carbono, con conejo de campo, pollo de raza y mariscos de la bahía. Socarrat garantizado.",
          price: 26.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop",
          ingredients: [
            "Arroz Calasparra",
            "Conejo",
            "Pollo",
            "Mariscos",
            "Azafrán",
          ],
        },
        {
          id: 203,
          name: "Salmón a la Plancha",
          description:
            "Salmón noruego con verduras asadas y beurre blanc de limón.",
          fullDescription:
            "Filete de salmón de aguas frías noruegas, marcado a la plancha para una piel crujiente, servido sobre verduras asadas y beurre blanc de limón.",
          price: 22.9,
          currency: "EUR",
          isFeatured: false,
          tags: ["saludable"],
          imageUrl:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
          ingredients: [
            "Salmón Norway",
            "Verduras temporada",
            "Mantequilla",
            "Limón",
          ],
        },
        {
          id: 204,
          name: "Costillas BBQ",
          description:
            "Costillas de cerdo cocinadas 8 horas con salsa BBQ artesanal.",
          fullDescription:
            "Costillas baby back marinadas 24 h en especias ahumadas, cocinadas a baja temperatura durante 8 horas y finalizadas con nuestra salsa BBQ casera y glaseado de miel.",
          price: 21.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["popular", "familiar"],
          imageUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
          ingredients: [
            "Baby back ribs",
            "BBQ sauce",
            "Miel",
            "Especias smoke",
          ],
        },
        {
          id: 205,
          name: "Pollo al Horno",
          description:
            "Medio pollo de corral con hierbas provenzales y patatas rösti.",
          fullDescription:
            "Pollo de corral criado en libertad, asado con romero, tomillo y laurel, servido con patatas rösti crujientes y jugo reducido.",
          price: 18.9,
          currency: "EUR",
          isFeatured: false,
          tags: ["casero"],
          imageUrl:
            "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
          ingredients: [
            "Pollo corral",
            "Hierbas provenzales",
            "Patatas",
            "Ajo",
          ],
        },
        {
          id: 206,
          name: "Steak Frites",
          description:
            "Ribeye de res angus con papas fritas artesanales y pimienta verde.",
          fullDescription:
            "300 g de ribeye USDA Prime, cocinado a tu gusto, servido con papas fritas artesanales y salsa de pimienta verde con brandy.",
          price: 32.0,
          currency: "EUR",
          isFeatured: true,
          tags: ["premium", "popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
          ingredients: [
            "Ribeye USDA",
            "Pimienta verde",
            "Papas artisan",
            "Brandy",
          ],
        },
      ],
    },
    {
      id: "postres",
      title: "Postres",
      icon: "🍰",
      items: [
        {
          id: 301,
          name: "Tiramisu Clásico",
          description: "Postre italiano tradicional con espresso y mascarpone.",
          fullDescription:
            "Capas de bizcocho savoiardi embebido en espresso fuerte, alternado con crema de mascarpone y cacao. Receta original de Treviso.",
          price: 9.5,
          currency: "EUR",
          isFeatured: true,
          tags: ["destacado"],
          imageUrl:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
          ingredients: ["Mascarpone", "Espresso", "Savoiardi", "Cocoa"],
        },
        {
          id: 302,
          name: "Crema Catalana",
          description: "Crème brûlée con caramelo crujiente y canela.",
          fullDescription:
            "Crema suave con leche entera y vainilla de Madagascar, cubierta con azúcar caramelizado al momento de servir.",
          price: 8.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["clásico"],
          imageUrl:
            "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
          ingredients: [
            "Leche entera",
            "Vainilla Madagascar",
            "Canela",
            "Azúcar",
          ],
        },
        {
          id: 303,
          name: "Cheesecake de Frutos Rojos",
          description: "Cheesecake estilo New York con coulis de frutos rojos.",
          fullDescription:
            "Cheesecake cremoso con base de galleta digestive, cubierto con coulis de frutos rojos y menta fresca.",
          price: 10.0,
          currency: "EUR",
          isFeatured: false,
          tags: ["popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1533134242443-d4fd21a9421e?w=400&h=300&fit=crop",
          ingredients: ["Cream cheese", "Galletas", "Berries", "Menta"],
        },
        {
          id: 304,
          name: "Chocolate Fondant",
          description:
            "Pastel de chocolate oscuro con corazón líquido de cacao.",
          fullDescription:
            "Bizcocho intenso de chocolate con centro fundente de cacao 70%, servido con helado de vainilla y hoja de oro.",
          price: 11.5,
          currency: "EUR",
          isFeatured: true,
          tags: ["premium", "chocolate"],
          imageUrl:
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
          ingredients: ["Chocolate 70%", "Harina", "Huevos", "Vainilla"],
        },
        {
          id: 305,
          name: "Panna Cotta",
          description: "Crema italiana con coulis de mango y coco.",
          fullDescription:
            "Panna cotta sedosa hecha con nata fresca y vainilla, cubierta con coulis de mango y coco tostado.",
          price: 8.0,
          currency: "EUR",
          isFeatured: false,
          tags: ["ligero", "vegano"],
          imageUrl:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
          ingredients: ["Nata fresca", "Mango", "Coco", "Gelatina"],
        },
      ],
    },
    {
      id: "bebidas",
      title: "Bebidas",
      icon: "🍷",
      items: [
        {
          id: 401,
          name: "Copa de Vino Tinto",
          description:
            "Selección de tintos locales y internacionales por copa.",
          fullDescription:
            "Consulta la selección del día: contamos con una rotación de vinos de Rioja, Ribera del Duero, Burdeos y Nuevo Mundo.",
          price: 7.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["alcohol"],
          imageUrl:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
          ingredients: ["Vino tinto"],
        },
        {
          id: 402,
          name: "Copa de Vino Blanco",
          description:
            "Refrescantes blancos desde Sauvignon Blanc hasta Chardonnay.",
          fullDescription:
            "La selección del día incluye Verdejo, Albariño y Chardonnay con crianza.",
          price: 6.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["alcohol"],
          imageUrl:
            "https://images.unsplash.com/photo-1566754436893-a5fc3af4eb33?w=400&h=300&fit=crop",
          ingredients: ["Vino blanco varies"],
        },
        {
          id: 403,
          name: "Cerveza Artesanal",
          description: "IPA, Lager o Stout de productor local.",
          fullDescription:
            "Selección rotativa de cervezas artesanales de nuestra cervecería local. Pregunta por el barril del día.",
          price: 5.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["alcohol", "popular"],
          imageUrl:
            "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop",
          ingredients: ["Cerveza varies"],
        },
        {
          id: 404,
          name: "Refresco Premium",
          description: "Compostas de frutas naturales y sodas artesanales.",
          fullDescription:
            "Kombucha casera, ginger beer o zumos naturales recién exprimidos.",
          price: 4.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["sin-alcohol", "saludable"],
          imageUrl:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
          ingredients: ["Frutas naturales"],
        },
        {
          id: 405,
          name: "Agua Mineral",
          description: "Agua mineral con o sin gas.",
          fullDescription: "San Pellegrino o Acqua Panna, con o sin gas.",
          price: 3.0,
          currency: "EUR",
          isFeatured: false,
          tags: ["sin-alcohol"],
          imageUrl:
            "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&h=300&fit=crop",
          ingredients: ["Agua mineral"],
        },
        {
          id: 406,
          name: "Café Espresso",
          description: "Simple o doble de nuestro blend de la casa.",
          fullDescription:
            "Nuestro blend de espresso de la casa, con granos etíopes y colombianos, tostado a diario.",
          price: 3.5,
          currency: "EUR",
          isFeatured: false,
          tags: ["sin-alcohol"],
          imageUrl:
            "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop",
          ingredients: ["Café espresso"],
        },
      ],
    },
  ],
};

export default menuData;

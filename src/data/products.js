export const HERO_SLIDES = [
  '/img/akmenys/1.jpg','/img/akmenys/2.jpg','/img/akmenys/3.jpg','/img/akmenys/4.jpg','/img/akmenys/5.jpg',
  '/img/akmenys/6.jpg','/img/akmenys/7.jpg','/img/akmenys/8.jpg','/img/akmenys/9.jpg','/img/akmenys/10.jpg'
];

// Nuotraukos iš public/img/akmenys/1.jpg ... 10.jpg
export const PRODUCTS = [
  { id:'p1',  title:'Bazaltas „Nordic Base“',     price:39.90, img:'/img/akmenys/1.jpg',  color:'pilka',  category:'grindims' },
  { id:'p2',  title:'Granitas „Polar Grey“',      price:49.50, img:'/img/akmenys/2.jpg',  color:'pilka',  category:'sienoms' },
  { id:'p3',  title:'Kalkakmenis „Baltic Light“', price:34.20, img:'/img/akmenys/3.jpg',  color:'šviesi', category:'grindims' },
  { id:'p4',  title:'Marmuras „Aurora“',          price:89.00, img:'/img/akmenys/4.jpg',  color:'balta',  category:'prabangūs' },
  { id:'p5',  title:'Šiferis „Graphite“',         price:29.90, img:'/img/akmenys/5.jpg',  color:'tamsi',  category:'kiti' },
  { id:'p6',  title:'Travertinas „Siena“',        price:54.00, img:'/img/akmenys/6.jpg',  color:'smėlio', category:'sienoms' },
  { id:'p7',  title:'Granitas „Night Star“',      price:59.00, img:'/img/akmenys/7.jpg',  color:'tamsi',  category:'prabangūs' },
  { id:'p8',  title:'Bazaltas „Lava Dark“',       price:44.00, img:'/img/akmenys/8.jpg',  color:'tamsi',  category:'grindims' },
  { id:'p9',  title:'Kvarcitas „Ice Blue“',       price:72.00, img:'/img/akmenys/9.jpg',  color:'melsva', category:'sienoms' },
  { id:'p10', title:'Marmuras „Bianco“',          price:95.00, img:'/img/akmenys/10.jpg', color:'balta',  category:'prabangūs' },
];

// Jeigu nori – gali automatiškai išvesti sąrašus iš PRODUCTS:
// export const COLORS = Array.from(new Set(PRODUCTS.map(p => p.color))).sort();
// export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();

// Arba fiksuotas sąrašas (atitinkantis aukščiau esančius duomenis):
export const COLORS = ['pilka','šviesi','balta','tamsi','smėlio','melsva'];
export const CATEGORIES = ['grindims','sienoms','prabangūs','kiti'];


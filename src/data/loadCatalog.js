// Auto-kraunam VISUS JSON failus iš src/data/catalog/**/**/*.json
// Vite: import.meta.glob (eager) – duoda modulio turinį build metu.

const modules = import.meta.glob('./catalog/**/*.json', { eager: true });

// Normalizavimui: kategorijų pavadinimai (slug -> rodomas)
export const CATEGORY_LABELS = {
  grindims: 'Grindims',
  sienoms: 'Sienoms',
  prabangus: 'Prabangus',
  kiti: 'Kiti',
};

function validateAndNormalize(prod, fileKey) {
  const errors = [];
  if (!prod?.id)        errors.push('missing id');
  if (!prod?.title)     errors.push('missing title');
  if (typeof prod?.price !== 'number') errors.push('price not number');
  if (!prod?.category)  errors.push('missing category');

  // Palaikom images[] ir img:
  const images = Array.isArray(prod?.images) ? prod.images.filter(Boolean) : [];
  const img = prod?.img || images[0] || '/img/placeholder.jpg';

  // Jei nėra nei img, nei images – tik tada perspėjam apie nuotrauką
  if (!prod?.img && images.length === 0) {
    errors.push('missing image');
  }

  if (errors.length) {
    console.warn('[CATALOG] Problem in', fileKey, '->', errors.join(', '), prod);
  }

  // Užtikrinam laukus (spalvą nuleidžiam į lower-case)
  return {
    id: String(prod?.id || fileKey),
    title: prod?.title || 'Be pavadinimo',
    price: Number(prod?.price ?? 0),
    color: (prod?.color || '').toLowerCase(),
    category: prod?.category || 'kiti',
    description: prod?.description || '',
    img,               // pagrindinė nuotrauka (iš img arba images[0])
    images: images.length ? images : [img], // visada turim masyvą
  };
}


// Sukraunam viską į masyvą
const all = [];
Object.entries(modules).forEach(([key, mod]) => {
  const data = mod.default || mod; // JSON modulyje yra default export
  // Jei kažkada viename JSON padėsi masyvą – suveiks ir tada:
  if (Array.isArray(data)) {
    data.forEach(item => all.push(validateAndNormalize(item, key)));
  } else {
    all.push(validateAndNormalize(data, key));
  }
});

// Eksportuojam „vieną šaltinį“ visam projektui
export const PRODUCTS = all;
// Unikalios spalvos iš visų produktų
export const COLORS = Array.from(
  new Set(
    (PRODUCTS || [])
      .map(p => (p.color || '').trim())
      .filter(Boolean)
  )
).sort((a, b) => a.localeCompare(b, 'lt'));


// Kategorijų sąrašas (tik tos, kur yra duomenų)
export const CATEGORIES = Array.from(
  new Set(PRODUCTS.map(p => p.category))
).sort();

// Grupavimas pagal kategoriją (filtravimui, kategorijų puslapiams)
export const BY_CATEGORY = CATEGORIES.reduce((acc, cat) => {
  acc[cat] = PRODUCTS.filter(p => p.category === cat);
  return acc;
}, {});

// Naujausi (pirmi 10, jei reikia)
export const LATEST_PRODUCTS = PRODUCTS.slice(0, 10);

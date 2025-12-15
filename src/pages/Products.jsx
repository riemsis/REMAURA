import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductsFilters from '../components/ProductsFilters';

// A) Paimam produktus iš abiejų šaltinių
import { PRODUCTS as CATALOG_PRODUCTS } from '../data/loadCatalog';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/products'; // jei nėra – sukurk tuščią eksportą

// B) Mažas normalizatorius (kad kategorijos būtų be diakritikų ir vienodos)
function toSlugCategory(s = '') {
  let v = String(s).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // nuima ąčęėįšųūž
  if (v.startsWith('prabang')) v = 'prabangus';
  if (v === 'sienos' || v === 'sienai') v = 'sienoms';
  if (v === 'grindys' || v === 'grindis') v = 'grindims';
  const allowed = new Set(['grindims', 'sienoms', 'prabangus', 'kiti']);
  return allowed.has(v) ? v : 'kiti';
}

function normalize(p, idx = 0) {
  const x = p || {};
  const imgs = Array.isArray(x.images) ? x.images.filter(Boolean) : [];
  const firstImg = x.img || imgs[0] || '/img/placeholder.jpg';

  return {
    id: String(x.id ?? `p-${idx}`),
    title: String(x.title ?? 'Be pavadinimo'),
    price: Number(x.price ?? 0),
    color: String(x.color ?? '').toLowerCase(),
    category: toSlugCategory(x.category ?? 'kiti'),
    description: String(x.description ?? ''),
    img: firstImg,
    images: imgs.length ? imgs : [firstImg],
  };
}


export default function Products(){
  // C) SUJUNGIAM iš abiejų šaltinių ir normalizuojam
  const ALL = useMemo(() => {
    const combined = [
      ...(Array.isArray(CATALOG_PRODUCTS) ? CATALOG_PRODUCTS : []),
      ...(Array.isArray(STATIC_PRODUCTS) ? STATIC_PRODUCTS : []),
    ].map((p, i) => normalize(p, i));

    // be dublikatų pagal id
    const seen = new Set();
    return combined.filter(p => (seen.has(p.id) ? false : (seen.add(p.id), true)));
  }, []);

  // D) Pagal ALL išsivedam filtrų sąrašus (spalvos, kategorijos)
  const COLORS = useMemo(() => Array.from(
    new Set(ALL.map(p => (p.color || '').trim()).filter(Boolean))
  ).sort((a,b)=>a.localeCompare(b,'lt')), [ALL]);

  const CATEGORIES = useMemo(() => Array.from(
    new Set(ALL.map(p => (p.category || '').trim()).filter(Boolean))
  ).sort((a,b)=>a.localeCompare(b,'lt')), [ALL]);

  // E) Filtrų būsena
  const [q, setQ] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // F) Filtruojam ir rūšiuojam
  const filtered = useMemo(()=>{
    let arr = [...ALL];

    if(q.trim()){
      const t = q.toLowerCase();
      arr = arr.filter(p =>
        p.title.toLowerCase().includes(t) ||
        String(p.price).includes(t)
      );
    }
    if(color)    arr = arr.filter(p => p.color === color);
    if(category) arr = arr.filter(p => p.category === category);

    const minV = parseFloat(min);
    const maxV = parseFloat(max);
    if(!Number.isNaN(minV)) arr = arr.filter(p => p.price >= minV);
    if(!Number.isNaN(maxV)) arr = arr.filter(p => p.price <= maxV);

    if(sort === 'price-asc')   arr.sort((a,b)=> a.price - b.price);
    if(sort === 'price-desc')  arr.sort((a,b)=> b.price - a.price);
    if(sort === 'title-asc')   arr.sort((a,b)=> a.title.localeCompare(b.title,'lt'));
    if(sort === 'title-desc')  arr.sort((a,b)=> b.title.localeCompare(a.title,'lt'));

    return arr;
  }, [ALL, q, color, category, sort, min, max]);

  function clearAll(){
    setQ(''); setColor(''); setCategory(''); setSort(''); setMin(''); setMax('');
  }

  return (
    <main className="container" style={{padding:'24px 0'}}>
      <h1>Visi produktai</h1>

      {/* Paduodam filtrų reikšmes iš ALL */}
      <ProductsFilters
        q={q} setQ={setQ}
        color={color} setColor={setColor}
        category={category} setCategory={setCategory}
        sort={sort} setSort={setSort}
        min={min} setMin={setMin}
        max={max} setMax={setMax}
        onClear={clearAll}
        colors={COLORS}
        categories={CATEGORIES}
      />

      {filtered.length === 0 ? (
        <p className="muted">Nerasta.</p>
      ) : (
        <div className="products-grid">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </main>
  );
}

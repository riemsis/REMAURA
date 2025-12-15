// src/pages/Category.jsx
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// 1) Jei dar naudoji seną šaltinį:
import { PRODUCTS } from '../data/loadCatalog';
// 1') Jei perėjai į automatinį katalogų užkėlimą (loadCatalog.js), vietoj aukščiau:
// import { PRODUCTS } from '../data/loadCatalog';

// Slug -> rodomas pavadinimas (naudojam be diakritikų URL)
const TITLE_BY_SLUG = {
  grindims: 'Grindims',
  sienoms: 'Sienoms',
  prabangus: 'Prabangus',
  kiti: 'Kiti',
};

// Slug -> reali kategorijos reikšmė duomenyse (su diakritikais, jei reikia)
const CATEGORY_MAP = {
  grindims: 'grindims',
  sienoms: 'sienoms',
  prabangus: 'prabangus', // <- svarbu: duomenyse gali būti su „ū“
  kiti: 'kiti',
};

export default function Category(){
  const { slug } = useParams(); // pvz.: grindims | sienoms | prabangus | kiti

  // Paruošiam filtruotą sąrašą pagal slug (su apsauga nuo klaidingo slug)
  const { items, title } = useMemo(() => {
    const titleSafe = TITLE_BY_SLUG[slug] || 'Kategorija';
    const catValue = CATEGORY_MAP[slug];
    if (!catValue) {
      return { items: [], title: titleSafe };
    }
    // Filtravimas pagal kategoriją iš duomenų
    const list = (PRODUCTS || []).filter(p => (p.category || '').toLowerCase() === catValue.toLowerCase());
    return { items: list, title: titleSafe };
  }, [slug]);

  return (
    <main className="container" style={{padding:'24px 0'}}>
      {/* Breadcrumbs (patogiau naršyti) */}
      <nav aria-label="breadcrumb" style={{ marginBottom: 8 }}>
        <Link to="/">Pradžia</Link> <span className="muted">/</span>{' '}
        <Link to="/products">Visi produktai</Link> <span className="muted">/</span>{' '}
        <span>{title}</span>
      </nav>

      <h1 style={{ marginTop: 0 }}>{title}</h1>

      {items.length === 0 ? (
        <p className="muted">Šioje kategorijoje produktų kol kas nėra.</p>
      ) : (
        <div className="products-grid" style={{ marginTop: 14 }}>
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </main>
  );
}

import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsNew(){
  const items = PRODUCTS.slice(0, 8);
  return (
    <main className="container" style={{padding:'24px 0'}}>
      <h1>Nauji</h1>
      <div className="products-grid">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}

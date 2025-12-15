import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPopular(){
  const items = PRODUCTS.filter((_,i)=> (i+1) % 5 === 0);
  return (
    <main className="container" style={{padding:'24px 0'}}>
      <h1>Populiariausi</h1>
      <div className="products-grid">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutReview(){
  const { items, total } = useCart();
  const nav = useNavigate();

  if(items.length === 0){
    return (
      <main className="container" style={{padding:"24px 0"}}>
        <h1>Peržiūra</h1>
        <p className="muted">Krepšelis tuščias.</p>
        <p><Link to="/products" className="btn">Į katalogą</Link></p>
      </main>
    );
  }

  return (
    <main className="container" style={{padding:"24px 0"}}>
      <h1>Peržiūra</h1>
      <p className="muted">Patikrinkite prekes prieš pildydami duomenis.</p>

      <div className="cart-table">
        <div className="cart-row cart-head">
          <div>Produktas</div><div>Kaina</div><div>Kiekis</div><div>Tarpinė suma</div><div></div>
        </div>

        {items.map(it=>(
          <div className="cart-row" key={it.id}>
            <div>{it.title}</div>
            <div>{it.price.toFixed(2)} €</div>
            <div>{it.qty}</div>
            <div>{(it.price*it.qty).toFixed(2)} €</div>
            <div></div>
          </div>
        ))}

        <div className="cart-row cart-foot">
          <div style={{ gridColumn:"1 / 4", textAlign:"right", fontWeight:700 }}>Iš viso:</div>
          <div style={{ fontWeight:700 }}>{total.toFixed(2)} €</div>
          <div></div>
        </div>
      </div>

      <div style={{marginTop:16, display:"flex", gap:10}}>
        <Link to="/cart" className="btn">Atgal į krepšelį</Link>
        <button className="btn btn-primary" onClick={()=>nav("/checkout/details")}>Tęsti</button>
      </div>
    </main>
  );
}

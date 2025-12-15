import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { buildInvoiceHTML, downloadInvoiceHTML, makeInvoiceNumber } from "../utils/invoice";

export default function CheckoutDetails(){
  const { items, total, removeItem } = useCart();
  const nav = useNavigate();

  if(items.length === 0){
    return (
      <main className="container" style={{padding:'24px 0'}}>
        <h1>Pirkėjo duomenys</h1>
        <p className="muted">Krepšelis tuščias.</p>
        <p><Link to="/products" className="btn">Į katalogą</Link></p>
      </main>
    );
  }

  function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customer = {
      name: form.get('name')?.trim() || '',
      email: form.get('email')?.trim() || '',
      phone: form.get('phone')?.trim() || '',
      address: form.get('address')?.trim() || '',
      notes: form.get('notes')?.trim() || '',
    };
    if(!customer.name || !customer.email || !customer.address){
      alert('Užpildykite vardą, el. paštą ir adresą.'); return;
    }

    const order = { items, total, customer };
    const html = buildInvoiceHTML(order);
    const invNo = makeInvoiceNumber();
    downloadInvoiceHTML(html, `Saskaita-${invNo}.html`);

    // Išvalom krepšelį (paprastai turėtumėm kontekste turėti clear() — čia paprasta versija)
    items.forEach(it => removeItem(it.id));

    // Paprastas pranešimas ir grąžinam į pradžią (ar /products)
    alert('Sąskaita suformuota ir parsiųsta. Patikrinkite atsisiųstus failus.');
    nav('/');
  }

  return (
    <main className="container" style={{padding:'24px 0'}}>
      <h1>Pirkėjo duomenys</h1>
      <p className="muted">Įveskite pristatymo ir kontaktinę informaciją.</p>

      <form onSubmit={onSubmit} className="checkout-form">
        <div className="form-row">
          <label>Vardas, pavardė
            <input name="name" type="text" required />
          </label>
          <label>El. paštas
            <input name="email" type="email" required />
          </label>
          <label>Telefonas (nebūtina)
            <input name="phone" type="tel" />
          </label>
        </div>

        <label>Pristatymo adresas
          <input name="address" type="text" required />
        </label>

        <label>Pastabos
          <textarea name="notes" rows="3" placeholder="Papildoma informacija kurjeriui..."></textarea>
        </label>

        <div className="checkout-summary">
          <div><strong>Prekių skaičius:</strong> {items.reduce((s,i)=>s+i.qty,0)}</div>
          <div><strong>Bendra suma:</strong> {total.toFixed(2)} €</div>
        </div>

        <div style={{marginTop:16, display:'flex', gap:10}}>
          <Link to="/checkout/review" className="btn">Atgal</Link>
          <button type="submit" className="btn btn-primary">Suformuoti sąskaitą</button>
        </div>
      </form>
    </main>
  );
}

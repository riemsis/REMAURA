import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p }) {

  const { addItem } = useCart();

  // Modal būsena
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [modalQty, setModalQty] = useState(1);

  // Iki 3 nuotraukų: jei yra p.images – naudojam, kitaip p.img
  const images = useMemo(() => {
    const arr = Array.isArray(p?.images) ? p.images.filter(Boolean) : [];
    return arr.length ? arr.slice(0, 3) : (p?.img ? [p.img] : []);
  }, [p, base]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight" && images.length > 1)
        setIdx(i => (i + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1)
        setIdx(i => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  function addFromModal() {
    const q = Math.max(1, Number(modalQty) || 1);
    addItem({ id: p.id, title: p.title, price: p.price }, q);
    setOpen(false);
  }

  return (
    <>
      {/* VISA kortelė paspaudžiama — atidaro modalą */}
      <article
        className="latest-card"
        onClick={() => { setIdx(0); setModalQty(1); setOpen(true); }}
        style={{ cursor: "pointer" }}
        role="button"
        aria-label={`Peržiūrėti ${p.title}`}
        tabIndex={0}
        onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); setOpen(true); }}}
      >
        <img className="latest-media" src={norm(p.img)} alt={p.title} />
        <div className="latest-body">
          <h3 className="latest-title">{p.title}</h3>
          {p.color && <p className="latest-meta">{p.color}</p>}
          <p className="latest-price">{p.price.toFixed(2)} €</p>
          {/* JOKIŲ mygtukų/kiekio kortelėje */}
        </div>
      </article>

      {open && (
        <div
          className="modal-backdrop"
          onClick={(e)=>{ if(e.target.classList.contains('modal-backdrop')) setOpen(false); }}
        >
          <div className="modal-card" role="dialog" aria-modal="true" aria-label={p.title}>
            <button className="modal-close" onClick={()=>setOpen(false)} aria-label="Uždaryti">✕</button>

            <div className="modal-grid">
              {/* Galerija kairėje */}
              <div className="modal-gallery">
                <div className="modal-hero">
                  {images.length > 1 && (
                    <button className="hero-arrow left" onClick={()=>setIdx(i=>(i-1+images.length)%images.length)} aria-label="Ankstesnė">‹</button>
                  )}
                  {images.length ? <img src={images[idx]} alt={p.title} /> : <div style={{color:'#6b7280'}}>Nėra nuotraukų</div>}
                  {images.length > 1 && (
                    <button className="hero-arrow right" onClick={()=>setIdx(i=>(i+1)%images.length)} aria-label="Kita">›</button>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="modal-thumbs">
                    {images.map((src,i)=>(
                      <button key={src} className={`thumb ${i===idx?'active':''}`} onClick={()=>setIdx(i)} aria-label={`Rodyti ${i+1}`}>
                        <img src={src} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info + kiekis + į krepšelį dešinėje */}
              <div className="modal-info">
                <h2 className="modal-title">{p.title}</h2>
                <p className="modal-price">{p.price.toFixed(2)} €</p>
                {p.description && <p className="modal-desc">{p.description}</p>}
                <ul className="modal-meta">
                  {p.color && <li><strong>Spalva:</strong> {p.color}</li>}
                  {p.category && <li><strong>Kategorija:</strong> {p.category}</li>}
                </ul>

                <div className="modal-actions">
                  <label className="qty">
                    Kiekis
                    <input
                      type="number"
                      min="1"
                      value={modalQty}
                      onChange={(e)=>setModalQty(e.target.value)}
                    />
                  </label>
                  <button className="btn btn-primary" onClick={addFromModal}>Į krepšelį</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

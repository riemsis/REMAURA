import { Link, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { applyDomL10n } from "../i18n/domL10n";
import { useI18n } from "../i18n";

export default function Header(){
  const { items } = useCart();
  const count = items.reduce((s,i)=> s + (i.qty || 0), 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef(null);
  const { lang, setLang } = useI18n();

  useEffect(()=>{
    function onEsc(e){ if(e.key==='Escape') setMenuOpen(false); }
    document.addEventListener('keydown', onEsc);
    return ()=> document.removeEventListener('keydown', onEsc);
  },[]);

  // nustatom select'ą pagal išsaugotą kalbą
  useEffect(()=>{
    const cur = localStorage.getItem("lang") || "lt";
    if (langRef.current) langRef.current.value = cur;
  },[]);

  function handleLangChange(e){
    const v = e.target.value || "lt";
    localStorage.setItem("lang", v);
    applyDomL10n(v);
  }

  return (
    <header className="topbar bg-color">
      <div className="container header-col">
        <Link to="/" className="logo-center" aria-label="Pradžia">
          <img src={norm('img/REMAURA.png')} alt="Akmenys" className="logo-img" />
        </Link>

        <div className="nav-row">
          <nav className="nav" aria-label="Pagrindinė navigacija">
            <button className="nav-toggle" aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>☰</button>
            <ul id="mobile-menu" className={`menu ${menuOpen ? 'open' : ''}`}>
              <li><NavLink to="/" onClick={()=>setMenuOpen(false)}>Pradžia</NavLink></li>

              <li className="has-submenu">
                <button className="submenu-toggle">Produktai</button>
                <ul className="submenu">
                  <li><NavLink to="/products" onClick={()=>setMenuOpen(false)}>Visi produktai</NavLink></li>
                  <li><NavLink to="/produktai/nauji" onClick={()=>setMenuOpen(false)}>Nauji</NavLink></li>
                  <li><NavLink to="/produktai/populiariausi" onClick={()=>setMenuOpen(false)}>Populiariausi</NavLink></li>
                  <li><NavLink to="/produktai/nuolaidos" onClick={()=>setMenuOpen(false)}>Su nuolaida</NavLink></li>
                </ul>
              </li>

              <li className="has-submenu">
                <button className="submenu-toggle">Kategorijos</button>
                <ul className="submenu">
                  <li><NavLink to="/kategorija/grindims" onClick={()=>setMenuOpen(false)}>Grindims</NavLink></li>
                  <li><NavLink to="/kategorija/sienoms" onClick={()=>setMenuOpen(false)}>Sienoms</NavLink></li>
                  <li><NavLink to="/kategorija/prabangus" onClick={()=>setMenuOpen(false)}>Prabangūs</NavLink></li>
                  <li><NavLink to="/kategorija/kiti" onClick={()=>setMenuOpen(false)}>Kiti</NavLink></li>
                </ul>
              </li>

              <li className="has-submenu">
                <button className="submenu-toggle">Atlikti darbai</button>
                <ul className="submenu">
                  <li><NavLink to="/darbai/2026" onClick={()=>setMenuOpen(false)}>2026</NavLink></li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className="top-actions">
            <label className="lang">
              <span className="lang-label">Kalba</span>
              <select value={lang}  onChange={(e)=> setLang(e.target.value)}  aria-label="Kalba">
                <option value="lt">LT</option>
                <option value="en">EN</option>
                <option value="no">NO</option>
              </select>
            </label>

            <Link
              to="/cart"
              className="cart-icon"
              aria-label={`Krepšelis. Prekių: ${count}`}
              title="Krepšelis"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4h-2a1 1 0 0 0 0 2h1.28l2.7 9.1A2 2 0 0 0 10.9 17H17a1 1 0 0 0 0-2h-6.1l-.35-1.2H17a2 2 0 0 0 1.93-1.48l1.2-4.8A1 1 0 0 0 19.17 6H8.24L7.8 4.6A2 2 0 0 0 6 3.5V3.5zM9 20a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 9 20zm11 0a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 20 20z"/>
              </svg>
              {count > 0 && <span className="cart-badge" aria-live="polite">{count}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

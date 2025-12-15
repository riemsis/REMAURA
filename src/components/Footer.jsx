import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useI18n } from '../i18n';

export default function Footer(){
  const { t } = useI18n();

  useEffect(()=>{
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  },[]);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="f-brand">
          <NavLink to="/" className="f-logo">
            <img src="/img/REMAURA.png" alt="Akmenys" />
          </NavLink>
          <p className="f-desc">
            {t('Natūralaus akmens sprendimai grindims, sienoms ir fasadams.')}
          </p>
        </div>

        <nav className="f-col">
          <h4>{t('Nuorodos')}</h4>
          <ul>
            <li><NavLink to="/about">{t('Apie mus')}</NavLink></li>
            <li><NavLink to="/contact">{t('Kontaktai')}</NavLink></li>
          </ul>
        </nav>

        <div className="f-col">
          <h4>{t('Kontaktai')}</h4>
          <ul className="f-contact">
            <li>UAB „Akmenys“</li>
            <li>Telšiai, Lietuva</li>
            <li><a href="mailto:info@akmenys.lt">info@akmenys.lt</a></li>
            <li><a href="tel:+37060000000">+370 600 00000</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-row">
          <div>© <span id="year"></span> UAB „Akmenys“. {t('Visos teisės saugomos.')}</div>
          <nav className="legal">
            <NavLink to="/privacy">{t('Privatumo politika')}</NavLink>
            <span className="dot">•</span>
            <NavLink to="/terms">{t('Taisyklės')}</NavLink>
            <span className="dot">•</span>
            <NavLink to="/about">{t('Apie mus')}</NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}

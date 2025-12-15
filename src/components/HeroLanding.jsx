import { Link } from 'react-router-dom';

export default function HeroLanding(){
  return (
    <section className="hero-landing">
      <div className="hero-inner">
        <h1 data-i18n="hero1.title">Išskirtinis akmuo Jūsų projektams</h1>
        <p data-i18n="hero1.subtitle">Natūrali tekstūra • Ilgaamžis grožis</p>
        <Link to="/products" className="btn btn-primary" data-i18n="hero1.cta">Mūsų produktai skrirti jums</Link>
      </div>
    </section>
  );
}

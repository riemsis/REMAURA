import { useEffect, useMemo, useRef, useState } from 'react';
import { HERO_SLIDES } from '../data/products';

export default function HeroCarousel(){
  const frameRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;
  const autoplayMs = 5000;

  const next = ()=> setIdx(i => (i+1)%total);
  const prev = ()=> setIdx(i => (i-1+total)%total);

  // autoplay + pause on hover
  useEffect(()=>{
    const frame = frameRef.current;
    let paused = false;
    let t = setTimeout(()=> !paused && next(), autoplayMs);

    function enter(){ paused = true; }
    function leave(){ paused = false; t && clearTimeout(t); t = setTimeout(()=> !paused && next(), autoplayMs); }

    frame?.addEventListener('mouseenter', enter);
    frame?.addEventListener('mouseleave', leave);
    return ()=> { clearTimeout(t); frame?.removeEventListener('mouseenter', enter); frame?.removeEventListener('mouseleave', leave); };
  }, [idx]);

  // arrows keys
  useEffect(()=>{
    const onKey = e => {
      if(e.key==='ArrowRight') next();
      if(e.key==='ArrowLeft')  prev();
    };
    document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  }, []);

  // swipe
  useEffect(()=>{
    const el = frameRef.current;
    let startX = null;
    const onStart = e => startX = (e.touches? e.touches[0].clientX : e.clientX);
    const onEnd   = e => {
      if(startX==null) return;
      const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = x - startX;
      if(Math.abs(dx)>40) { dx<0 ? next() : prev(); }
      startX = null;
    };
    el?.addEventListener('touchstart', onStart, {passive:true});
    el?.addEventListener('touchend', onEnd);
    el?.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    return ()=> {
      el?.removeEventListener('touchstart', onStart);
      el?.removeEventListener('touchend', onEnd);
      el?.removeEventListener('mousedown', onStart);
      window.removeEventListener('mouseup', onEnd);
    };
  }, []);

  return (
    <section className="hero-gallery hero-split" aria-label="Akmenų galerija">
      <div className="hero-frame" ref={frameRef}>
        {HERO_SLIDES.map((src,i)=>(
          <div key={src} className={`slide ${i===idx?'is-active':''}`}>
            <img src={src} alt={`Akmenų galerija ${i+1}`} />
          </div>
        ))}

        <button className="hero-nav hero-prev" aria-label="Ankstesnė" onClick={prev}>‹</button>
        <button className="hero-nav hero-next" aria-label="Kita" onClick={next}>›</button>

        {/* dots */}
        <div className="carousel-dots" role="tablist">
          {HERO_SLIDES.map((_,i)=>(
            <button
              key={i}
              className="carousel-dot"
              role="tab"
              aria-current={i===idx}
              onClick={()=>setIdx(i)}
            />
          ))}
        </div>
      </div>

      <aside className="hero-side">
        <h2 data-i18n="hero2.title">Natūralaus akmens grožis</h2>
        <p data-i18n="hero2.text">Atraskite kruopščiai atrinktus akmenis grindims, sienoms ir fasadams.</p>
        <a href="/products" className="btn btn-primary"  data-i18n="hero2.cta">Peržiūrėti visus produktus</a>
      </aside>
    </section>
  );
}

export default function Contact(){
  return (
    <main className="container page">
      <h1>Kontaktai</h1>
      <p data-i18n="contact.p1">
              Turite klausimų? Parašykite – atsakysime artimiausiu metu.
      </p>

      <form className="contact-form" onSubmit={(e)=>{ e.preventDefault(); alert("Žinutė išsiųsta!"); }}>
        <div className="form-row">
          <label>Vardas</label>
          <input type="text" placeholder="Jūsų vardas" required />
        </div>
        <div className="form-row">
          <label>El. paštas</label>
          <input type="email" placeholder="vardas@pastas.lt" required />
        </div>
        <div className="form-row">
          <label>Žinutė</label>
          <textarea rows="5" placeholder="Kuo galime padėti?" required />
        </div>
        <button className="btn btn-primary" type="submit">Siųsti</button>
      </form>

      <div className="contact-extra">
        <p><strong>UAB „Akmenys“</strong></p>
        <p>Telšiai, Lietuva</p>
        <p><a href="mailto:info@akmenys.lt">info@akmenys.lt</a> · <a href="tel:+37060000000">+370 600 00000</a></p>
        <p>Darbo laikas: I–V 9:00–18:00</p>
      </div>
    </main>
  );
}

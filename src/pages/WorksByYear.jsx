import { useParams, Link } from "react-router-dom";

const WORKS_IMAGES = {
  // jei reikia – pridėk kitų metų žemėlapį
  "2026": "/img/akmenys/2.jpg",
};

export default function WorksByYear() {
  const { year } = useParams(); // pvz.: "2026"
  const imgSrc = WORKS_IMAGES[year];

  return (
    <main className="container" style={{ padding: "24px 0" }}>
      <h1>Atlikti darbai {year}</h1>

      {imgSrc ? (
        <section style={{ marginTop: 16 }}>
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
            }}
          >
            <img
              src={imgSrc}
              alt={`Atlikti darbai ${year}`}
              style={{ width: "100%", display: "block", objectFit: "cover" }}
              loading="eager"
            />
          </div>

          <p
            style={{
              marginTop: 14,
              textAlign: "center",
              fontWeight: 700,
              color: "#000", // juodas užrašas
            }}
          >
            Šiuo metu ši dalis vis dar tvarkoma, laukite tęsinio ateityje.
          </p>
        </section>
      ) : (
        <p className="muted" style={{ marginTop: 8 }}>
          Šių metų turinys dar nepaskelbtas.
        </p>
      )}

      <p style={{ marginTop: 16 }}>
        <Link to="/">← Grįžti į pradžią</Link>
      </p>
    </main>
  );
}

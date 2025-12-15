// „Naujausi“: paprastas responsyvus grid’as be scroll.
// Kortelė – kaip ProductCard (paspaudi kortelę → modalis).
import ProductCard from "./ProductCard";
// Jei jau naudoji sujungtą katalogą:
import { PRODUCTS } from "../data/loadCatalog";
// Jei ne – pakeisk į: import { PRODUCTS } from "../data/products";


export default function LatestStrip(){
   
  // Paimkim pirmus 14 kaip „naujausius“ (gali keisti skaičių)
  const items = (PRODUCTS || []).slice(0, 14);

  return (
    <section className="section-latest">
      <div className="container container-wide">
        <div className="latest-head" style={{ justifyContent: "center" }}>
          {/* jei trūksta vertimo rakto, rodys LT tekstą */}
          <h2 style={{ textAlign: "center" }}>
            Mūsų naujausi produktai
          </h2>
        </div>

        <div className="latest-strip" aria-label="Naujausių produktų sąrašas">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}


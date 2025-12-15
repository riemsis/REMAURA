
import { useI18n } from '../i18n';

/**
 * ProductsFilters
 * - Jokio hook kvietimo už komponento ribų.
 * - Tekstai per i18n: t("filters.*").
 * - colors ir categories atkeliauja per props (pagal tavo sprendimą).
 */
export default function ProductsFilters({
  q, setQ,
  color, setColor,
  category, setCategory,
  sort, setSort,
  min, setMin,
  max, setMax,
  onClear,
  colors = [],
  categories = [],
}) {
   const { t } = useI18n();
  return (
    <div className="products-filters">
      <input
        type="search"
        placeholder={t("filters.search") /* Pvz.: "Paieška..." */}
        aria-label={t("filters.search")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        aria-label={t("filters.color")}
      >
        <option value="">{t("filters.color")}</option>
        {colors.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label={t("filters.category")}
      >
        <option value="">{t("filters.category")}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label={t("filters.sort")}
      >
        <option value="">{t("filters.sort")}</option>
        <option value="price-asc">{t("filters.priceAsc") /* "Kaina ↑" */}</option>
        <option value="price-desc">{t("filters.priceDesc") /* "Kaina ↓" */}</option>
        <option value="title-asc">{t("filters.titleAsc") /* "Pavadinimas A–Ž" */}</option>
        <option value="title-desc">{t("filters.titleDesc") /* "Pavadinimas Ž–A" */}</option>
      </select>

      <input
        type="number"
        placeholder={t("filters.min")}
        aria-label={t("filters.min")}
        value={min}
        onChange={(e) => setMin(e.target.value)}
        min="0"
        step="0.01"
      />

      <input
        type="number"
        placeholder={t("filters.max")}
        aria-label={t("filters.max")}
        value={max}
        onChange={(e) => setMax(e.target.value)}
        min="0"
        step="0.01"
      />

      <button className="btn" onClick={onClear}>
        {t("filters.clear")}
      </button>
    </div>
  );
}

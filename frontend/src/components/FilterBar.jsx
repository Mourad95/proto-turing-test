function FilterBar({ filters, onFilterChange, options = {} }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        {options.produit && (
          <div className="filter-item">
            <label className="filter-label">PRODUIT</label>
            <select
              className="filter-select"
              value={filters.produit || ""}
              onChange={(e) => handleChange("produit", e.target.value)}
            >
              <option value="">Tous les produits</option>
              {options.produit.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {options.mois && (
          <div className="filter-item">
            <label className="filter-label">MOIS</label>
            <select
              className="filter-select"
              value={filters.mois || ""}
              onChange={(e) => handleChange("mois", e.target.value)}
            >
              <option value="">Tous les mois</option>
              {options.mois.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {options.statut && (
          <div className="filter-item">
            <label className="filter-label">STATUT</label>
            <select
              className="filter-select"
              value={filters.statut || ""}
              onChange={(e) => handleChange("statut", e.target.value)}
            >
              <option value="">Tous les statuts</option>
              {options.statut.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {options.createur && (
          <div className="filter-item">
            <label className="filter-label">CRÉATEUR</label>
            <select
              className="filter-select"
              value={filters.createur || ""}
              onChange={(e) => handleChange("createur", e.target.value)}
            >
              <option value="">Tous les créateurs</option>
              {options.createur.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {options.type && (
          <div className="filter-item">
            <label className="filter-label">TYPE DE CONTENU</label>
            <select
              className="filter-select"
              value={filters.type || ""}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">Tous les types</option>
              {options.type.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        {options.search !== undefined && (
          <div className="filter-item">
            <label className="filter-label">RECHERCHE</label>
            <input
              type="text"
              className="filter-input w-full"
              placeholder="Rechercher..."
              value={filters.search || ""}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;

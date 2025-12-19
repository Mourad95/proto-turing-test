function FilterBar({ filters, onFilterChange, options = {} }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value || undefined })
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        {options.produit && (
          <div>
            <label className="filter-label">Produit</label>
            <select
              className="filter-select"
              value={filters.produit || ''}
              onChange={(e) => handleChange('produit', e.target.value)}
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
          <div>
            <label className="filter-label">Mois</label>
            <select
              className="filter-select"
              value={filters.mois || ''}
              onChange={(e) => handleChange('mois', e.target.value)}
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
          <div>
            <label className="filter-label">Statut</label>
            <select
              className="filter-select"
              value={filters.statut || ''}
              onChange={(e) => handleChange('statut', e.target.value)}
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

        {options.search !== undefined && (
          <div className="flex-1 min-w-[200px]">
            <label className="filter-label">Recherche</label>
            <input
              type="text"
              className="filter-input w-full"
              placeholder="Rechercher..."
              value={filters.search || ''}
              onChange={(e) => handleChange('search', e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar


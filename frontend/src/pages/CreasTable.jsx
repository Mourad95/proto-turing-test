function CreasTable() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tableau des créas</h1>
        <p className="page-subtitle">
          Explorez et analysez toutes vos créations publicitaires
        </p>
      </div>
      <div className="filter-bar">
        <div className="filter-group">
          <div>
            <label className="filter-label">Recherche</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Rechercher une créa..."
            />
          </div>
        </div>
      </div>
      <div className="data-table">
        <p className="p-6 text-center text-gray-500">Tableau à implémenter</p>
      </div>
    </div>
  );
}

export default CreasTable;

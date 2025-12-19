import { useParams, Link } from "react-router-dom";

function CreaDetail() {
  const { id } = useParams();

  return (
    <div>
      <div className="page-header">
        <Link
          to="/creas"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-2 inline-block"
        >
          ← Retour au tableau
        </Link>
        <h1 className="page-title">Détail de la créa</h1>
        <p className="page-subtitle">Analyse détaillée de la performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Placeholder pour les cartes KPI */}
        <div className="kpi-card">
          <div className="kpi-card-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="kpi-card-label">Budget</div>
          <div className="kpi-card-value">—</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
        <p className="text-gray-500 text-center">
          Détails à implémenter (ID: {id})
        </p>
      </div>
    </div>
  );
}

export default CreaDetail;

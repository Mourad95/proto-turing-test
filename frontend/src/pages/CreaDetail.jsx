import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCrea } from '../services/api.js'
import KPICard from '../components/KPICard.jsx'
import Loading from '../components/Loading.jsx'

// Icônes SVG pour les KPIs
const BudgetIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ConversionsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ROASIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const CostIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const RevenueIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ImpressionsIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const ClicksIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
)

const CTRIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const formatCurrency = (value) => {
  const num = parseFloat(value) || 0
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num)
}

const formatNumber = (value) => {
  const num = parseFloat(value) || 0
  return new Intl.NumberFormat('fr-FR').format(num)
}

const formatPercentage = (value) => {
  const num = parseFloat(value) || 0
  return `${num.toFixed(2)}%`
}

function CreaDetail() {
  const { id } = useParams()
  const [crea, setCrea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCrea()
  }, [id])

  const loadCrea = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCrea(id)
      setCrea(data)
    } catch (err) {
      console.error('Erreur lors du chargement de la créa:', err)
      setError('Créa non trouvée')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error || !crea) {
    return (
      <div>
        <div className="page-header">
          <Link
            to="/creas"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-2 inline-block"
          >
            ← Retour au tableau
          </Link>
          <h1 className="page-title">Erreur</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
          <p className="text-center text-gray-500">{error || 'Créa non trouvée'}</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (statut) => {
    const badgeClass = {
      'En ligne': 'badge-success',
      'Arrêtée': 'badge-danger',
      'En pause': 'badge-warning',
      'Archivée': 'badge-neutral'
    }[statut] || 'badge-neutral'
    return <span className={`badge ${badgeClass}`}>{statut}</span>
  }

  return (
    <div>
      <div className="page-header">
        <Link
          to="/creas"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-2 inline-block"
        >
          ← Retour au tableau
        </Link>
        <h1 className="page-title">{crea['Nom de l\'annonce'] || 'Détail de la créa'}</h1>
        <p className="page-subtitle">
          {crea.Produit && crea.Créateur && `${crea.Produit} • ${crea.Créateur}`}
        </p>
      </div>

      {/* 6-8 cartes KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={<BudgetIcon />}
          label="Budget"
          value={formatCurrency(crea['Budget dépensé (€)'] || 0)}
        />
        <KPICard
          icon={<ConversionsIcon />}
          label="Conversions"
          value={formatNumber(crea['Conversions (achats)'] || 0)}
        />
        <KPICard
          icon={<ROASIcon />}
          label="ROAS"
          value={parseFloat(crea.ROAS || 0).toFixed(2)}
        />
        <KPICard
          icon={<CostIcon />}
          label="Coût par conversion"
          value={formatCurrency(crea['Coût par conversion (€)'] || 0)}
        />
        <KPICard
          icon={<RevenueIcon />}
          label="Revenu"
          value={formatCurrency(crea['Revenu estimé (€)'] || 0)}
        />
        <KPICard
          icon={<ImpressionsIcon />}
          label="Impressions"
          value={formatNumber(crea.Impressions || 0)}
        />
        <KPICard
          icon={<ClicksIcon />}
          label="Clics"
          value={formatNumber(crea.Clics || 0)}
        />
        <KPICard
          icon={<CTRIcon />}
          label="Taux de clic"
          value={formatPercentage(crea['Taux de clic (%)'] || 0)}
        />
      </div>

      {/* Infos de la créa */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de la créa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Type de contenu
            </label>
            <p className="text-gray-900 font-medium">{crea['Type de contenu'] || '—'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Angle marketing
            </label>
            <p className="text-gray-900 font-medium">{crea['Angle marketing'] || '—'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Hook
            </label>
            <p className="text-gray-900 font-medium">{crea.Hook || '—'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Mois
            </label>
            <p className="text-gray-900 font-medium">{crea.Mois || '—'}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Statut
            </label>
            <div>{getStatusBadge(crea.Statut || '—')}</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Date de lancement
            </label>
            <p className="text-gray-900 font-medium">
              {crea['Date de lancement'] || crea['Date de début'] || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreaDetail

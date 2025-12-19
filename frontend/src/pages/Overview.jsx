import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStats, getData } from '../services/api.js'
import KPICard from '../components/KPICard.jsx'
import FilterBar from '../components/FilterBar.jsx'
import Loading from '../components/Loading.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

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

const CreasIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const COLORS = ['#6366f1', '#8b92f8', '#a855f7', '#22c55e', '#f59e0b', '#ef4444']

function Overview() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({})
  const [stats, setStats] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState({ produit: [], mois: [], statut: [] })

  // Charger les données et options
  useEffect(() => {
    loadData()
  }, [filters])

  const loadData = async () => {
    try {
      setLoading(true)
      // Charger toutes les données pour les options de filtres
      const allData = await getData()
      
      // Charger les données filtrées pour les stats, graphiques et classements
      const [statsData, filteredData] = await Promise.all([
        getStats(filters),
        getData(filters)
      ])
      
      setStats(statsData)
      setData(filteredData) // Utiliser les données filtrées

      // Extraire les options uniques pour les filtres depuis toutes les données
      const produits = [...new Set(allData.map(item => item.Produit).filter(Boolean))].sort()
      const mois = [...new Set(allData.map(item => item.Mois).filter(Boolean))].sort()
      const statuts = [...new Set(allData.map(item => item.Statut).filter(Boolean))].sort()
      
      setOptions({ produit: produits, mois, statut: statuts })
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculer les données pour les graphiques
  const roasByMonth = data.reduce((acc, item) => {
    if (!item.Mois || !item.ROAS) return acc
    const roas = parseFloat(item.ROAS) || 0
    if (!acc[item.Mois]) {
      acc[item.Mois] = { mois: item.Mois, total: 0, count: 0 }
    }
    acc[item.Mois].total += roas
    acc[item.Mois].count += 1
    return acc
  }, {})

  const roasByMonthData = Object.values(roasByMonth).map(item => ({
    mois: item.mois,
    roas: Math.round((item.total / item.count) * 100) / 100
  })).sort((a, b) => a.mois.localeCompare(b.mois))

  const budgetByProduct = data.reduce((acc, item) => {
    if (!item.Produit) return acc
    const budget = parseFloat(item['Budget dépensé (€)'] || 0)
    acc[item.Produit] = (acc[item.Produit] || 0) + budget
    return acc
  }, {})

  const budgetByProductData = Object.entries(budgetByProduct)
    .map(([produit, budget]) => ({ produit, budget: Math.round(budget * 100) / 100 }))
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 6)

  // Top 5 créas par ROAS
  const topCreasByROAS = [...data]
    .filter(item => parseFloat(item.ROAS || 0) > 0)
    .sort((a, b) => parseFloat(b.ROAS || 0) - parseFloat(a.ROAS || 0))
    .slice(0, 5)
    .map(item => ({
      nom: item['Nom de l\'annonce'],
      roas: parseFloat(item.ROAS || 0).toFixed(2),
      id: item['Nom de l\'annonce']
    }))

  // Top 5 créateurs par conversions
  const topCreatorsByConversions = data.reduce((acc, item) => {
    if (!item.Créateur) return acc
    const conv = parseFloat(item['Conversions (achats)'] || 0)
    acc[item.Créateur] = (acc[item.Créateur] || 0) + conv
    return acc
  }, {})

  const topCreatorsData = Object.entries(topCreatorsByConversions)
    .map(([createur, conversions]) => ({ createur, conversions: Math.round(conversions) }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 5)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
  }

  if (loading && !stats) {
    return <Loading />
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Overview</h1>
        <p className="page-subtitle">Vue d'ensemble des performances publicitaires</p>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        options={{
          produit: options.produit,
          mois: options.mois,
          statut: options.statut
        }}
      />

      {/* 6 cartes KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          icon={<BudgetIcon />}
          label="Budget dépensé"
          value={formatCurrency(stats?.budgetTotal || 0)}
        />
        <KPICard
          icon={<ConversionsIcon />}
          label="Conversions"
          value={stats?.conversionsTotal?.toLocaleString('fr-FR') || '0'}
        />
        <KPICard
          icon={<ROASIcon />}
          label="ROAS moyen"
          value={stats?.roasMoyen?.toFixed(2) || '0.00'}
        />
        <KPICard
          icon={<CostIcon />}
          label="Coût par conversion"
          value={formatCurrency(stats?.coutParConversionMoyen || 0)}
        />
        <KPICard
          icon={<RevenueIcon />}
          label="Revenu total"
          value={formatCurrency(stats?.revenuTotal || 0)}
        />
        <KPICard
          icon={<CreasIcon />}
          label="Nombre de créas"
          value={stats?.nombreCreas?.toLocaleString('fr-FR') || '0'}
        />
      </div>

      {/* 2 graphiques côte à côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-container">
          <h3 className="chart-title">ROAS par mois</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roasByMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="roas" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Budget par produit</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetByProductData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ produit, percent }) => `${produit} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="budget"
              >
                {budgetByProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2 classements en bas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="ranking-card">
          <h3 className="chart-title">Top 5 créas par ROAS</h3>
          <div className="space-y-2 mt-4">
            {topCreasByROAS.length > 0 ? (
              topCreasByROAS.map((crea, index) => (
                <div 
                  key={index} 
                  className="ranking-item cursor-pointer"
                  onClick={() => crea.id && navigate(`/crea/${encodeURIComponent(crea.id)}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`ranking-number ${index < 3 ? 'top' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 truncate">{crea.nom}</div>
                    </div>
                    <div className="font-bold text-primary-600">{crea.roas}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune donnée</p>
            )}
          </div>
        </div>

        <div className="ranking-card">
          <h3 className="chart-title">Top 5 créateurs par conversions</h3>
          <div className="space-y-2 mt-4">
            {topCreatorsData.length > 0 ? (
              topCreatorsData.map((item, index) => (
                <div key={index} className="ranking-item">
                  <div className="flex items-center gap-3">
                    <div className={`ranking-number ${index < 3 ? 'top' : ''}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.createur}</div>
                    </div>
                    <div className="font-bold text-primary-600">
                      {item.conversions.toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Aucune donnée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview

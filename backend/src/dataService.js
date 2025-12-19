// Filtrage des données selon les critères
export function filterData(data, filters = {}) {
  let filtered = [...data]

  if (filters.produit) {
    filtered = filtered.filter((item) => item.Produit === filters.produit)
  }

  if (filters.createur) {
    filtered = filtered.filter((item) => item.Créateur === filters.createur)
  }

  if (filters.type) {
    filtered = filtered.filter((item) => item['Type de contenu'] === filters.type)
  }

  if (filters.mois) {
    filtered = filtered.filter((item) => item.Mois === filters.mois)
  }

  if (filters.statut) {
    filtered = filtered.filter((item) => item.Statut === filters.statut)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter((item) => {
      const nom = (item['Nom de l\'annonce'] || '').toLowerCase()
      return nom.includes(searchLower)
    })
  }

  return filtered
}

// Calcul des statistiques agrégées
export function getStats(data) {
  if (data.length === 0) {
    return {
      budgetTotal: 0,
      conversionsTotal: 0,
      roasMoyen: 0,
      coutParConversionMoyen: 0,
      revenuTotal: 0,
      nombreCreas: 0,
    }
  }

  const budgetTotal = data.reduce((sum, item) => {
    const budget = parseFloat(item['Budget dépensé (€)'] || 0)
    return sum + (isNaN(budget) ? 0 : budget)
  }, 0)

  const conversionsTotal = data.reduce((sum, item) => {
    const conv = parseFloat(item['Conversions (achats)'] || 0)
    return sum + (isNaN(conv) ? 0 : conv)
  }, 0)

  const revenuTotal = data.reduce((sum, item) => {
    const rev = parseFloat(item['Revenu estimé (€)'] || 0)
    return sum + (isNaN(rev) ? 0 : rev)
  }, 0)

  const roasValues = data
    .map((item) => parseFloat(item.ROAS || 0))
    .filter((val) => !isNaN(val) && val > 0)

  const roasMoyen = roasValues.length > 0
    ? roasValues.reduce((sum, val) => sum + val, 0) / roasValues.length
    : 0

  const coutParConversionValues = data
    .map((item) => parseFloat(item['Coût par conversion (€)'] || 0))
    .filter((val) => !isNaN(val) && val > 0)

  const coutParConversionMoyen = coutParConversionValues.length > 0
    ? coutParConversionValues.reduce((sum, val) => sum + val, 0) / coutParConversionValues.length
    : 0

  return {
    budgetTotal: Math.round(budgetTotal * 100) / 100,
    conversionsTotal: Math.round(conversionsTotal),
    roasMoyen: Math.round(roasMoyen * 100) / 100,
    coutParConversionMoyen: Math.round(coutParConversionMoyen * 100) / 100,
    revenuTotal: Math.round(revenuTotal * 100) / 100,
    nombreCreas: data.length,
  }
}


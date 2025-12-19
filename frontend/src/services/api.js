import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Récupérer toutes les données avec filtres optionnels
export async function getData(filters = {}) {
  const response = await api.get('/data', { params: filters })
  return response.data
}

// Récupérer les statistiques agrégées avec filtres optionnels
export async function getStats(filters = {}) {
  const response = await api.get('/stats', { params: filters })
  return response.data
}

// Récupérer une créa spécifique
export async function getCrea(id) {
  const response = await api.get(`/crea/${encodeURIComponent(id)}`)
  return response.data
}


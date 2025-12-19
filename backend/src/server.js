import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { loadData } from './csvParser.js'
import { getStats, filterData } from './dataService.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Charger les données au démarrage
let allData = []
const dataPath = join(__dirname, '../../data/AG1-Data.csv')

loadData(dataPath)
  .then((data) => {
    allData = data
    console.log(`✅ ${data.length} lignes chargées depuis le CSV`)
  })
  .catch((err) => {
    console.error('❌ Erreur lors du chargement du CSV:', err.message)
    console.log('⚠️  Le serveur démarre sans données. Placez AG1-Data.csv dans le dossier data/')
  })

// Endpoint pour récupérer toutes les données (avec filtres optionnels)
app.get('/api/data', (req, res) => {
  try {
    const filtered = filterData(allData, req.query)
    res.json(filtered)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Endpoint pour les statistiques agrégées
app.get('/api/stats', (req, res) => {
  try {
    const filtered = filterData(allData, req.query)
    const stats = getStats(filtered)
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Endpoint pour une créa spécifique
app.get('/api/crea/:id', (req, res) => {
  try {
    const crea = allData.find((item) => item['Nom de l\'annonce'] === req.params.id)
    if (!crea) {
      return res.status(404).json({ error: 'Créa non trouvée' })
    }
    res.json(crea)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Le port ${PORT} est déjà utilisé.`)
    console.log('💡 Arrêtez le processus existant ou changez le port dans backend/src/server.js')
    process.exit(1)
  } else {
    throw err
  }
})


const fs = require('fs')

const produits = ['AG1 Powder', 'AG1 Travel Packs', 'Vitamine D3+K2', 'Omega-3', 'Shaker', 'Bundle Complet', 'Abonnement']
const createurs = [
  'Sarah Martin', 'Dr. James Smith', 'Emma Wilson', 'Alex Johnson', 'Marie Dubois',
  'Tom Brown', 'Lisa Garcia', 'Dr. Michael Lee', 'Sophie Martin', 'David Chen',
  'Anna Schmidt', 'Paul Martinez', 'Claire Anderson', 'Dr. Robert White', 'Kevin Taylor',
  'Laura Davis', 'Marc Petit', 'Julie Bernard', 'Pierre Moreau', 'Camille Rousseau'
]
const types = ['UGC', 'Podcast', 'Image statique', 'Motion/Vidéo', 'Témoignage']
const angles = ['Testimonial', 'Éducation', 'Convenience', 'Santé', 'Valeur', 'Accessoire']
const hooks = [
  'Je bois AG1 depuis 3 mois',
  'Pourquoi les nutritionnistes recommandent AG1',
  'Parfait pour voyager',
  'Boostez votre immunité',
  'Mon expérience avec Omega-3',
  'Le meilleur rapport qualité-prix',
  'Le shaker qui change tout',
  'Ne manquez jamais votre dose',
  'Ma transformation en 2 mois',
  'Emportez AG1 partout',
  'Essentiel en hiver',
  'Mon cœur me remercie',
  'Économisez avec le bundle',
  "L'importance d'un bon mélange",
  "N'oubliez plus jamais"
]
const mois = ['Juillet 2025', 'Août 2025', 'Septembre 2025', 'Octobre 2025', 'Novembre 2025']
const statuts = ['En ligne', 'Arrêtée', 'En pause', 'Archivée']

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomFloat(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateDate(month) {
  const monthMap = {
    'Juillet 2025': '2025-07',
    'Août 2025': '2025-08',
    'Septembre 2025': '2025-09',
    'Octobre 2025': '2025-10',
    'Novembre 2025': '2025-11'
  }
  const base = monthMap[month] || '2025-07'
  const day = randomInt(1, 28)
  return `${base}-${day.toString().padStart(2, '0')}`
}

function generateCrea(index) {
  const produit = randomElement(produits)
  const createur = randomElement(createurs)
  const type = randomElement(types)
  const angle = randomElement(angles)
  const hook = randomElement(hooks)
  const moisValue = randomElement(mois)
  const statut = randomElement(statuts)
  
  const budget = randomFloat(500, 3000)
  const conversions = randomInt(15, 150)
  const roas = randomFloat(0.5, 3.5)
  const revenu = Math.round(budget * roas * 100) / 100
  const coutParConversion = Math.round((budget / conversions) * 100) / 100
  
  const impressions = randomInt(50000, 300000)
  const tauxClic = randomFloat(2.0, 4.0)
  const clics = Math.round(impressions * (tauxClic / 100))
  
  const nom = `Créa ${type} ${produit} - ${createur.split(' ')[0]}`
  
  return {
    nom: nom.replace(/,/g, ''),
    produit,
    createur,
    type,
    angle,
    hook,
    mois: moisValue,
    statut,
    budget: budget.toFixed(2),
    conversions: conversions.toString(),
    revenu: revenu.toFixed(2),
    roas: roas.toFixed(2),
    coutParConversion: coutParConversion.toFixed(2),
    impressions: impressions.toString(),
    clics: clics.toString(),
    tauxClic: tauxClic.toFixed(2),
    date: generateDate(moisValue)
  }
}

// Générer 1268 lignes comme dans le document
const lignes = []
lignes.push('Nom de l\'annonce,Produit,Créateur,Type de contenu,Angle marketing,Hook,Mois,Statut,Budget dépensé (€),Conversions (achats),Revenu estimé (€),ROAS,Coût par conversion (€),Impressions,Clics,Taux de clic (%),Date de lancement')

for (let i = 0; i < 1268; i++) {
  const crea = generateCrea(i)
  lignes.push([
    crea.nom,
    crea.produit,
    crea.createur,
    crea.type,
    crea.angle,
    crea.hook,
    crea.mois,
    crea.statut,
    crea.budget,
    crea.conversions,
    crea.revenu,
    crea.roas,
    crea.coutParConversion,
    crea.impressions,
    crea.clics,
    crea.tauxClic,
    crea.date
  ].join(','))
}

const csvContent = lignes.join('\n')
fs.writeFileSync('AG1-Data.csv', csvContent, 'utf8')
console.log(`✅ Fichier CSV généré avec ${1268} lignes de données de test`)


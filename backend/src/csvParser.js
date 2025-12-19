import fs from 'fs'
import csv from 'csv-parser'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export function loadData(filePath) {
  return new Promise((resolve, reject) => {
    const results = []

    if (!fs.existsSync(filePath)) {
      reject(new Error(`Fichier CSV non trouvé: ${filePath}`))
      return
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`📊 ${results.length} lignes parsées`)
        resolve(results)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}


# Dashboard Meta Ads - POC TURING

Monorepo pour le dashboard d'analyse des performances publicitaires Meta Ads.

## Structure

- `backend/` : API Node.js/Express
- `frontend/` : Application React avec Vite
- `data/` : Fichiers CSV de données (placez `AG1-Data.csv` ici)

## Installation

```bash
npm install
```

Cela installera les dépendances pour tous les workspaces (backend et frontend).

## Développement

### Démarrer les deux serveurs

```bash
npm run dev
```

Démarre le backend (port 3001) et le frontend (port 5173).

## Technologies

- **Backend** : Node.js, Express, csv-parser
- **Frontend** : React, Vite, React Router, Recharts, Tailwind CSS
- **Monorepo** : npm workspaces avec concurrently

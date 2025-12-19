# Design System - Meta Ads Dashboard

## Charte Graphique Moderne

### Couleurs

#### Primary (Indigo)

- **500**: `#6366f1` - Couleur principale
- **600**: `#4f46e5` - Hover/Active
- **700**: `#4338ca` - Darker states

#### Accent (Purple)

- **500**: `#a855f7` - Accents et gradients
- Utilisé pour les éléments secondaires et les dégradés

#### Status Colors

- **Success**: Vert (`#22c55e`)
- **Warning**: Orange (`#f59e0b`)
- **Danger**: Rouge (`#ef4444`)

### Typographie

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Headings**: Font-bold avec tracking-tight
- **Body**: Font-medium pour la lisibilité

### Ombres

- **soft**: Ombre légère pour les cartes
- **medium**: Ombre moyenne pour les hover
- **large**: Ombre prononcée pour les modals
- **glow**: Effet de lueur pour les éléments actifs

### Border Radius

- **xl**: `1rem` - Cartes et conteneurs
- **2xl**: `1.5rem` - Grands conteneurs

### Animations

- **fade-in**: Apparition en fondu
- **slide-up**: Montée depuis le bas

### Composants CSS Centralisés

Tous les styles sont dans `src/index.css` pour éviter la duplication :

- `.kpi-card` - Cartes de KPIs
- `.filter-bar` - Barre de filtres
- `.data-table` - Tableaux de données
- `.btn`, `.btn-primary`, `.btn-secondary` - Boutons
- `.nav-link` - Liens de navigation
- `.badge-*` - Badges de statut
- `.chart-container` - Conteneurs de graphiques

### Principes

1. **Glassmorphism**: Backdrop blur pour la sidebar
2. **Gradients**: Utilisés avec parcimonie pour la profondeur
3. **Micro-interactions**: Transitions fluides sur tous les éléments interactifs
4. **Hiérarchie visuelle**: Utilisation de l'espacement et des ombres
5. **Accessibilité**: Contrastes respectés, focus states visibles

# Application de Visualisation des Zones Vulnérables au Changement Climatique - Madagascar

## 🚀 Démarrage rapide

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- API Laravel backend fonctionnelle (voir configuration ci-dessous)

### Installation

1. **Cloner le projet** (si ce n'est pas déjà fait)
```bash
cd climate-vulnerability-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**

Créer un fichier `.env` à la racine du projet :
```bash
cp .env.example .env
```

Modifier le fichier `.env` pour configurer l'URL de votre API :
```
REACT_APP_API_URL=http://localhost:8000/api
```

4. **Lancer l'application**
```bash
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
src/
├── components/
│   ├── Admin/              # Page d'administration
│   │   ├── Admin.js
│   │   ├── Admin.css
│   │   ├── WeightEditor.js
│   │   └── WeightEditor.css
│   ├── Charts/             # Composants graphiques
│   │   ├── VulnerabilityBarChart.js
│   │   └── VulnerabilityPieChart.js
│   ├── Dashboard/          # Page dashboard
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── FilterPanel.js
│   │   ├── FilterPanel.css
│   │   ├── MapView.js
│   │   ├── MapView.css
│   │   ├── StatsCards.js
│   │   └── StatsCards.css
│   └── Layout/             # Layout de l'application
│       ├── Header.js
│       ├── Header.css
│       ├── Layout.js
│       ├── Layout.css
│       ├── Sidebar.js
│       └── Sidebar.css
├── services/
│   └── api.js              # Services d'appel API
├── utils/
│   └── constants.js        # Constantes de l'application
├── App.js                  # Composant principal
├── App.css
├── index.js
└── index.css
```

## 🔌 Configuration de l'API Backend

L'application s'attend à ce que votre API Laravel expose les endpoints suivants :

### Endpoints requis

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/vulnerability-zones` | Récupère les zones avec filtres optionnels |
| GET | `/api/regions` | Récupère la liste des régions |
| GET | `/api/vulnerability-stats` | Récupère les statistiques |
| GET | `/api/bio-weights` | Récupère les poids actuels |
| PUT | `/api/bio-weights` | Met à jour les poids |
| POST | `/api/vulnerability-recalculate` | Recalcule l'indice |

### Format des données attendu

**Zones de vulnérabilité** (`/api/vulnerability-zones`) :
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Zone 1",
        "vulnerability_index": 0.75,
        "vulnerability_class": "high",
        "region": "Analamanga"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      }
    }
  ]
}
```

**Statistiques** (`/api/vulnerability-stats`) :
```json
{
  "totalZones": 100,
  "highVulnerability": 25,
  "mediumVulnerability": 50,
  "lowVulnerability": 25
}
```

**Régions** (`/api/regions`) :
```json
[
  {
    "id": 1,
    "name": "Analamanga"
  },
  {
    "id": 2,
    "name": "Boeny"
  }
]
```

**Poids bioclimatiques** (`/api/bio-weights`) :
```json
{
  "bio1": 0.25,
  "bio5": 0.25,
  "bio12": 0.25,
  "bio15": 0.25
}
```

## 🎨 Fonctionnalités

### Dashboard
- ✅ Carte interactive avec Leaflet
- ✅ Affichage des zones de vulnérabilité
- ✅ Filtres par région et classe
- ✅ Cartes statistiques
- ✅ Graphiques (bar chart et pie chart)
- ✅ Légende dynamique
- ✅ Popups avec détails des zones

### Administration
- ✅ Modification des poids des variables bioclimatiques
- ✅ Validation de la somme des poids (= 1.0)
- ✅ Sauvegarde des poids
- ✅ Recalcul de l'indice de vulnérabilité
- ✅ Loader pendant le traitement

## 🛠️ Technologies utilisées

- **React** 19.2.4 - Framework frontend
- **React Router** 6.22.1 - Navigation
- **Leaflet** 1.9.4 - Cartographie interactive
- **React-Leaflet** 4.2.1 - Intégration Leaflet avec React
- **Recharts** 2.12.2 - Graphiques
- **Axios** 1.6.7 - Appels HTTP

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- Desktop (> 768px)
- Tablet (768px)
- Mobile (< 768px)

## 🧪 Tests

Lancer les tests :
```bash
npm test
```

## 🏗️ Build pour la production

Créer une version optimisée pour la production :
```bash
npm run build
```

Les fichiers seront générés dans le dossier `build/`.

## 🐛 Dépannage

### L'application ne se connecte pas à l'API

1. Vérifiez que votre API Laravel est lancée
2. Vérifiez l'URL dans le fichier `.env`
3. Vérifiez que CORS est configuré correctement dans Laravel

### Erreurs lors de l'installation

Si vous rencontrez des erreurs lors de `npm install` :
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json
# Réinstaller
npm install
```

### La carte ne s'affiche pas

1. Vérifiez que vous avez une connexion Internet (pour les tuiles OpenStreetMap)
2. Vérifiez la console pour les erreurs
3. Vérifiez que les données GeoJSON sont au bon format

## 📄 Licence

© 2026 Climate Vulnerability App - Madagascar

## 👨‍💻 Support

Pour toute question ou problème, consultez la documentation de l'API backend ou contactez l'équipe de développement.

Agis comme un développeur frontend senior expert en React et SIG web.

Génère une application web complète en React pour la visualisation des zones vulnérables au changement climatique à Madagascar.

Contexte :

* Backend : Laravel API REST
* Base de données : PostgreSQL + PostGIS
* L’application consomme des endpoints API

L’application doit inclure :

1️⃣ Page Dashboard principale

* Carte interactive basée sur Leaflet
* Affichage des zones administratives de Madagascar
* Affichage d’une couche raster vulnérabilité (via GeoJSON ou WMS)
* Légende dynamique (faible, moyen, élevé)
* Popup affichant : nom zone, indice vulnérabilité, classe

2️⃣ Système de filtres

* Filtre par région
* Filtre par classe vulnérabilité
* Mise à jour dynamique de la carte

3️⃣ Page Admin

* Interface modification des poids (bio1, bio5, bio12, bio15)
* Bouton "Recalculer l’indice"
* Affichage d’un loader pendant traitement

4️⃣ Graphiques

* Graphique en bar chart (distribution vulnérabilité)
* Graphique en pie chart (répartition classes)
* Utiliser Recharts ou Chart.js

5️⃣ Structure technique

* React avec hooks
* Axios pour appels API
* Architecture composants claire
* Dossier services pour API
* Gestion état via useState / useEffect
* Responsive design

6️⃣ UI professionnelle

* Thème moderne
* Sidebar navigation
* Header
* Cartes statistiques

Génère :

* Structure complète des fichiers
* Code des principaux composants
* Exemple d’appel API
* Commentaires clairs dans le code

Le code doit être prêt à lancer avec npm install et npm start.

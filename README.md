# Code Wallet

Application de bureau (Electron + React) pour enregistrer et classer des fragments de code par tag. Les données restent en local dans une base SQLite.

## Fonctionnalités

- Créer, modifier, consulter et supprimer des fragments
- Lister les tags, renommer un tag ou le supprimer avec ses fragments
- Thème clair ou sombre, mémorisé entre deux lancements

## Structure

```
src/
  main/                    Processus principal Electron
    index.js               Création de la fenêtre
    database.js            Connexion SQLite et création de la table
    fragmentRepository.js  Requêtes SQL sur les fragments
    ipcHandlers.js         Canaux IPC exposés au renderer
  preload/index.js         Pont sécurisé : window.api
  renderer/src/            Interface React
    main.jsx               Routes
    styles.css             Styles et thèmes
    components/            Layout, cartes, formulaire, modale…
    hooks/                 useFragments, useTheme
    pages/                 Une page par route
    services/fragmentApi.js  Accès à window.api
```

## Commandes

```bash
npm install        # installation
npm run dev        # développement
npm run lint       # vérification du code
npm run build:win  # build Windows (aussi build:mac, build:linux)
```

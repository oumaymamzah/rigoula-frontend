# Guide de déploiement sur Netlify

## Configuration créée
Les fichiers suivants ont été ajoutés pour préparer le déploiement sur Netlify:
- `netlify.toml` - Configuration de build et de l'infrastructure
- `.netlifyignore` - Fichiers à exclure du déploiement
- `.env.example` - Modèle de variables d'environnement

## Étapes de déploiement

### 1. Préparation du projet
```bash
npm run build
```
Vérifiez que la build s'exécute sans erreurs.

### 2. Connexion à Netlify
Trois options disponibles:

#### Option A: Interface Netlify (Recommandée pour les débutants)
1. Allez sur [netlify.com](https://netlify.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New site from Git"
4. Sélectionnez votre repository
5. Les paramètres de build sont automatiquement détectés

#### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy
```

#### Option C: GitHub et Actions
1. Poussez votre code sur GitHub
2. Connectez le repo à Netlify
3. Netlify détectera automatiquement la configuration

### 3. Configuration des variables d'environnement
Dans le dashboard Netlify:
1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez les variables nécessaires:
   - `REACT_APP_API_URL` = votre URL d'API

### 4. Déploiement automatique
Une fois connecté à GitHub:
- Chaque push sur la branche main déploiera automatiquement
- Les branches de feature créent des previews

## Structure du build

```
src/
├─ App.jsx          (Point d'entrée React)
├─ services/        (Appels API)
├─ pages/           (Pages du site)
├─ components/      (Composants réutilisables)
├─ admin/           (Interface admin)
└─ context/         (État global)

build/              (Dossier de production)
```

## Points importants

✅ **Routing client-side**: Les redirects vers `/index.html` sont configurés dans `netlify.toml`
✅ **Headers de sécurité**: Configurés pour protéger votre site
✅ **Cache**: Les assets statiques sont mis en cache (31 jours)
✅ **Compression**: Activée par défaut

## Troubleshooting

### Les routes retournent 404
→ Vérifiez que le redirect `/*` → `/index.html` est dans `netlify.toml`

### Variables d'environnement pas chargées
→ Assurez-vous que vos variables commencent par `REACT_APP_`
→ Redéployez après modification

### Build fail en production
→ Vérifiez `npm run build` en local
→ Consultez les logs dans Netlify dashboard

## API URL

Actuellement configuré dans `netlify.toml`:
```
REACT_APP_API_URL = "https://api.yourdomain.com"
```

À remplacer par votre vraie API URL!

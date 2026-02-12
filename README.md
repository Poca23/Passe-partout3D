# 🌈 Passe-partout - Clé 3D Arc-en-ciel

Un projet 3D interactif créé avec Three.js qui affiche une clé en bois multicolore avec double rotation à 360°.

## 🎯 Description

Ce projet présente une clé 3D en bois avec :

- Une tête en forme d'anneau (torus)
- Un corps cylindrique
- Des dents de clé avec hauteurs variables (première et dernière 1.75x plus grandes)
- **Texture bois procédurale avec veines**
- **Double rotation infinie** (clé tourne sur elle-même + caméra orbitale)
- **Dégradé arc-en-ciel harmonieux**
- Éclairage dynamique

## 🚀 Installation

1. Clonez le projet :

```bash
git clone [votre-repo]/passe-partout.git
cd passe-partout
```

2. Lancez un serveur local :

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

3. Ouvrez `http://localhost:8000`

## 📁 Structure

```
passe-partout/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── styles.css
├── js/
│   ├── config.js
│   ├── components/
│   │   ├── Scene.js
│   │   ├── Camera.js
│   │   ├── Renderer.js
│   │   ├── Key.js
│   │   └── Lights.js
│   ├── utils/
│   │   └── responsive.js
│   └── main.js
└── README.md
```

## ✨ Fonctionnalités

✅ Clé 3D en bois avec texture procédurale  
✅ **Double rotation 360°** (clé sens inverse de la caméra)  
✅ **Dents graduées** (extrémités plus grandes)  
✅ **Dégradé de couleurs harmonieux** (30° entre tête/corps, 10° entre dents)  
✅ Caméra orbitale automatique  
✅ Design responsive  
✅ Performance optimisée (~60 FPS)

## 🌈 Animation des couleurs

- **Système HSL** : Transition fluide sur 360°
- **Tête** : Couleur de base
- **Corps** : +30°
- **Dents** : +60°, +70°, +80°, +90° (progression harmonieuse)
- **Cycle complet** : ~12 secondes

## 🛠️ Technologies

- **Three.js** r150+ - Rendu 3D WebGL
- **JavaScript ES6+** - Modules natifs
- **Canvas 2D** - Génération texture bois
- **CSS3** - Variables, Responsive

## ⚙️ Configuration

Modifiez `js/config.js` :

```javascript
key: {
  rotation: { speed: -0.015 },  // Rotation clé (négatif = sens inverse)
},
camera: {
  rotation: {
    speed: 0.3,                  // Vitesse caméra orbitale
    radius: 6,                   // Distance (4-10)
  },
},
colors: {
  speed: 0.5,                    // Vitesse transition (0.1-2)
  saturation: 70,                // Saturation (0-100)
  lightness: 45,                 // Luminosité (0-100)
}
```

## 🎨 Personnalisation

### Couleurs vives

```javascript
colors: { saturation: 100, lightness: 60 }
```

### Rotation synchronisée

```javascript
key: {
  rotation: {
    speed: 0.015;
  }
} // Même sens que caméra
```

### Vue rapprochée

```javascript
camera: { rotation: { radius: 4, height: 1 } }
```

## 🎓 Concepts Three.js

- Géométries composites
- Textures procédurales (Canvas)
- Double rotation indépendante
- Dégradé HSL harmonieux
- Caméra orbitale circulaire

## 📄 Licence

Libre d'utilisation à des fins pédagogiques.

## 👤 Auteur

Créé dans le cadre de l'apprentissage de Three.js | CND - Web Is Yours | Février 2026

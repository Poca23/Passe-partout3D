# 🌈 Passe-partout - Clé 3D Multicolore

Un projet 3D interactif créé avec Three.js qui affiche une clé multicolore tournant à 360° en continu avec une caméra orbitale.

## 🎯 Description

Ce projet présente une clé 3D réaliste avec :

- Une tête en forme d'anneau (torus)
- Un corps cylindrique
- Des dents de clé avec hauteurs variables
- **Rotation continue à 360°**
- **Caméra tournant autour de la clé**
- **Animation de couleurs arc-en-ciel**
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
├── .gitignore
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

✅ Clé 3D réaliste avec matériau métallique  
✅ **Rotation infinie à 360°**  
✅ **Caméra orbitale automatique**  
✅ **Couleurs animées arc-en-ciel (HSL)**  
✅ Éclairage ambiant, directionnel et ponctuel  
✅ Design responsive (mobile/tablet/desktop)  
✅ Architecture modulaire ES6+  
✅ Performance optimisée (~60 FPS)  
✅ Cleanup mémoire automatique

## 🌈 Animation des couleurs

- **Système HSL** : Transition fluide sur 360° de teinte
- **Tête** : Couleur de base
- **Corps** : Décalage de +120°
- **Dents** : Décalage progressif de 60° par dent
- **Cycle complet** : ~7 secondes

## 🛠️ Technologies

- **Three.js** r150+ - Rendu 3D WebGL
- **JavaScript ES6+** - Modules natifs
- **CSS3** - Variables, Grid, Flexbox
- **HTML5** - Canvas, Responsive

## ⚙️ Configuration

Modifiez `js/config.js` :

```javascript
key: {
  rotation: { speed: 0.02 },  // Vitesse de rotation (0.01-0.05)
},
camera: {
  rotation: {
    enabled: true,            // Activer/désactiver rotation caméra
    speed: 0.3,               // Vitesse rotation (0.1-1)
    radius: 6,                // Distance de la caméra (4-10)
    height: 2,                // Hauteur de la caméra (0-5)
  },
},
colors: {
  speed: 0.5,                 // Vitesse changement couleur (0.1-2)
  saturation: 100,            // Saturation (0-100)
  lightness: 50,              // Luminosité (0-100)
}
```

## 🎨 Personnalisation

### Couleurs pastel

```javascript
colors: { speed: 0.3, saturation: 50, lightness: 70 }
```

### Rotation rapide

```javascript
key: {
  rotation: {
    speed: 0.05;
  }
}
```

### Caméra fixe

```javascript
camera: {
  rotation: {
    enabled: false;
  }
}
```

### Vue rapprochée

```javascript
camera: { rotation: { radius: 4, height: 1 } }
```

## 🎓 Concepts Three.js

- Géométries composites (Torus, Cylinder, Box)
- Groupement d'objets (THREE.Group)
- Animation HSL pour transitions de couleurs
- Rotation continue (pas de limite d'angle)
- Caméra orbitale circulaire
- Responsive design 3D

## 📄 Licence

Libre d'utilisation à des fins pédagogiques.

## 👤 Auteur

Créé dans le cadre de l'apprentissage de Three.js | CND - Web Is Yours | Février 2026

---

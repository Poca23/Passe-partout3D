# 🔑 Passe-partout - Clé 3D Rotative

Un projet 3D élégant créé avec Three.js qui affiche une clé dorée tournant comme dans une serrure.

## 🎯 Description

Ce projet présente une clé 3D réaliste composée de :
- Une tête en forme d'anneau (torus)
- Un corps cylindrique
- Des dents de clé avec hauteurs variables
- Un mouvement de rotation réaliste (comme dans une serrure)
- Un éclairage dynamique doré

## 🚀 Installation

1. Clonez le projet :
```bash
git clone [votre-repo]/passe-partout.git
cd passe-partout

Lancez un serveur local :

# Python 3
python -m http.server 8000

# Node.js
npx http-server

Ouvrez http://localhost:8000

📁 Structure
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
✨ Fonctionnalités

✅ Clé 3D réaliste avec matériau métallique doré
✅ Rotation automatique (comme dans une serrure)
✅ Éclairage ambiant, directionnel et ponctuel
✅ Design responsive (mobile/tablet/desktop)
✅ Architecture modulaire ES6+
✅ Performance optimisée
✅ Cleanup mémoire automatique

🛠️ Technologies

Three.js r150+ - Rendu 3D WebGL
JavaScript ES6+ - Modules natifs
CSS3 - Variables, Grid, Flexbox
HTML5 - Canvas, Responsive

🎨 Composants 3D
Key.js
Crée la clé en 3 parties :

Tête : TorusGeometry (anneau)
Corps : CylinderGeometry (cylindre horizontal)
Dents : BoxGeometry (4 dents de hauteurs aléatoires)

Animation
Rotation sur l'axe Z entre -90° et +90° pour simuler une clé qui tourne dans une serrure.
📝 Configuration
Modifiez config.js pour personnaliser :

Dimensions de la clé
Couleur (or par défaut : 0xffd700)
Vitesse de rotation
Nombre et taille des dents
Propriétés matériau (metalness, roughness)

🎓 Apprentissage
Ce projet illustre :

Construction de formes 3D complexes
Groupement d'objets (THREE.Group)
Matériaux métalliques réalistes
Animation de rotation
Architecture composants réutilisables

📄 Licence
Libre d'utilisation à des fins pédagogiques.
👤 Auteur
Créé dans le cadre de l'apprentissage de Three.js
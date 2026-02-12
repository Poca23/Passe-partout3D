import CONFIG from "../config.js";

export class Scene {
  constructor() {
    this.scene = null;
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();

    if (CONFIG.scene.background) {
      this.scene.background = new THREE.Color(CONFIG.scene.background);
    }

    if (CONFIG.scene.fog.enabled) {
      this.scene.fog = new THREE.Fog(
        CONFIG.scene.fog.color,
        CONFIG.scene.fog.near,
        CONFIG.scene.fog.far
      );
    }
  }

  add(object) {
    if (!object) return;
    this.scene.add(object);
  }

  remove(object) {
    if (!object) return;
    this.scene.remove(object);
  }

  getScene() {
    return this.scene;
  }

  dispose() {
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}

export default Scene;

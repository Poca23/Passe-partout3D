import CONFIG from "../config.js";

export class Lights {
  constructor() {
    this.lights = [];
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;
    this.init();
  }

  init() {
    this.createAmbientLight();
    this.createDirectionalLight();
    this.createPointLight();
  }

  createAmbientLight() {
    const { color, intensity } = CONFIG.lights.ambient;
    this.ambientLight = new THREE.AmbientLight(color, intensity);
    this.lights.push(this.ambientLight);
  }

  createDirectionalLight() {
    const { color, intensity, position } = CONFIG.lights.directional;
    
    this.directionalLight = new THREE.DirectionalLight(color, intensity);
    this.directionalLight.position.set(position.x, position.y, position.z);
    this.directionalLight.castShadow = true;
    
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 50;
    
    this.lights.push(this.directionalLight);
  }

  createPointLight() {
    if (!CONFIG.lights.point.enabled) return;

    const { color, intensity, distance, position } = CONFIG.lights.point;
    
    this.pointLight = new THREE.PointLight(color, intensity, distance);
    this.pointLight.position.set(position.x, position.y, position.z);
    this.pointLight.castShadow = true;
    
    this.lights.push(this.pointLight);
  }

  addToScene(scene) {
    this.lights.forEach((light) => scene.add(light));
  }

  animatePointLight(time) {
    if (!this.pointLight) return;

    const radius = 4;
    this.pointLight.position.x = Math.cos(time) * radius;
    this.pointLight.position.z = Math.sin(time) * radius;
  }

  setIntensity(lightType, intensity) {
    const lightMap = {
      ambient: this.ambientLight,
      directional: this.directionalLight,
      point: this.pointLight,
    };

    const light = lightMap[lightType];
    if (light) light.intensity = intensity;
  }

  dispose() {
    this.lights.forEach((light) => {
      if (light.dispose) light.dispose();
    });

    this.lights = [];
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;
  }
}

export default Lights;

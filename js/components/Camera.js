import CONFIG from "../config.js";

export class Camera {
  constructor(aspect) {
    this.camera = null;
    this.angle = 0;
    this.init(aspect);
  }

  init(aspect) {
    const { fov, near, far, position } = CONFIG.camera;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(position.x, position.y, position.z);
    this.camera.lookAt(0, 0, 0);
  }

  getCamera() {
    return this.camera;
  }

  updateAspect(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    if (!CONFIG.camera.rotation.enabled) return;

    const { speed, radius, height } = CONFIG.camera.rotation;

    this.angle += speed * 0.01;

    this.camera.position.x = Math.cos(this.angle) * radius;
    this.camera.position.z = Math.sin(this.angle) * radius;
    this.camera.position.y = height;

    this.camera.lookAt(0, 0, 0);
  }

  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  lookAt(x, y, z) {
    this.camera.lookAt(x, y, z);
  }

  dispose() {
    this.camera = null;
  }
}

export default Camera;

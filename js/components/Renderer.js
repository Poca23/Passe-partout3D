import CONFIG from "../config.js";

export class Renderer {
  constructor(container) {
    this.renderer = null;
    this.container = container;
    this.init();
  }

  init() {
    const { antialias, alpha, powerPreference, pixelRatio } = CONFIG.renderer;

    this.renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      powerPreference,
    });

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
    this.container.classList.add("loaded");
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  updateSize(width, height) {
    this.renderer.setSize(width, height);
  }

  setPixelRatio(ratio) {
    this.renderer.setPixelRatio(ratio);
  }

  getInfo() {
    return this.renderer.info;
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(
          this.renderer.domElement,
        );
      }
    }
    this.renderer = null;
  }
}

export default Renderer;

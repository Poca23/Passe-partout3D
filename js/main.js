function waitForThree() {
  return new Promise((resolve) => {
    if (typeof THREE !== "undefined") {
      resolve();
    } else {
      const checkThree = setInterval(() => {
        if (typeof THREE !== "undefined") {
          clearInterval(checkThree);
          resolve();
        }
      }, 50);
    }
  });
}

waitForThree().then(async () => {
  const { default: CONFIG } = await import("./config.js");
  const { default: ResponsiveManager } = await import("./utils/responsive.js");
  const { Scene } = await import("./components/Scene.js");
  const { Camera } = await import("./components/Camera.js");
  const { Renderer } = await import("./components/Renderer.js");
  const { Key } = await import("./components/Key.js");
  const { Lights } = await import("./components/Lights.js");

  class App {
    constructor() {
      this.isRunning = false;
      this.animationId = null;
      this.clock = new THREE.Clock();

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.key = null;
      this.lights = null;
      this.responsiveManager = ResponsiveManager;

      this.stats = {
        frameCount: 0,
        startTime: Date.now(),
      };

      this.init();
    }

    async init() {
      try {
        if (!this.checkPrerequisites()) return;

        await this.createComponents();
        this.setupResponsive();
        this.start();
      } catch (error) {
        console.error("Initialization error:", error);
        this.showError("Erreur lors du chargement de l'application 3D");
      }
    }

    checkPrerequisites() {
      if (typeof THREE === "undefined") {
        this.showError("Three.js n'est pas disponible");
        return false;
      }

      const capabilities = this.responsiveManager.getDeviceCapabilities();
      if (!capabilities.webGLSupported) {
        this.showError("Votre navigateur ne supporte pas WebGL");
        return false;
      }

      const container = document.getElementById("canvas-container");
      if (!container) {
        console.error("Canvas container not found");
        return false;
      }

      return true;
    }

    async createComponents() {
      const container = document.getElementById("canvas-container");

      this.scene = new Scene();

      const aspect = container.clientWidth / container.clientHeight;
      this.camera = new Camera(aspect);

      this.renderer = new Renderer(container);

      this.lights = new Lights();
      this.lights.addToScene(this.scene.getScene());

      this.key = new Key();
      this.scene.add(this.key.getMesh());
    }

    setupResponsive() {
      this.responsiveManager.onResize(() => {
        this.handleResize();
      });
    }

    handleResize() {
      const container = document.getElementById("canvas-container");
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.updateAspect(width, height);
      this.renderer.updateSize(width, height);
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      if (!this.isRunning) return;
      this.isRunning = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    animate() {
      if (!this.isRunning) return;

      this.animationId = requestAnimationFrame(() => this.animate());

      const elapsedTime = this.clock.getElapsedTime();

      if (this.camera) {
        this.camera.animate();
      }

      if (this.key) {
        this.key.animate();
      }

      if (this.lights && CONFIG.animation && CONFIG.animation.lightRotation) {
        this.lights.animatePointLight(elapsedTime * 0.5);
      }

      this.renderer.render(this.scene.getScene(), this.camera.getCamera());

      this.updateStats();
    }

    updateStats() {
      this.stats.frameCount++;

      if (this.stats.frameCount % 60 === 0 && CONFIG.debug) {
        const elapsed = (Date.now() - this.stats.startTime) / 1000;
        const fps = Math.round(this.stats.frameCount / elapsed);
        const info = this.renderer.getInfo();

        console.log(`FPS: ${fps} | Frames: ${this.stats.frameCount}`);
        console.log(
          `Triangles: ${info.render.triangles} | Calls: ${info.render.calls}`,
        );
      }
    }

    showError(message) {
      const container = document.getElementById("canvas-container");
      if (container) {
        container.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #ff6b6b;
            text-align: center;
            padding: 2rem;
            font-size: 1.2rem;
          ">
            <div>
              <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
              <div>${message}</div>
              <div style="font-size: 0.9rem; margin-top: 1rem; color: #a0a0a0;">
                Vérifiez la console pour plus de détails
              </div>
            </div>
          </div>
        `;
      }
    }

    dispose() {
      this.stop();

      if (this.key) this.key.dispose();
      if (this.lights) this.lights.dispose();
      if (this.scene) this.scene.dispose();
      if (this.renderer) this.renderer.dispose();
      if (this.camera) this.camera.dispose();

      this.responsiveManager.destroy();

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.key = null;
      this.lights = null;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.app = new App();
    });
  } else {
    window.app = new App();
  }

  window.addEventListener("beforeunload", () => {
    if (window.app) {
      window.app.dispose();
    }
  });
});

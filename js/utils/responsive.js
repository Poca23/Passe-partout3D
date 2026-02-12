class ResponsiveManager {
  constructor() {
    this.resizeCallbacks = [];
    this.resizeTimeout = null;
    this.debounceDelay = 250;
    this.currentBreakpoint = this.getBreakpoint();
    
    this.init();
  }

  init() {
    this.handleResize = this.handleResize.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orientationchange", this.handleOrientationChange);
  }

  handleResize() {
    clearTimeout(this.resizeTimeout);
    
    this.resizeTimeout = setTimeout(() => {
      const newBreakpoint = this.getBreakpoint();
      
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
      }
      
      this.resizeCallbacks.forEach((callback) => {
        callback({
          width: window.innerWidth,
          height: window.innerHeight,
          breakpoint: this.currentBreakpoint,
        });
      });
    }, this.debounceDelay);
  }

  handleOrientationChange() {
    setTimeout(() => this.handleResize(), 100);
  }

  onResize(callback) {
    if (typeof callback === "function") {
      this.resizeCallbacks.push(callback);
    }
  }

  getBreakpoint() {
    const width = window.innerWidth;
    
    if (width < 640) return "mobile";
    if (width < 768) return "tablet";
    if (width < 1024) return "desktop";
    return "wide";
  }

  isMobile() {
    return this.currentBreakpoint === "mobile";
  }

  isTablet() {
    return this.currentBreakpoint === "tablet";
  }

  isDesktop() {
    return ["desktop", "wide"].includes(this.currentBreakpoint);
  }

  getOptimalPixelRatio() {
    const isMobile = this.isMobile();
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    if (isMobile) {
      return Math.min(devicePixelRatio, 1.5);
    }
    
    return Math.min(devicePixelRatio, 2);
  }

  getDeviceCapabilities() {
    const canvas = document.createElement("canvas");
    const webGLSupported = !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );

    return {
      webGLSupported,
      touchSupported: "ontouchstart" in window,
      pixelRatio: window.devicePixelRatio || 1,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  destroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("orientationchange", this.handleOrientationChange);
    clearTimeout(this.resizeTimeout);
    this.resizeCallbacks = [];
  }
}

export default new ResponsiveManager();

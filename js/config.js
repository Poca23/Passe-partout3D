export const CONFIG = {
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },

  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 3, y: 2, z: 5 },
  },

  key: {
    head: { radius: 0.5, thickness: 0.15 },
    shaft: { length: 2.5, radius: 0.12 },
    teeth: {
      count: 4,
      height: 0.2,
      width: 0.15,
      depth: 0.1,
      spacing: 0.5,
    },
    material: { metalness: 0.8, roughness: 0.2 },
    rotation: { speed: 0.02 },
    position: { x: 0, y: 0, z: 0 },
  },

  colors: {
    speed: 0.5,
    saturation: 100,
    lightness: 50,
  },

  lights: {
    ambient: { color: 0xffffff, intensity: 0.4 },
    directional: {
      color: 0xffffff,
      intensity: 0.8,
      position: { x: 5, y: 5, z: 5 },
    },
    point: {
      enabled: true,
      color: 0x00d4ff,
      intensity: 1,
      distance: 10,
      position: { x: -3, y: 2, z: 3 },
    },
  },

  scene: {
    background: null,
    fog: { enabled: false },
  },

  animation: {
    lightRotation: true,
  },

  debug: false,
};

export default CONFIG;

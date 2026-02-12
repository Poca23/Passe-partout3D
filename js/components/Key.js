import CONFIG from "../config.js";

export class Key {
  constructor() {
    this.group = new THREE.Group();
    this.parts = { head: null, shaft: null, teeth: [] };
    this.hue = 0;
    this.init();
  }

  init() {
    this.createHead();
    this.createShaft();
    this.createTeeth();
    
    this.group.position.set(
      CONFIG.key.position.x,
      CONFIG.key.position.y,
      CONFIG.key.position.z
    );
    this.group.rotation.y = Math.PI / 4;
  }

  createHead() {
    const { radius, thickness } = CONFIG.key.head;
    const { metalness, roughness } = CONFIG.key.material;

    const geometry = new THREE.TorusGeometry(radius, thickness, 16, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness,
      roughness,
    });

    this.parts.head = new THREE.Mesh(geometry, material);
    this.parts.head.rotation.x = Math.PI / 2;
    this.parts.head.castShadow = true;
    this.group.add(this.parts.head);
  }

  createShaft() {
    const { length, radius } = CONFIG.key.shaft;
    const { metalness, roughness } = CONFIG.key.material;

    const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness,
      roughness,
    });

    this.parts.shaft = new THREE.Mesh(geometry, material);
    this.parts.shaft.rotation.z = Math.PI / 2;
    this.parts.shaft.position.x = length / 2;
    this.parts.shaft.castShadow = true;
    this.group.add(this.parts.shaft);
  }

  createTeeth() {
    const { count, height, width, depth, spacing } = CONFIG.key.teeth;
    const { metalness, roughness } = CONFIG.key.material;
    const shaftLength = CONFIG.key.shaft.length;

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness,
      roughness,
    });

    const startX = shaftLength * 0.3;

    for (let i = 0; i < count; i++) {
      const tooth = new THREE.Mesh(geometry, material);
      const toothHeight = height * (0.5 + Math.random() * 0.5);
      
      tooth.scale.y = toothHeight / height;
      tooth.position.set(
        startX + i * spacing,
        -CONFIG.key.shaft.radius - toothHeight / 2,
        0
      );
      tooth.castShadow = true;
      this.parts.teeth.push(tooth);
      this.group.add(tooth);
    }
  }

  getMesh() {
    return this.group;
  }

  animate() {
    // Rotation 360° continue
    this.group.rotation.z += CONFIG.key.rotation.speed;

    // Animation des couleurs (cycle HSL)
    this.hue += CONFIG.colors.speed;
    if (this.hue > 360) this.hue = 0;

    const color = new THREE.Color();
    
    // Tête avec hue décalé de 120°
    color.setHSL(this.hue / 360, 1, 0.5);
    if (this.parts.head) this.parts.head.material.color.copy(color);

    // Corps avec hue décalé de 240°
    color.setHSL((this.hue + 120) / 360, 1, 0.5);
    if (this.parts.shaft) this.parts.shaft.material.color.copy(color);

    // Dents avec hue décalé de 360° (même que la tête)
    this.parts.teeth.forEach((tooth, i) => {
      color.setHSL((this.hue + i * 60) / 360, 1, 0.5);
      tooth.material.color.copy(color);
    });
  }

  dispose() {
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }
}

export default Key;

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
      CONFIG.key.position.z,
    );
    this.group.rotation.y = Math.PI / 4;
  }

  createWoodTexture(colorBase) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = colorBase;
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512;
      const width = 2 + Math.random() * 4;
      const opacity = 0.1 + Math.random() * 0.2;

      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 50, 512);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
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
    const shaftLength = CONFIG.key.shaft.length;
    const shaftRadius = CONFIG.key.shaft.radius;
    const headRadius = CONFIG.key.head.radius;
    const { metalness, roughness } = CONFIG.key.material;

    const geometry = new THREE.CylinderGeometry(
      shaftRadius,
      shaftRadius,
      shaftLength,
      32,
    );
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness,
      roughness,
    });

    this.parts.shaft = new THREE.Mesh(geometry, material);
    this.parts.shaft.rotation.z = Math.PI / 2;
    this.parts.shaft.position.x = headRadius + shaftLength / 2;
    this.parts.shaft.castShadow = true;
    this.group.add(this.parts.shaft);
  }

  createTeeth() {
    const { count, height, width, depth, spacing } = CONFIG.key.teeth;
    const { metalness, roughness } = CONFIG.key.material;
    const shaftLength = CONFIG.key.shaft.length;
    const headRadius = CONFIG.key.head.radius;

    const totalTeethWidth = (count - 1) * spacing;
    const startX = headRadius + (shaftLength - totalTeethWidth) / 1.5;

    for (let i = 0; i < count; i++) {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness,
        roughness,
      });

      const tooth = new THREE.Mesh(geometry, material);

      const isFirstOrLast = i === 0 || i === count - 1;
      const heightMultiplier = isFirstOrLast ? 1.75 : 0.5 + Math.random() * 0.5;
      const toothHeight = height * heightMultiplier;

      tooth.scale.y = toothHeight / height;
      tooth.position.set(
        startX + i * spacing,
        -CONFIG.key.shaft.radius - toothHeight / 2,
        0,
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
    this.group.rotation.z += CONFIG.key.rotation.speed;

    this.hue += CONFIG.colors.speed;
    if (this.hue > 360) this.hue = 0;

    const color = new THREE.Color();
    const { saturation, lightness } = CONFIG.colors;

    const hslToHex = (h, s, l) => {
      color.setHSL(h / 360, s / 100, l / 100);
      return "#" + color.getHexString();
    };

    const headColor = hslToHex(this.hue, saturation, lightness);
    if (this.parts.head) {
      if (!this.parts.head.material.map) {
        this.parts.head.material.map = this.createWoodTexture(headColor);
        this.parts.head.material.needsUpdate = true;
      }
      this.parts.head.material.color.copy(color);
    }

    const shaftColor = hslToHex(this.hue + 30, saturation, lightness);
    color.setHSL((this.hue + 30) / 360, saturation / 100, lightness / 100);
    if (this.parts.shaft) {
      if (!this.parts.shaft.material.map) {
        this.parts.shaft.material.map = this.createWoodTexture(shaftColor);
        this.parts.shaft.material.needsUpdate = true;
      }
      this.parts.shaft.material.color.copy(color);
    }

    this.parts.teeth.forEach((tooth, i) => {
      const offset = 60 + i * 10;
      const toothColor = hslToHex(this.hue + offset, saturation, lightness);
      color.setHSL(
        (this.hue + offset) / 360,
        saturation / 100,
        lightness / 100,
      );

      if (!tooth.material.map) {
        tooth.material.map = this.createWoodTexture(toothColor);
        tooth.material.needsUpdate = true;
      }
      tooth.material.color.copy(color);
    });
  }

  dispose() {
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
  }
}

export default Key;

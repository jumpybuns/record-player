import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
// Desk

const desk = new THREE.Group();
scene.add(desk);

const back = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7 })
);
back.position.y = 1;

const left = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7 })
);
left.position.y = 1;
left.position.x = -2.5;
left.position.z = 1.45;
left.rotation.y = Math.PI / 2;

const right = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7 })
);
right.position.x = 2.5;
right.position.y = 1;
right.position.z = 1.45;
right.rotation.y = Math.PI / 2;

const top = new THREE.Mesh(
  new THREE.BoxGeometry(6, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7 })
);
top.rotation.x = Math.PI / 2;
top.position.y = 2.5;
top.position.z = 1.45;

desk.add(back, left, right, top);

// Record Player
const recordPlayer = new THREE.Group();
scene.add(recordPlayer);

const base = new THREE.Mesh(
  new THREE.BoxGeometry(2.25, 0.3, 2.25),
  new THREE.MeshStandardMaterial({ roughness: 0.7, color: 0xff0000 })
);
base.position.x = 1.7;
base.position.y = 2.75;
base.position.z = 1.5;

const record = new THREE.Mesh(
  new THREE.TorusGeometry(0.45, 0.4, 2.9, 89, 6.3),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);

record.rotation.x = Math.PI / 2;
record.position.x = 1.5;
record.position.y = 3;
record.position.z = 1.5;

const arm = new THREE.Mesh(
  new THREE.CylinderGeometry(0.05, 0.05, 1.75, 64, 1),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);

arm.rotation.x = Math.PI / 2;
arm.rotation.z = Math.PI / 7.01;
arm.position.x = 2.25;
arm.position.y = 3.1;
arm.position.z = 1.25;

const weight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 0.05, 64, 1),
  new THREE.MeshStandardMaterial({ color: 0xff00ff })
);

weight.rotation.x = Math.PI / 2;
weight.rotation.z = Math.PI / 7;
weight.position.x = 2.57;
weight.position.y = 3.1;
weight.position.z = 0.55;

recordPlayer.add(base, record, arm, weight);

// Amp

const amp = new THREE.Group();
scene.add(amp);

const ampCase = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.75, 1.75),
  new THREE.MeshStandardMaterial({ roughness: 0.7, color: 0xff0000 })
);
ampCase.position.x = -1.5;
ampCase.position.y = 2.85;
ampCase.position.z = 1.5;

const facePlate = new THREE.Mesh(
  new THREE.PlaneGeometry(1.75, 0.6),
  new THREE.MeshStandardMaterial({ roughness: 0.7, color: 0x00ffff })
);

facePlate.position.x = -1.5;
facePlate.position.y = 2.9;
facePlate.position.z = 2.4;

amp.add(ampCase, facePlate);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Record
  record.rotation.z = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

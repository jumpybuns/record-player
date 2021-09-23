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

// Fog
const fog = new THREE.Fog("#262837", 1, 25);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load("/textures/door/wood.jpg");
const speakerTexture = textureLoader.load("/textures/door/speaker.jpg");
const glassTexture = textureLoader.load("/textures/door/glass.jpg");
const meterTexture = textureLoader.load("/textures/door/VU_Meter.jpg");
const ampTexture = textureLoader.load("/textures/door/amp.jpg");
const vinylTexture = textureLoader.load("/textures/door/vinyl.png");
const blackTexture = textureLoader.load("/textures/door/black.png");
const silverTexture = textureLoader.load("/textures/door/silver.jpg");

/**
 * House
 */
// Desk

const desk = new THREE.Group();
scene.add(desk);

const back = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: woodTexture })
);
back.position.y = 1;

const left = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: woodTexture })
);
left.position.y = 1;
left.position.x = -2.5;
left.position.z = 1.45;
left.rotation.y = Math.PI / 2;

const right = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: woodTexture })
);
right.position.x = 2.5;
right.position.y = 1;
right.position.z = 1.45;
right.rotation.y = Math.PI / 2;

const top = new THREE.Mesh(
  new THREE.BoxGeometry(6, 3, 0.1),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: woodTexture })
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
  new THREE.MeshMatcapMaterial({ roughness: 0.7, matcap: blackTexture })
);
base.position.x = 1.7;
base.position.y = 2.75;
base.position.z = 1.5;

const record = new THREE.Mesh(
  new THREE.TorusGeometry(0.45, 0.4, 2.9, 89, 6.3),
  new THREE.MeshStandardMaterial({ map: vinylTexture })
);

record.rotation.x = Math.PI / 2;
record.position.x = 1.5;
record.position.y = 3;
record.position.z = 1.5;

vinylTexture.wrapS = THREE.RepeatWrapping;
vinylTexture.wrapT = THREE.RepeatWrapping;

const arm = new THREE.Mesh(
  new THREE.CylinderGeometry(0.05, 0.05, 1.75, 64, 1),
  new THREE.MeshMatcapMaterial({ roughness: 0.7, matcap: blackTexture })
);

arm.rotation.x = Math.PI / 2;
arm.rotation.z = Math.PI / 7.01;
arm.position.x = 2.25;
arm.position.y = 3.1;
arm.position.z = 1.25;

const weight = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 0.05, 64, 1),
  new THREE.MeshMatcapMaterial({ roughness: 0.7, matcap: silverTexture })
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
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: ampTexture })
);
ampCase.position.x = -1.5;
ampCase.position.y = 2.85;
ampCase.position.z = 1.5;

const facePlate = new THREE.Mesh(
  new THREE.PlaneGeometry(1.75, 0.6),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: glassTexture })
);

facePlate.position.x = -1.5;
facePlate.position.y = 2.9;
facePlate.position.z = 2.4;

const meterLeft = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6, 0.3),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: meterTexture })
);
meterLeft.position.set(-1.9, 3, 2.41);

const meterRight = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6, 0.3),
  new THREE.MeshStandardMaterial({ roughness: 0.7, map: meterTexture })
);
meterRight.position.set(-1.1, 3, 2.41);

amp.add(ampCase, facePlate, meterLeft, meterRight);

// Speakers
const leftSpeaker = new THREE.Group();
scene.add(leftSpeaker);

const leftSpeakerBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 4, 2),
  new THREE.MeshStandardMaterial({ map: speakerTexture })
);

leftSpeakerBox.position.x = -4.5;
leftSpeakerBox.position.y = 1.5;
leftSpeakerBox.position.z = 1;

const coneGeometry = new THREE.TorusGeometry(0.05, 0.4, 2.9, 89, 6.3);
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const coneL1 = new THREE.Mesh(coneGeometry, coneMaterial);
coneL1.scale.set(0.6, 0.6);
coneL1.position.set(-4.5, 2.75, 2.01);
const coneL2 = new THREE.Mesh(coneGeometry, coneMaterial);
coneL2.scale.set(0.6, 0.6);
coneL2.position.set(-4.5, 2, 2.01);
const coneL3 = new THREE.Mesh(coneGeometry, coneMaterial);
coneL3.scale.set(0.6, 0.6);
coneL3.position.set(-4.5, 1.25, 2.01);

leftSpeaker.add(coneL1, coneL2, coneL3, leftSpeakerBox);

const rightSpeaker = new THREE.Group();
scene.add(rightSpeaker);

const rightSpeakerBox = new THREE.Mesh(
  new THREE.BoxGeometry(1, 4, 2),
  new THREE.MeshStandardMaterial({ map: speakerTexture })
);

rightSpeakerBox.position.x = 4.5;
rightSpeakerBox.position.y = 1.5;
rightSpeakerBox.position.z = 1;

const coneR1 = new THREE.Mesh(coneGeometry, coneMaterial);
coneR1.scale.set(0.6, 0.6);
coneR1.position.set(4.5, 2.75, 2.01);
const coneR2 = new THREE.Mesh(coneGeometry, coneMaterial);
coneR2.scale.set(0.6, 0.6);
coneR2.position.set(4.5, 2, 2.01);
const coneR3 = new THREE.Mesh(coneGeometry, coneMaterial);
coneR3.scale.set(0.6, 0.6);
coneR3.position.set(4.5, 1.25, 2.01);

rightSpeaker.add(coneR1, coneR2, coneR3, rightSpeakerBox);

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

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);

desk.add(doorLight);

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
renderer.setClearColor("#262837");

/**
 *  Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;

desk.castShadow = true;
leftSpeaker.castShadow = true;
rightSpeaker.castShadow = true;

floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Record
  record.rotation.z = elapsedTime * 3.3;

  // Update Cone
  //   coneL1.position.z = coneL1.position.z + Math.cos(elapsedTime * 50);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

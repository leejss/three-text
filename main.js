import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import "./style.css";

const canvas = document.querySelector(".webgl");

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight);
camera.position.z = 3;
scene.add(camera);

// contorls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/matcap/8.png");

// mesh
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  const textGeometry = new TextGeometry("3D TEXT", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: texture,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

// Event Handlers
addEventListener("resize", (e) => {
  // update camera
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  // Update renderer
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

tick();

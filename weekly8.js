import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----------------------------------------------------
// Scene
// ----------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ----------------------------------------------------
// Camera
// ----------------------------------------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(20, 15, 20);

// ----------------------------------------------------
// Renderer
// ----------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ----------------------------------------------------
// Orbit Controls
// Allows Zoom, Pan, Orbit (Tilt/Rotate)
// ----------------------------------------------------
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// ----------------------------------------------------
// Texture Loader
// ----------------------------------------------------
const textureLoader = new THREE.TextureLoader();

// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(50, 50);

const groundDiffuse = textureLoader.load('textures/groundStone/ground_stone_diff.jpg');
const groundNormal = textureLoader.load('textures/groundStone/ground_stone_nor.jpg');
const groundDisplacement = textureLoader.load('textures/groundStone/ground_stone_disp.jpg');
const groundAmbientOcclusion = textureLoader.load('textures/groundStone/ground_stone_ao.jpg');
const groundRoughness = textureLoader.load('textures/groundStone/ground_stone_rough.jpg');

const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundDiffuse,
    normalMap: groundNormal,
    displacementMap: groundDisplacement,
    aoMap: groundAmbientOcclusion,
    roughnessMap: groundRoughness
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);

// ----------------------------------------------------
// Stone Wall
// ----------------------------------------------------
const wallGeometry = new THREE.BoxGeometry(50, 25, 1);

const wallDiffuse = textureLoader.load('textures/wallStone/stone_wall_diff.jpg');
const wallNormal = textureLoader.load('textures/wallStone/stone_wall_nor.jpg');
const wallDisplacement = textureLoader.load('textures/wallStone/stone_wall_disp.jpg');
const wallAmbientOcclusion = textureLoader.load('textures/wallStone/stone_wall_ao.jpg');
const wallRoughness = textureLoader.load('textures/wallStone/stone_wall_rough.jpg');

const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallDiffuse,
    normalMap: wallNormal,
    displacementMap: wallDisplacement,
    aoMap: wallAmbientOcclusion,
    roughnessMap: wallRoughness
});

const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 12.5, -25);

scene.add(wall);

// ----------------------------------------------------
// Gate
// ----------------------------------------------------
const gateShape = new THREE.Shape()
    .moveTo(-5, 0)
    .lineTo(5, 0)
    .lineTo(5, 10)
    .absarc(0, 10, 5, 0, Math.PI)
    .lineTo(-5,0)
;
const gateGeometry = new THREE.ShapeGeometry(gateShape);
const gateMaterial = new THREE.MeshStandardMaterial({color: 0xaa5500});

const gate = new THREE.Mesh(gateGeometry, gateMaterial);
gate.position.z = -24;

scene.add(gate);

// ----------------------------------------------------
// Crate
// ----------------------------------------------------
const crateGeometry = new THREE.BoxGeometry(4, 4, 4);
const crateMaterial = new THREE.MeshStandardMaterial({color: 0xaa5500});

const crate = new THREE.Mesh(crateGeometry, crateMaterial);
crate.position.y = 2;

scene.add(crate);

// ----------------------------------------------------
// Banner
// ----------------------------------------------------
const bannerShape = new THREE.Shape()
    .moveTo(-3, 8)
    .lineTo(3, 8)
    .lineTo(3, 0)
    .lineTo(0, 4)
    .lineTo(-3, 0)
    .lineTo(-3, 8)
;
const bannerGeometry = new THREE.ExtrudeGeometry(bannerShape);
const bannerMaterial = new THREE.MeshStandardMaterial({color: 0xaa0000});

const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
banner.position.set(-14, 10, -25);

scene.add(banner);

// ----------------------------------------------------
// Ambient Light
// ----------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);

// ----------------------------------------------------
// Directional Light
// ----------------------------------------------------
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

// ----------------------------------------------------
// Toggle Lights
// ----------------------------------------------------
let lightsOn = true;

document
    .getElementById("toggleButton")
    .addEventListener("click", () => {

        lightsOn = !lightsOn;

        ambientLight.visible = lightsOn;
        directionalLight.visible = lightsOn;
    });

// ----------------------------------------------------
// Window Resize
// ----------------------------------------------------
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

// ----------------------------------------------------
// Animation Loop
// ----------------------------------------------------
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();
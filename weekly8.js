import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
// GLTF Loader
// ----------------------------------------------------
const modelLoader = new GLTFLoader();

// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(50, 50);

const groundDiffuse = textureLoader.load('textures/groundStone/ground_stone_diff.jpg');
const groundNormal = textureLoader.load('textures/groundStone/ground_stone_nor.jpg');
const groundAmbientOcclusion = textureLoader.load('textures/groundStone/ground_stone_ao.jpg');
const groundRoughness = textureLoader.load('textures/groundStone/ground_stone_rough.jpg');

const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundDiffuse,
    normalMap: groundNormal,
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
const wallGeometry = new THREE.BoxGeometry(30, 20, 15);

const wallDiffuse = textureLoader.load('textures/wallStone/stone_wall_diff.jpg');
const wallNormal = textureLoader.load('textures/wallStone/stone_wall_nor.jpg');
const wallAmbientOcclusion = textureLoader.load('textures/wallStone/stone_wall_ao.jpg');
const wallRoughness = textureLoader.load('textures/wallStone/stone_wall_rough.jpg');

const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallDiffuse,
    normalMap: wallNormal,
    aoMap: wallAmbientOcclusion,
    roughnessMap: wallRoughness
});

const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 10, -17.5);
wall.castShadow = true;
wall.receiveShadow = true;

scene.add(wall);

const turretGeometry = new THREE.CylinderGeometry(5, 5, 30);
const turretMaterial = new THREE.MeshStandardMaterial({
    map: wallDiffuse,
    normalMap: wallNormal,
    aoMap: wallAmbientOcclusion,
    roughnessMap: wallRoughness
});

const turret1 = new THREE.Mesh(turretGeometry, turretMaterial);
turret1.position.set(-18, 15, -17.5);
turret1.castShadow = true;
turret1.receiveShadow = true;

scene.add(turret1);

const turret2 = new THREE.Mesh(turretGeometry, turretMaterial);
turret2.position.set(18, 15, -17.5);
turret2.castShadow = true;
turret2.receiveShadow = true;

scene.add(turret2);

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
const gateGeometry = new THREE.ExtrudeGeometry(gateShape, {depth: 0.5});

const gateDiffuse = textureLoader.load('textures/gateWood/wood_cabinet_diff.jpg');
gateDiffuse.wrapS = THREE.RepeatWrapping;
gateDiffuse.wrapT = THREE.RepeatWrapping;
gateDiffuse.repeat.set(0.1, 0.1);

const gateNormal = textureLoader.load('textures/gateWood/wood_cabinet_nor.jpg');
gateNormal.wrapS = THREE.RepeatWrapping;
gateNormal.wrapT = THREE.RepeatWrapping;
gateNormal.repeat.set(0.1, 0.1);

const gateAmbientOcclusion = textureLoader.load('textures/gateWood/wood_cabinet_ao.jpg');
gateAmbientOcclusion.wrapS = THREE.RepeatWrapping;
gateAmbientOcclusion.wrapT = THREE.RepeatWrapping;
gateAmbientOcclusion.repeat.set(0.1, 0.1);

const gateRoughness = textureLoader.load('textures/gateWood/wood_cabinet_rough.jpg');
gateRoughness.wrapS = THREE.RepeatWrapping;
gateRoughness.wrapT = THREE.RepeatWrapping;
gateRoughness.repeat.set(0.1, 0.1);

const gateMaterial = new THREE.MeshStandardMaterial({
    map: gateDiffuse,
    normalMap: gateNormal,
    aoMap: gateAmbientOcclusion,
    roughnessMap: gateRoughness
});

const gate = new THREE.Mesh(gateGeometry, gateMaterial);
gate.position.z = -10;
gate.receiveShadow = true;

scene.add(gate);

let obstacles = [];
let coins = [];

// ----------------------------------------------------
// Crate
// ----------------------------------------------------
const crateGeometry = new THREE.BoxGeometry(4.5, 4.5, 4.5);

const crateDiffuse = textureLoader.load('textures/crateWood/wooden_barrel_diff.jpg');
const crateNormal = textureLoader.load('textures/crateWood/wooden_barrel_nor.jpg');
const crateAmbientOcclusion = textureLoader.load('textures/crateWood/wooden_barrel_ao.jpg');
const crateRoughness = textureLoader.load('textures/crateWood/wooden_barrel_rough.jpg');
const crateMetalness = textureLoader.load('textures/crateWood/wooden_barrel_arm.jpg');

const crateMaterial = new THREE.MeshStandardMaterial({
    map: crateDiffuse,
    normalMap: crateNormal,
    aoMap: crateAmbientOcclusion,
    roughnessMap: crateRoughness,
    metalnessMap: crateMetalness
});

const crate1 = new THREE.Mesh(crateGeometry, crateMaterial);
crate1.position.y = 2;
crate1.castShadow = true;
crate1.receiveShadow = true;

scene.add(crate1);
obstacles.push(crate1);

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.y = 4.5;
    coin.scale.set(20, 20, 20);

    scene.add(coin);
    coins.push(coin);
});

const crate2 = new THREE.Mesh(crateGeometry, crateMaterial);
crate2.position.set(-15, 2, 12);
crate2.castShadow = true;
crate2.receiveShadow = true;

scene.add(crate2);
obstacles.push(crate2);

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.set(-15, 4.5, 12);
    coin.scale.set(20, 20, 20);
    coin.rotation.y = Math.PI * 0.25;

    scene.add(coin);
    coins.push(coin);
});

const crate3 = new THREE.Mesh(crateGeometry, crateMaterial);
crate3.position.set(12, 2, 20);
crate3.castShadow = true;
crate3.receiveShadow = true;

scene.add(crate3);
obstacles.push(crate3);

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.set(12, 4.5, 20);
    coin.scale.set(20, 20, 20);
    coin.rotation.y = Math.PI * 0.5;

    scene.add(coin);
    coins.push(coin);
});

// ----------------------------------------------------
// Barrels
// ----------------------------------------------------
modelLoader.load("models/Barrel by Quaternius.glb", (gltf)=> {
    const barrel = gltf.scene;
    barrel.position.set(-5, 0, 20);
    barrel.scale.set(7, 7, 7);

    scene.add(barrel);
    obstacles.push(barrel);
});

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.set(-5, 4.5, 20);
    coin.scale.set(20, 20, 20);
    coin.rotation.y = Math.PI * 0.75;

    scene.add(coin);
    coins.push(coin);
});

modelLoader.load("models/Barrel by Quaternius.glb", (gltf)=> {
    const barrel = gltf.scene;
    barrel.position.set(16, 0, 5);
    barrel.scale.set(7, 7, 7);

    scene.add(barrel);
    obstacles.push(barrel);
});

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.set(16, 4.5, 5);
    coin.scale.set(20, 20, 20);
    coin.rotation.y = Math.PI;

    scene.add(coin);
    coins.push(coin);
});

modelLoader.load("models/Barrel by Quaternius.glb", (gltf)=> {
    const barrel = gltf.scene;
    barrel.position.set(-10, 0, 2);
    barrel.scale.set(7, 7, 7);

    scene.add(barrel);
    obstacles.push(barrel);
});

modelLoader.load("models/Coin Piles by Quaternius.glb", (gltf)=> {
    const coin = gltf.scene;
    coin.position.set(-10, 4.5, 2);
    coin.scale.set(20, 20, 20);
    coin.rotation.y = Math.PI * 1.25;

    scene.add(coin);
    coins.push(coin);
});

// ----------------------------------------------------
// Banner
// ----------------------------------------------------
const bannerShape = new THREE.Shape()
    .moveTo(-1.5, 4)
    .lineTo(1.5, 4)
    .lineTo(1.5, 0)
    .lineTo(0, 2)
    .lineTo(-1.5, 0)
    .lineTo(-1.5, 4)
;
const bannerGeometry = new THREE.ExtrudeGeometry(bannerShape, {depth: 0.25});

const bannerDiffuse = textureLoader.load('textures/bannerCloth/velour_velvet_diff.jpg');
bannerDiffuse.wrapS = THREE.RepeatWrapping;
bannerDiffuse.wrapT = THREE.RepeatWrapping;
bannerDiffuse.repeat.set(0.05, 0.05);

const bannerNormal = textureLoader.load('textures/bannerCloth/velour_velvet_nor.jpg');
bannerNormal.wrapS = THREE.RepeatWrapping;
bannerNormal.wrapT = THREE.RepeatWrapping;
bannerNormal.repeat.set(0.05, 0.05);

const bannerAmbientOcclusion = textureLoader.load('textures/bannerCloth/velour_velvet_ao.jpg');
bannerAmbientOcclusion.wrapS = THREE.RepeatWrapping;
bannerAmbientOcclusion.wrapT = THREE.RepeatWrapping;
bannerAmbientOcclusion.repeat.set(0.05, 0.05);

const bannerRoughness = textureLoader.load('textures/bannerCloth/velour_velvet_rough.jpg');
bannerRoughness.wrapS = THREE.RepeatWrapping;
bannerRoughness.wrapT = THREE.RepeatWrapping;
bannerRoughness.repeat.set(0.05, 0.05);

const bannerMaterial = new THREE.MeshStandardMaterial({
    map: bannerDiffuse,
    normalMap: bannerNormal,
    aoMap: bannerAmbientOcclusion,
    roughnessMap: bannerRoughness
});

for (let i = -13.25; i <= 13.25; i += 3.3) {
    const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
    banner.position.set(i, 15.8, -10.2);
    banner.receiveShadow = true;

    scene.add(banner);
}

// ----------------------------------------------------
// Wall Flags
// ----------------------------------------------------
for (let i = -11; i <= 11; i += 5.5) {
    modelLoader.load("models/Flag_by_Quaternius.glb", (gltf)=> {
        const flag = gltf.scene;
        flag.position.set(i, 20, -17.5);
        flag.rotation.y = Math.PI * 0.25 * i;
        flag.scale.set(2, 2, 2);

        scene.add(flag);
    });
}

// ----------------------------------------------------
// King
// ----------------------------------------------------
const clock = new THREE.Clock();
let kingDirection = 1;
let kingMixer, king, kingWalk, kingDie;
let kingDead = false;

modelLoader.load("models/King by Quaternius.glb", (gltf)=> {
    king = gltf.scene;
    king.position.set(0, 0, -5);
    king.scale.set(4, 4, 4);
    king.rotation.y = Math.PI * 0.5;

    scene.add(king);

    kingMixer = new THREE.AnimationMixer(king);
    kingDie = kingMixer.clipAction(gltf.animations[0]);
    kingDie.loop = THREE.LoopOnce;
    kingDie.clampWhenFinished = true;
    kingWalk = kingMixer.clipAction(gltf.animations[22]);
    kingWalk.play();
});

const kingBox = new THREE.Box3();

// ----------------------------------------------------
// Player Character
// ----------------------------------------------------
let playerSpeed = 0.1;
let playerMixer, player, playerIdle, playerWalk;

modelLoader.load("models/Hooded Adventurer by Quaternius.glb", (gltf)=> {
    player = gltf.scene;
    player.position.set(0, 0, 5);
    player.scale.set(4, 4, 4);

    scene.add(player);

    playerMixer = new THREE.AnimationMixer(player);
    playerIdle = playerMixer.clipAction(gltf.animations[4]);
    playerWalk = playerMixer.clipAction(gltf.animations[22]);
    playerIdle.play();
});

const playerBox = new THREE.Box3();

// ----------------------------------------------------
// Ambient Light
// ----------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xeeeeee,
    1
);

scene.add(ambientLight);

// ----------------------------------------------------
// Directional Light
// ----------------------------------------------------
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

const raycaster = new THREE.Raycaster();

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

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    playerWalk.stop();
    playerIdle.play();
});

// ----------------------------------------------------
// Animation Loop
// ----------------------------------------------------
function animate() {

    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (kingMixer) {
        kingMixer.update(delta);
    }
    if (playerMixer) {
        playerMixer.update(delta);
    }

    king.position.x += 0.07 * kingDirection;
    if (king.position.x > 20 || king.position.x < -20) {
        kingDirection *= -1;
        king.rotation.y += Math.PI;
    }

    kingBox.min.set(king.position.x - 1.75, 0, king.position.z - 1.75);
    kingBox.max.set(king.position.x + 1.75, king.position.y + 7.4, king.position.z + 1.75);

    playerBox.min.set(player.position.x - 1.75, 0, player.position.z - 1.75);
    playerBox.max.set(player.position.x + 1.75, player.position.y + 7.4, player.position.z + 1.75);

    let intersected = false;
    obstacles.forEach((obstacle) => {
        const obstacleBox = new THREE.Box3();

        obstacleBox.setFromObject(obstacle);

        if (!intersected) {
            intersected = playerBox.intersectsBox(obstacleBox);
        }
    });

    if (playerBox.intersectsBox(kingBox)) {
        kingDirection = 0;
        kingWalk.stop();
        kingDie.play();
        kingDead = true;
    }

    // Movement checks
    if(keys["ArrowUp"] || keys["w"]) {
        playerIdle.stop();
        playerWalk.play();
        
        if (!intersected && player.position.z > -7) {
            player.position.z -= playerSpeed;
        } else {
            player.position.z += playerSpeed * 10;
        }
        player.rotation.y = Math.PI;
    }
    if(keys["ArrowDown"] || keys["s"]) {
        playerIdle.stop();
        playerWalk.play();

        if (!intersected && player.position.z < 23) {
            player.position.z += playerSpeed;
        } else {
            player.position.z -= playerSpeed * 10;
        }
        player.rotation.y = 0;
    }
    if(keys["ArrowLeft"] || keys["a"]) {
        playerIdle.stop();
        playerWalk.play();
        
        if (!intersected && player.position.x > -23) {
            player.position.x -= playerSpeed;
        } else {
            player.position.x += playerSpeed * 10;
        }
        player.rotation.y = Math.PI * 1.5;
    }
    if(keys["ArrowRight"] || keys["d"]) {
        playerIdle.stop();
        playerWalk.play();

        if (!intersected && player.position.x < 23) {
            player.position.x += playerSpeed;
        } else {
            player.position.x -= playerSpeed * 10;
        }
        player.rotation.y = Math.PI * 0.5;
    }
    
    // Coin interaction check
    if (keys["e"]) {
        const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(player.quaternion);

        const hits = castRay(player.position, direction, coins);

        if (hits.length > 0)
        {
            scene.background = new THREE.Color(0x00ff00);
        } else {
            scene.background = new THREE.Color(0x0000ff);
        }
    }

    controls.update();

    renderer.render(scene, camera);
}

const rayLineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
let rayLine;

function castRay(origin, direction, objects) {
    origin = origin.clone();
    origin.y = 4.5;

    raycaster.set(origin, direction);
    const hits = raycaster.intersectObjects(objects, true);
    const end = hits[0]?.point ?? origin.clone().addScaledVector(direction, 100);

    if (rayLine) {
        scene.remove(rayLine);
        rayLine.geometry.dispose();
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([origin, end]);
    rayLine = new THREE.Line(geometry, rayLineMaterial);
    scene.add(rayLine);

    return hits;
}

animate();
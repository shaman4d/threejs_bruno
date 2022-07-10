import './style.css'
import * as THREE from 'three'

console.log("Hello webpack!");

//  scene
const scene = new THREE.Scene();

//  object
const geom = new THREE.BoxGeometry(1, 1, 1);
const mtl = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geom, mtl);
scene.add(mesh);

const sizes = {
    width: 800, height: 600
}

//  camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//  renderer
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('.webgl')});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
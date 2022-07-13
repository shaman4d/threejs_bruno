import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

console.log('Lesson 9');

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Box
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

// Buffered box
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)


// const geometry = new THREE.Geometry();

/** single triangle
 geometry.vertices.push(new THREE.Vector3(0,0,0));
 geometry.vertices.push(new THREE.Vector3(0,1,0));
 geometry.vertices.push(new THREE.Vector3(1,0,0));
 geometry.faces.push(new THREE.Face3(0,1,2));
 */

/** tris cloud
 for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 3; j++) {
        geometry.vertices.push(
            new THREE.Vector3(
                (Math.random() - .5) * 3,
                (Math.random() - .5) * 3,
                (Math.random() - .5) * 3
            ));
    }
    geometry.faces.push(new THREE.Face3(i * 3, i * 3 + 1, i * 3 + 2));
}
 */

/** custom buffered tris
const positions = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionsAttr = new THREE.BufferAttribute(positions, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttr);
 */

// cloud of buffered tris
const trisNumber = 500;
const vertNumber = trisNumber * 3 * 3;
const positions = new Float32Array(vertNumber);
for (let i = 0; i < vertNumber; i++) {
	positions[i] = (Math.random() - .5) * 2;
}
const positionsAttr = new THREE.BufferAttribute(positions, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttr);

// Material
const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	// wireframe: true
})

//
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
	width: window.innerWidth, height: window.innerHeight
}

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
	const elapsedTime = clock.getElapsedTime()

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

tick()
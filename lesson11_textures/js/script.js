import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

console.log('Lesson 11');

// screen
const screen = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const cursor = {
	x: 0,
	y: 0,
};

// JS way to load texture
/*
const img = new Image();
const txx = new THREE.Texture(img);
img.src = './images/textures/door/color.jpg';
img.addEventListener('load', () =>
{
	console.log('img loaded');
	txx.needsUpdate = true;
});
 */

const loadManager = new THREE.LoadingManager(
	(e)=>{
		// console.log('onLoad:',e);
		console.log('onLoad');
	},
	(e)=>{
		console.log('onProgress:',e);
	},
	(e)=>{
		console.log('onError:',e);
	},

)

const textureLoader = new THREE.TextureLoader(loadManager);
const txxAlpha= textureLoader.load('./images/textures/door/alpha.jpg');
const txxAO = textureLoader.load('./images/textures/door/ambientOcclusion.jpg');
const txxColor = textureLoader.load('./images/textures/checkerboard-8x8.png');
// const txxColor = textureLoader.load('./images/textures/door/color.jpg');
const txxHeight = textureLoader.load('./images/textures/door/height.jpg');
const txxMetal = textureLoader.load('./images/textures/door/metalness.jpg');
const txxNormal = textureLoader.load('./images/textures/door/normal.jpg');
const txxRough = textureLoader.load('./images/textures/door/roughness.jpg');

// txxColor.minFilter = THREE.NearestFilter;
txxColor.magFilter = THREE.NearestFilter;



window.addEventListener('mousemove', (e) =>
{
	cursor.x = e.clientX / screen.width * 2 - 1;
	cursor.y = e.clientY / screen.height * 2 - 1;
});

window.addEventListener('dblclick', () =>
{
	const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
	if (!fullscreenElement)
	{

		if (canvas.requestFullscreen)
			canvas.requestFullscreen();
		else if (canvas.webkitRequestFullscreen)
			canvas.webkitRequestFullscreen();
	}
	else
		document.exitFullscreen();
});

window.addEventListener('resize', (e) =>
{
	screen.width = window.innerWidth;
	screen.height = window.innerHeight;

	cam.aspect = screen.width / screen.height;
	cam.updateProjectionMatrix();

	renderer.setSize(screen.width, screen.height);
});

// scene
const scene = new THREE.Scene();

// cube
const redCube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshBasicMaterial({map: txxColor}));
scene.add(redCube);

const axesHelper = new THREE.AxesHelper(.5);
scene.add(axesHelper);

// camera
const aspectRatio = screen.width / screen.height;
const cam = new THREE.PerspectiveCamera(75, screen.width / screen.height, .1, 30);
cam.position.z = 2;
cam.lookAt(redCube.position);
scene.add(cam);


const canvas = document.querySelector('.webgl');
// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	// antialias: true,
});

const controls = new OrbitControls(cam, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


renderer.setSize(screen.width, screen.height);

const tick = (time) =>
{

	// for dumping!
	controls.update();

	renderer.render(scene, cam);

	requestAnimationFrame(tick);
};

tick();



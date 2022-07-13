import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';

console.log('Lesson 8');

// settings
const settings = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const cursor = {
	x: 0,
	y: 0,
};


window.addEventListener('mousemove', (e) =>
{
	cursor.x = e.clientX / settings.width * 2 - 1;
	cursor.y = e.clientY / settings.height * 2 - 1;
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
	settings.width = window.innerWidth;
	settings.height = window.innerHeight;

	cam.aspect = settings.width / settings.height;
	cam.updateProjectionMatrix();

	renderer.setSize(settings.width, settings.height);
	//renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); // for macOS/iOS and other hi-res screens
});

// scene
const scene = new THREE.Scene();

// cube
const redCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: '#ff0000'}));
scene.add(redCube);

const axesHelper = new THREE.AxesHelper(.5);
scene.add(axesHelper);

// camera
const aspectRatio = settings.width / settings.height;
const cam = new THREE.PerspectiveCamera(75, settings.width / settings.height, .1, 30);
// const cam = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 20);
// cam.position.x = 2;
// cam.position.y = 2;
cam.position.z = 2;
cam.lookAt(redCube.position);
scene.add(cam);


const canvas = document.querySelector('.webgl');
// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

const controls = new OrbitControls(cam, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


renderer.setSize(settings.width, settings.height);
//renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); // for macOS/iOS and other hi-res screens

const tick = (time) =>
{
	// cam.position.x = Math.sin(cursor.x * Math.PI * 1)*3;
	// cam.position.z = Math.cos(cursor.x * Math.PI * 1)*3;
	// cam.position.y = cursor.y *5;
	// cam.lookAt(redCube.position);

	// for dumping!
	controls.update();

	renderer.render(scene, cam);

	requestAnimationFrame(tick);
};

tick();



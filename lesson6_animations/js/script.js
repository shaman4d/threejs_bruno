console.log('Lesson 6');

// settings
const settings = {
	width: 800,
	height: 600,
};


// scene
const scene = new THREE.Scene();

// cube
const redCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: '#ff0000'}));
scene.add(redCube);

const axesHelper = new THREE.AxesHelper(.5);
scene.add(axesHelper);

// camera
const cam = new THREE.PerspectiveCamera(75, settings.width / settings.height);
cam.position.z = 3;
scene.add(cam);

// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('.webgl'),
});

renderer.setSize(settings.width, settings.height);


gsap.to(redCube.position,{duration:1, delay:0, x:2, repeat:-1, yoyo:true, ease:Quad.easeInOut})
// gsap.to(redCube.position,{duration:1, delay:1, x:-2})
// gsap.to(redCube.position,{duration:1, delay:2, x:0})

// const clock = new THREE.Clock();

const tick = (time) =>
{
	// redCube.rotation.x += 0.01;
	// redCube.rotation.z += 0.01;
	//
	// redCube.position.y = Math.cos(time/1000)*2;
	// redCube.position.x = Math.sin(time/1000)*2;

	/*
	const ETA = clock.getElapsedTime(); // in seconds
	redCube.position.y = Math.cos(ETA)*2;
	redCube.position.x = Math.sin(ETA)*2;
	 */
	// cam.lookAt(redCube.position);

	renderer.render(scene, cam);

	requestAnimationFrame(tick);
};

tick();



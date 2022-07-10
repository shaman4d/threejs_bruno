console.log('Lesson 5');

// settings
const settings = {
	width: 800,
	height: 600,
};


// scene
const scene = new THREE.Scene();

// cube
/*
const geomRedCube = new THREE.BoxGeometry(1, 1, 1);
const mtlRedCube = new THREE.MeshBasicMaterial({color: '#ff0000'});
const mshRedCube = new THREE.Mesh(geomRedCube, mtlRedCube);
mshRedCube.position.set(0.7, -0.6, 0.3);
mshRedCube.scale.set(2, 0.1, .5);

mshRedCube.rotation.reorder('YXZ');
mshRedCube.rotation.x = 0.5;
mshRedCube.rotation.y = 0.75;
mshRedCube.rotation.z = 0.75;
scene.add(mshRedCube);
 */

// several cubes
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: '#ff0000'}));
cube1.position.x = -1.5;
group.add(cube1);
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: '#00ff00'}));
group.add(cube2);
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: '#0000ff'}));
cube3.position.x = 1.5;
group.add(cube3);

group.position.y = 1.75;
group.position.x = 0.75;
group.rotation.y = 0.5;
group.rotation.z = 0.5;


const axesHelper = new THREE.AxesHelper(.5);
scene.add(axesHelper);


// camera
const cam = new THREE.PerspectiveCamera(75, settings.width / settings.height);
cam.position.z = 3;
cam.position.y = 0.5;
cam.position.x = 0;
scene.add(cam);

// look at Cube
// cam.lookAt(mshRedCube.position);
cam.lookAt(group.position);


// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('.webgl'),
});

renderer.setSize(settings.width, settings.height);
renderer.render(scene, cam);


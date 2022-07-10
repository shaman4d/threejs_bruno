console.log('Lesson 3');

// settings
const settings ={
	width:800,
	height:600,
};


// scene
const scene = new THREE.Scene();

// cube
const geomRedCube= new THREE.BoxGeometry(1,1,1);
const mtlRedCube = new THREE.MeshBasicMaterial({color:"#ff0000"});
const mshRedCube = new THREE.Mesh(geomRedCube,mtlRedCube);
scene.add(mshRedCube);

// camera
const cam = new THREE.PerspectiveCamera(75, settings.width/settings.height);
cam.position.z = 3;
cam.position.x = 1;
scene.add(cam);


// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('.webgl')
});

renderer.setSize(settings.width, settings.height);
renderer.render(scene,cam);


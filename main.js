//Star Project
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 90, 100)

//Axis 
const Axis = new THREE.AxesHelper(50);
scene.add(Axis);


//Stars
function addStar()
{
	const StarGeometry = new THREE.SphereGeometry(0.25, 24, 24);
	const StarMaterial = new THREE.MeshStandardMaterial( {color: 'White'} );
	const Star = new THREE.Mesh(StarGeometry, StarMaterial);

	const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2000));

	Star.position.set(x, y, z)
	scene.add(Star)
}
Array(1000).fill().forEach(addStar)


//Lights 
const AmbientLight = new THREE.AmbientLight(0x404040, 10); //white light
scene.add(AmbientLight);

const PointLight = new THREE.PointLight('white', 100, 100);
const pointLightHelper = new THREE.PointLightHelper( PointLight, 1 );
PointLight.position.set(0, 10, 60);
scene.add(pointLightHelper);

//Gridhelper
const gridHelper = new THREE.GridHelper(1000, 100);
scene.add( gridHelper );

//Tatoo 1 
const sungeometry = new THREE.SphereGeometry(30, 32, 16);
const sunmaterial = new THREE.MeshLambertMaterial( { emissive: 'Orange'} );
const Sun = new THREE.Mesh( sungeometry, sunmaterial );
scene.add(Sun);
Sun.position.set(100, 50, -500);

//Tatoo 2
const Sungeometry2 = new THREE.SphereGeometry(30, 32, 16);
const Sunmaterial2 = new THREE.MeshLambertMaterial( { emissive: 'Yellow'} );
const Sun2 = new THREE.Mesh( Sungeometry2, Sunmaterial2 );
scene.add(Sun2);
Sun2.position.set(0, 200, -500)

//Tatooine
const TatooineTexture = new THREE.TextureLoader().load('Tatooine Texture.jpg');
const TatooineNormal = new THREE.TextureLoader().load('Tatooine Normal Map.jpg');
const Tatooine = new THREE.Mesh(
	new THREE.SphereGeometry(20, 32, 16),
	new THREE.MeshStandardMaterial( {
		map: TatooineTexture, 
		normalMap: TatooineNormal} )
);	
scene.add(Tatooine);
Tatooine.position.set(0, 50, -300);

//Ohann
const OhannTexture = new THREE.TextureLoader().load('Ohann Texture.png');
const Ohann = new THREE.Mesh(
	new THREE.SphereGeometry(50, 32, 16),
	new THREE.MeshStandardMaterial( {
		map: OhannTexture
	} )
);	
scene.add(Ohann);
Ohann.position.set(300, 50, -200);

//Adriana 
const AdrianaTexture = new THREE.TextureLoader().load('Adriana Texture.png');
const Adriana = new THREE.Mesh(
	new THREE.SphereGeometry(50, 32, 16),
	new THREE.MeshStandardMaterial( {
		map: AdrianaTexture
	} )
);	
scene.add(Adriana);
Adriana.position.set(0, 50, 400);


controls.update();

function animate() {

	Adriana.rotation.y += 0.01
	Ohann.rotation.y += 0.01
	Tatooine.rotation.y += 0.01
	Sun.rotation.y += 0.01
	Sun2.rotation.y += 0.01
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
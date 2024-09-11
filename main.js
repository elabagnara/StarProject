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

//Lights 
const AmbientLight = new THREE.AmbientLight(0x404040, 9); //white light
scene.add(AmbientLight);

const PointLight = new THREE.PointLight('white', 100, 100);
const pointLightHelper = new THREE.PointLightHelper( PointLight, 1 );
PointLight.position.set(0, 10, 60);
scene.add(pointLightHelper);

//Gridhelper
const gridHelper = new THREE.GridHelper(200, 50);
scene.add( gridHelper );

//Tatoo 1 
const sungeometry = new THREE.SphereGeometry(15, 32, 16);
const sunmaterial = new THREE.MeshLambertMaterial( { emissive: 'Orange'} );
const Sun = new THREE.Mesh( sungeometry, sunmaterial );
scene.add(Sun);
Sun.position.set(0, 20, 0);

//Tatoo 2
const Sungeometry2 = new THREE.SphereGeometry(15, 32, 16);
const Sunmaterial2 = new THREE.MeshLambertMaterial( { emissive: 'Yellow'} );
const Sun2 = new THREE.Mesh( Sungeometry2, Sunmaterial2 );
scene.add(Sun2);
Sun2.position.set(-40, 60, 0)

//Tatooine
const TatooineTexture = new THREE.TextureLoader().load('Tatooine Texture.jpg');
const TatooineNormal = new THREE.TextureLoader().load('Tatooine Normal Map.jpg');
const Tatooine = new THREE.Mesh(
	new THREE.SphereGeometry(6, 32, 16),
	new THREE.MeshStandardMaterial( {
		map: TatooineTexture, 
		normalMap: TatooineNormal} )
);	
scene.add(Tatooine);
Tatooine.position.set(0, 20, 30);

//Ghomrassen 



controls.update();

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
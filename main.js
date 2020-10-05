import * as THREE from "./node_modules/three/build/three.module.js";
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xe5e5e5 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var xAxisMaterial = new THREE.LineBasicMaterial( {color: 0xff0000});
var yAxisMaterial = new THREE.LineBasicMaterial( {color: 0x00ff00});
var zAxisMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff});

var xAxisPoints = [new THREE.Vector3(-5000, 0, 0), new THREE.Vector3(5000, 0, 0)];
var yAxisPoints = [new THREE.Vector3(0, -5000, 0), new THREE.Vector3(0, 5000, 0)];
var zAxisPoints = [new THREE.Vector3(0, 0, -5000), new THREE.Vector3(0, 0, 5000)];

var xAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(xAxisPoints), xAxisMaterial);
var yAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(yAxisPoints), yAxisMaterial);
var zAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(zAxisPoints), zAxisMaterial);

scene.add(xAxis);
scene.add(yAxis);
scene.add(zAxis);

var controls = new TrackballControls( camera, renderer.domElement);
camera.position.set(5, 5, 50);
controls.update();

function animate() {
  requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}
animate();
import * as THREE from ".././node_modules/three/build/three.module.js";
import { TrackballControls } from '.././node_modules/three/examples/jsm/controls/TrackballControls.js';
import { Controls } from './controls.js';

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xe5e5e5 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(createGrid(100, 1));
scene.add(createOrigin());

// var controls = new TrackballControls( camera, renderer.domElement);
var controls = new Controls(renderer.domElement);
camera.position.set(5, 5, 50);
controls.update();

function render() {
  requestAnimationFrame( render );
  controls.update();
	renderer.render( scene, camera );
}
render();

function createOrigin() {
  let xAxisMaterial = new THREE.LineBasicMaterial( {color: 0xff0000});
  let yAxisMaterial = new THREE.LineBasicMaterial( {color: 0x00ff00});
  let zAxisMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff});

  let xAxisPoints = [new THREE.Vector3(-1000, 0, 0), new THREE.Vector3(1000, 0, 0)];
  let yAxisPoints = [new THREE.Vector3(0, -1000, 0), new THREE.Vector3(0, 1000, 0)];
  let zAxisPoints = [new THREE.Vector3(0, 0, -1000), new THREE.Vector3(0, 0, 1000)];

  let xAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(xAxisPoints), xAxisMaterial);
  let yAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(yAxisPoints), yAxisMaterial);
  let zAxis = new THREE.Line( new THREE.BufferGeometry().setFromPoints(zAxisPoints), zAxisMaterial);

  let origin = new THREE.Group();
  origin.add(xAxis);
  origin.add(yAxis);
  origin.add(zAxis);
  origin.matrixAutoUpdate = false;
  origin.updateMatrix();
  
  return origin;
}

function createGrid(size, step) {
  let gridMaterial = new THREE.LineBasicMaterial( {color: 0xfefefe });
  let points = [];
  for(let i = -size; i <= size; i += step) {
    if(i === 0) continue;
    points.push(new THREE.Vector3(i, 0, -size));
    points.push(new THREE.Vector3(i, 0, size));
    points.push(new THREE.Vector3(-size, 0, i));
    points.push(new THREE.Vector3(size, 0, i));
  }
  let gridGeometry = new THREE.BufferGeometry().setFromPoints(points);
  let grid = new THREE.LineSegments( gridGeometry, gridMaterial);
  grid.matrixAutoUpdate = false;
  grid.updateMatrix();

  return grid;
}
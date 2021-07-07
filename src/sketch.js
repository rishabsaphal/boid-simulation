
/**
 * @file sketch.js is the root file of the project
 * 
 * @author Rishab Saphal 2019A7PS0089H            
 * @author Anandapadmanabhan S  2019A7PS0116H
 * @see <a href="https://www.red3d.com/cwr/boids/">Boids ( FLocks,Herds,Schools: a Distributed Behavioural Model)</a>
 * @see <a href="https://dl.acm.org/doi/10.1145/37401.37406">Flocks, herds and schools: A distributed behavioral model. SIGGRAPH '87</a>
 */ 
 /**
 * Flock array containing all boid elements
 * @type {Array}
 * */
const flock=[];

/**Defining depth of the 3D structure
 * @type {number}
 */
let depth=500;
let gap=300;
//let unitX,unitY,unitZ;

/**
 * Declaring slider for alignment 
 */
let alignSlider;
/**
 * Declaring slider for cohesion
 */
let cohesionSlider;
/**
 * Declaring slider for separation
 */
let separationSlider;
/** */

/**
 * @property {function} setup Initialize slider values , camera position and create boids
 *  */
function setup(){
    createCanvas(800,800,WEBGL);
    alignSlider=createSlider(0,5,1,0.1);
    cohesionSlider=createSlider(0,5,1,0.1);
    separationSlider=createSlider(0,5,1,0.1);

    let cameraX = 630 / 600 * width;
  let cameraY = 140 / 500 * height;
  let cameraZ = -400 / 500 * depth;
  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 0, 1);

    for(let i=0;i<200;i++){
     flock.push(new Boid());   
    }
}

/**
 * @property {function} draw Draw background , intializes lighting ,orbital control and calls functions from boid.js
 */
function draw(){

    background(40);
    directionalLight(150, 150, 150, 1, 1, 0);
  ambientLight(150);
  orbitControl();
/*
  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  pop();

  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  //cylinder(70, 70);
  pop();

  translate(240, 0, 0);

  //scale(1,0.5,0.5);
  push();
  fill (255,204,0);
  //rotateZ(frameCount * 0.01);
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  box(70, 70, 70);

  pop();*/


    for(let boid of flock){
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
    
}
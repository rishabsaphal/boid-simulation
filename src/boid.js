/**
 * Class to create properties of a Boid
 */
class Boid{
    constructor(){
/**
 * @property {Vector} position Position vector of the boid
 * 
 */
        this.position= createVector(random(width),random(height),0);
        /**
         * @property {Vector} velocity Velocity vector of the boid
         */
        this.velocity=p5.Vector.random3D();
        this.velocity.setMag(random(0.5,3));
        /**
         * @property {Vector} acceleration Acceleration vector of the boid
         */
        this.acceleration=createVector(0,0,0);    
        this.maxForce=0.1; 
        this.maxSpeed=5; 
        
    }
/**
 * @property {function} edges Reverts boids back to the screen when they approach edges
 * @returns {void}
 */
    edges(){
        if(this.position.x > width/2 + gap){
            this.position.x-=width+1.7 * gap;
        }else if(this.position.x<-(width/2 + gap)){
            this.position.x+=width+1.7 * gap;
        }
        if(this.position.y > height/2 + gap){
            this.position.y-=height + 1.7 *gap;
        }else if(this.position.y<-(height/2 + gap)){
            this.position.y+=height + 1.7 *gap;
        }
     
    }
/**
 * @property {function} align Steer towards the average heading of local flockmates 
 * @param {Object} boids 
 * @returns avg
 */
    align(boids){
        let perceptionRadius=100;
        let avg=createVector();
        let total=0;
        for(let other of boids){
            let d=dist(this.position.x,this.position.y,this.position.z,other.position.x,other.position.y,other.position.z);
            if(other !=this && d<perceptionRadius){
                avg.add(other.velocity);
                total++;
            }
        }
        if(total>0){
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            
        }
        return avg;
    }
/**
 * @property {function} cohesion Steer to move toward the average position of local flockmates  
 * @param {Object} boids 
 * @returns avg
 */
   cohesion(boids){
        let perceptionRadius=100;
        let avg=createVector();
        let total=0;
        for(let other of boids){
            let d=dist(this.position.x,this.position.y,this.position.z,other.position.x,other.position.y,other.position.z);
            if(other !=this && d<perceptionRadius){
                avg.add(other.position);
                total++;
            }
        }
        if(total>0){
            avg.div(total);
            avg.sub(this.position);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            
        }
        return avg;
    }
/**
 * @property {function} separation Steer to avoid crowding local flockmates   
 * @param {Object} boids 
 * @returns avg
 */
    separation(boids){
        let perceptionRadius=50;
        let avg=createVector();
        let total=0;
        for(let other of boids){
            let d=dist(this.position.x,this.position.y,this.position.z,other.position.x,other.position.y,other.position.z);

            if(other !=this && d<perceptionRadius){
                let diff=p5.Vector.sub(this.position,other.position);
                diff.div(d);
                avg.add(diff);
                total++;
            }
        }
        if(total>0){
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            
        }
        return avg;
    }
/**
 * @property {function} flock Updates values of alignment,cohesion,separation in the sliders 
 * @param {Object} boids 
 * @returns avg
 */
    flock(boids){
        let alignment =this.align(boids);
        let cohesion=this.cohesion(boids);
        let separation=this.separation(boids);
       // let fleepredator=this.flee(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        //fleepredator.mult(10);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        //this.acceleration.add(fleepredator);
/**
 * Provides a force to the boids so that they remain in the z axis
 */
        if (this.position.z < -depth/8 || this.position.z > depth/8) {
            let force = createVector(0, 0, -this.position.z / depth * this.maxForce * 2);
            this.acceleration.add(force);
          }

          
    }
    /*seek(target){
        let desired =  p5.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);
        desired.sub(this.velocity);
        desired.limit(this.maxForce);
        return desired;
    }

    flee(boids){
        let flee = createVector();
        let total = 0;
        for(let other of boids){
          //let other = boid.userData;
          if(other!= this && other.id == 'predator'){
            flee.add(other.position);
            total++
          }
        }
        if(total > 0){
          let des = this.seek(flee);
          des.mult(-1);
          return des;
        }else{
          return createVector(0,0);
        }
      }
    */
   /**
    * @property {function} update Updates values of position,velocity and acceleration
    */
    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
       // this.velocity.mult(0.999);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    /**
     * @property {function} show Creates 3D cone as the boid model with ambient material and lighting.Cones point to the direction of velocity of motion.
     */
   show(){
    /*let theta = this.velocity.heading() + PI/2;
    let r = 2;
    fill('blue');
    stroke(255,204,0);  
    strokeWeight(2); 
    //noStroke();
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);
    pop();*/


       /*strokeWeight(2);
       stroke(255);
       //line(this.position.x,this.position.y, this.position.x - 8*this.velocity.x,this.position.y - 8*this.velocity.y);
       strokeWeight(12);
       point(this.position.x,this.position.y);*/
       let theta = this.velocity.heading() + 3*PI/2;
       noStroke();
       fill(255);
       ambientMaterial(255,floor(random(50,120)),floor(random(50,120)));
       push();
       translate(this.position.x,this.position.y,this.position.z);
       //sphere(10);
       //rotate(PI);
       rotate(theta);
       cone(5,15);
       //let arrow=createVector(this.velocity.x,this.velocity.y,this.velocity.z).setMag(10);
       //translate(arrow.x,arrow.y,arrow.z);
       //sphere(5);
       pop();
       
   } 
}

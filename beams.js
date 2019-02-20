//giving the beams their functions
var Beam = function(position){
  //speed, acceleration and position variables
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(5, 10), random(-0.5, 0.5));
  this.position = createVector(random(-25, -15), random(200, 10000));
  this.lifespan = 255;
};
//to run the beams
Beam.prototype.run = function() {
  this.update();
  this.display();
};


//updating(acceleration, lifespan etc.)
Beam.prototype.update = function() {
  //position and velocity adding together to move
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  if(this.position.x > 600){
    this.lifespan -= 100;
  }
};

// drawing the beams and sparkles
Beam.prototype.display = function() {
  noStroke();
  //the beams
  fill(255, 247, 20);
  rect(this.position.x, this.position.y, 15, 1);
};

//check if the straal nog steeds leeft
Beam.prototype.isDead = function(){
  return this.lifespan < 0;
};

//checking if the beam is inside a particle
/*Beam.prototype.isInside = function(){
 this.position.x > Particle.position.x-6 && this.position.x < dropX+dropWidth/2 && this.position.y > dropY-dropHeight/2 && this.position.y < dropY+dropHeight/2
};*/

//making a system of beams
var BeamSystem = function(position) {
  this.origin = position.copy();
  this.beams = [];
};

//making new beams
BeamSystem.prototype.addBeam = function() {
  this.beams.push(new Beam(this.origin));
};

//making all the beams exist and function
BeamSystem.prototype.run = function() {
  this.addBeam();
  for (var i = this.beams.length-1; i > 0; i--) {
    var p = this.beams[i];
    p.run();
    if (p.isDead()) {
      //removing the beams from the array
      this.beams.splice(i, 1);
    }
  }

};

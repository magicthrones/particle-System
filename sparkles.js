//giving the sparkles their functions
var Sparkle = function(position){
  //speed, acceleration and position variables
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(4, random(-1.5, 1.5));
  this.position = position.copy();
  this.lifespan = 255;
};

//running the sparkles
Sparkle.prototype.run = function() {
  this.update();
  this.display();
};

//updating(acceleration, lifespan etc.)
Sparkle.prototype.update = function() {
  //position and velocity adding together to move
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  //decreasing the lifespan
  this.lifespan -= 10;
};

// drawing the sparkles
Sparkle.prototype.display = function() {
  for(var l = 0; l < 1; l++){
    fill(230, 247, 20, this.lifespan);
    triangle(this.position.x, this.position.y, this.position.x+10, this.position.y, this.position.x+5, this.position.y-7.5);
    triangle(this.position.x, this.position.y-5, this.position.x+5, this.position.y+2.5, this.position.x+10, this.position.y-5);
  }
};

//check if the straal nog steeds leeft
Sparkle.prototype.isDead = function(){
  return this.lifespan < 0;
};

//making a system of sparkles
var SparkSystem = function(position) {
  this.origin = position.copy();
  this.sparkles = [];
};

//making new sparkles
SparkSystem.prototype.addSpark = function() {
  if(this.sparkles.length < 20){
  this.sparkles.push(new Sparkle(this.origin));
  }
};

//making all the sparkles exist and function
SparkSystem.prototype.run = function() {
  this.addSpark();
  for (var i = this.sparkles.length-1; i > 0; i--) {
    var p = this.sparkles[i];
    p.run();
    if (p.isDead()) {
      //removing the sparkles from the array
      this.sparkles.splice(i, 1);
    }
  }
};

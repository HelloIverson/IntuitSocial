//Color values
//Blue - 28, 66, 255
//Red  - 242, 29, 22

//These are base values that should stay unchanged
let bluePlayer;
let bluePointVectors;
let blueDead;

let pointVectors;
let keysPressed;

let upVector;
let toMouse;
let angle;

let testosterones;
let bullets;
let secondsPassed;
let framesSinceStart;
//These are values that impact movement; can be changed
let frictionForce;
let SpeedUp;
let maxSpeedUp;
let turnSpeed;
let brakeSpeed;



function setup() {
  //Testing
  upVector = createVector(0, -50);

  //Value Assignment
  blueDead = false;
  framesSinceStart = 0;
  secondsPassed = 0;

  //List of key presses
  keysPressed = []; //a, d, w, s

  //Point vectors
  pointVectors = [];
  pointVectors[0] = createVector(0, -10);
  pointVectors[1] = createVector(-8, 8);
  pointVectors[2] = createVector(0, 2);
  pointVectors[3] = createVector(8, 8);

  bluePointVectors = [];
  bluePointVectors[0] = createVector(0, -10);
  bluePointVectors[1] = createVector(-8, 8);
  bluePointVectors[2] = createVector(0, 2);
  bluePointVectors[3] = createVector(8, 8);

  //Size
  createCanvas(1200, 780);
  //createCanvas(2400, 1200);

  //Setup for objects
  bluePlayer = new player(createVector(600, 600), "blue");
  testosterones = [];
  bullets = [];

  //Movement Settings
  maxSpeed = 5;
  maxSpeedUp = 0.2;
  frictionForce = 0.025;
  turnSpeed = 0.05;
  brakeSpeed = 0.05;
}



function draw() {
  drawBackground();

  angle = upVector.angleBetween(bluePlayer.direction);

  if (bluePlayer.health > 0) {
    bluePlayer.rotate(false);
    bluePlayer.show();
    bluePlayer.moveAccelerate();
    bluePlayer.moveFriction();
    bluePlayer.moveUpdate();
    bluePlayer.moveConstrain();
    bluePlayer.moveDash();
  } else {
    blueDead = true;
  }

  for (let i=testosterones.length-1; i>-1; i--) {
    let sterones = testosterones[i];

    if (bluePlayer.health > 0) {
      bluePlayer.damageDetect(sterones);
    }

    sterones.show();
    sterones.move();
    sterones.bounce(false);
    for (let j=bullets.length-1; j>-1; j++) {
      if (dist(bullets[j].position.x, bullets[j].position.y, sterones.position.x, sterones.position.x) <= 10) {
        bullets.splice(j, 1);
        sterones.velocity.x *= 0.5;
        sterones.velocity.y *= 0.5;
      }
    }
    
    // if (sterones.magnitude <= 4) {
    //   testosterones.splice(i,1);
    // }
  }

  for (let i = bullets.length - 1; i > -1; i--) {
    bul = bullets[i];
    if (bul.position.x < -5 || bul.position.x > width + 5 || bul.position.y < -5 || bul.position.y > height + 5) {
      bullets.splice(i, 1);
    }
    bul.show();
    bul.move();
  }

  for (let i = 0; i < bluePlayer.health; i++) {
    let y = 25;
    let x = 55 * i + 35;
    noStroke();
    fill(28, 66, 255);
    triangle(x, y, x - 20, y, x - 10, y - 10);
    triangle(x, y, x + 20, y, x + 10, y - 10);
    triangle(x - 20, y, x + 20, y, x, y + 20);
    noFill();
    strokeWeight(2)
    stroke(255);
    line(x, y + 20, x - 20, y);
    line(x, y + 20, x + 20, y);
    line(x - 20, y, x - 10, y - 10);
    line(x + 20, y, x + 10, y - 10);
    line(x, y, x - 10, y - 10);
    line(x, y, x + 10, y - 10);
  }

  if (bluePlayer.invulnerability == 180) {
    bluePlayer.damageYeet();
  }

  if (bluePlayer.health > 0) {
    bluePlayer.damageVulnerable();
  }

  //Add asteroids
  if (keysPressed[4] == true) {
    createAsteroid();
  }

  //Reset
  if (keysPressed[5] == true) {
    bullets = [];
    testosterones = [];
    bluePlayer = new player(createVector(600, 600), "blue");
    blueDead = false;
    framesSinceStart = 0;
    secondsPassed = 0;
  }

  //Shoot
  // if (keysPressed[6] == true && bluePlayer.bulletTimer == 0 && blueDead == false) {
  //   bullets.push(new bullet(bluePlayer.position.copy(), bluePlayer.direction.copy(), 15, "blue"));
  //   bluePlayer.bulletTimer = 10;
  // }

  //Seconds and Frames
  //if (testosterones.length != 0) {
  if (bluePlayer.invulnerability == 0) {
    framesSinceStart++;
  }
  if (blueDead != true) {
    secondsPassed = round(framesSinceStart / 60, 2);
  }
  //}

  //Seconds display
  textAlign(LEFT);
  textSize(30);
  fill(255);
  text(secondsPassed, (width / 2) - 50, 30);

  //Add asteroid after 5 seconds
  if (secondsPassed % 2 == 1) {
    createAsteroid();
  }

  if (bluePlayer.bulletTimer > 0) {
    bluePlayer.bulletTimer--;
  }
  
}
class asteroid {
  constructor(tempPosition, tempVelocity, tempSize) {
    this.position = tempPosition;
    this.velocity = tempVelocity;
    this.magnitude  = this.velocity.mag();
    this.size = tempSize;
  }
  
  show() {
    noFill();
    stroke(255);
    strokeWeight(3);
    ellipse(this.position.x, this.position.y, this.size*2, this.size*2);
  }
  
  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  
  bounce(randomVersion) {
    if (this.position.x < 100+this.size || this.position.x > width-100-this.size) {
      
      if (randomVersion) {
        this.velocity = p5.Vector.random2D();
      } else {
        this.velocity.x *= -1;
        this.velocity.add(p5.Vector.random2D());
        this.velocity.normalize();
        this.velocity.mult(this.magnitude);
        this.magnitude *= 0.9;
      }
      
      if (this.position.x < 100+this.size) {
        this.position.x = 100+this.size;
      } else {
        this.position.x = width-100-this.size;
      }
      
    }
    
    if (this.position.y < 100+this.size || this.position.y > height-100-this.size) {
      
      if (randomVersion) {
        this.velocity = p5.Vector.random2D();
      } else {
        this.velocity.y *= -1;
        this.velocity.add(p5.Vector.random2D());
        this.velocity.normalize();
        this.velocity.mult(this.magnitude);
        this.magnitude *= 0.9;
      }
      
      if (this.position.y < 100+this.size) {
        this.position.y = 100+this.size;
      } else {
        this.position.y = height-100-this.size;
      }
      
    }
  }
}
class bullet {
  constructor(tempPosition, tempDirection, tempSpeed, tempAllegiance) {
    this.position = tempPosition;
    this.direction = tempDirection;
    this.velocity = this.direction.copy();
    this.velocity.mult(tempSpeed);
    this.allegiance = tempAllegiance;
    this.lineDistance = this.direction.copy();
    this.lineDistance.mult(5);
  }
  
  show() {
    if (this.allegiance == "blue") {
      stroke(28, 66, 255);
    } else if (this.allegiance == "red") {
      stroke(242, 29, 22);
    }
    strokeWeight(2);
    line(this.position.x, this.position.y, this.position.x+this.lineDistance.x, this.position.y+this.lineDistance.y);
  }
  
  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
class player {
  constructor(tempPosition, tempAllegiance) {
    this.position = tempPosition;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.direction = createVector(0, -1);
    this.allegiance = tempAllegiance;
    this.health = 5;
    this.flashing = false;
    this.randomVector = p5.Vector.random2D();
    this.invulnerability = 0;
    this.modInvuln = 0;
    this.invulnTimer = 240;
    this.bulletTimer = 0;
    this.dashTimer = 0;
    this.dashBar = 300;
  }


  rotate() {
    for (let i = 0; i < bluePointVectors.length; i++) {
      bluePointVectors[i] = pointVectors[i].copy();
      bluePointVectors[i].rotate(angle);
    }
  }

  show() {
    if (this.allegiance == "blue") {
      fill(28, 66, 255);
    } else if (this.allegiance == "red") {
      fill(242, 29, 22);
    }
    if (this.invulnerability != 0) {
      if (this.invulnerability > 60) {
        this.modInvuln = (this.invulnerability % 10);
        this.flashing = false;
        for (let i = 0; i < 5; i++) {
          if (this.modInvuln == i) {
            this.flashing = true;
          }
        }
      } else {
        this.modInvuln = (this.invulnerability % 6);
        this.flashing = false;
        for (let i = 0; i < 3; i++) {
          if (this.modInvuln == i) {
            this.flashing = true;
          }
        }
      }
      if (this.flashing) {
        fill(255);
      }
    }

    triangle(
      this.position.x + bluePointVectors[0].x, this.position.y + bluePointVectors[0].y,
      this.position.x + bluePointVectors[1].x, this.position.y + bluePointVectors[1].y,
      this.position.x + bluePointVectors[2].x, this.position.y + bluePointVectors[2].y);
    triangle(
      this.position.x + bluePointVectors[0].x, this.position.y + bluePointVectors[0].y,
      this.position.x + bluePointVectors[3].x, this.position.y + bluePointVectors[3].y,
      this.position.x + bluePointVectors[2].x, this.position.y + bluePointVectors[2].y);
  }

  moveAccelerate() {
    this.acceleration = createVector(0, 0);
    if (keyIsPressed) {
      if (keysPressed[0] == true) {
        this.direction.rotate(-1 * turnSpeed);
      }
      if (keysPressed[1] == true) {
        this.direction.rotate(turnSpeed);
      }
      if (keysPressed[2] == true) {
        this.acceleration = this.direction.copy();
        this.acceleration.mult(maxSpeedUp);
      }
      if (keysPressed[3] == true) {
        this.velocity.mult(1 - brakeSpeed);
      }

    }
  }

  moveUpdate() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  moveConstrain() {
    if (this.velocity.mag() >= maxSpeed) {
      this.velocity.normalize();
      this.velocity.mult(maxSpeed);
    }

    if (this.position.x < 110 || this.position.x > width-110) {
      this.velocity.x *= -1;
      if (this.position.x < 110) {
        this.position.x = 110;
      } else {
        this.position.x = width-110;
      }
    }

    if (this.position.y < 110 || this.position.y > height - 110) {
      this.velocity.y *= -1;
      if (this.position.y < 110) {
        this.position.y = 110;
      } else {
        this.position.y = height - 110;
      }
    }
  }

  moveFriction() {
    if (keysPressed[2] == false) {
      this.tempTransferVector = this.velocity.copy();
      this.acceleration = this.tempTransferVector.mult(-1 * frictionForce);
    }
  }
  
  moveDash() {
    if (keysPressed[10] == true && this.dashTimer == 0) {
      textAlign(LEFT);
      text("Working", 30, height-40);
      this.direction.mult(100);
      this.position.add(this.direction);
      this.direction.mult(1/100);
      this.velocity.mult(0.4);
      this.dashTimer = 500;
    }
    if (this.dashTimer > 0) {
      this.dashTimer--;
    }
    this.dashBar = map(this.dashTimer, 0, 500, 300, 0);
    noStroke();
    fill(255);
    rect(0, height-50, 300, 50);
    fill(28, 66, 255);
    rect(0, height-50, this.dashBar, 50);
    stroke(0);
    strokeWeight(8);
    line(0, height-50, 300, height-50);
    line(300, height-50, 300, height);
  }

  damageDetect(meteor) {
    if ((this.position.dist(meteor.position) < 6 + meteor.size) && (this.invulnerability == 0)) {
      this.health -= 1;
      this.invulnerability = 240;
    }
  }

  damageYeet() {
    this.randomVector.mult(100);
    this.acceleration.add(this.randomVector);
  }

  damageVulnerable() {
    if (this.invulnerability > 0) {
      this.invulnerability--;
    }
    stroke(255);
    strokeWeight(1);
  }
}
function keyPressed() {
  if (key == "a") keysPressed[0] = true;
  if (key == "d") keysPressed[1] = true;
  if (key == "w") keysPressed[2] = true;
  if (key == "s") keysPressed[3] = true;
  if (key == "t") keysPressed[4] = true;
  if (key == "r") keysPressed[5] = true;
  if (key == "g") keysPressed[6] = true;
  if (key == "q") keysPressed[7] = true;
  if (key == "n") keysPressed[8] = true;
  if (key == "o") keysPressed[9] = true;
  if (key == "h") keysPressed[10] = true;
}

function keyReleased() {
  if (key == "a") keysPressed[0] = false;
  if (key == "d") keysPressed[1] = false;
  if (key == "w") keysPressed[2] = false;
  if (key == "s") keysPressed[3] = false;
  if (key == "t") keysPressed[4] = false;
  if (key == "r") keysPressed[5] = false;
  if (key == "g") keysPressed[6] = false;
  if (key == "q") keysPressed[7] = false;
  if (key == "n") keysPressed[8] = false;
  if (key == "o") keysPressed[9] = false;
  if (key == "h") keysPressed[10] = false;
}

function drawBackground() {
  background(100);
  
  noStroke();
  fill(75);
  rect(75, 75, width-150, height-150);
  
  fill(0);
  rect(100, 100, width-200, height-200);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function createAsteroid() {
  let pickACorner = floor(random(0, 4));
  let cornerPos;
  if (pickACorner == 0) {
    cornerPos = createVector(115, 115);
  } else if (pickACorner == 1) {
    cornerPos = createVector(width-115, 115);
  } else if (pickACorner == 2) {
    cornerPos = createVector(115, height-115);
  } else if (pickACorner == 3) {
    cornerPos = createVector(width-115, height-115);
  }
  
  let pointToPlayer;
  pointToPlayer = createVector(cornerPos.x-bluePlayer.position.x, cornerPos.y-bluePlayer.position.y);
  pointToPlayer.normalize();
  pointToPlayer.mult(random(8, 10));
  
  //createVector(random(-5, 5), random(-5, 5))
  testosterones.push(new asteroid(cornerPos, pointToPlayer, 15));
}

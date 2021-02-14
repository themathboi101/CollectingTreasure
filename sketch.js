var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg, endImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var hurdle, hurdle2, hurdleG;
var randomObstacle;

var PLAY = 0;
var END = 1;
var gameState = PLAY;
var lost = 0;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");

  hurdle2 = loadImage("hurdle-removebg-preview.png")
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(windowWidth/2, windowHeight/2);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(windowWidth/2, windowHeight-70, 20, 20);

  boy.addAnimation("SahilRunning", boyImg);
  boy.addAnimation("go", endImg);

  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  hurdleG = new Group();



}

function draw() {

  background(0);
  if (gameState === PLAY) {
    boy.x = World.mouseX; //check this line


    edges = createEdgeSprites();
    boy.collide(edges);


    if (path.y > 400) {
      path.y = windowHeight / 2;
    }

    randomObstacle = Math.round(random(1, 2));
    switch (randomObstacle) {
      case 1:
        createCash();
        createDiamonds();
        createJwellery();
        createSword();
        break;
      case 2:
        createHurdles();
        break;
    }
    console.log(randomObstacle);


    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;

    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;

    } else if (hurdleG.isTouching(boy)) {
      hurdleG.destroyEach();
      lost = lost + 1;
    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        lost = lost + 1;
      }
      if (lost === 5) {
        gameState = END;
      }
    }
  }
  if (gameState === END) {
    boy.changeAnimation("go", endImg);
    boy.scale = 1.05;
    boy.x = windowWidth/2;
    boy.y = windowHeight/2;

    path.velocityY = 0;
    cashG.destroyEach();
    cashG.velocityYEach = 0

    diamondsG.destroyEach();
    diamondsG.setVelocityYEach = 0;
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach = 0;

    hurdleG.destroyEach();
    hurdleG.setVelocityYEach = 0;
    
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach = 0;

  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, windowWidth-145, 30);
  text("Lost lives: " + lost + "/5", windowWidth-(windowWidth-20), 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = windowHeight/3;

    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = windowHeight/3;

    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = windowHeight/3;

    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = windowHeight/3;
    swordGroup.add(sword);
  }
}

function createHurdles() {
  if (World.frameCount % 80 == 0) {
    hurdle = createSprite(Math.round(random(50, windowWidth-50), 40, 10, 10));
   //hurdle.debug=true;
    hurdle.setCollider("rectangle",0,0,50,40);
    hurdle.depth=boy.depth
    hurdle.velocityY = 3;
    hurdle.addImage(hurdle2);
    hurdle.lifetime = windowHeight/3;
    hurdle.scale = 0.2;
    hurdleG.add(hurdle);
  }
}

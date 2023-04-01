var gameState = "play"
var Score;
var invisibleBlock;

function preload(){
    spaceImg = loadImage("space.jpg");
    rocketImg = loadImage("rocket.png");
    meteorImg = loadImage("meteor.png");
    rocketSound = loadSound("rocketSound.mp3");
}

function setup() {
    createCanvas(400,400)
    space = createSprite(200,200)
    space.addImage(spaceImg);
    space.velocityY = 1;

    rocket = createSprite(200,320);
    rocket.addImage(rocketImg);
    rocket.scale = 0.2;

    meteorGroup = new Group();
    invisibleBlockGroup = new Group();

    Score = 0;
}

function draw() {
    background(200);
    if(gameState === "play"){
        if(space.y > 200){
            space.y = 100; 
        }
        if(keyDown("left_arrow")){
            rocket.x -= 3;
        }
        if(keyDown("right_arrow")){
            rocket.x += 3;
        }
        if(keyDown("space")){
            rocket.velocityY = -4;
        }
        rocket.velocityY += 0.1

        if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 400){
            gameState = "end";
            rocket.velocityY = 0;

            rocket.destroy();
            meteorGroup.destroyEach();
            invisibleBlockGroup.destroyEach();
        }

        if(frameCount % 200 === 0){
            Score += 100
        }

        rocketSound.play();
        spawn_meteor();
        drawSprites();
    }

    if(gameState === "end"){
        stroke("yellow");
        fill("red");
        textSize(30);
        text("Game Over",130,200);
        text("Your Score: " + Score,120,250)
    }
}

function spawn_meteor(){
    if(frameCount % 200 === 0){
        meteor = createSprite(200,-50);
        meteor.addImage(meteorImg);
        meteor.scale = 0.2;
        meteor.velocityY = 2;
        meteor.lifetime = 500;
        meteor.position.x = Math.round(random(50,350));
        meteorGroup.add(meteor);

        invisibleBlock = createSprite(meteor.x,15,100,2);
        invisibleBlock.velocityY = 2;
        invisibleBlock.lifetime = 500;
        invisibleBlock.visible = false;
        invisibleBlockGroup.add(invisibleBlock);

        rocket.depth = meteor.depth
        rocket.depth +=1
    }
}
var PLAY = 1;
var END = 0;
var gameState = 1;

var alien,fruit1,fruit2,fruit3,fruit4,sword,GameOver;
var alienI,swordI,GameOverI;
var fruitGroup,alienGroup;
function preload(){
  alienI=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  swordI=loadImage("sword.png");
  GameOverI=loadImage("gameover.png");
  swordSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  fruitGroup= new Group();
  alienGroup=new Group();
  
  sword=createSprite(width/2,height-10,10,10);
  sword.addImage(swordI)
  sword.scale=0.7
  

  
  score=0
}

function draw() {
  background("purple");


  
 if (gameState===PLAY){
   spawnfruit();
   spawnalien();
   
   if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
      score=score+1;
     swordSound.play();
}
   
     sword.y=World.mouseY
   sword.x=World.mouseX
   
   
   if (alienGroup.isTouching(sword)){
        gameState = END;
     gameOverSound.play();
     
     
     fruitGroup.destroyEach();
     alienGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     alienGroup.setVelocityXEach(0);
     
     
     
   // gameOver=createSprite(300,300,10,10)
     sword.addImage(GameOverI);
     sword.x = 300;
      sword.y =width/10;
   }
     if(sword.visble=false){
    gameState=END
  }
 }

  

  drawSprites();
  fill("white");
  text("Score:"+ score,300,width/30);
}

  function spawnfruit(){
 if (frameCount % 60 === 0){
   var fruit= createSprite(600,Math.round(random(20, width-50)), 10, 10);

   fruit.velocityX = -(6+score/5);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    //var rand2 = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;

      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    fruit.scale = 0.2;
    fruit.lifetime =100;
   
   //add each obstacle to the group
    fruitGroup.add(fruit);
 }
} 




function spawnalien(){
  if(World.frameCount %200 === 0){
    alien= createSprite(600,200,20,20);
    alien.addAnimation("moving",alienI);
    alien.y = Math.round(random(100,width-50));
    alien.velocityX = -(6 + (score/5));
    alien.setLifetime = 50;
    
    alienGroup.add(alien);
  }
}

      

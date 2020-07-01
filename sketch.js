var trex, trex_running, trex_collided,jumpsound,diesound,checksound;
var ground,obstacle_g,cloud_g,restart_icon,gameover,restart,gameovertext;
var invisible_ground,groundimage,cloud_i,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score;
var gamestate="play";


function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided=loadAnimation("trex_collided.png");
  
  restart_icon=loadImage("restart.png");
  
   gameover=loadImage("gameOver.png");

  groundimage=loadImage("ground2.png");
  
  cloud_i=loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  
  
  obstacle2=loadImage("obstacle2.png");
  
  
  obstacle3=loadImage("obstacle3.png");
  
  
  obstacle4=loadImage("obstacle4.png");
  
  
  obstacle5=loadImage("obstacle5.png");
  
  
  obstacle6=loadImage("obstacle6.png");
  
  jumpsound=loadSound("jump.mp3");
  
  diesound=loadSound("die.mp3");
  
  checksound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(150,165,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5; 
  
  trex.addAnimation("collided",trex_collided);
  
  ground=createSprite(150,175,20,20);
  ground.addImage(groundimage);
  
  invisible_ground=createSprite(150,190,800,5);
  invisible_ground.visible=false;
  
  restart=createSprite(300,150,20,20);
  restart.addImage(restart_icon);
  restart.scale=0.4;
  restart.visible=false;
  gameovertext=createSprite(300,130,20,20);
  gameovertext.addImage(gameover);
  gameovertext.scale=0.4;
  gameovertext.visible=false;
  
  score=0;
  
  cloud_g=createGroup();
  
  obstacle_g=createGroup();
}

function draw() {
  background(180);
  trex.collide(invisible_ground);
  
  if(gamestate==="play"){
    
    
    if(keyDown("space")  && trex.y>164){
       trex.velocityY=-15;
      jumpsound.play();
  }
        
  trex.velocityY=trex.velocityY+0.8;

    
    ground.velocityX=-5; 
    
    score=score+Math.round(getFrameRate()/60);
    
    text(score,300,55,textSize(20));
    
    if(ground.x<0){
     ground.x=150;   
    }
    
    clouds();
    obstacles();
    
    if(obstacle_g.isTouching(trex)){
       gamestate="end";
      diesound.play();
   }
    
    if(score%100===0&&score>0){
    checksound.play();
    }
    
    
    
  } else
    if(gamestate==="end"){
      
      trex.velocityY=0;
      trex.changeAnimation("collided",trex_collided);
       restart.visible=true;
       gameovertext.visible=true;
      ground.velocityX=0;
      obstacle_g.setVelocityXEach(0);
      cloud_g.setVelocityXEach(0);
      cloud_g.setLifetimeEach(-1);
      obstacle_g.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)){
      reset();
      
      }
      
    }
  
  
  
  
  
  drawSprites();
}


function clouds(){
 if(frameCount%50===0){
   var cloud=createSprite(600,50,20,20);
   cloud.addImage(cloud_i);
   cloud.lifetime=150;
   cloud.velocityX=-5;
   cloud.depth=trex.depth;
   trex.depth=trex.depth+1;
   cloud_g.add(cloud);
 }
  
  
}


function obstacles(){
 if(frameCount%50===0){
   var obstacle=createSprite(600,160,20,20);
   var count=Math.round(random(1,6));  
   
   switch(count){
     
       case 1: obstacle.addImage(obstacle1);
       
       break;
       
       case 2: obstacle.addImage(obstacle2);
       
       break;
       
       case 3: obstacle.addImage(obstacle3);
       
       break;

       case 4: obstacle.addImage(obstacle4);
       
       break;

       case 5: obstacle.addImage(obstacle5);
       
       break;

       case 6: obstacle.addImage(obstacle6);
       
       break;
   
   }
   
   obstacle.scale=0.5;
   obstacle.lifetime=150;
   obstacle.velocityX=-5;
   obstacle.depth=trex.depth;
   trex.depth=trex.depth+1;
   obstacle_g.add(obstacle);
 }
  }

function reset(){
gamestate="play";

  restart.visible=false;
  gameovertext.visible=false;
  
  obstacle_g.destroyEach();
  cloud_g.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score=0;
}
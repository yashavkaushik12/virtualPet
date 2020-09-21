//Create variables here
var dog, dogimg, happyDog;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

   
  dog=createSprite(550,250,10,10);
  dog.addImage(dogimg);
  dog.scale=0.15;
  
  feed=createButton("FEED THE DOG");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);
}

function draw() {

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
  })
}

//function to add food in stock
function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

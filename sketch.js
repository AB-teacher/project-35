var movingBall, ballPosition;
var database;
var position;
var ballImage ;
var bgImage;
function preload() {
    ballImage = loadImage("images/Hot Air ballon-02.png");
    bgImage= loadImage("images/Hot Air ballon-01.png");
}
function setup(){
    createCanvas(1600,1200);
    movingBall = createSprite(550,1150,10,10);
    //movingBall.shapeColor = "red";
    movingBall.addImage(ballImage)
    database = firebase.database();
    ballPosition = database.ref("ball/position");
    ballPosition.on("value",readPosition,showError)

}

function draw(){
    background(bgImage);
    if (position != undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-10,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(10,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-10);
            movingBall.scale = movingBall.scale -0.05;
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+10);
            movingBall.scale = movingBall.scale + 0.05;
        }
    }
    drawSprites();
}

function changePosition(x,y){
    ballPosition.set({
        x: position.x+x,
        y: position.y+y,
    })
    
}

function readPosition(data){

    position = data.val();
    console.log(data);
    movingBall.x = position.x;
    movingBall.y = position.y;
}

function showError() {
    console.log("Error in writing to the database");
}
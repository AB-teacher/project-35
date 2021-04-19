var movingBall, ballPosition;
var database;
var position;
function setup(){
    createCanvas(500,500);
    movingBall = createSprite(250,250,10,10);
    movingBall.shapeColor = "red";
    database = firebase.database();
    ballPosition = database.ref("ball/position");
    ballPosition.on("value",readPosition,showError)

}

function draw(){
    background("white");
    if (position != undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
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
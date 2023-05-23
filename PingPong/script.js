class Ball{
    constructor(ballElement)
    {
        this.ballElement = ballElement;
    }
    velocity = 0.1;
    get x(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));

    }
    set x(value){
        this.ballElement.style.setProperty("--x",value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));

    }
    set y(value){
        this.ballElement.style.setProperty("--y",value);
    }
    reset(){
        this.x=50;
        this.y=50;
        this.direction={x:0.75,y:0.5};
        while(Math.abs(this.direction.x)<=0.2 || Math.abs(this.direction.x)>=0.9)
        {
            const heading = randomNumberBetween(0,2*Math.PI);
            this.direction = {x:Math.cos(heading),y:Math.sin(heading)};
        }
    }
    update(){
        let heading = randomNumberBetween(0,2*Math.PI);
        console.log(heading);
        this.x+=Math.cos(heading);
        this.y+=Math.sin(heading);

    }

}
function  randomNumberBetween(min,max)
{
    return (Math.random()*max-min)+min;
}
var ball = new Ball(document.getElementById("ball"));
var paddles = document.getElementsByClassName("paddle");
var upKey = false;
var downKey = false;
document.addEventListener("keypress",keyDown);
document.addEventListener("keyup",keyUp);
function keyDown(e){
    if(e.key=='w')
    {
        upKey=true;
        console.log("pressed W")
    }
    else if(e.key=='s')
    {
        downKey=true;
        console.log("pressed S")
    }
}
function keyUp(e){
    if(e.key=='w')
    {
        upKey=false;
        console.log("keyReleased W")
    }
    else if(e.key=='s')
    {
        downKey=false;
        console.log("keyReleased S")
    }
}

function gameLoop(){
    if(upKey)
    {
        for(let paddle of paddles)
        {
            let value = getComputedStyle(paddle).getPropertyValue("--position")
            if(value<=5)
            {
                continue;
            }
            paddle.style.setProperty("--position",value-0.5);
        }
    }
    else if(downKey)
    {
        for(let paddle of paddles)
        {
            let value = parseFloat(getComputedStyle(paddle).getPropertyValue("--position"));
            console.log(value);
            if(value>=95)
            {
                console.log(value);
                continue;
            }
            paddle.style.setProperty("--position",value+0.5);
        }
    }
    // ball.update();
    requestAnimationFrame(gameLoop);
}
gameLoop();



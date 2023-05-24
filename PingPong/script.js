var velocity = 0.03;
var lastTime = null;
var score = document.getElementById('player-score');
var startScreen = document.getElementById('startScreen');
var startScreenScore = document.querySelector("#high-score>span");
var highScore = localStorage.getItem('highScore');
var gameStarted=false;
startScreenScore.innerHTML = highScore;
var hue = 200;
// ----------------------------Ball Class----------------------------------------------------------------------------
class Ball{
    direction={x:0.75,y:0.5};
    constructor(ballElement)
    {
        this.ballElement = ballElement;
        this.reset();
    }
    
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
        velocity = 0.03;
        
        this.direction={x:0,y:0};
        while(Math.abs(this.direction.x)<=0.2 || Math.abs(this.direction.x)>=0.9)               // randomising initial ball movement after every game start, using a random number between 0 and 2*PI,
        {                                                                                       // then fetching x direction and y direction from it using sin and cosin of that number
            const heading = Math.random()*2*Math.PI;
            this.direction={x:Math.cos(heading),y:Math.sin(heading)};
        }
        
        score.innerHTML=0;
    }
    update(delta,paddleRects){
        this.x+=this.direction.x * velocity * delta;                                            //making the ball move by changing the top and left position of the ball constantly in accordance to velocity and delta
        this.y+=this.direction.y * velocity * delta;
        if(this.y<=0 || this.y>=100)                                                            //collision with top and bottom
        {
            this.direction.y*=-1;
        }
        if(paddleRects.some(r=>collisionTrue(r,this.ballElement.getBoundingClientRect())))      // collision detection between ball and paddle and changing of direction for the ball 
        {
            this.direction.x*=-1;
            velocity+=0.003;                                                                    // increasing velocity to increase ball speed after every touch with the paddles
            let value = parseInt(score.innerHTML);
            value++;
            score.innerHTML=value;
            if(currScore%2=='0')                                                                 // code for changing color after every 2 touches
            {
                hue+=20;
                document.querySelector('*').style.setProperty('--hue',hue);
            }
        }
        if(this.x<0 || this.x>100)
        {
            if(isHighScore)
            {
                window.alert("Congratulations you have achieved a new high score");
                isHighScore=false;
            }
            location.reload();
              
        }
    }

}
// ----Paddle and movement related functions----------------------------------------------------------------------------

function collisionTrue(rect1,rect2){                                                                                                
    return rect1.left<= rect2.right && rect1.right>=rect2.left && rect1.top<=rect2.bottom && rect1.bottom>=rect2.top;                   //collision detection code for collision b/w ball and paddles
}
var ball = new Ball(document.getElementById("ball"));
var paddles = document.getElementsByClassName("paddle");
var upKey = false;
var downKey = false;
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp);
function keyDown(e){
    if(e.key=='w')
    {
        upKey=true;
     
    }
    else if(e.key=='s')
    {
        downKey=true;
     
    }
}
function keyUp(e){
    if(e.key=='w')
    {
        upKey=false;
    }
    else if(e.key=='s')
    {
        downKey=false;
      
    }
}
// ----------Game Loop-------------------------------------------------------------------------------------------------
var isHighScore = false;
function gameLoop(time){
    currScore = parseInt(score.innerHTML);
    if(currScore>highScore||highScore==null)                                                                                //comparing score with high score and updating in local storage accordingly
    {
        isHighScore=true;
        localStorage.setItem('highScore',currScore);                                                                    
    }
   
    var paddleRects=[];
    for(let paddle of paddles)
    {
        paddleRects.push(paddle.getBoundingClientRect());
    }
    if(upKey)
    {   
        for(let paddle of paddles)
        {
            let value = getComputedStyle(paddle).getPropertyValue("--position")
            if(value<=5)                                                                                                //making sure paddle doesnt go out of the vh
            {
                continue;
            }
            paddle.style.setProperty("--position",value-0.7);                                                           //movement of paddle upwards
        }
    }
    else if(downKey)
    {
        for(let paddle of paddles)
        {
            let value = parseFloat(getComputedStyle(paddle).getPropertyValue("--position"));
            if(value>=95)                                                                                               //making sure paddle doesnt go out of the vh
            {
                continue;
            }
            paddle.style.setProperty("--position",value+0.7);                                                           //movement of paddle downwards
        }
    }
    
    if(lastTime!=null)
    {
        let delta = time-lastTime;
        ball.update(delta,paddleRects);                                                                                     // delta being the difference between time of animation frame generation , so that we can take frame drops into consideration and move our ball according to animation frames
    }
    lastTime = time;
    requestAnimationFrame(gameLoop);
}
// -------StartGame function--------------------------------------------------------------------------------------------
function  startGame(e){
    
    if(e.key=='Enter' && gameStarted==false){
        gameStarted=true;
        startScreen.style.opacity='0';
        gameLoop();
    }
}


document.addEventListener("keypress",startGame);

// ---------------------------------------------------------------------------------------------------------------------

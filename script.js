const canvas=document.getElementById('gamecanvas');
const ctx=canvas.getContext('2d');

const boxsize=20;
canvas.width=400;
canvas.height=400;

let snake=[{x:200 , y:200}];
let direction={x:0 , y:0};
let food=spawnFood();
let score=0;
let growth=0;
let speed=200;
let gameStarted = false;

document.addEventListener('keydown' , changeDirection);

function gameloop( ){
    if(hasCollided()){
        showGameOver();
        return
    }

    if(hasEatenFood()){
        score+=10;
        document.getElementById('score').innerText=score;
        food=spawnFood();
        growth+=2;
        speed=Math.max(50,speed-10);

    }

    moveSnake();
    drawcanvas();
    drawSnake();
    drawFood();

    setTimeout(gameloop,speed);
}
function drawcanvas(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width , canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'lime';
    snake.forEach(sagment=>ctx.fillRect(sagment.x, sagment.y,boxsize,boxsize));

}

function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxsize,boxsize );
}

function moveSnake(){
   const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
};
     snake.unshift(head);
 if (growth > 0) {
        growth--;
    } else {
        snake.pop();
    }
}


function changeDirection(event) {
    if (!gameStarted) {
        gameStarted = true;
        gameloop(); // start game here
    }

    const key = event.key;

    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -boxsize };
    } 
    else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: boxsize };
    } 
    else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -boxsize, y: 0 };
    } 
    else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: boxsize, y: 0 };
    }
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxsize)) * boxsize,
        y: Math.floor(Math.random() * (canvas.height / boxsize)) * boxsize
    };
}

function hasCollided() {
    const head = snake[0];

    // Wall collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function hasEatenFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function showGameOver() {
    document.getElementById("restartbtn").style.display = "block";
    alert("Game Over! Your score: " + score);
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };

    food = spawnFood();

    score = 0;
    growth = 0;
    speed = 200;

    document.getElementById('score').innerText = score;

    // restart loop
    gameloop();
}
gameloop();
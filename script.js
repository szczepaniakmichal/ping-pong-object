const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 600;
let gameHeight = canvas.height;
const startSpeed = 2;
const ballSpeed = startSpeed;

const ballMove = ballsGame => {
    ballsGame.forEach(ballGame => {
        ballGame.move(collisionObjects);
    })
}

const updateGameWindow = () => {
    gameHeight = canvas.height;
    computerPaddle.positionY = canvas.height - 200;
}

const clearScreen = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function Paddel(width, height, color, positionX, positionY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = 3;
    this.middleHeight = height / 2;
}

function Ball(size, color, positionX, positionY) {
    this.width = size;
    this.height = size;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.middleHeight = size / 2;
    this.speedX = startSpeed;
    this.speedY = startSpeed;
    this.directionX = true;
    this.directionY = true;

    this.resetBall = () => {
        if(Math.round(Math.random()))
            this.directionX = !this.directionX;
        if(Math.round(Math.random()))
            this.directionY = !this.directionY;
        this.speedX = startSpeed;
        this.speedY = startSpeed;
        this.positionX = canvas.height / 2 - this.height / 2;
        this.positionY = canvas.width / 2 - this.width / 2;
    }

    this.move = collisionObjects => {
        const ballLeft = this.positionX;
        const ballRight = this.positionX + this.width;
        const ballBottom = this.positionY + this.width;
        const ballTop = this.positionY;
        let collision = 0;
        for (let i = 0; i < collisionObjects.length; i++) {
            let objectRight = collisionObjects[i].positionX + collisionObjects[i].width;
            let objectLeft = collisionObjects[i].positionX;
            let objectTop = collisionObjects[i].positionY;
            let objectBottom = collisionObjects[i].positionY + collisionObjects[i].height;
            if (this === collisionObjects[i]) //break all instructions when it is the same object
                continue;
            else if (((objectLeft <= ballRight && ballRight <= objectRight) || (objectLeft <= ballLeft && ballLeft <= objectRight)) && ((objectTop <= ballTop && ballTop <= objectBottom) || (objectTop <= ballBottom && ballBottom <= objectBottom))) {
                this.directionX != this.directionX; //no collision when object is in object (on start >1 ball), only set other direction
                break;
            }
            if (this.directionX && (ballRight + this.speedX > canvas.width)) { //check collision with the end x-axis canvas
                collision = 2;
                //playerWins.increasePoints();
                break;
            } else if (!this.directionX && (ballLeft - this.speedX < 0)) { //check collision with the start x-axis canvas
                collision = 2;
                //computerWins.increasePoints();
                break;
            }
            if (this.directionY && (ballBottom + this.speedY > canvas.height)) { //check collision with the end y-axis canvas
                collision = 3;
                break;
            } else if (!this.directionY && (ballTop - this.speedY < 0)) { //check collision with the start y-axis canvas
                collision = 3;
                break;
            }
            if (this.directionX && this.directionY) {
                if ((ballLeft < objectRight && ((objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight) || (objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight))) && (ballTop < objectBottom && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else if (this.directionX && !this.directionY) {
                if ((ballLeft < objectRight && ((objectLeft <= ballRight + this.speedX && ballRight + this.speedX <= objectRight) || (objectLeft <= ballLeft + this.speedX && ballLeft + this.speedX <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else if (!this.directionX && this.directionY) {
                if ((ballRight > objectLeft && ((objectLeft <= ballRight - this.speedX && ballRight - this.speedX <= objectRight) || (objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight))) && (ballTop < objectBottom && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom + this.speedY && ballBottom + this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            } else {
                if ((ballRight > objectLeft && ((objectLeft <= ballRight - this.speedX && ballRight - this.speedX <= objectRight) || (objectLeft <= ballLeft - this.speedX && ballLeft - this.speedX <= objectRight))) && (ballBottom > objectTop && ((objectTop <= ballTop - this.speedY && ballTop - this.speedY <= objectBottom) || (objectTop <= ballBottom - this.speedY && ballBottom - this.speedY <= objectBottom)))) {
                    collision = 1;
                    break;
                }
            }
        }
        if (collision) {
            if (Math.round(Math.random())) {
                this.speedX += (Math.random() / 10);
            } else
                this.speedY = (Math.random() * ballSpeed).toFixed(2) * 1;
            if (collision == 1) {
                this.directionX = !this.directionX;
                if (Math.round(Math.random()))
                    this.directionY = !this.directionY;
            } else if (collision == 2) {
                this.resetBall();
            } else {
                this.directionY = !this.directionY;
            }
        } else {
            if (this.directionX)
                this.positionX += this.speedX;
            else
                this.positionX -= this.speedX;
            if (this.directionY)
                this.positionY += this.speedY;
            else
                this.positionY -= this.speedY;
        }
    }
}


const drawObject = (collisionObjects, context) => {
    collisionObjects.forEach(collisionObject => {
        context.fillStyle = collisionObject.color;
        context.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height)
    });
}

const collisionObjects = [];
const ballsGame = [];

const playerPaddle = new Paddel(100, 20, 'green', canvas.width / 2, canvas.height - .98 * canvas.height);
const computerPaddle = new Paddel(100, 20, 'yellow', canvas.width / 2, canvas.height - .04 * canvas.height );
const ball1 = new Ball( 10, 'white', canvas.width / 2, canvas.height / 2 );
const ball2 = new Ball( 10, 'pink', 130, 280 );

collisionObjects.push(playerPaddle, computerPaddle, ball1, ball2 );
ballsGame.push(ball1, ball2);

const run = () => {
    if ( gameHeight !== canvas.height)
        updateGameWindow();
        clearScreen();
        ballMove(ballsGame);
    drawObject(collisionObjects, ctx);
}

let timer = setInterval(run, 1000 / 60);
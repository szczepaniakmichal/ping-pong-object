const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 600;

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
    this.speedX = 2;
    this.speedY = 2;
    this.directionX = true;
    this.directionY = true;
}

const drawObject = (collisionObjects, context) => {
    collisionObjects.forEach(collisionObject => {
        context.fillStyle = collisionObject.color;
        context.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height)
    });
}

const collisionObjects = [];

const playerPaddle = new Paddel(100, 20, 'green', canvas.width / 2, canvas.height - .98 * canvas.height);
const computerPaddle = new Paddel(100, 20, 'yellow', canvas.width / 2, canvas.height - .04 * canvas.height);
const ball1 = new Ball( 10, 'white', canvas.width / 2, canvas.height / 2 );
const ball2 = new Ball( 10, 'pink', 130, 280 );

collisionObjects.push(playerPaddle, computerPaddle, ball1, ball2 );

drawObject(collisionObjects, ctx);
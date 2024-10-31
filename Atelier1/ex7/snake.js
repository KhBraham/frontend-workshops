const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const TILE_SIZE = 20;  // Size of each snake segment and food item

// Snake settings
let snake = [{ x: 100, y: 100 }];
let direction = { x: TILE_SIZE, y: 0 };
let food = getRandomFoodPosition();
let score = 0;
let gameInterval;

// Start the game loop
function startGame() {
    gameInterval = setInterval(gameLoop, 100);
}

// Main game loop
function gameLoop() {
    update();
    draw();
}

// Update the snake's position and handle game logic
function update() {
    // Move the snake by adding a new head based on the direction
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for wall collisions
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= CANVAS_WIDTH || newHead.y >= CANVAS_HEIGHT) {
        gameOver();
        return;
    }

    // Check for self-collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver();
        return;
    }

    // Add the new head to the snake's body
    snake.unshift(newHead);

    // Check if the snake has eaten the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = getRandomFoodPosition();  // Place a new food item
    } else {
        snake.pop();  // Remove the last segment if no food was eaten
    }
}

// Draw the snake, food, and score on the canvas
function draw() {
    // Clear the canvas
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, TILE_SIZE, TILE_SIZE);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, TILE_SIZE, TILE_SIZE);
    });

    // Draw the score
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Handle keyboard controls to change the direction of the snake
document.addEventListener('keydown', event => {
    switch(event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -TILE_SIZE };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: TILE_SIZE };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -TILE_SIZE, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: TILE_SIZE, y: 0 };
            break;
    }
});

// Generate a random position for the food
function getRandomFoodPosition() {
    const foodX = Math.floor(Math.random() * CANVAS_WIDTH / TILE_SIZE) * TILE_SIZE;
    const foodY = Math.floor(Math.random() * CANVAS_HEIGHT / TILE_SIZE) * TILE_SIZE;
    return { x: foodX, y: foodY };
}

// Handle game over
function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score was: ${score}`);
    // Reset the game
    snake = [{ x: 100, y: 100 }];
    direction = { x: TILE_SIZE, y: 0 };
    score = 0;
    food = getRandomFoodPosition();
    startGame();
}

// Start the game initially
startGame();

/*
Author: Brent Foster
Email: brent.brentfoster.me
LinkedIn: http://linkedin.com/in/engineeringthefuture/
GitHub: https://github.com/bmfoste
*/

// Snake Game Implementation

// Define the game variables
const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: gridSize * 2, y: gridSize * 2 }];
let direction = 'right';
let food = { x: gridSize * 5, y: gridSize * 5 };
let score = 0;

// Update audio element to use the mp3 file in the assets folder
const audio = new Audio('assets/bit-shift-kevin-macleod-main-version-24901-03-12.mp3');
audio.loop = true;

// Allow dependency injection for the canvas context
let ctx;

function initializeCanvas(canvasElement) {
    ctx = canvasElement.getContext('2d');
}

// Draw the snake
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.roundRect(segment.x, segment.y, gridSize, gridSize, gridSize / 4);
        ctx.fill();

        if (index === 0) {
            // Draw the smiley face on the head
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.roundRect(segment.x, segment.y, gridSize, gridSize, gridSize / 4);
            ctx.fill();

            // Draw eyes
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(segment.x + gridSize / 3, segment.y + gridSize / 3, gridSize / 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(segment.x + (2 * gridSize) / 3, segment.y + gridSize / 3, gridSize / 10, 0, Math.PI * 2);
            ctx.fill();

            // Draw smile
            ctx.beginPath();
            ctx.arc(segment.x + gridSize / 2, segment.y + gridSize / 2, gridSize / 3, 0, Math.PI);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    });
}

// Add an array of food emojis
const foodEmojis = ['🍎', '🍌', '🍓', '🍇', '🍍', '🥕', '🌽', '🍉'];

// Update the placeFood function to accept canvas width and height instead of canvasSize
function placeFood(canvasWidth, canvasHeight, gridSize) {
    const randomEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    return {
        x: Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize,
        emoji: randomEmoji,
    };
}

// Update drawFood to display the food emoji
function drawFood() {
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(food.emoji, food.x + gridSize / 2, food.y + gridSize / 2);
}

// Update moveSnake to grow the snake when food is eaten
function moveSnake(snake, direction) {
    const head = {...snake[0] };
    switch (direction) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = placeFood(document.getElementById('gameCanvas').width, document.getElementById('gameCanvas').height, gridSize);
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }
}

// Ensure the snake and food are contained within the canvas boundaries
function checkCollision(snake, canvasWidth, canvasHeight) {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Add a flag to track whether the game has started
let gameStarted = false;

// Add a flag to prevent multiple alerts when the game ends
let gameOver = false;

// Add a high score board
let highScores = [];

// Add localStorage support for high scores
function loadHighScores() {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
        highScores = JSON.parse(storedScores);
    } else {
        highScores = []; // Ensure highScores is initialized as an empty array if no scores are stored
    }
}

function saveHighScores() {
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Prompt for name when a new high score is achieved
// Debug sorting logic in updateHighScores
function updateHighScores(newScore, providedName = null) {
    let name = providedName || 'Anonymous';
    console.log('High Scores Before Update:', highScores);
    console.log('New Score:', newScore, 'Name:', name);

    if (highScores.length < 3 || newScore > highScores[highScores.length - 1].score) {
        if (!providedName) {
            name = prompt('New High Score! Enter your name:', 'Anonymous') || 'Anonymous';
        }
        highScores.push({ score: newScore, name });
        highScores.sort((a, b) => b.score - a.score);
    }
    if (highScores.length > 3) {
        highScores = highScores.slice(0, 3); // Ensure only top 3 scores are kept
    }
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log('High Scores After Update:', highScores);

    // Debugging logs to verify persistence
    console.log('Persisted High Scores:', localStorage.getItem('highScores'));
}

function drawHighScores() {
    const medals = ['🥇', '🥈', '🥉'];
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('High Scores:', canvasSize - 120, 20);
    highScores.forEach((entry, index) => {
        ctx.fillText(`${medals[index]} ${entry.name}: ${entry.score}`, canvasSize - 120, 40 + index * 20);
    });
}

// Add toggle button for music
const musicToggleButton = document.createElement('button');
musicToggleButton.textContent = '🔊';
musicToggleButton.style.position = 'relative';
musicToggleButton.style.top = '0';
musicToggleButton.style.left = '0';
musicToggleButton.style.margin = '10px';
musicToggleButton.style.display = 'inline-block';
musicToggleButton.style.fontSize = '24px';
musicToggleButton.style.border = 'none';
musicToggleButton.style.background = 'transparent';
musicToggleButton.style.cursor = 'pointer';

let isMusicPlaying = false;
musicToggleButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        audio.pause();
        musicToggleButton.textContent = '🔇';
    } else {
        audio.play();
        musicToggleButton.textContent = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Start music when the game starts
window.addEventListener('keydown', () => {
    if (!gameStarted && !isMusicPlaying) {
        audio.play();
        musicToggleButton.textContent = '🔊';
        isMusicPlaying = true;
    }
});

// Ensure the game starts when an arrow key or button is pressed
window.addEventListener('keydown', e => {
    if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        gameStarted = true;
    }

    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

// Add an info icon and modal window for game instructions
const infoIcon = document.createElement('button');
infoIcon.textContent = 'ℹ️';
infoIcon.style.position = 'relative';
infoIcon.style.top = '0';
infoIcon.style.left = '0';
infoIcon.style.margin = '10px';
infoIcon.style.display = 'inline-block';
infoIcon.style.fontSize = '24px';
infoIcon.style.border = 'none';
infoIcon.style.background = 'transparent';
infoIcon.style.cursor = 'pointer';

const controlsContainer = document.createElement('div');
controlsContainer.style.textAlign = 'center';
controlsContainer.appendChild(musicToggleButton);
controlsContainer.appendChild(infoIcon);

document.body.insertBefore(controlsContainer, document.getElementById('gameCanvas'));

const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
modal.style.display = 'none';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '1000';

const modalContent = document.createElement('div');
modalContent.style.backgroundColor = 'white';
modalContent.style.padding = '20px';
modalContent.style.borderRadius = '10px';
modalContent.style.textAlign = 'center';
modalContent.style.width = '80%';
modalContent.innerHTML = `
    <h2>Game Instructions</h2>
    <p>Use the arrow keys or touch gestures to control the snake.</p>
    <p>Swipe up, down, left, or right within the touch area to move the snake.</p>
    <p>Eat food to grow the snake and increase your score.</p>
    <p>Avoid collisions with the walls or the snake's own body.</p>
    <button id="closeModal" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer;">Close</button>
`;
modal.appendChild(modalContent);
document.body.appendChild(modal);

infoIcon.addEventListener('click', () => {
    modal.style.display = 'flex';
});

const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

function getHighScores() {
    console.log('Retrieving high scores:', highScores);
    return highScores;
}

// Define the handleTouch function to handle touch events
function handleTouch(event) {
    event.preventDefault();
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Determine direction based on touch position within the canvas
        if (y < rect.height / 3 && direction !== 'down') {
            direction = 'up';
        } else if (y > (2 * rect.height) / 3 && direction !== 'up') {
            direction = 'down';
        } else if (x < rect.width / 3 && direction !== 'right') {
            direction = 'left';
        } else if (x > (2 * rect.width) / 3 && direction !== 'left') {
            direction = 'right';
        }
    }
}

// Move the gameLoop function definition above the window.onload function
function gameLoop() {
    if (!gameStarted) {
        ctx.clearRect(0, 0, document.getElementById('gameCanvas').width, document.getElementById('gameCanvas').height);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const message = isMobile ? 'Touch the screen to start!' : 'Press an arrow key to start!';
        const textWidth = ctx.measureText(message).width;
        ctx.fillText(message, (document.getElementById('gameCanvas').width - textWidth) / 2, document.getElementById('gameCanvas').height / 2);

        // Display high scores
        drawHighScores();
        return;
    }

    if (checkCollision(snake, document.getElementById('gameCanvas').width, document.getElementById('gameCanvas').height)) {
        if (!gameOver) {
            gameOver = true;
            alert(`Game Over! Your score: ${score}`);
            updateHighScores(score);
            document.location.reload();
        }
        return;
    }

    ctx.clearRect(0, 0, document.getElementById('gameCanvas').width, document.getElementById('gameCanvas').height);
    drawFood();
    moveSnake(snake, direction);
    drawSnake();

    // Display the score in the top-left corner
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Display the high score board
    drawHighScores();
}

// Ensure proper initialization of the canvas and high scores area
window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    initializeCanvas(canvas);
    initializeCanvasTouchArea();

    const rect = canvas.getBoundingClientRect();
    food = placeFood(rect.width, rect.height, gridSize);

    loadHighScores();
    makeGameResponsive();
    adjustHighScoresPosition();

    setInterval(gameLoop, 100);
};

// Ensure the canvas dimensions are adjusted dynamically
function makeGameResponsive() {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth * 0.9; // 90% of the screen width
    canvas.height = window.innerHeight * 0.5; // 50% of the screen height
}

// Ensure the high scores area is centered below the canvas
function adjustHighScoresPosition() {
    const highScoresElement = document.getElementById('highScores');
    const canvas = document.getElementById('gameCanvas');

    const canvasRect = canvas.getBoundingClientRect();
    highScoresElement.style.position = 'absolute';
    highScoresElement.style.top = `${canvasRect.bottom + 20}px`; // Position 20px below the canvas
    highScoresElement.style.left = '50%';
    highScoresElement.style.transform = 'translateX(-50%)';
}

// Ensure the canvas touch area works correctly
function initializeCanvasTouchArea() {
    const canvas = document.getElementById('gameCanvas');
    canvas.style.touchAction = 'none';

    canvas.addEventListener('touchstart', (event) => {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Check if the touch is within the canvas bounds
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            if (!gameStarted) {
                gameStarted = true;
                if (!isMusicPlaying) {
                    audio.play();
                    musicToggleButton.textContent = '🔊';
                    isMusicPlaying = true;
                }
            }
        }
    });

    canvas.addEventListener('touchmove', handleTouch);
}

window.addEventListener('resize', () => {
    makeGameResponsive();
    adjustHighScoresPosition();
});

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCanvas,
        moveSnake,
        checkCollision,
        placeFood,
        drawSnake,
        drawFood,
        updateHighScores,
        drawHighScores,
        loadHighScores,
        getHighScores,
        handleTouch
    };
}
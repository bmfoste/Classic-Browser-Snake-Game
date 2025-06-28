/*
Author: Brent Foster
Email: brent.brentfoster.me
LinkedIn: http://linkedin.com/in/engineeringthefuture/
GitHub: https://github.com/bmfoste
*/

const { moveSnake, checkCollision, placeFood, initializeCanvas, updateHighScores, drawHighScores, loadHighScores, getHighScores } = require('../script');

// Mock the canvas context
const mockCtx = {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 100 })),
};

// Mock the DOM structure
beforeAll(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="400" height="400"></canvas>';
    const canvas = document.getElementById('gameCanvas');
    canvas.getContext = jest.fn(() => mockCtx);
    initializeCanvas(canvas);
});

// Refine localStorage mock to ensure proper persistence
let mockStorage = {};

// Replace localStorage mock with a standalone object
beforeAll(() => {
    global.localStorage = {
        getItem: key => mockStorage[key] || null,
        setItem: (key, value) => {
            mockStorage[key] = value;
        },
    };

    jest.spyOn(global, 'prompt').mockImplementation((message, defaultValue) => defaultValue);

    // Initialize mockStorage with default high scores
    mockStorage = {
        highScores: JSON.stringify([
            { score: 50, name: 'Alice' },
            { score: 30, name: 'Bob' },
            { score: 20, name: 'Charlie' },
        ]),
    };
});

// Test moveSnake function
describe('moveSnake', () => {
    test('should move the snake in the correct direction', () => {
        const snake = [{ x: 20, y: 20 }];
        const direction = 'right';
        moveSnake(snake, direction);
        expect(snake[0]).toEqual({ x: 40, y: 20 });
    });
});

// Test checkCollision function
describe('checkCollision', () => {
    test('should detect collision with boundaries', () => {
        const snake = [{ x: 400, y: 400 }];
        const canvasSize = 400;
        expect(checkCollision(snake, canvasSize)).toBe(true);
    });

    test('should detect collision with itself', () => {
        const snake = [
            { x: 20, y: 20 },
            { x: 40, y: 20 },
            { x: 20, y: 20 },
        ];
        expect(checkCollision(snake)).toBe(true);
    });
});

// Test placeFood function
describe('placeFood', () => {
    test('should place food within the canvas boundaries', () => {
        const canvasSize = 400;
        const gridSize = 20;
        const food = placeFood(canvasSize, gridSize);
        expect(food.x).toBeGreaterThanOrEqual(0);
        expect(food.x).toBeLessThan(canvasSize);
        expect(food.y).toBeGreaterThanOrEqual(0);
        expect(food.y).toBeLessThan(canvasSize);
    });
});

let highScores = [];

// Refine localStorage mock to ensure proper updates
beforeEach(() => {
    mockStorage = {
        highScores: JSON.stringify([
            { score: 50, name: 'Alice' },
            { score: 30, name: 'Bob' },
        ]),
    };

    global.localStorage = {
        getItem: key => mockStorage[key] || null,
        setItem: (key, value) => {
            mockStorage[key] = value;
        },
    };

    // Ensure highScores is initialized from mockStorage
    highScores = JSON.parse(mockStorage.highScores);

    // Debugging logs to verify initialization
    console.log('Initialized High Scores:', highScores);
});

// Refine test expectations for updateHighScores
describe('updateHighScores', () => {

    test('should add a new high score and sort correctly', () => {
        updateHighScores(50, 'Alice');
        updateHighScores(40, 'Anonymous');
        updateHighScores(60, 'Dave');

        expect(getHighScores()).toEqual([
            { score: 60, name: 'Dave' },
            { score: 50, name: 'Alice' },
            { score: 40, name: 'Anonymous' },
        ]);
    });

    // Ensure the list is sliced to top 3 scores
    test('should add a new high score with provided name and sort correctly', () => {
        updateHighScores(800, 'Brent');

        // Add an expect to verify Dave is contained in the high scores list with a score of 60
        expect(getHighScores()).toContainEqual({ score: 800, name: 'Brent' });
    });
});
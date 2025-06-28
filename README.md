# Classic Snake Game

## Author Information
Brent Foster  
Email: brent.brentfoster.me  
LinkedIn: http://linkedin.com/in/engineeringthefuture/  
GitHub: https://github.com/bmfoste  

## Overview
This project implements a classic snake game using HTML, CSS, and JavaScript. The game features a movable snake, food items represented by emojis, and a high score board. This game was created as an experiment to explore the capabilities of GitHub Copilot running in Agent mode, utilizing GPT-4o for enhanced coding assistance and automation within Visual Studio Code. 

## Features
- **Snake Movement**: Controlled using arrow keys.
- **Food Items**: Randomly placed food emojis that change each time.
- **Snake Growth**: The snake grows longer when it eats food.
- **Score Tracking**: Displays the current score during gameplay.
- **High Score Board**: Maintains the top 3 scores with gold, silver, and bronze medals.
- **Persistent High Scores**: High scores are saved using `localStorage`.
- **Game Start Message**: Displays a prompt to press an arrow key to start.
- **Smiley Face on Snake Head**: The snake head features a smiley face.
- **Rounded Snake Body**: The snake body is drawn as rounded rectangles.
- **8-bit Music**: Plays classic 8-bit music during gameplay, controllable with a toggle button.

## Music Credit
Music from #Uppbeat (free for Creators!):

https://uppbeat.io/t/kevin-macleod/bit-shift

License code: ITM4WUP6D36GMJWZ

## How to Play
1. Open the `index.html` file in a browser.
2. Press an arrow key to start the game.
3. Use the arrow keys to control the snake.
4. Eat food to grow the snake and increase your score.
5. Avoid collisions with the walls or the snake's own body.

## Development
### Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.

### Testing
Run the unit tests using:
```bash
npm test
```

### Files
- `index.html`: The main HTML file.
- `styles.css`: Contains the styling for the game.
- `script.js`: Implements the game logic.
- `tests/script.test.js`: Unit tests for the game logic.
- `assets/bit-shift-kevin-macleod-main-version-24901-03-12.mp3`: 8-bit music file.

```mermaid
graph TD
    A[User Interface] -->|Interacts with| B[Game Logic]
    B -->|Controls| C[Snake Movement]
    B -->|Generates| D[Food Placement]
    B -->|Tracks| E[Score Tracking]
    B -->|Updates| F[High Score Board]
    F -->|Persists| G[localStorage]
    A -->|Displays| H[Canvas]
    A -->|Plays| I[8-bit Music]
    A -->|Shows| J[Game Start Message]
    A -->|Handles| K[Keyboard Input]

## Future Enhancements
- Add special effects.
- Implement levels with increasing difficulty.
- Add multiplayer support.

## License
This project is licensed under the MIT License.

## Using GitHub Copilot to Generate the Game

GitHub Copilot can assist in generating the Classic Snake Game by providing code suggestions and completing functions based on your prompts. Below is a history of chat prompts and responses that guided the development of this project:

### Prompts and Responses
1. **Prompt**: "What is the classic snake game and what are the features that make it work? Describe in detail."
   - **Response**: The classic snake game is a simple arcade game where the player controls a snake that moves around the screen, eating food to grow longer. Key features include:
     - **Snake Movement**: The snake moves in a grid-like fashion, controlled by arrow keys.
     - **Food Items**: Randomly placed food that the snake eats to grow longer.
     - **Collision Detection**: The game ends if the snake collides with itself or the walls.
     - **Score Tracking**: Tracks the player's score based on the number of food items eaten.
     - **High Score Board**: Displays the top scores.
     - **Persistent Storage**: High scores are saved using localStorage.

2. **Prompt**: "I'm an engineer, and I want to build a classic snake game as described using simple HTML, JavaScript, and CSS so I can easily play in a web browser. I also want to make sure the code is well documented, testable, and has appropriate unit testing coverage for maintainability."
   - **Response**: GitHub Copilot suggested creating a basic HTML structure with a canvas element for the game, implementing the game logic in JavaScript, and styling the game using CSS. It also recommended adding comments to document the code, writing unit tests for key functions, and using localStorage for persistent high scores.

3. **Prompt**: "Create a basic HTML structure for a snake game."
   - **Response**: GitHub Copilot generated the `index.html` file with a canvas element for the game.

4. **Prompt**: "Implement snake movement logic in JavaScript."
   - **Response**: Copilot suggested functions to control the snake's movement using arrow keys.

5. **Prompt**: "Add a high score board using localStorage."
   - **Response**: Copilot provided code to save and retrieve high scores from `localStorage`.

6. **Prompt**: "Style the game using CSS."
   - **Response**: Copilot generated CSS rules for the canvas and high score board.

7. **Prompt**: "Include 8-bit music in the game."
   - **Response**: Copilot suggested using an audio element to play the music file.

8. **Prompt**: "Write unit tests for the game logic."
   - **Response**: Copilot created test cases for the snake movement and collision detection.

### Recommendations
- Use clear and concise prompts to guide Copilot.
- Review and test the generated code to ensure it meets your requirements.
- Combine Copilot's suggestions with your own logic for optimal results.

GitHub Copilot is a powerful tool for accelerating development and exploring creative solutions.

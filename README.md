# Balloon Pop Surprise Game

A simple browser-based balloon popping game with playful graphics and an animated background. Click on the balloons before they float away to earn points.

The interface now features a start screen, high-score tracking and polished styling.

## Running the Game

Any static HTTP server will work. If you have Python installed, you can run:

```bash
python3 -m http.server 8000
```

Then open your browser and navigate to `http://localhost:8000` to play the game.

Alternatively, open `index.html` directly in your browser.

To create a downloadable archive, run `bash package.sh` to produce `balloon-pop.zip`.

## Files

- `index.html` – main page containing the canvas and scoreboard
- `style.css` – styles for the game layout and background
- `game.js` – JavaScript logic for animating and popping balloons

Enjoy the surprise!

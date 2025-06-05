const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const highScoreSpan = document.getElementById('highScore');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const message = document.getElementById('message');

let score = 0;
let highScore = 0;
let misses = 0;
let running = false;

const balloons = [];
const balloonColors = ['#ff6b6b', '#ffcc5c', '#88d8b0', '#4d9de0', '#f7a072'];
const balloonRadius = 20;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Balloon(x, y, color, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
}

Balloon.prototype.update = function() {
    this.y -= this.speed;
};

Balloon.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.ellipse(this.x, this.y, balloonRadius * 0.8, balloonRadius, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + balloonRadius);
    ctx.lineTo(this.x, this.y + balloonRadius + 10);
    ctx.strokeStyle = '#555';
    ctx.stroke();
};

function addBalloon() {
    const x = random(balloonRadius, canvas.width - balloonRadius);
    const y = canvas.height + balloonRadius;
    const color = balloonColors[Math.floor(random(0, balloonColors.length))];
    const speed = random(1, 3);
    balloons.push(new Balloon(x, y, color, speed));
}

function startGame() {
    score = 0;
    misses = 0;
    scoreSpan.textContent = score;
    overlay.classList.add('hidden');
    balloons.length = 0;
    for (let i = 0; i < 5; i++) addBalloon();
    running = true;
    requestAnimationFrame(updateGame);
}

function endGame() {
    running = false;
    if (score > highScore) {
        highScore = score;
        highScoreSpan.textContent = highScore;
    }
    message.textContent = `Game Over! Score: ${score}`;
    startBtn.textContent = 'Play Again';
    overlay.classList.remove('hidden');
}

function updateGame() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        b.update();
        if (b.y + balloonRadius < 0) {
            balloons.splice(i, 1);
            addBalloon();
            misses++;
            if (misses >= 3) {
                endGame();
                return;
            }
        } else {
            b.draw();
        }
    }

    requestAnimationFrame(updateGame);
}

canvas.addEventListener('click', function(evt) {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    for (let i = balloons.length - 1; i >= 0; i--) {
        const b = balloons[i];
        const dx = x - b.x;
        const dy = y - b.y;
        if (Math.sqrt(dx*dx + dy*dy) < balloonRadius) {
            balloons.splice(i, 1);
            score++;
            scoreSpan.textContent = score;
            addBalloon();
            break;
        }
    }
});

startBtn.addEventListener('click', startGame);


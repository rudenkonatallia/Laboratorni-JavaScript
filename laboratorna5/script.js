(function() {
    let pixel;
    let score = 0;
    let timeLeft;
    let timeInterval;
    let maxTime;
    let gameActive = false;
    let pixelSize = 20; 
    let moveRadius = 0;

    let currentX = 0;
    let currentY = 0;

    document.getElementById('startButton').addEventListener('click', function() {
        const difficulty = document.getElementById('difficulty').value;
        const color = document.getElementById('color').value;

        if (!difficulty || !color) {
            return;
        }

        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('infoPanel').style.display = 'block';
        startGame(difficulty, color);
    });

    function startGame(difficulty, color) {
        if (pixel) {
            pixel.remove();
            clearInterval(timeInterval);
        }

        pixel = document.createElement('div');
        pixel.id = 'pixel';
        pixel.style.backgroundColor = color;
        pixel.style.position = 'absolute';
        pixel.style.cursor = 'pointer';
        document.body.appendChild(pixel);

        switch (difficulty) {
            case 'lazy':
                maxTime = 6;
                moveRadius = Math.min(window.innerWidth, window.innerHeight) / 3;
                pixelSize = 70;   
                break;
            case 'normal':
                maxTime = 4;
                moveRadius = Math.min(window.innerWidth, window.innerHeight) * 2 / 3;
                pixelSize = 50;   
                break;
            case 'hard':
                maxTime = 2;
                moveRadius = -1;
                pixelSize = 30;   
                break;
        }
        

        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;

        gameActive = true;

        movePixel(pixel);
        startTimer();

        pixel.addEventListener('click', onPixelClick);
    }

    function onPixelClick() {
        if (!gameActive) return;

        score++;
        updateScore();
        movePixel(pixel);
        resetTimer();
    }

    function movePixel(pixel) {
        const maxX = window.innerWidth - pixelSize;
        const maxY = window.innerHeight - pixelSize;

        let newX, newY;

        if (moveRadius === -1) {
            newX = Math.floor(Math.random() * maxX);
            newY = Math.floor(Math.random() * maxY);
        } else {
            let deltaX = Math.floor(Math.random() * (moveRadius * 2)) - moveRadius;
            let deltaY = Math.floor(Math.random() * (moveRadius * 2)) - moveRadius;

            newX = currentX + deltaX;
            newY = currentY + deltaY;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
        }

        pixel.style.left = `${newX}px`;
        pixel.style.top = `${newY}px`;

        currentX = newX;
        currentY = newY;
    }

    function updateScore() {
        document.getElementById('scoreBoard').textContent = `Score: ${score}`;
    }

    function startTimer() {
        timeLeft = maxTime;
        document.getElementById('timeLeft').textContent = `Time left for click: ${timeLeft}s`;

        timeInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timeLeft').textContent = `Time left for click: ${timeLeft}s`;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timeInterval);
        startTimer();
    }

    function endGame() {
        clearInterval(timeInterval);
        gameActive = false;
        alert(`Game over! Your score is ${score}, congratulations! Reload the page to start a new game.`);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const scoreDisplay = document.getElementById('score');

    const gridSize = 20; // Veličina jedne "kockice" zmije i hrane
    const canvasSize = canvas.width; // 400x400
    const tileCount = canvasSize / gridSize; // Broj kockica po retku/stupcu (20)

    let snake = [
        { x: 10, y: 10 } // Početna pozicija zmije (sredina)
    ];
    let food = {};
    let dx = 0; // Promjena X koordinate (horizontalno kretanje)
    let dy = 0; // Promjena Y koordinate (vertikalno kretanje)
    let score = 0;
    let gameInterval;
    let gameSpeed = 150; // Brzina igre u milisekundama (manji broj = brže)
    let gameStarted = false;

    // Funkcija za crtanje zmije
    function drawSnakePart(snakePart) {
        ctx.fillStyle = '#2ecc71'; // Zelena boja zmije
        ctx.strokeStyle = '#27ae60'; // Tamnija zelena za obrub
        ctx.fillRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
    }

    // Funkcija za crtanje zmije
    function drawSnake() {
        snake.forEach(drawSnakePart);
    }

    // Funkcija za generiranje nasumične pozicije hrane
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

        // Provjeri da hrana ne bude na poziciji zmije
        snake.forEach(part => {
            const foodIsOnSnake = (part.x === food.x && part.y === food.y);
            if (foodIsOnSnake) {
                generateFood(); // Ako je, generiraj ponovno
            }
        });
    }

    // Funkcija za crtanje hrane
    function drawFood() {
        ctx.fillStyle = '#e74c3c'; // Crvena boja hrane
        ctx.strokeStyle = '#c0392b'; // Tamnija crvena za obrub
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    // Funkcija za pomicanje zmije
    function moveSnake() {
        if (!gameStarted) return; // Nemoj micati zmiju ako igra nije pokrenuta

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Provjera kolizije sa zidovima
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            endGame();
            return;
        }

        // Provjera kolizije sa samom sobom
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                endGame();
                return;
            }
        }

        snake.unshift(head); // Dodaj novu glavu zmije

        // Ako je zmija pojela hranu
        const hasEatenFood = (head.x === food.x && head.y === food.y);
        if (hasEatenFood) {
            score += 10;
            scoreDisplay.textContent = score;
            generateFood(); // Generiraj novu hranu
            // Opcionalno: povećaj brzinu igre
            // if (gameSpeed > 50) {
            //     gameSpeed -= 5;
            //     clearInterval(gameInterval);
            //     gameInterval = setInterval(gameLoop, gameSpeed);
            // }
        } else {
            snake.pop(); // Ukloni rep zmije ako nije pojela hranu
        }
    }

    // Glavna petlja igre
    function gameLoop() {
        ctx.clearRect(0, 0, canvasSize, canvasSize); // Obriši cijeli canvas
        drawFood();
        moveSnake();
        drawSnake();
    }

    // Funkcija za promjenu smjera zmije
    function changeDirection(event) {
        if (!gameStarted) return; // Ne dopusti promjenu smjera ako igra nije pokrenuta

        const keyPressed = event.keyCode;
        const goingUp = dy === -1;
        const goingDown = dy === 1;
        const goingLeft = dx === -1;
        const goingRight = dx === 1;

        // Strelica lijevo
        if (keyPressed === 37 && !goingRight) {
            dx = -1;
            dy = 0;
        }
        // Strelica gore
        if (keyPressed === 38 && !goingDown) {
            dx = 0;
            dy = -1;
        }
        // Strelica desno
        if (keyPressed === 39 && !goingLeft) {
            dx = 1;
            dy = 0;
        }
        // Strelica dolje
        if (keyPressed === 40 && !goingUp) {
            dx = 0;
            dy = 1;
        }
    }

    // Inicijalizacija igre
    function initializeGame() {
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
        scoreDisplay.textContent = score;
        gameSpeed = 150;
        gameStarted = false;
        clearInterval(gameInterval); // Zaustavi prethodni interval ako postoji
        
        ctx.clearRect(0, 0, canvasSize, canvasSize); // Očisti canvas
        generateFood();
        drawFood();
        drawSnake();
        startButton.textContent = 'Pokreni Igru';
    }

    // Pokretanje igre
    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            startButton.textContent = 'Restartaj Igru';
            // Postavi početni smjer kretanja (npr. desno)
            dx = 1; 
            dy = 0;
            generateFood(); // Generiraj hranu pri pokretanju
            gameInterval = setInterval(gameLoop, gameSpeed);
        } else {
            initializeGame(); // Restartaj igru
        }
    });

    // Kraj igre
    function endGame() {
        gameStarted = false;
        clearInterval(gameInterval);
        alert(`Igra je gotova! Tvoj rezultat: ${score}`);
        initializeGame(); // Prikazuje "Pokreni Igru" i resetira stanje
    }

    // Sluša događaje s tipkovnice
    document.addEventListener('keydown', changeDirection);

    // Prvo inicijaliziraj igru pri učitavanju stranice
    initializeGame();
});
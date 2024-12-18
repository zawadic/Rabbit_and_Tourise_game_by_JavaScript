const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");

// Game variables
let hareX = 50;
let tortoiseX = 50;
let raceFinished = false;
let winner = "";

// Hare and Tortoise Images
const hareImg = new Image();
hareImg.src = "rabbit.png"; // Add your hare image here
const tortoiseImg = new Image();
tortoiseImg.src = "tourtise.png"; // Add your tortoise image here

// Draw the race track
function drawTrack() {
    // Background
    ctx.fillStyle = "#98FB98"; // Grass green
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track lines
    ctx.fillStyle = "#8B4513"; // Brown dirt
    ctx.fillRect(0, 150, canvas.width, 100);
    ctx.fillStyle = "#000"; // Start and Finish lines
    ctx.fillRect(50, 150, 10, 100); // Start Line
    ctx.fillRect(750, 150, 10, 100); // Finish Line
}

// Draw the characters
function drawCharacters() {
    ctx.drawImage(hareImg, hareX, 160, 50, 50);
    ctx.drawImage(tortoiseImg, tortoiseX, 210, 50, 50);
}

// Update positions
function updatePositions() {
    if (!raceFinished) {
        hareX += Math.random() * 10; // Hare moves randomly
        tortoiseX += Math.random() * 5; // Tortoise moves slowly but steadily

        // Random chance for the hare to nap
        if (Math.random() < 0.01) {
            hareX -= 5; // Hare loses some progress
        }

        // Check for winner
        if (hareX >= 750 || tortoiseX >= 750) {
            raceFinished = true;
            winner = hareX > tortoiseX ? "Hare 🐇" : "Tortoise 🐢";
            setTimeout(showWinner, 500);
        }
    }
}

// Show the winner
function showWinner() {
    alert(`${winner} Wins the Race!`)

}

// Reset game
function resetGame() {
    hareX = 50;
    tortoiseX = 50;
    raceFinished = false;
    winner = "";
    drawGame();
}

// Game loop
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrack();
    drawCharacters();
    updatePositions();
    if (!raceFinished) {
        requestAnimationFrame(drawGame);
    }
}

// Start game
startBtn.addEventListener("click", () => {
    resetGame();
    drawGame();
});

// Load images and start the game
hareImg.onload = tortoiseImg.onload = drawGame;

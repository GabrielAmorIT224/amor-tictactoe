document.addEventListener("DOMContentLoaded", function () {
    // Hide Game Screen
    document.getElementById("game-screen").style.display = "none";

    let playerXScore = 0;
    let playerOScore = 0;

    // Score Board
    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

    // "Next Round" button
    const nextRoundButton = document.getElementById("next-round");

    // "Play Again" button
    const playAgainButton = document.getElementById("play-again");

    // "Play Game" button
    document.getElementById("human").addEventListener("click", function () {
        // Hide Home Screen
        document.getElementById("home-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
    });

    let boxes = document.querySelectorAll(".box");
    let turn = "X";
    let isGameOver = false;
    let boardClickable = true;

    boxes.forEach(e => {
        e.innerHTML = "";
        e.addEventListener("click", () => {
            if (!isGameOver && boardClickable && e.innerHTML === "") {
                e.innerHTML = turn;
                if (Win()) {
                    // Increment the score of the winner
                    if (turn === "X") {
                        playerXScore++;
                    } else {
                        playerOScore++;
                    }

                    // Update scores on the score board
                    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
                    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

                    if (playerXScore < 5 && playerOScore < 5) {
                        nextRoundButton.style.display = "inline";
                    }

                    // Check if a player reached 5 points
                    if (playerXScore === 5 || playerOScore === 5) {
                        isGameOver = true;
                        document.querySelector("#results").innerHTML = turn + " wins the game!";
                        playAgainButton.innerHTML = "Play Again";
                        playAgainButton.style.display = "inline";
                        nextRoundButton.style.display = "none";
                    }

                    boardClickable = false;
                } else {
                    Draw();
                    changeTurn();
                }
            }
        });
    });

    function changeTurn() {
        if (turn === "X") {
            turn = "O";
            document.querySelector(".bg").style.left = "85px";
        } else {
            turn = "X";
            document.querySelector(".bg").style.left = "0";
        }
    }

function Win(){
    let winConditions = [

        //Padagdag nalang huhu masyadong madami pota

        //1st ROW WINS - HORIZONTAL
        [0, 1, 2], [3, 4, 5], [1, 2, 3], [2, 3, 4],  
        //2nd ROW WINS - HORIZONTAL
        [6, 7, 8], [9, 10, 11], [7, 8, 9], [8, 9, 10], 
        //3rd ROW WINS - HORIZONTAL
        [12, 13, 14], [15, 16, 17], [13, 14, 15], [14, 15, 16],
        //4th ROW WINS - HORIZONTAL
        [18, 19, 20], [21, 22, 23], [19, 20, 21], [20, 21, 22],
        //5th ROW WINS - HORIZONTAL
        [24, 25, 26], [27, 28, 29], [25, 26, 27], [26, 27, 28]


    ]

    
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            // Highlight the winning cells
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#FF2E63";
                boxes[winConditions[i][j]].style.color = "#000";
            }
            return true; 
        }
    }
    return false; 
}

function Draw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            nextRoundButton.style.display = "inline";
        }
    }
}

function resetGame() {
    // Reset turn to X
    turn = "X";
    document.querySelector(".bg").style.left = "0";

    // Reset the board
    resetBoard();
    boardClickable = true;
}


function resetBoard() {
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
}

playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    document.querySelector("#results").innerHTML = "";
    playAgainButton.style.display = "none";

    // Reset scores on the score board
    playerXScore = 0;
    playerOScore = 0;

    document.getElementById("player-x-score").innerHTML = "X: " + playerXScore;
    document.getElementById("player-o-score").innerHTML = "O: " + playerOScore;

    resetGame();
});

nextRoundButton.addEventListener("click", () => {
    // Reset the board for the next round

    resetBoard();
    nextRoundButton.style.display = "none";
    isGameOver = false; 
    document.querySelector("#results").innerHTML = "";

    resetGame();
    boardClickable = true;
});
});
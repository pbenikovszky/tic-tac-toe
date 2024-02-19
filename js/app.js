const mainMenuDiv = document.querySelector(".main-menu-container");
const gameAreaDiv = document.querySelector(".game-area-container");

const startBtn = document.querySelector("#startBtn");
const btnBack = document.querySelector("#btnBack");

startBtn.addEventListener("click", function () {
    hideDiv(mainMenuDiv);
    showDiv(gameAreaDiv);
    resetGame();
});

btnBack.addEventListener("click", function () {
    hideDiv(gameAreaDiv);
    showDiv(mainMenuDiv);
});

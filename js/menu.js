const cbPvp = document.querySelector("#cbPvp");
const cbHardcoreAI = document.querySelector("#cbHardcoreAI");
const cbEasyAI = document.querySelector("#cbEasyAI");

let selectedOption = null;
setSelectedOption("hardcoreAI");

cbPvp.addEventListener("click", function () {
    setSelectedOption("pvp");
});

cbEasyAI.addEventListener("click", function () {
    setSelectedOption("easyAI");
});

cbHardcoreAI.addEventListener("click", function () {
    setSelectedOption("hardcoreAI");
});

function setSelectedOption(option) {
    if (selectedOption === option) {
        return;
    }

    selectedOption = option;
    switch (selectedOption) {
        case "pvp":
            cbPvp.innerHTML = "X";
            cbEasyAI.innerHTML = "";
            cbHardcoreAI.innerHTML = "";
            break;
        case "easyAI":
            cbPvp.innerHTML = "";
            cbEasyAI.innerHTML = "X";
            cbHardcoreAI.innerHTML = "";
            break;
        case "hardcoreAI":
            cbPvp.innerHTML = "";
            cbEasyAI.innerHTML = "";
            cbHardcoreAI.innerHTML = "X";
            break;
    }
}

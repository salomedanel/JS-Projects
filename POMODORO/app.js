let workingTime = 1800;
let breakTime = 300;

const displayWork = document.querySelector(".working-time");
const displayBreak = document.querySelector(".break-time");

function populateTime() {
    displayWork.textContent = `${formatTime(workingTime)}`;
    displayBreak.textContent = `${formatTime(breakTime)}`;
}

populateTime();

function formatTime(time) {
    const formatedTime = `${Math.trunc(time / 60)}:${time % 60 < 10 ?  `0${time % 60}` : time % 60}`;
    return (formatedTime);
}

const playBtn = document.querySelector(".play-pause");
let pause = true;

playBtn.addEventListener("click", togglePomodoro);

let currentInterval = false;
let timerID;

function togglePomodoro() {
    handlePlayPause();
    if (currentInterval) return;
    currentInterval = true;

    workingTime--;
    displayWork.textContent = `${formatTime(workingTime)}`;
    timerID = setInterval(handleTicks, 1000);
}

function handlePlayPause() {
    if (playBtn.getAttribute("data-toggle") === "play") {
        pause = false;
        playBtn.setAttribute("data-toggle", "pause");
        playBtn.firstElementChild.src = "pause.png";
    }
    else {
        pause = true;
        playBtn.setAttribute("data-toggle", "play");
        playBtn.firstElementChild.src = "play.png";
    }
}

const cycles = document.querySelector(".cycles");
let nbCycles = 0;

function handleTicks() {
    if (!pause && workingTime > 0) {
        workingTime--;
        displayWork.textContent = `${formatTime(workingTime)}`;
    }
    else if (!pause && !workingTime && breakTime > 0) {
        breakTime--;
        displayBreak.textContent = `${formatTime(breakTime)}`;
    }
    else if (!pause && !workingTime && !breakTime) {
        workingTime = 1800 - 1;
        breakTime = 300;
        displayWork.textContent = `${formatTime(workingTime)}`;
        displayBreak.textContent = `${formatTime(breakTime)}`;
        nbCycles++;
        cycles.textContent = `Cycles(s): ${nbCycles}`;
    }
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", reset);

function reset() {
    workingTime = 1800;
    breakTime = 300;

    displayWork.textContent = `${formatTime(workingTime)}`;
    displayBreak.textContent = `${formatTime(breakTime)}`;
    nbCycles = 0;
    cycles.textContent = `Cycles(s): ${nbCycles}`;
    clearInterval(timerID);
    currentInterval = false;
    pause = true;

    playBtn.setAttribute("data-toggle", "play");
    playBtn.firstElementChild.src = "play.png";
}

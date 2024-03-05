
// var
//  btn play
//  temps travail
//  temps repos
//  btn restart
//  playing = false;
//  timeType = work;

// function
//  passingTime(timeType, playing)



// on button play clicked
//  change playing status
//  
//  log actual time
//  Si timeType === 'work' tant que diff avec now < 30min -> display time ecoule chaque seconde
//  Si timeType === 'break' tant que diff avec now < 5min -> display time ecoule chaque seconde

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
    const formatedTime = `${time / 60}:${time % 60 < 10 ?  `0${time % 60}` : time % 60}`;
    return (formatedTime);
}

const playBtn = document.querySelector(".play-pause");
let playing = false;
let timeType = 'work';

playBtn.addEventListener("click", () => {
    playing = togglePlaying(playing)
    timeType = toggleTimeType(timeType);
    //passingTime(playing, timeType)
});

function togglePlaying(playing) {
    console.log("Debut fonction: " + playing);
    playing = playing ? false : true;
    console.log("Fin fonction: " + playing);
}

function toggleTimeType(timeType) {
    console.log("Debut fonction: " + timeType);
    if (timeType === 'work')
        timeType = 'break';
    console.log("Fin fonction: " + timeType);
}

// function passingTime(playing, timeType) {
// }

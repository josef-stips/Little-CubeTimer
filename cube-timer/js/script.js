let timeField = document.getElementById("time-area");
let CurrentSolveArea = document.getElementById("CurrentSolve-area");
let LastSolveArea = document.getElementById("LastSolve-area");
let SolveCountArea = document.getElementById("SolveCount-area");
let MeanArea = document.getElementById("MeanArea");
let timeTableArea = document.getElementById("timestablebody");
let scrambleArea = document.getElementById("scramble");
let ao5_table = document.getElementsByClassName("ao5-table")
let ao12_table = document.getElementsByClassName("ao12-table")

let abort_button = document.getElementById('abort-button');
let NScramble_button = document.getElementById('NewScramble-button');


let ao5TF = document.getElementById("ao5-tf")
let ao12TF = document.getElementById("ao12-tf")

document.body.addEventListener('keydown', KeytriggerDown);
document.body.addEventListener('keyup', KeytriggerUp);

let timer; // The Timer that counts up
let CountDown; //The Count Down

let misecs = 0;
let msecs = 0;
let secs = 0;
let mins = 0;

window.onload = () => {
    UpdateScramble()
}

timeField.innerHTML = `${secs}.${msecs}${misecs}`;

NScramble_button.addEventListener('click', UpdateScramble);

function KeytriggerDown() {
    //do what you want after key is pressed
    if (TimerIsOn == false && UserIsReady == false && CountDownTimerIsOn == false || TimerIsOn == false && allOkay == false) {

        countdown()
        startCountDown()

        //background audio configuration
        audio.play()
        audio.volume = 0.05;
        audio.loop = true;

        timeField.style.color = "red"; //red

        TimerIsOn = true;
        CountDownTimerIsOn = true;

    } else if (TimerIsOn == true && CountDownTimerIsOn == true || TimerIsOn == true && allOkay == true) {

        if (UserIsReady == false) {

            timeField.style.color = "rgba(239, 239, 52, 0.866)"; //yellow

            TimeOutToYellow = setTimeout(() => {
                timeField.style.color = "rgb(44, 215, 44)" //green
                UserIsReady = true;
            }, 200);


        } else {
            timeField.style.color = "rgb(44, 215, 44)"; //green

        }
    }

}

function KeytriggerUp() {
    if (UserIsReady == true && CountDownTimerIsOn == true || UserIsReady == true && allOkay == true) {

        timeField.style.color = "white"; //white

        clearTimeout(CountDown)
        clearTimeout(TimeOutToYellow)

        allOkay = false;

        CountDownTimerIsOn = false;

        TimerIsOn = true;

        CountDownIsDone = true;

        start()

    } else if (UserIsReady == false && CountDownTimerIsOn == true || UserIsReady == false && allOkay == true) {

        timeField.style.color = "red"; //red

        clearTimeout(TimeOutToYellow)
        UserIsReady = false;
    }

    if (TimerIsOn == true && CountDownTimerIsOn == false && allOkay == false && CountDownIsDone == true && CountUpTimerIsOn == true) {
        StopTimer()

    }
}

function startCountDown() {
    CountDown = setInterval(function() { countdown() }, 1000);

    abort_button.style.display = 'block';
    NScramble_button.style.display = 'block';
}

function start() {
    timer = setInterval(function() { update() }, 10);

    timeField.style.color = "white"; //white
}


function countdown() {

    if (CountDownIsDone == false) {
        countdownSecs--;
        timeField.innerHTML = countdownSecs;
    }

    if (countdownSecs == 0 && CountDownIsDone == false) {

        CountDownIsDone = true;
        CountDownTimerIsOn = false;

        clearInterval(CountDown)

        OverTake() //The User did not press a key on his keyboard while that 15 seconds
    }
}

function update() {
    timeField.style.color = "white"; //white

    CountUpTimerIsOn = true

    if (misecs == 9) {
        msecs++;
        misecs = 0;
    } else {
        misecs++;
    }

    if (msecs > 9) {
        msecs = 0
        secs++;
    }

    if (secs > 59) {
        mins++;
        secs = 0;
    }

    if (msecs < 10 && mins < 1) {
        timeField.innerHTML = `${secs}.${msecs}${misecs}`;

    }

    if (mins > 0 && secs < 10) {
        timeField.innerHTML = `${mins}:0${secs}.${msecs}${misecs}`;
    } else if (mins > 0) {
        timeField.innerHTML = `${mins}:${secs}.${msecs}${misecs}`;
    }
}

function StopTimer() {
    clearInterval(timer);

    TimerIsOn = false;
    UserIsReady = false;
    CountDownTimerIsOn = false;
    CountDownIsDone = false;
    allOkay = false;
    CountUpTimerIsOn = false;

    countdownSecs = 21;

    addSolve();
}

function abortTimer() {
    clearInterval(timer);
    clearInterval(CountDown)

    TimerIsOn = false;
    UserIsReady = false;
    CountDownTimerIsOn = false;
    CountDownIsDone = false;
    allOkay = false;
    CountUpTimerIsOn = false;
    OverTakeIsOn = false;

    countdownSecs = 21;

    mins = 0;
    secs = 0;
    msecs = 0;
    misecs = 0;

    timeField.innerHTML = `${secs}.${msecs}${misecs}`;
    timeField.style.color = "white"; //white
}


function OverTake() {
    timeField.innerHTML = `+2`
    setToDNF = setTimeout(() => {
        timeField.innerHTML = `DNF`
    }, 2000);

    OverTakeIsOn = true;
    allOkay = true;

    console.log("hallllllllllllllllllllllllllllllllllllllllllllllllllllo")
}

function addSolve() {

    SolveCount++;
    LastSolveCount++;

    if (msecs < 10 && mins < 1 && OverTakeIsOn == false) {
        console.log(`${secs}.${msecs}${misecs}`);

        UserSolves.push(parseFloat(`${secs}.${msecs}${misecs}` * 100) / 100);

        UserSolvesOnDisplay.push(parseFloat(`${secs}.${msecs}${misecs}` * 100) / 100);
    }

    if (mins > 0 && secs < 10 && OverTakeIsOn == false) {
        UserSolvesOnDisplay.push(`${mins}:0${secs}.${msecs}${misecs}`);

        mins = mins * 100 - 40 * mins // mins = mins / 60 um Sekunden wieder in minuten umzuwandeln

        UserSolves.push(parseFloat(`${mins + secs}.${msecs}${misecs}` * 100) / 100);

        console.log(mins + "  mins")

        console.log(`${mins + secs}.${msecs}${misecs}`);

    } else if (mins > 0 && OverTakeIsOn == false) {
        UserSolvesOnDisplay.push(`${mins}:${secs}.${msecs}${misecs}`);

        mins = mins * 100 - 40 * mins // mins = mins / 60 um Sekunden wieder in minuten umzuwandeln

        UserSolves.push(parseFloat(`${mins + secs}.${msecs}${misecs}` * 100) / 100);

        console.log(mins + "  mins")

        console.log(`${mins + secs}.${msecs}${misecs}`);

    } else if (OverTakeIsOn == true) {

        UserSolvesOnDisplay.push(`DNF`);

        mins = mins * 100 - 40 * mins // mins = mins / 60 um Sekunden wieder in minuten umzuwandeln

        UserSolves.push(parseFloat(`${mins + secs}.${msecs}${misecs}` * 100) / 100);

        console.log(mins + "  mins")

        console.log(`${mins + secs}.${msecs}${misecs}`);
    }

    console.log("Overtake = " + OverTakeIsOn)

    OverTakeIsOn = false

    if (SolveCount > 0) {
        LastSolveArea.innerHTML = LastSolve;
    }

    CurrentSolve = UserSolvesOnDisplay[SolveCount];

    LastSolve = UserSolvesOnDisplay[LastSolveCount];

    CurrentSolveArea.innerHTML = CurrentSolve;

    SolveCountArea.innerHTML = `${UserSolves.length}/${UserSolves.length}`;


    addToTimeTable(CurrentSolve)

    if (UserSolves.length >= 12) {
        ao12()
    }

    if (UserSolves.length >= 5) {
        ao5()
    }

    if (UserSolves.length < 5) {
        UserAverageInSolve5.push(0)
    }

    if (UserSolves.length < 12) {
        UserAverageInSolve12.push(0)
    }

    console.log(UserAverageInSolve5 + " 5")
    console.log(UserAverageInSolve12 + " 12")

    if (mins > 0 && secs < 10 && SolveCount == 0) {
        MeanArea.innerHTML = `${mins / 60}:0${secs}.${msecs}${misecs}`


    } else if (mins > 0 && SolveCount == 0) {
        MeanArea.innerHTML = `${mins / 60}:${secs}.${msecs}${misecs}`


    } else if (SolveCount > 0 || mins <= 0) {
        findMean(UserSolves, MeanArea)
    }

    UpdateScramble()

    misecs = 0;
    msecs = 0;
    secs = 0;
    mins = 0;



}

function addToTimeTable(currTime) {
    if (SolveCount <= 0) {
        timeTableArea.innerHTML = `
        <tr>
        <th>&#x2647;</th>
        <th>time</th>
        <th>ao5</th>
        <th>ao12</th>
    </tr>
    <tr data="${SolveCount}">
        <td>
            ${UserSolves.length}
        </td>
        <td>
            ${currTime}
        </td>
        <td class="ao5-table">
            -
        </td>
        <td class="ao12-table">
            -
        </td>
    </tr>`

    } else {
        timeTableArea.innerHTML += `
        <tr data="${SolveCount}">
        <td>
            ${UserSolves.length}
        </td>
        <td>
            ${currTime}
        </td>
        <td class="ao5-table">
            -
        </td>
        <td class="ao12-table">
            -
        </td>
    </tr>
    `
    }
}

function findMean(arr, inner) {
    let n = arr.length;
    let mean = 0;

    if (arr.length > 0) {
        arr.forEach((value, index) => {
            let currNumb = value;

            mean += currNumb;
        })
        mean = mean / n;

        inner.innerHTML = (Math.round(mean * 100) / 100).toFixed(2);
        console.log(mean)
    }
}


function ao5() {
    let UserSolvesCopy = [];

    let number = 0

    UserSolves.reverse(function(a, b) { return a - b })

    console.table(UserSolves)

    UserSolves.forEach((value, index) => {
        if (number < 5) {
            UserSolvesCopy.push(value);
        }
        number++;
    });

    UserSolvesCopy.sort(function(a, b) { return a - b });

    UserSolvesCopy.pop()
    UserSolvesCopy.shift()

    UserSolves.reverse(function(a, b) { return a - b });

    console.table(UserSolvesCopy)
    console.table(UserSolves)

    findAO5(UserSolvesCopy)

}


function ao12() {
    let UserSolvesCopy = [];

    let number = 0

    UserSolves.reverse(function(a, b) { return a - b })

    console.table(UserSolves)

    UserSolves.forEach((value, index) => {
        if (number < 12) {
            UserSolvesCopy.push(value);
        }
        number++;
    });

    UserSolvesCopy.sort(function(a, b) { return a - b });

    UserSolvesCopy.pop()
    UserSolvesCopy.shift()

    UserSolves.reverse(function(a, b) { return a - b });

    console.table(UserSolvesCopy)
    console.table(UserSolves)

    findAO12(UserSolvesCopy)

}

function findAO12(arr) {
    let n = arr.length;
    let means = 0;

    if (arr.length > 0) {
        arr.forEach((value, index) => {
            let currNumb = value;

            means += currNumb;
        })
        means = means / n;

        ao12TF.innerHTML = `ao12: ${(Math.round(means * 100) / 100).toFixed(2)}`;

        UserAverageInSolve12.push(means);

        console.log(UserAverageInSolve12)

        addMeanToTable12(means, UserAverageInSolve12.length - 1)

    }
};

function findAO5(arr) {
    let n = arr.length;
    let mean = 0;

    if (arr.length > 0) {
        arr.forEach((value, index) => {
            let currNumb = value;

            mean += currNumb;
        })
        mean = mean / n;

        ao5TF.innerHTML = `ao5: ${(Math.round(mean * 100) / 100).toFixed(2)}`;

        UserAverageInSolve5.push(mean);

        console.log(UserAverageInSolve5)

        addMeanToTable5(mean, UserAverageInSolve5.length - 1)


    }
};

function UpdateScramble() {
    scrambleArea.innerHTML = null

    let sa = shuffledArray(scramble);

    sa.forEach((value, index) => {
        scrambleArea.innerHTML += sa[index];
    })


}


function addMeanToTable5(data, numb_loc) {
    let table_data_child = document.querySelector(`[data="${numb_loc}"]`).querySelector('[class="ao5-table"]');

    table_data_child.innerHTML = `${(Math.round(data * 100) / 100).toFixed(2)}`

    console.log(table_data_child)
    console.log(numb_loc)
}

function addMeanToTable12(data, numb_loc) {
    let table_data_child = document.querySelector(`[data="${numb_loc}"]`).querySelector('[class="ao12-table"]');

    table_data_child.innerHTML = `${(Math.round(data * 100) / 100).toFixed(2)}`

    console.log(table_data_child)
    console.log(numb_loc)
}
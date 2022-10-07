let countdownSecs = 21; // Count Down Timer Seconds

let CountDownIsDone = false //Checks if the 15 seconds count down timer is already done (on second 0 or )

let TimerIsOn = false // The Timer itself is on. 

let CountDownTimerIsOn = false // The 15 seconds Count Down Timer is on/not on

let UserIsReady = false //User is ready to start to solve the cube

let OverTakeIsOn = false // Checks if the user is over 15 seconds but not ready (DNF or +2)

let CountUpTimerIsOn = false

let allOkay = false

let audio = new Audio('/res/sickkunt-music.mp3')

let UserResult; //It can be a number but also a string when the User gets a DNF or +2

let UserSolves = [];

let UserSolvesOnDisplay = [];

let UserAverageInSolve5 = [];
let UserAverageInSolve12 = [];

let CurrentSolve;
let LastSolve;

let SolveCount = -1
let LastSolveCount = -1

let scramble = ['F', 'R', 'U', 'B', 'L', "F'", "R'", "B'", "L'", "D'", "L2", "U2", "R2", "D2"];

const shuffledArray = (arr) => arr.sort(() => Math.random() - 0.4);
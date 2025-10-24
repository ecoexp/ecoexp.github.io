const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const bgd_popup = document.querySelector(".container");
const alert_box = document.querySelector(".alert_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const close_btn = document.getElementById("close_id");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const cancel_btn = document.querySelector("footer .cancel_btn");

const response_fruit = [];
var Choice_Time = 0;
const response_cost = [];
const response_origin = [];
const agent_policy = [];
agent_policy[0] = "SS";
var action_count = 1;
const response_impact = [];
const choice_time_data = [];
const choice_time_label = [];
const response_reward = [];
const response_time = [];
var matrix = [];
let selectedOption = null;
let updated_fruits = [];

var budget_group = "LB";
var base_group = "_B";
var sTime = new Date();
var eTime = new Date();

// timer() is defined later, but function declarations are hoisted,
// so it's safe to call here.
const myTimer = timer();

var durationSec = 0;

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
    bgd_popup.style.display = 'block';
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");
    alert_box.classList.remove("activeAlert");
};

close_btn.onclick = () => {
    myTimer.stop();
    quiz_box.classList.remove("activeQuiz");
    bgd_popup.style.display = 'none';
};

cancel_btn.onclick = () => {
    myTimer.stop();
    quiz_box.classList.remove("activeQuiz");
    bgd_popup.style.display = 'none';
};

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    bgd_popup.style.display = 'none';
};

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    bgd_popup.style.display = 'block';
    result_box.classList.remove("activeResult");
    alert_box.classList.remove("activeAlert");
};

let small_index = 0;
let selection_index = 0;
const arr = [];
let timeValue = 13;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
var money_spend = 0.0;
var total_impact = 0.0;
var state_count = 0;
var optimal_impact = 22.27;
var optimal_items = 5;

var cflag = 0;
var b_fruits = 0;
var e_fruits = 0;
var e_items = 0;
var money_left = 0.0;
let counterLine;
let widthValue = 0;
var t_temp = 0;
var flag = 0;
var attempts = 0;
var c_sln = 0;
var f_number = 0;
let userAns = "nill";

var q = 0;
var o = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const restart_alert = alert_box.querySelector(".buttons .restart");
const quit_alert = alert_box.querySelector(".buttons .quit");

// ====== GROUP ASSIGNMENT LOGIC ======
var a_group = localStorage.getItem('a_group');
if (!a_group) {
    a_group = '01';
    localStorage.setItem('a_group', '11');
}
var bgroups = 0;
var baseline = 0;
console.debug(a_group);

if (a_group == '00') {
    bgroups = 0;
    localStorage.setItem('a_group', '01');
}
if (a_group == '10') {
    bgroups = 1;
    localStorage.setItem('a_group', '11');
}
if (a_group == '01') {
    bgroups = 0;
    baseline = 1;
}
if (a_group == '11') {
    bgroups = 1;
    baseline = 1;
}

// ====== BUDGET SETUP ======
var budget = 21.50;
const eurosElement = document.querySelector('.euros');
eurosElement.textContent = budget.toFixed(2) + ' Euros';
const info_m = document.getElementById('info_m');

if (baseline == 1) {
    const infoListElement = document.querySelector('.info-list');
    info_m.hidden = false;
    base_group = "_T";
}

if (bgroups == 1) {
    budget = 28.00;
    budget_group = "HB";
    optimal_impact = 20.2;
    optimal_items = 10;
    eurosElement.textContent = budget.toFixed(2) + ' Euros';
    const noteElement = document.querySelector('.complete_text b');
    if (noteElement) {
        noteElement.textContent = 'Note: After confirming this, you will complete this study.';
    }
}

// ====== FIREBASE SETUP ======
const firebaseConfig = {
    apiKey: "AIzaSyAjxcNAb1pZI4usSK1jzxhHx0x1KNn6rO8",
    authDomain: "ecological-experiment-da-a196d.firebaseapp.com",
    databaseURL: "https://ecological-experiment-da-a196d-default-rtdb.firebaseio.com",
    projectId: "ecological-experiment-da-a196d",
    storageBucket: "ecological-experiment-da-a196d.appspot.com",
    messagingSenderId: "48549347586",
    appId: "1:48549347586:web:0caac946b0b64bb0f6821b"
};

firebase.initializeApp(firebaseConfig);

var userdata = firebase.database().ref("UserData_Experiment_Class_24_10_2025");
var uniqueId = localStorage.getItem('pre_study_unique_id');

// ====== ON LOAD ======
window.onload = codeAddress;

function codeAddress() {
    generateTableRows();
    sTime = new Date(); // Store current time
    document.getElementById("bg").innerHTML = budget.toFixed(2);
    document.getElementById("id1").innerHTML = uniqueId;

    // Show instruction popup on load
    info_box.classList.add("activeInfo");
    bgd_popup.style.display = 'block';
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");
    alert_box.classList.remove("activeAlert");

    timeValue = 13;
    for (let i = 0; i < 10; i++) {
        response_fruit[i] = 0;
        response_cost[i] = 0;
        response_time[i] = 0;
        response_origin[i] = 0;
        response_impact[i] = 0;
        response_reward[i] = 0;
    }
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // load first choice UI
    queCounter(que_numb);    // update footer "1 of 10"
    clearInterval(counter);
    clearInterval(counterLine);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
    cancel_btn.classList.remove("show");
}

// ====== CHECKOUT POPUP ======
function stop_exp() {
    const completeText = document.getElementById('txt_check');
    const yesButton = document.getElementById('yes_b');
    const noButton = document.getElementById('no_b');

    alert_box.classList.add("activeAlert");
    bgd_popup.style.display = 'block';
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");

    if (money_spend <= budget && c_sln == 10) {
        if (baseline == 0) {
            completeText.innerHTML = "<center>Do you really want to check out?<br><br> <b>Note: After confirming this, you will be directed to the second shopping task.</b></center>";
        } else {
            completeText.innerHTML = "<center>Do you really want to check out?<br><br> <b>Note: After confirming, you finish this study.</b></center>";
        }
        yesButton.style.display = 'block';
        yesButton.textContent = 'Yes';
        noButton.textContent = 'No';
    } else {
        completeText.innerHTML = "<center>Unable to Checkout! <br><br> <b>Please select all 10 items within the given budget</b></center>";
        yesButton.style.display = 'none';
        noButton.textContent = 'Okay';
    }
}

// ====== ITEM CLICK ======
function myFunction(x) {
    next_btn.classList.remove("show");
    cancel_btn.classList.remove("show");
    info_box.classList.remove("activeInfo");
    alert_box.classList.remove("activeAlert");
    quiz_box.classList.add("activeQuiz");
    bgd_popup.style.display = 'block';
    showQuetions(x);
    f_number = x + 1;
    myTimer.start();
}

// ====== QUIT / ALERT / RESTART ======
quit_quiz.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");
    bgd_popup.style.display = 'none';
};

quit_alert.onclick = () => {
    alert_box.classList.remove("activeAlert");
    bgd_popup.style.display = 'none';
};

restart_alert.onclick = () => {
    showResult();
    if (baseline == 0) {
        window.location.reload();
    } else {
        window.location.href = 'thank_you.html';
    }
};

// ====== (rest of your functions stay the same: generateTableRows, next_btn.onclick, showQuetions, optionSelected, showResult, queCounter) ======


// ====== TIMER UTILITY (fixed) ======
function timer() {
    let startTime = null;
    let endTime = null;
    let running = false;

    function start() {
        running = true;
        startTime = new Date();
    }

    function stop() {
        if (!running || !startTime) {
            running = false;
            return 0;
        }
        running = false;
        endTime = new Date();
        const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
        return elapsedTime;
    }

    function reset() {
        startTime = null;
        endTime = null;
        running = false;
    }

    return { start, stop, reset };
}

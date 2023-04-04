
const firebaseConfig = {
    apiKey: "AIzaSyAjxcNAb1pZI4usSK1jzxhHx0x1KNn6rO8",
    authDomain: "ecological-experiment-da-a196d.firebaseapp.com",
    databaseURL: "https://ecological-experiment-da-a196d-default-rtdb.firebaseio.com",
    projectId: "ecological-experiment-da-a196d",
    storageBucket: "ecological-experiment-da-a196d.appspot.com",
    messagingSenderId: "48549347586",
    appId: "1:48549347586:web:0caac946b0b64bb0f6821b"
    };
    
    // initialize firebase
firebase.initializeApp(firebaseConfig);
    
    // reference your database
var userdata = firebase.database().ref("UserData");
var uniqueId = localStorage.getItem('pre_study_unique_id');
//console.log(uniqueId); 






const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const alert_box = document.querySelector(".alert_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const close_btn = document.getElementById("close_id");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const cancel_btn = document.querySelector("footer .cancel_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const response_fruit = [];
const response_cost = [];
const response_origin = [];
const response_impact = [];
const response_reward = [];
const response_time = [];


// if startbutton clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    for(let i = 0; i < 10; i++){ 
        response_fruit[i]=-1;
        response_cost[i]=-1;
        response_origin[i]=-1;
        response_impact[i]=-1;
        response_reward[i]=-1;
        }
}
close_btn.onclick = ()=>{
    quiz_box.classList.remove("activeQuiz"); 
}
cancel_btn.onclick = ()=>{
    quiz_box.classList.remove("activeQuiz"); 
}

// if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(13); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}
const arr = [];
let timeValue =  13;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
var money_spend =0.0;
var total_impact =0.0;
var budget =20.00;
var b_fruits=0;
var money_left =0.0;
let counterLine;
let widthValue = 0;
var t_temp=0;
var flag=0;
var f_number="0";
let userAns ="nill";
const myTimer = timer();
var q=0;
var o=0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const restart_alert = alert_box.querySelector(".buttons .restart");
const quit_alert = alert_box.querySelector(".buttons .quit");

window.onload = codeAddress();

function codeAddress() {
    document.getElementById("bg1").innerHTML = budget.toFixed(0);
    document.getElementById("ml1").innerHTML = budget.toFixed(0);
    document.getElementById("id1").innerHTML = uniqueId;
   info_box.classList.add("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //show  box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 13; 
    //que_count = 0;
    for(let i = 0; i < 10; i++){ 
        response_fruit[i]=-1;
        response_cost[i]=-1;
        response_time[i]=-1;
        response_origin[i]=-1;
        response_impact[i]=-1;
        response_reward[i]=-1;
        }
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
    cancel_btn.classList.remove("show");
}


function stop_exp() {
   /* if(confirm("\bAlert!\nDo you really want to stop this experiment? \nKindly press 'OK' to stop and 'Cancel' to continue this experiment") == true){
        window.location.href = 'thank_you.html';
    }*/
    alert_box.classList.add("activeAlert"); //show result box

}


function myFunction(x) {
    next_btn.classList.remove("show");
    cancel_btn.classList.remove("show");
    info_box.classList.remove("activeInfo"); //hide info box
    info_box.classList.remove("activeAlert"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(x); //calling showQestions function
    f_number=x+1;
    myTimer.start();
}

// if restartQuiz button clicked


// if quit button clicked
quit_quiz.onclick = ()=>{
    window.location.href = 'https://forms.office.com/e/aS67p7jH0H';
}
quit_alert.onclick = ()=>{
    alert_box.classList.remove("activeAlert"); //hide info box
}

restart_alert.onclick = ()=>{
    window.location.href = 'thank_you.html';

}





// if Next  button clicked
next_btn.onclick = ()=>{
    progr(flag);
    changeStyle(questions[f_number-1].fruit);
    o=userAns[0];
    o=arr[o-1];
    console.log("submitted");
    //console.log(arr[userAns[0]]);
    q=f_number;
    //console.log(q);
    //console.log(o);
    response_fruit[que_count]=questions[f_number-1].fruit;
    response_cost[que_count]=questions[f_number-1].price[o];
    response_origin[que_count]=questions[f_number-1].origin[o];
    response_impact[que_count]=questions[f_number-1].impact[o];
    response_reward[que_count]=-1;
    console.log(response_origin[que_count]);
    console.log(o);
    console.log(questions[f_number-1].fruit);
    money_spend += parseFloat(questions[q-1].price[o]);
    total_impact += parseFloat(questions[q-1].impact[o]);
    money_left=budget-money_spend;
    document.getElementById("pr1").innerHTML = money_spend.toFixed(2);
    document.getElementById("ml1").innerHTML = money_left.toFixed(2);
    if(money_spend<budget){
        b_fruits=b_fruits+1;
    
    }
    if(money_spend>budget && flag==0){
        alert("You have crossed the budget.\nBut don't worry, kindly continue your shopping by selecting also the remaining items to complete this task. Select the order of the remaining items following the same principles as applied before");
        document.getElementById("budg").style.backgroundColor = "red";
        flag=1;
    }
    document.getElementById("fb1").innerHTML = b_fruits.toFixed(0);
    //console.log(money_left);
    quiz_box.classList.remove("activeQuiz"); 
    if(response_cost[que_count]==-1) {
        alert("Something went wrong in loading the experiment. Press OK to reload the experiment correctly.");
        window.location.reload();
    }
    if(que_count < questions.length - 1){ //if question count is less than total question length

       // console.log(response_time[que_count]);
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
        cancel_btn.classList.remove("show");
    }else{

        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
    if(response_cost[0]==-1) {
        alert("Something went wrong in loading the experiment. Press OK to reload the experiment correctly.");
        window.location.reload();
}
}

// getting questions and options from array
function showQuetions(index){
    // Fill array with numbers from 123 to 999
    for (let i = 0; i < 3; i++) {
        arr[i]=i;
        }
    
        // Shuffle the array using Fisher-Yates algorithm
        for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        //console.log(arr);
    
    
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].question +'&emsp;&emsp;&emsp;&emsp;&emsp;</span><img src="'+ questions[index].f_image[0] +'" width="50px" alt="Choice 1">';
    let option_tag = '<div class="option"><span>1. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[arr[0]]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[arr[0]]+'</strong></div>'
    + '<div class="option"><span>2. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[arr[1]]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[arr[1]]+'</strong></div>' 
    + '<div class="option"><span>3. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[arr[2]]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[arr[2]]+'</strong></div>' ;
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon tick"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
   
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    userAns = answer.textContent; //getting user selected option
  
    //response[que_count]=questions[f_number-1].fruit+userAns;
    
    
    //console.log(response_time[que_count]);
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    response_time[que_count]=myTimer.stop();
    console.log(response_time[que_count]);
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        //console.log("Correct Answer");
        //console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding cross icon to correct selected option
        //console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                //console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
    cancel_btn.classList.add("show");
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    var ipAddress ="nill";

    

    var newuserdata = userdata.push(); // store cloud
    var currentdate = new Date(); 
    var budget_group= "Low_Budget";
    var datetime = "Pres Study Conducted on" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

                
    for(let i = 0; i < 10; i++){ 

        if(response_cost[i]==-1)
            window.location.href = 'error.html';

    }

    newuserdata.set({
        Fruit_0: response_fruit[0], Origin_0: response_origin[0], Price_0: response_cost[0], EcoImpact_0: response_impact[0], Reward_0: response_reward[0], Time_0: response_time[0],
        Fruit_1: response_fruit[1], Origin_1: response_origin[1], Price_1: response_cost[1], EcoImpact_1: response_impact[1], Reward_1: response_reward[1], Time_1: response_time[1],
        Fruit_2: response_fruit[2], Origin_2: response_origin[2], Price_2: response_cost[2], EcoImpact_2: response_impact[2], Reward_2: response_reward[2], Time_2: response_time[2],
        Fruit_3: response_fruit[3], Origin_3: response_origin[3], Price_3: response_cost[3], EcoImpact_3: response_impact[3], Reward_3: response_reward[3], Time_3: response_time[3],
        Fruit_4: response_fruit[4], Origin_4: response_origin[4], Price_4: response_cost[4], EcoImpact_4: response_impact[4], Reward_4: response_reward[4], Time_4: response_time[4],
        Fruit_5: response_fruit[5], Origin_5: response_origin[5], Price_5: response_cost[5], EcoImpact_5: response_impact[5], Reward_5: response_reward[5], Time_5: response_time[5],
        Fruit_6: response_fruit[6], Origin_6: response_origin[6], Price_6: response_cost[6], EcoImpact_6: response_impact[6], Reward_6: response_reward[6], Time_6: response_time[6],
        Fruit_7: response_fruit[7], Origin_7: response_origin[7], Price_7: response_cost[7], EcoImpact_7: response_impact[7], Reward_7: response_reward[7], Time_7: response_time[7],
        Fruit_8: response_fruit[8], Origin_8: response_origin[8], Price_8: response_cost[8], EcoImpact_8: response_impact[8], Reward_8: response_reward[8], Time_8: response_time[8],
        Fruit_9: response_fruit[9], Origin_9: response_origin[9], Price_9: response_cost[9], EcoImpact_9: response_impact[9], Reward_9: response_reward[9], Time_9: response_time[9],
        Date_Time: datetime, Total_Money_Spend: money_spend, Total_Fruits: b_fruits, Total_impact: total_impact,_User_ID: uniqueId, Budget_Group: budget_group,UI_Order: orderedFruits,
    });

    if (b_fruits > 7){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ b_fruits +'</p> out of <p>10</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(b_fruits > 6){ // if user scored more than 1
        let scoreTag = '<span>and  nice 😎, You got <p>'+ b_fruits +'</p> out of <p>10</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>Bravo 😎, Grazie mille</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 13);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Out"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    //console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
        t_temp = time;
        
    }
    
    //console.log(response_time[que_count]);
    
}

function startTimerLine(time){
    counterLine = setInterval(timer, 160);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "%"; //increasing width of time_line with px by time value
        if(time > 100){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> fruits</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
function timer() {
    let startTime, endTime, running = false;
    
    function start() {
      if (running) {
 
        return;
      }
      running = true;
      startTime = new Date();

    }
    
    function stop() {
      if (!running) {

        return;
      }
      running = false;
      endTime = new Date();
      const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
      return elapsedTime;
    }
    
    return {
      start,
      stop
    };
  }
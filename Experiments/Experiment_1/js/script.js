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







const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const close_btn = document.getElementById("close_id");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const response = [];
const response_time = [];


// if startbutton clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    for(let i = 0; i < 10; i++){ 
        response[i]=-1;
        }
}
close_btn.onclick = ()=>{
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

let timeValue =  13;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
var money_spend =0.0;
var budget =20.00;
var b_fruits=0;
var money_left =0.0;
let counterLine;
let widthValue = 0;
var t_temp=0;
var flag=0;
var f_number="0";
let userAns ="nill";
var q=0;
var o=0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
function codeAddress() {
    document.getElementById("bg1").innerHTML = budget.toFixed(0);
}
window.onload = codeAddress;

function stop_exp() {
    if(confirm("Alert!\nDo you really want to stop this experiment? \nKindly press 'OK' to stop and 'Cancel' to continue this experiment") == true){
        window.location.href = 'thank_you.html';
    }
}


function myFunction(x) {
    next_btn.classList.remove("show");
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(x); //calling showQestions function
    f_number=x+1;
   
}

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show  box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 13; 
    que_count = 0;
    for(let i = 0; i < 10; i++){ 
        response[i]=-1;
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
}

// if quit button clicked
quit_quiz.onclick = ()=>{
    window.location.href = 'https://forms.office.com/e/ZKqQkN7CxF';
}



const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next  button clicked
next_btn.onclick = ()=>{
    progr(flag);
    //next_btn.classList.remove("show");
    changeStyle(questions[f_number-1].fruit);
    o=userAns[0];
    q=f_number;
    console.log(q);
    console.log(o);
    money_spend += parseFloat(questions[q-1].price[o-1]);
    money_left=budget-money_spend;
    document.getElementById("pr1").innerHTML = money_spend.toFixed(2);
    document.getElementById("ml1").innerHTML = money_left.toFixed(2);
    if(money_spend<budget){
        b_fruits=b_fruits+1;
    
    }
    if(money_spend>budget && flag==0){
        alert("You have crossed the budget. \nPlease continue by selecting your choice for the remaining fruits");
        
        flag=1;
    }
    document.getElementById("fb1").innerHTML = b_fruits.toFixed(0);
    console.log(money_left);
    quiz_box.classList.remove("activeQuiz"); 
    if(que_count < questions.length - 1){ //if question count is less than total question length
        if (t_temp==-1) {
            response_time[que_count] = -1;
          }
          else {
            response_time[que_count] = 13 - t_temp;
          }
        console.log(response_time[que_count]);
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
    }else{
        if (t_temp==-1) {
            response_time[que_count] = -1;
          }
          else {
            response_time[que_count] = 13 - t_temp;
          }
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].question +'&emsp;&emsp;&emsp;&emsp;&emsp;</span><img src="'+ questions[index].f_image[0] +'" width="50px" alt="Choice 1">';
    let option_tag = '<div class="option"><span>1. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[0]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[0]+'</strong></div>'
    + '<div class="option"><span>2. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[1]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[1]+'</strong></div>' 
    + '<div class="option"><span>3. Price: &emsp; &emsp; &emsp; &emsp;&nbsp;€ <strong>'
    +questions[index].price[2]+'</strong><br> &nbsp;  &nbsp; Origin: &emsp; &emsp; &emsp;&emsp;<strong>' 
    +questions[index].origin[2]+'</strong></div>' ;
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
  
    response[que_count]=f_number+userAns;

    //console.log(questions[0].price[0]);
    
    //console.log(response_time[que_count]);
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");


    var newuserdata = userdata.push(); // store cloud
  
    newuserdata.set({
      Response_1: response[0],
      Time_1: response_time[0],
      Response_2: response[1],
      Time_2: response_time[1],
      Response_3: response[2],
      Time_3: response_time[2],
      Response_4: response[3],
      Time_4: response_time[3],
      Response_5: response[4],
      Time_5: response_time[4],
      Response_6: response[5],
      Time_6: response_time[5],
      Response_7: response[6],
      Time_7: response_time[6],
      Response_8: response[7],
      Time_8: response_time[7],
      Response_9: response[8],
      Time_9: response_time[8],
      Response_10: response[9],
      Time_10: response_time[9],
    });
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and  nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
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
                    console.log("Time Off: Auto selected correct answer.");
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

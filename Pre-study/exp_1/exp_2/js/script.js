
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





let selectedOption = null; // track the selected option
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
const bottom_ques_counter = document.querySelector("footer .total_que");
const cancel_btn = document.querySelector("footer .cancel_btn");
const response_fruit = [];
const response_cost = [];
const response_origin = [];
const response_impact = [];
const response_reward = [];
const response_time = [];
var matrix = [];




// if startbutton clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    for(let i = 0; i < 10; i++){ 
        response_fruit[i]=0;
        response_cost[i]=0;
        response_origin[i]=0;
        response_impact[i]=0;
        response_reward[i]=0;
        }
}
close_btn.onclick = ()=>{
    myTimer.stop();
    quiz_box.classList.remove("activeQuiz"); 
}
cancel_btn.onclick = ()=>{
    myTimer.stop();
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
var budget =24.00;
var cflag=0;
var b_fruits=0;
var money_left =0.0;
let counterLine;
let widthValue = 0;
var t_temp=0;
var flag=0;
var attempts=0;
var c_sln=0;
var f_number=0;
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
        response_fruit[i]=0;
        response_cost[i]=0;
        response_time[i]=0;
        response_origin[i]=0;
        response_impact[i]=0;
        response_reward[i]=0;
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



// if quit button clicked
quit_quiz.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.remove("activeResult"); //show result box
    
}
quit_alert.onclick = ()=>{
    alert_box.classList.remove("activeAlert"); //hide info box
}

restart_alert.onclick = ()=>{
    showResult();
    window.location.href = 'thank_you.html';

}


  // Function to generate and fill the table rows
  function generateTableRows() {
    var tableBody = document.getElementById('fruit-table-body');
    tableBody.innerHTML = ''; // Clear the table body before filling it
    
    var totalCost = 0; // Variable to store the total cost
    
    c_sln=0;
    for (var i = 0; i < response_cost.length; i++) {
        if (response_cost[i] > 0) {
            var row = document.createElement('tr');
            var slnCell = document.createElement('td');
            var itemCell = document.createElement('td');
            var originCell = document.createElement('td');
            var costCell = document.createElement('td');
            c_sln+=1;
            slnCell.innerText = c_sln;
            itemCell.innerText = response_fruit[i];
            originCell.innerText = response_origin[i];
            costCell.innerText = '€ ' + response_cost[i];
            totalCost += response_cost[i]; // Add the cost to the total cost variable

            row.appendChild(slnCell);
            row.appendChild(itemCell);
            row.appendChild(originCell);
            row.appendChild(costCell);

            tableBody.appendChild(row);
            
        }
    } 
 
    
    // Add an extra row for the total cost
    var totalRow = document.createElement('tr');
    var totalSlnCell = document.createElement('td');
    var totalItemCell = document.createElement('td');
    var totalOriginCell = document.createElement('td');
    var totalCostCell = document.createElement('td');
    
    totalSlnCell.innerText = '';
    totalItemCell.innerText = '';
    totalOriginCell.innerText = 'Total: ';
    totalCostCell.innerText = '€ ' + parseFloat(money_spend).toFixed(2) +'/' + budget; // Display the total cost in the cell
    totalCostCell.style.fontWeight = 'bold';
    totalOriginCell.style.fontWeight = 'bold';

    
    totalRow.appendChild(totalSlnCell);
    totalRow.appendChild(totalItemCell);
    totalRow.appendChild(totalOriginCell);
    totalRow.appendChild(totalCostCell);
    
    tableBody.appendChild(totalRow);
}


// if Next  button clicked
next_btn.onclick = ()=>{
    //progr(flag);
    //next_btn.classList.remove("show");
    response_time[que_count]=myTimer.stop();

    changeStyle(questions[f_number-1].fruit);
    o=userAns[0];
    o=arr[o-1];
    console.log("submit clicked");
    //console.log(arr[userAns[0]]);
    q=f_number;
    //console.log(q);
    //console.log(o);
    response_fruit[f_number-1]=questions[f_number-1].fruit;
    response_cost[f_number-1]=questions[f_number-1].price[o];
    response_origin[f_number-1]=questions[f_number-1].origin[o];
    response_impact[f_number-1]=questions[f_number-1].impact[o];
    response_reward[f_number-1]=-1;


    


    
    console.log(response_origin[f_number-1]);
    console.log(o);
    console.log(questions[f_number-1].fruit);
    money_spend=0;
    total_impact=0;
    for(let i=0;i<10;i++){
        money_spend += parseFloat(response_cost[i]);
        total_impact += parseFloat(response_impact[i]);
    }
    console.log(money_spend);
    //money_spend += parseFloat(questions[q-1].price[o]);
    //total_impact += parseFloat(questions[q-1].impact[o]);
    money_left=budget-money_spend;
    document.getElementById("pr1").innerHTML = money_spend.toFixed(2);
    document.getElementById("ml1").innerHTML = money_left.toFixed(2);
    if(money_spend<budget){
        b_fruits=b_fruits+1;
    
    }
    if(money_spend>budget && flag==0){
        //alert("You have crossed the budget.\nBut don't worry, kindly continue your shopping by selecting also the remaining items to complete this task. Select the order of the remaining items following the same principles as applied before");
        //document.getElementById("budg").style.backgroundColor = "red";
        flag=1;
    }


    var row = [ response_fruit.slice(), response_origin.slice(), response_cost.slice(), response_impact.slice(), response_time.slice(), response_reward.slice()];

    matrix[attempts] = row;

    
    generateTableRows();
    //document.getElementById("fb1").innerHTML = b_fruits.toFixed(0);
    console.log(matrix);
    quiz_box.classList.remove("activeQuiz"); 
    if(response_cost[f_number-1]==0) {
            alert("Something went wrong in loading the experiment. Press OK to reload the experiment correctly.");
            window.location.reload();
    }
    attempts++;
    if(que_count < questions.length - 1){ //if question count is less than total question length

        que_count++; //increment the que_count value

        //que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        //queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
        cancel_btn.classList.remove("show"); //hide the next button
    }
    console.log(c_sln);
   
    if(c_sln==10 && cflag==0){
        cflag=1;
        var finalDiv = document.querySelector('.final');
        finalDiv.hidden = false;
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        //showResult(); //calling showResult function
        info_box.classList.remove("activeInfo"); //hide info box
        quiz_box.classList.remove("activeQuiz"); //hide quiz box
        result_box.classList.add("activeResult"); //show result box
        const scoreText = result_box.querySelector(".score_text");
        let scoreTag = 'Now you can finalise the shopping cart or you could modify the list';
        //let scoreTag = 'Now you have to do the second shopping task. For this shopping task, the products with the smallest ecological footprint will be highlighted using <b>a green border line</b>.';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
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
    let smallestImpact = questions[index].impact[arr[0]];
    let small_index=0;
    // loop through the rest of the array and compare each element with the current smallest impact value
    for (let i = 0; i < 3; i++) {
    if (questions[index].impact[arr[i]] < smallestImpact) {
        smallestImpact = questions[index].impact[arr[i]];
        small_index=i;
    }
    }
    //console.log(small_index);
    option[small_index].classList.add("best");
    if (response_cost[index] > 0) {
        for (let i = 0; i < 3; i++) {    
            if (questions[index].price[arr[i]] == response_cost[index]) {
                option[i].insertAdjacentHTML("beforeend", tickIconTag);
                selectedOption = option[i];
            }
        }
    }

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon tick"><i class="fas fa-times"></i></div>';



// if user clicked on an option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    userAns = answer.textContent;
    //console.log(userAns);

    if (selectedOption) { // if a previous option was selected
        selectedOption.classList.remove("correct"); // remove the green color from the previous selected option
        selectedOption.removeChild(selectedOption.querySelector(".tick")); // remove the tick icon from the previous selected option
    }

    selectedOption = answer; // track the current selected option
    answer.classList.add("correct"); // adding green color to current selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); // adding tick icon to current selected option
    next_btn.classList.add("show"); // show the next button if user selected any option
    cancel_btn.classList.add("show"); // hide the next button
}

  

function showResult(){

    var newuserdata = userdata.push(); // store cloud
    var currentdate = new Date(); 
    var budget_group= "Low_Budget_Recc";
    var datetime = "Pres Study Conducted on"+ currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


    newuserdata.set({

        Date_Time: datetime, 
        Total_Money_Spend: money_spend, 
        Total_Fruits: b_fruits, 
        Total_impact: total_impact,
        _User_ID: uniqueId, 
        Budget_Group: budget_group, 
        UI_Order: orderedFruits, 
        Response_all: matrix,
      });

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
            cancel_btn.classList.add("show"); 
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
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> items</span>';
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
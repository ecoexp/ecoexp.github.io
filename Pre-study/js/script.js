

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
const agent_policy= [];
agent_policy[0]="SS"
var action_count=1;
const response_impact = [];
const choice_time_data = [];
const choice_time_label = [];
const response_reward = [];
const response_time = [];
var matrix = [];
let selectedOption = null; 
let updated_fruits = [];
var budget_group= "LB";
var base_group= "_B";
var sTime = new Date(); 
var eTime = new Date(); 
var durationSec = 0;






start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
    bgd_popup.style.display = 'block';
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.remove("activeResult");
    alert_box.classList.remove("activeAlert"); 
}
close_btn.onclick = ()=>{
    myTimer.stop();
    quiz_box.classList.remove("activeQuiz"); 
    bgd_popup.style.display = 'none';
}

cancel_btn.onclick = ()=>{
    myTimer.stop();
    quiz_box.classList.remove("activeQuiz"); 
    bgd_popup.style.display = 'none';
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    bgd_popup.style.display = 'none';
}


continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    bgd_popup.style.display = 'block';
    result_box.classList.remove("activeResult");
    alert_box.classList.remove("activeAlert"); 
}

let small_index=0;   
let selection_index=0;
const arr = [];
let timeValue =  13;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
var money_spend =0.0;
var total_impact =0.0;
var state_count=0;
var optimal_impact =22.27;
var optimal_items = 5;

var cflag=0;
var b_fruits=0;
var e_fruits=0;
var e_items=0;
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
var a_group = localStorage.getItem('a_group');
if (!a_group) {
  a_group = '01';
  localStorage.setItem('a_group', '11');
}
var bgroups=0;
var baseline=0;
console.debug(a_group);
if(a_group=='00'){
    bgroups=0;
    localStorage.setItem('a_group', '01');
}
if(a_group=='10'){
    bgroups=1;
    localStorage.setItem('a_group', '11');
}
if(a_group=='01'){
    bgroups=0;
    baseline=1;
}
if(a_group=='11'){
    bgroups=1;
    baseline=1;
}

var budget =21.50;
const eurosElement = document.querySelector('.euros');
eurosElement.textContent = budget.toFixed(2) + ' Euros';
const info_m = document.getElementById('info_m');

if(baseline==1){
    const infoListElement = document.querySelector('.info-list');
    info_m.hidden = false;
    base_group= "_T";

}

if(bgroups==1){
    budget =28.00;
    budget_group= "HB";
    optimal_impact = 20.2;
    optimal_items =10;
    eurosElement.textContent = budget.toFixed(2) + ' Euros';
    const noteElement = document.querySelector('.complete_text b');
    noteElement.textContent = 'Note: After confirming this, you will complete this study.';
}
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
    

var userdata = firebase.database().ref("UserData_Experiment");
var uniqueId = localStorage.getItem('pre_study_unique_id');

window.onload = codeAddress();

function codeAddress() {
    generateTableRows();
    sTime = new Date(); // Store current time
    document.getElementById("bg").innerHTML = budget.toFixed(2);
    document.getElementById("id1").innerHTML = uniqueId;
   info_box.classList.add("activeInfo"); //hide info box
   bgd_popup.style.display = 'block';
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
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
    cancel_btn.classList.remove("show");
}



function stop_exp() {
    const completeText = document.getElementById('txt_check');
    const yesButton = document.getElementById('yes_b');
    const noButton = document.getElementById('no_b');
    alert_box.classList.add("activeAlert"); //show result box
    bgd_popup.style.display = 'block';
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //show result box
    if(money_spend<=budget&&c_sln==10){
        if(baseline==0){
            completeText.innerHTML = "<center>Do you really want to check out?<br><br> <b>Note: After confirming this, you will be directed to the second shopping task.</b></center>";
        }   
        else{
            completeText.innerHTML = "<center>Do you really want to check out?<br><br> <b>Note: After confirming, you finish this study.</b></center>";
        }
        yesButton.style.display = 'block';
        yesButton.textContent = 'Yes';
        noButton.textContent = 'No';
        
    }
    else{
        completeText.innerHTML = "<center>Unable to Checkout! <br><br> <b>Please select all 10 items within the given budget</b></center>";
        yesButton.style.display = 'none';
        noButton.textContent = 'Okay';
    }


}


function myFunction(x) {
    next_btn.classList.remove("show");
    cancel_btn.classList.remove("show");
    info_box.classList.remove("activeInfo"); //hide info box
    alert_box.classList.remove("activeAlert"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    bgd_popup.style.display = 'block';
    showQuetions(x); //calling showQestions function
    f_number=x+1;
    myTimer.start();
}



// if quit button clicked
quit_quiz.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.remove("activeResult"); //show result box
    bgd_popup.style.display = 'none';
    
}
quit_alert.onclick = ()=>{
    alert_box.classList.remove("activeAlert"); //hide info box
    bgd_popup.style.display = 'none';
}

restart_alert.onclick = ()=>{
    showResult();
    if(baseline==0){
        window.location.reload();
    }
    else{
        window.location.href = 'thank_you.html';
    }
}


  // Function to generate and fill the table rows
  function generateTableRows() {
    var tableBody = document.getElementById('fruit-table-body');
    tableBody.innerHTML = ''; // Clear the table body before filling it
  
    var totalCost = 0; // Variable to store the total cost
    var fruitIndexes = updated_fruits.map(fruit => response_fruit.indexOf(fruit)); // Get the indexes of the fruits in the updated_fruits array
  
    c_sln = 0;
    for (var i = 0; i < fruitIndexes.length; i++) {
      var index = fruitIndexes[i];
      var row = document.createElement('tr');
      var slnCell = document.createElement('td');
      var itemCell = document.createElement('td');
      var originCell = document.createElement('td');
      var costCell = document.createElement('td');
      c_sln += 1;
      slnCell.innerText = c_sln;
      itemCell.innerText = response_fruit[index];
      originCell.innerText = response_origin[index];
      costCell.innerText = '€ ' + response_cost[index];
      totalCost += response_cost[index]; // Add the cost to the total cost variable
  
      row.appendChild(slnCell);
      row.appendChild(itemCell);
      row.appendChild(originCell);
      row.appendChild(costCell);
  
      tableBody.appendChild(row);
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
    totalCostCell.innerText = '€ ' + parseFloat(money_spend).toFixed(2) +' / ' + budget.toFixed(2); // Display the total cost in the cell
    totalCostCell.style.fontWeight = 'bold';
    totalOriginCell.style.fontWeight = 'bold';

    
    totalRow.appendChild(totalSlnCell);
    totalRow.appendChild(totalItemCell);
    totalRow.appendChild(totalOriginCell);
    totalRow.appendChild(totalCostCell);
    
    tableBody.appendChild(totalRow);
    var table = document.getElementById("fruit-table");
    var tableHeight = table.offsetHeight;

    // Set the height of the text_head div to the table height
    var textHead = document.querySelector(".text_head");
    textHead.style.height = 130 + tableHeight + "px";
}


// if Next  button clicked
next_btn.onclick = ()=>{
    bgd_popup.style.display = 'none';
    
    
    o=userAns[0];
    o=arr[o-1];
    
    q=f_number;
    response_fruit[f_number-1]=questions[f_number-1].fruit;
    response_cost[f_number-1]=questions[f_number-1].price[o];
    response_origin[f_number-1]=questions[f_number-1].origin[o];
    response_impact[f_number-1]=questions[f_number-1].impact[o];
    response_time[f_number-1]=myTimer.stop();
    choice_time_data[attempts]=response_time[f_number-1];
    choice_time_label[attempts]=response_fruit[f_number-1]
    response_reward[f_number-1]=-1;
    Choice_Time += response_time[f_number-1];
    //console.log(questions[f_number-1].price[selection_index]);
    //console.log(questions[f_number-1].price[o]);
    let smallestValue = questions[f_number - 1].impact[0];
    for (let j = 0; j < 3; j++) {
        if (questions[f_number-1].impact[j] < smallestValue) {
          smallestValue = questions[f_number-1].impact[j];
        }
    }
    if(baseline==1){
        if(questions[f_number-1].impact[o]==smallestValue){
            changeStyle(questions[f_number-1].fruit, response_origin[f_number-1], response_cost[f_number-1], "#43c443" );
            //console.log("green clicked");
        }
        else {
            changeStyle(questions[f_number-1].fruit, response_origin[f_number-1], response_cost[f_number-1], "blue" );       
        }
    }
    else {
        changeStyle(questions[f_number-1].fruit, response_origin[f_number-1], response_cost[f_number-1], "blue" );       
    }


    if (!updated_fruits.includes(response_fruit[f_number-1])) {
        updated_fruits.push(response_fruit[f_number-1]);
      }
    
    money_spend=0;
    total_impact=0;
    for(let i=0;i<10;i++){
        money_spend += parseFloat(response_cost[i]);
        total_impact += parseFloat(response_impact[i]);
    }
    //console.log(money_spend);
    money_left=budget-money_spend;
    document.getElementById("pr1").innerHTML = money_spend.toFixed(2);
    document.getElementById("ml1").innerHTML = money_spend.toFixed(2);
    if(money_spend<budget){
        b_fruits=b_fruits+1;
    
    }
    if(money_spend>budget && flag==0){
 
        flag=1;
    }


    var row = [ response_fruit.slice(), response_origin.slice(), response_cost.slice(), response_impact.slice(), response_time.slice(), response_reward.slice()];

    matrix[attempts] = row;

    
    generateTableRows();
    quiz_box.classList.remove("activeQuiz"); 
    if(response_cost[f_number-1]==0) {
            alert("Something went wrong in loading the experiment. Press OK to reload the experiment correctly.");
            window.location.reload();
    }
    attempts++;
    if(que_count < questions.length - 1){ 

        que_count++; 
        showQuetions(que_count); 
        clearInterval(counter); 
        clearInterval(counterLine); //clear counterLine
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
        cancel_btn.classList.remove("show"); //hide the next button
    }
    if(c_sln==10){
        if(cflag==0){
        info_box.classList.remove("activeInfo"); //hide info box
        quiz_box.classList.remove("activeQuiz"); //hide quiz box
        result_box.classList.add("activeResult"); //show result box
        bgd_popup.style.display = 'block';
        cflag=1;
        }
        const scoreText = result_box.querySelector(".score_text");
        const cbutton = document.getElementById('checkout');
        let scoreTag = 'Now you can check out the shopping cart or you could modify the list';
        const checkoutButton = document.querySelector('.final button');


        if(money_spend<=budget){  
            var divs = ['.apples', '.oranges', '.broccoli', '.bananas', '.carrots', '.peaches', '.potatoes', '.tomatoes', '.lettuce', '.onions'];
            var greenBorderCount = 0;

            for (var i = 0; i < divs.length; i++) {
            var elements = document.querySelectorAll(divs[i]);
            
            for (var j = 0; j < elements.length; j++) {
                var computedStyle = window.getComputedStyle(elements[j]);
                var borderColor = computedStyle.getPropertyValue('border-color');
                //console.log(borderColor);
                if (borderColor === 'rgb(67, 196, 67)') { // RGB value for green is (0, 128, 0)
                greenBorderCount++;
                }
            }
            }
            e_fruits = 0;
            if(state_count == 0){
                for(let i =0;i<10;i++){
                smallestImpact = questions[i].impact[arr[0]];
                small_index=0;
                // loop through the rest of the array and compare each element with the current smallest impact value
                for (let j = 0; j < 3; j++) {
                if (questions[i].impact[arr[j]] < smallestImpact) {
                    smallestImpact = questions[i].impact[arr[j]];
                    small_index=j;
                }
                }
                if (response_cost[i] > 0) {
                if(response_impact[i]==smallestImpact){
                    e_fruits+=1;   
                }
            }
        
            }
            agent_policy[action_count]= "S"+e_fruits;
            console.log(agent_policy[action_count]);
            action_count+=1;
            console.log('State:', greenBorderCount);
        }
            
            if(state_count == 0){state_count=0;}




            


            cbutton.hidden = false;
            scoreTag = '<center><br>Now you can check out the shopping cart <br> OR <br> You can modify the list</center>';
            //document.getElementById("cart").style.backgroundColor = "#168dc0";
            checkoutButton.style.backgroundColor = '#00680e';
            checkoutButton.style.color = 'white';
        }
        else{
            cbutton.hidden = true;
            checkoutButton.style.backgroundColor = '#2a312b';
            checkoutButton.style.color = 'rgb(187, 176, 176)';
            //document.getElementById("cart").style.backgroundColor = "#0e526f";
            scoreTag = '<br><center><b>You have crossed the budget.</b><br> Kindly modify your cart to stay within the budget to checkout.</center>'; 
        }
        scoreText.innerHTML = scoreTag;  
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
    if (response_cost[index] > 0) {
        for (let i = 0; i < 3; i++) {    
            if (questions[index].price[arr[i]] == response_cost[index]) {
                option[i].classList.add("correct");
                option[i].insertAdjacentHTML("beforeend", tickIconTag);
                selectedOption = option[i];
                selection_index=i;
            }
        }
    }
    if(baseline==1){
        let smallestImpact = questions[index].impact[arr[0]];
        small_index=0;
        // loop through the rest of the array and compare each element with the current smallest impact value
        for (let i = 0; i < 3; i++) {
        if (questions[index].impact[arr[i]] < smallestImpact) {
            smallestImpact = questions[index].impact[arr[i]];
            small_index=i;
        }
        }
        if (response_cost[index] > 0) {
        if(selection_index==small_index){
            option[small_index].classList.remove("correct");
            option[small_index].classList.add("mcorrect");
            
        }
    }
        option[small_index].classList.add("best");
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

    if (selectedOption) { // if a previous option was selected
        selectedOption.classList.remove("mcorrect");
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

    //count e_items
    for(let i =0;i<10;i++){
        smallestImpact = questions[i].impact[arr[0]];
        small_index=0;
        // loop through the rest of the array and compare each element with the current smallest impact value
        for (let j = 0; j < 3; j++) {
        if (questions[i].impact[arr[j]] < smallestImpact) {
            smallestImpact = questions[i].impact[arr[j]];
            small_index=j;
        }
        }
        if (response_cost[i] > 0) {
        if(response_impact[i]==smallestImpact){
            e_items+=1;   
        }
    }

    }


    var newuserdata = userdata.push(); // store cloud
    var currentdate = new Date(); 
    eTime = new Date();
    const durationMs = eTime - sTime; // Calculate duration in milliseconds
    durationSec = (durationMs / 1000).toFixed(2); // Convert to seconds with 2 decimal points
    agent_policy[action_count]= "SF";
    //console.log("Start time:", sTime);
    //console.log("End time:", eTime);
    //console.log("Duration:", durationSec, "seconds");
    var datetime = "Pres Study Conducted on"+ currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    if(baseline==1){
        newuserdata.set({
            Date_Time: datetime,
            Total_Duration_T: durationSec,
            Optimal_Impact_T: optimal_impact/10,
            Optimal_Items_T: optimal_items,
            Optimal_Difference_T: (optimal_impact - total_impact)/10,
            Mean_Money_Spend_T: money_spend/10,
            Total_Attempts_T: attempts,
            Total_Eco_Fruits_T: e_items,
            Mean_impact_T: total_impact/10,
            Mean_Choice_Time_T: Choice_Time/attempts,
            Choice_Time_T: choice_time_data,
            Choice_Label_T: choice_time_label,
            Overall_Policy: agent_policy,
            _User_ID: uniqueId,
            Budget_Group: budget_group + base_group,
            UI_Order_T: orderedFruits,
            User_Order_T: updated_fruits,
            Response_all: matrix,
          });
    }
    if(baseline==0){
        newuserdata.set({

            Date_Time: datetime,
            Total_Duration_B: durationSec,
            Optimal_Impact_B: optimal_impact/10,
            Optimal_Items_B: optimal_items,
            Optimal_Difference_B: (optimal_impact - total_impact)/10,
            Mean_Money_Spend_B: money_spend/10,
            Total_Attempts_B: attempts,
            Total_Eco_Fruits_B: e_items,
            Mean_impact_B: total_impact/10,
            Mean_Choice_Time_B: Choice_Time/attempts,
            Choice_Time_B: choice_time_data,
            Choice_Label_B: choice_time_label,
            Overall_Policy: agent_policy,
            _User_ID: uniqueId,
            Budget_Group: budget_group + base_group,
            UI_Order_B: orderedFruits,
            User_Order_B: updated_fruits,
            Response_all: matrix,
          });
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
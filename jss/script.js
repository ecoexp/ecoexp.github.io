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
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const response = [];
const response_time = [];  
    // reference your database
var userdata = firebase.database().ref("UserData");
var order = [];
var aorder = [];
var korder = [];
var uniqueId = localStorage.getItem('pre_study_unique_id');
var count=1;

function submitAnswersK() {

const answerData = {};
for (let i = 1; i <= 15; i++) {
    const q = document.querySelector(`input[name="q${i}"]:checked`);
    if (q) {
        answerData[`q${i}`] = q.value;
    }
    else{
        answerData[`q${i}`] = -1;
    }
}

const selectedAnswers = [];

const checkboxes = document.querySelectorAll('input[name="q16"]:checked');
checkboxes.forEach(checkbox => {
  selectedAnswers.push(checkbox.value);
});

answerData['q16'] = selectedAnswers;
    
    
var newuserdata = userdata.push();
  
newuserdata.set({
    Display_order: korder,
    Questionnaire: "Knowledge",
    User_ID: uniqueId,
    Response: answerData,
 });
    const links = ['Pre-study/index.html', 'Pre-study/exp_1/index.html'];
    const linkIndex = Math.floor(Math.random() * links.length);
    const linkToOpen = links[linkIndex];
    window.location.href = linkToOpen;

}

function submitAnswers() {
    const answerData = {};
    for (let i = 1; i <= 24; i++) {
        const q = document.querySelector(`input[name="q${i}"]:checked`);
        if (q) {
            answerData[`q${i}`] = q.value;
        }
        else{
            answerData[`q${i}`] = -1;
        }
    }
    
    
   var newuserdata = userdata.push();
  
    newuserdata.set({
      Display_order: aorder,
      Questionnaire: "Attitude",
      User_ID: uniqueId,
      Response: answerData,

    });
    const links = ['Pre-study/index.html', 'Pre-study/exp_1/index.html'];
    const linkIndex = Math.floor(Math.random() * links.length);
    const linkToOpen = links[linkIndex];
    //window.location.href = linkToOpen;
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //hide quiz box
    result_box.classList.remove("activeResult"); //show result box

}
function boldLabel(radioButton) {
    // remove bold style from all labels in the selected radio button group
    let radioGroupName = radioButton.getAttribute('name');
    let radioGroup = document.querySelectorAll(`input[name="${radioGroupName}"]`);
    radioGroup.forEach(radio => {
      let label = radio.parentElement;
      label.classList.remove('bold-label');
    });
    // add bold style to the selected label
    let selectedLabel = radioButton.parentElement;
    selectedLabel.classList.add('bold-label');
  }

  var question = document.getElementsByClassName("question");
 
    
    for (var i = 1; i <= question.length; i++) {
    order.push(i);
    }
    order.sort(function() {
    return Math.random() - 0.5;
    });
    for (var i = 0; i < order.length; i++) {
    var questio = question[order[i]-1];
    questio.parentNode.insertBefore(questio, questio.parentNode.children[i]);
    var questionText = questio.querySelector(".question-text");

    }
    let oflag=0;
    for (var i = 0; i < question.length; i++) {
    var questio = question[i];
    var questionnumber = questio.querySelector(".question-number");

    if(count==25){
        oflag=1;
        count=1;
    }
    if(oflag==0){
        aorder[i]=questionnumber.innerHTML;
        console.log(aorder[i]);
    }
    else {
        korder[count-1]=questionnumber.innerHTML;
        console.log(korder[count-1]);
    }
    questionnumber.innerHTML = count + ". ";
    

    
    count++;
    }



function copyParticipantId() {
    // Create a temporary textarea to hold the participant ID
    var temp = document.createElement("textarea");
    temp.value = uniqueId;
    document.body.appendChild(temp);
    
    // Select the text in the textarea
    temp.select();
    temp.setSelectionRange(0, 99999); /* For mobile devices */
    
    // Copy the text to the clipboard
    document.execCommand("copy");
    
    // Remove the temporary textarea
    document.body.removeChild(temp);
    
    // Alert the user that the participant ID has been copied
    alert("Participant ID has been copied to clipboard.");
}




// if startbutton clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
 
    for(let i = 0; i < 5; i++){ 
        response[i]=-1;
        }
}

// if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    //const links = ['https://forms.office.com/e/mXuCbwysME', 'https://forms.office.com/e/41Wy6EFCVQ'];
    //const linkIndex = Math.floor(Math.random() * links.length);
    //const linkToOpen = links[linkIndex];
    //window.location.href = linkToOpen;
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
var t_temp=0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    window.location.href = 'http://www.google.com';
}

// if quit button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next  button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        if (t_temp==-1) {
            response_time[que_count] = -1;
          }
          else {
            response_time[que_count] = 15 - t_temp;
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
            response_time[que_count] = 15 - t_temp;
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
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span><img src="'+ questions[index].options[0] +'" width="50px" alt="Choice 1">$50<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span></span></div>'
    + '<div class="option"><span><img src="'+ questions[index].options[1] +'" width="50px" alt="Choice 2">$49<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></div>'
    + '<div class="option"><span><img src="'+ questions[index].options[2] +'" width="50px" alt="Choice 3">$52 <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></div>'
    + '<div class="option"><span><img src="'+ questions[index].options[3] +'" width="50px" alt="Choice 4">$51<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></span></div>';
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
    let userAns = answer.textContent; //getting user selected option
    response[que_count]=userAns;
    console.log(response[que_count]);
    
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


    var newuserdata = userdata.push();
  
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
        let scoreTag = '<span>and 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
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
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
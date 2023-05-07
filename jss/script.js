
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
    var order = [];
    var aorder = [];
    var korder = [];
    var uniqueId = localStorage.getItem('pre_study_unique_id');
    var count=1;
    var stime=0;
    var etime=0;



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
var userdata = firebase.database().ref("UserData");


function submitAnswersK() {
// Scroll to the top of the page
window.scrollTo({ top: 0 });

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

etime = new Date(); // Store end time
var durationMs = etime - stime; // Calculate duration in milliseconds
var durationSec = (durationMs / 1000).toFixed(2); // Convert to seconds with 2 decimal points


    
var newuserdata = userdata.push();
  
newuserdata.set({
    Display_order: korder,
    Time_Duration: durationSec,
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
    // Scroll to the top of the page
window.scrollTo({ top: 0 });

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
    etime = new Date(); // Store end time
    var durationMs = etime - stime; // Calculate duration in milliseconds
    var durationSec = (durationMs / 1000).toFixed(2); // Convert to seconds with 2 decimal points
    
   var newuserdata = userdata.push();
  
    newuserdata.set({
      Display_order: aorder,
      Time_Duration: durationSec,
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
    stime= new Date(); 

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
 
}

// if exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continue button clicked
continue_btn.onclick = ()=>{
    // Scroll to the top of the page
    window.scrollTo({ top: 0 });
    info_box.classList.remove("activeInfo");
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    stime= new Date(); 

}





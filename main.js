//BOARD STORAGE*
const elob = [
    [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7]
    ],
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
        [0, 9, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 6, 1, 0],
        [0, 6, 0, 0, 5, 1, 0, 9, 0],
        [0, 0, 8, 5, 0, 0, 1, 0, 6],
        [0, 5, 6, 0, 0, 4, 0, 8, 3],
        [0, 0, 7, 0, 9, 8, 2, 0, 0],
        [0, 0, 5, 0, 0, 0, 0, 2, 0],
        [0, 0, 4, 0, 0, 0, 7, 0, 9],
        [0, 0, 9, 4, 0, 7, 5, 0, 1]
    ]

];
    
const hlob = [
    [
        [ 0, 0, 4, 0, 0, 0, 0, 6, 7],
        [ 3, 0, 0, 4, 7, 0, 0, 0, 5],
        [ 1, 5, 0, 8, 2, 0, 0, 0, 3],
        [ 0, 0, 6, 0, 0, 0, 0, 3, 1],
        [ 8, 0, 2, 1, 0, 5, 6, 0, 4],
        [ 4, 1, 0, 0, 0, 0, 9, 0, 0],          
        [ 7, 0, 0, 0, 8, 0, 0, 4, 6],
        [ 6, 0, 0, 0, 1, 2, 0, 0, 0],
        [ 9, 3, 0, 0, 0, 0, 7, 1, 0]
    ],
    [ 
        [3, 0, 6, 5, 0, 8, 4, 0, 0], 
        [5, 2, 0, 0, 0, 0, 0, 0, 0], 
        [0, 8, 7, 0, 0, 0, 0, 3, 1], 
        [0, 0, 3, 0, 1, 0, 0, 8, 0], 
        [9, 0, 0, 8, 6, 3, 0, 0, 5], 
        [0, 5, 0, 0, 9, 0, 6, 0, 0], 
        [1, 3, 0, 0, 0, 0, 2, 5, 0], 
        [0, 0, 0, 0, 0, 0, 0, 7, 4], 
        [0, 0, 5, 2, 0, 6, 3, 0, 0]    
    ],
    [
        [0, 0, 0, 5, 2, 0, 3, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 6, 4],
        [0, 0, 0, 0, 7, 6, 0, 5, 0],
        [0, 0, 8, 0, 0, 0, 0, 3, 0],
        [7, 0, 0, 8, 1, 2, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 5, 0, 0],
        [0, 8, 0, 1, 9, 0, 0, 0, 0],
        [3, 1, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 6, 0, 8, 3, 0, 0, 0]
    ]
];



//GLOBAL VARIABLES*
var difficultySetting = "easy"; //Default difficulty setting is easy.
var lob = elob; //List of Boards that is currently being used. Default is easy list of boards (elob).
var randomNum = 0; //Random Number that chooses which board to use in the list of boards.
var timer = true; //Tracks whether timer is being used or not. Default is true.
var totalTime = 5000 //Time amount allowed for each board. default is -1000
var boardTimes = [1000 * 60 * 15, 1000 * 60 * 30, 1000 * 10, 1000 * 60]; //holds time values that can be used for the timer



//MAIN FUNCTIONS*
window.onload = function(){
    document.getElementById("easy-diff").addEventListener("click", setDiff);
    document.getElementById("hard-diff").addEventListener("click", setDiff);
    document.getElementById("timer-checkbox").addEventListener("click", setTimer);
    document.getElementById("newPuzzle-btn").addEventListener("click", newPuzzle);
    document.getElementById("showSolution-btn").addEventListener("click", showSolution);
    document.getElementById("checkSolution-btn").addEventListener("click", checkSolution);
    document.getElementById("reset-btn").addEventListener("click", resetBoard);
}

//generates a board based on all the user preferences.
function generateBoard(time){
    clearBoards();
    document.getElementById("confetti-animation").classList.add("hidden");
    document.getElementById("control-buttons").classList.remove("hidden"); //control buttons initially hidden
    if (timer){
        document.getElementById("timer-numbers").removeAttribute("class", "red_timer");
        document.getElementById("timer").classList.remove("hidden"); //timer initially hidden
        if (totalTime == 5000){
            runTimer();
        }
        else if(totalTime == -999){
            runTimer();
        }
        if (totalTime <= -1001){ //totalTime is -1000 when it is manually set to that
            totalTime = time;
            runTimer();
        }
        else { //don't want to run timer again if it is already running
            totalTime = time;
        }
    }
    var counter = 0;
    document.getElementById("timer-expired-message").innerHTML = "";
    var board = lob[randomNum];
    var tag = document.getElementById("grid");
    for(let i = 0; i < 9; i++){
        let newRow = document.createElement("tr");
        for(let j = 0; j < 9; j++){
            let box = document.createElement("td");
            if(board[i][j] != 0){
                box.setAttribute("id", counter);
                counter++;
                box.classList.add("boxes");
                box.innerHTML = '<input class="grid_box" type="number">';
                box.innerText = board[i][j];
                newRow.appendChild(box);
            }
            else {
                box.setAttribute("id", counter);
                counter++;
                box.classList.add("boxes");
                box.innerHTML = '<input  type="text" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength = "1" onkeypress="return isNumberKey(event)" class="grid_box_input" min="1" max="9" >';
                newRow.appendChild(box);
            }
            if (i == 2 || i == 5){
                box.classList.add("hardBorderBot");
            }
            if (j == 2 || j == 5){
                box.classList.add("hardBorderRight");
            }
        }
        tag.appendChild(newRow);
    }
}

//sets global variable: timer. Also hides or displays timer on the screen
function setTimer(){
    if (document.getElementById("timer-checkbox").checked){
        document.getElementById("timer").classList.remove("hidden");
        timer = true;
        if (totalTime <= 0){
            resetBoard();
        }
    }
    else {
        document.getElementById("timer").classList.add("hidden");
        timer = false;
    }
}


function runTimer(){
    var refreshID = setInterval(function () {
        const seconds = Math.floor((totalTime / 1000) % 60);
        const minutes = Math.floor((totalTime  / 1000 / 60) % 60);
        totalTime -= 1000;
        if (totalTime <= 1000 * 15){
            document.getElementById("timer-numbers").setAttribute("class", "red-timer-flash");
        }
        else if(totalTime <= 1000 * 30){
            document.getElementById("timer-numbers").setAttribute("class", "red-timer");
        }
        if(seconds >= 10){
            document.getElementById("timer-numbers").innerHTML = minutes + " : " + seconds; 
        }
        else{
            if(seconds >= 0 ){
                document.getElementById("timer-numbers").innerHTML = minutes + " : " + "0" + seconds;
            }
        }
        if (totalTime <= -2000 && timer == true) {
            alert("TIME UP");
            showSolution();
            clearInterval(refreshID);
        }
        if(totalTime <= -2000){
            document.getElementById("timer-numbers").innerHTML = "0" + " : " + "00"; 
            clearInterval(refreshID);
        }
    }, 1000);
}

//New Puzzle button. creates a new random board from the board storage matrices.
function newPuzzle(){
    console.log(totalTime);
    var oldRand = randomNum;
    randomNum = generateRandomNumber();
    while (oldRand == randomNum){
        randomNum = generateRandomNumber();
    }
    generateBoard(generateTime());
}

//reset button
function resetBoard(){
    generateBoard(generateTime());
}

//checksolution button. solves the board and compares it with the user input, giving the user instant feedback.
function checkSolution(){
    var solvedBoard = Copy(lob[randomNum]);
    solveBoard(solvedBoard);
    var flag = true;
    for(var i = 0;  i < 81; i++){
        if (document.getElementById(i).firstElementChild == null){
            continue;
        }
        var val = document.getElementById(i).firstElementChild.value;
        var row = Math.floor(i / 9);
        var col = i % 9;
        if(val == ""){
            flag = false;
            continue;
        }
        else if(val == solvedBoard[row][col]){
            document.getElementById(i).firstElementChild.setAttribute("class", "green_grid_box_input");
        }
        else if (val != solvedBoard[row][col]) {
            document.getElementById(i).firstElementChild.setAttribute("class", "red_grid_box_input");
            flag = false;
        }
    }
    if (flag){
        alert("You Won!")
        document.getElementById("confetti-animation").classList.remove("hidden");
        totalTime = -1001;
    }
}

//showsolution button. generates solution and displays it on screen.
function showSolution(){
    var x = Copy(lob[randomNum]);
    solveBoard(x);
    generateSolvedBoard(x);
    document.getElementById("timer").classList.add("hidden");
    document.getElementById("control-buttons").classList.add("hidden");
}



//HELPER FUNCTIONS*
//generates random number for global variable: randomNumber.
function generateRandomNumber(){
    return Math.floor((Math.random()* lob.length));
}

//clears all previous boards off the screen. removes all boxes from table
function clearBoards(){
    let grid = document.getElementById("grid");
    let box = grid.querySelectorAll(".boxes");
    for(let i = 0; i < box.length; i++){
        box[i].remove();
    }
}

//sets global variable: difficultySetting.
function setDiff(){
    oldDiffSetting = difficultySetting;
    if (document.getElementById("easy-diff").checked){
        difficultySetting = "easy";
        lob = elob;
    }
    else if (document.getElementById("hard-diff").checked){
        difficultySetting = "hard";
        lob = hlob;
    }
    if (oldDiffSetting != difficultySetting){
        newPuzzle();
    }
}

//creates a shallow copy (pass by value) of the board that is passed in.
function Copy(bo){
    var a = [];
    for(var i = 0; i < bo.length; i++){
        a[i] = bo[i].slice();
    } 
    return a;
}

//generates the time depending on difficulty setting
function generateTime() {
    if (difficultySetting == "easy"){
        return boardTimes[0];
    }
    else if (difficultySetting == "hard"){
        return boardTimes[1];
    }
}

//prints solved board to screen
function generateSolvedBoard(solvedBoard){
    clearBoards();
    var tag = document.getElementById("grid");
    for(let i = 0; i < 9; i++){
        let newRow = document.createElement("tr");
        for(let j = 0; j < 9; j++){
            let box = document.createElement("td");
            box.classList.add("boxes");
            box.innerHTML = '<input class="grid_box" type="number">';
            box.innerHTML = solvedBoard[i][j];
            newRow.appendChild(box);
            if (i == 2 || i == 5){
                box.classList.add("hardBorderBot");
            }
            if (j == 2 || j == 5){
                box.classList.add("hardBorderRight");
            }
        }
        tag.appendChild(newRow);
    }
}

//limits input to valid chars
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 49 || charCode > 57))
        return false; 
    return true;
}



//SOLVING THE BOARD FUNCTIONS*
//for testing purposes...prints boards to console.
function print_board(bo){
    for (var i = 0; i < bo.length; i++){
        if (i % 3 == 0 && i != 0) {
            console.log("- - - - - - - - - - - - ");
        }
        for(var j = 0; j < bo[0].length; j++){
            if (j % 3 == 0 && j != 0){
                process.stdout.write(" | "); //doesn't create automatic newline           
            }
            if(j == 8){
                console.log(bo[i][j]);
            }
            else{
                process.stdout.write(bo[i][j].toString() + " ");
            }
        }

    }
}

//checks if inputed number is valid on the board based on general rules of sudoku.
function valid(bo, num, pos){
    for(var i = 0; i < bo[0].length; i++){
        if(bo[pos[0]][i] == num && pos[1] != i){
            return false;
        }
    }

    for(var i = 0; i < bo.length; i++){
        if (bo[i][pos[1]] == num && pos[0] != i){
                return false;
     }
    }
    var box_x = Math.floor(pos[1] / 3);
    var box_y = Math.floor(pos[0] / 3);
    for(var i = box_y*3; i < box_y*3 + 3; i++){
        for(var j = box_x*3; j < box_x*3 +3; j++){
            if (bo[i][j] == num && [i,j] != pos){
                return false;
            }
        }
    }
    return true;
}

//checks for next empty box on unsolved board.
function empty(bo){
    for (var i = 0; i < bo.length; i++){
        for (var j = 0; j < bo[0].length; j++){
            if (bo[i][j] == 0){
                return [i, j];
            }
        }        
    }
    return [];    
}

//solves the board using backtracking algorithm
function solveBoard(bo){
    var find = empty(bo);
    if (find.length == 0){
        return true;
    }
    else {
        var row = find[0];
        var col = find[1];
    }
    for(var i = 1; i < 10; i++){
        if(valid(bo, i, [row, col])){
            bo[row][col]  = i;
            if(solveBoard(bo)){
                return true;
            }
            bo[row][col] = 0;
        }
    }
    return false;
}
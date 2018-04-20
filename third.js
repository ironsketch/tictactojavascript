// Variables

var dash_img = '<img src="dash.png">';
var x_img = '<img src="x.png">';
var o_img = '<img src="o.png">';
var xwins = '<img src="xwins.png">';
var owins = '<img src="owins.png">';
var playcount = 0 ;
var meatyPlayer = 0;
var metalPlayer = 0;


var domCells = [
    td1, td2, td3,
    td4, td5, td6,
    td7, td8, td9
];
var cells = [];

function setPlayer(choice) {
    if (choice == "x") {
	meatyPlayer = "x";
	metalPlayer = "o";
	$('#ex').toggleClass('enlarge');
	document.getElementById("oh").style.visibility = "hidden";
	document.getElementById("ins").style.visibility = "hidden";
	var myBox = document.getElementById('ex');
	myBox.addEventListener('webkitAnimationEnd',function( event ) { myBox.style.display = 'none';
									
									$('#maintic').toggleClass('tikkychange');
									
								      }, false);
	
    }
    else if (choice == "o") {
	meatyPlayer = "o";
	metalPlayer = "x";
	$('#oh').toggleClass('enlarge');
	document.getElementById("ex").style.visibility = "hidden";
	document.getElementById("ins").style.visibility = "hidden";
		var myBox = document.getElementById('oh');
	myBox.addEventListener('webkitAnimationEnd',function( event ) { myBox.style.display = 'none';
									
									$('#maintic').toggleClass('tikkychange');
									
								      }, false);

    }

    else {
	console.log("FUCK OFF");
    }
    
    console.log("you chose ", choice);
}


function setCell(index, contents)
{
    if (contents == 'x') {
	$(domCells[index]).html(x_img);
    } else if (contents == 'o') {
	$(domCells[index]).html(o_img);
    } else {
	$(domCells[index]).html(dash_img);
    }
    cells[index] = contents;
}

for (var i = 0; i < 9; i++) {
    setCell(i);
}



// Main function
function xify(selection) {
    var index = domCells.indexOf(selection);
    console.log("you clicked cell", index);

    if (cells[index]) {
	console.log("DUDE there's already something in that cell you FUCK");
	return;
    }

    setCell(index, meatyPlayer);
    computerMove();
    winTest();
}


function winTest()
{
    if (checkWin('x')) {
	$(win).html(xwins);
	meatyPlayer = 0;
	metalPlayer = 0;
	$('#win').toggleClass('wins enlarge');
	console.log("X WINS");
    }
    if (checkWin('o')) {
	$(win).html(owins);
	meatyPlayer = 0;
	metalPlayer = 0;
	$('#win').toggleClass('wins enlarge');
	console.log("O WINS");
    }
}


function checkWin(side)
{
  // check rows

   for (var i = 0; i < 3; i++) {
	var count = 0;
	for (var j = 0; j < 3; j++) {
	    
	    if (cells[(i*3) + j] == side) {
		count++;
	    }
	}
	if (count == 3) {
	    console.log(side, "WON THE FUCKING GAME");
	    return true;
	} else {

	}
    } 
    
    // check columns

    for (var i = 0; i < 3; i++) {
	var count = 0;
	for (var j = 0; j < 3; j++) {
	    
//	    console.log("i, j = ", i, j);
	    
	    if (cells[(j*3) + i] == side) {
		count++;
	    }
	}
	if (count == 3) {
	    console.log(side, "WON THE FUCKING GAME");
	    return true;
	} else {
//	    console.log("# of ", side, "found in column", i, " = ", count);
	}
    }

    // check diagonals

    // 00 11 22
 
    var count_diagonal_1 = 0;
    var count_diagonal_2 = 0;
    for (var i = 0; i < 3; i++) {	
	if (cells[(i*3) + i] == side) {
	    count_diagonal_1++;
	}
	if (cells[(i*3) + (2 - i)] == side) {
	    count_diagonal_2++;
	}

	if (count_diagonal_1 == 3 ||
	    count_diagonal_2 == 3) {
	    console.log(side, "WON THE FUCKING GAME");
	    return true;
	} else {
//	    console.log("# of ", side, "012", i, " = ", count);
	}
    }
}

var plcount = 0;

//Computer Processing



function computerMove()
{
    var move = findMove();
    if (move !== undefined) {
	setCell(move, metalPlayer);
	console.log("moved to ", move);
    } else {
	console.log("NO MORE MOVES");
    }
}

function findMove()
{
    var move;
    //Winning Move
    move = findBlockWinMove(metalPlayer);
    if (move >= 0) {
	return move;
    }
    //Blocking Move
    move = findBlockWinMove(meatyPlayer);
    if (move >= 0) {
	return move;
    }
    // todo: add 2-or-3-move-out strategy shit

    // else: fuck it
    return findRandomMove();
}

function findWinningMove()
{
    /*   // check rows
	 
    var count= 0;
    for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
    
    if (cells[(i*3) + j] == 'o') {
    count++;
    
    }
    
    }
    }
    if (count == 2) {
    
    } else {
    } */
}

function findBlockWinMove(play)
{
    // check rows
    
    for (var i = 0; i < 3; i++) {
	var count = 0;
	
	
	for (var j = 0; j < 3; j++) {
	    
	    if (cells[(i*3) + j] == play) {
		count++;
	    }
	}
	
	
	
	if ((count == 2) && (i == 0)) {
	    
	    for (var j = 0; j < 3; j++) {
		
		if (! cells[(i*3) + j]) {
		    move = i*3 + j;
		    console.log(i, " is i. Top Row. Move = ", move);
		    return move;
		}
	    }
	    
	}
	else if ((count == 2) && (i == 1)) {
	    for (var j = 0; j < 3; j++) {
		
		if (! cells[(i*3) + j]) {
		    move = i*3 + j;
		    console.log(i, " is i. Mid. Move = ", move);
		    return move;
		}
	    }
	}
	
	else if ((count == 2) && (i == 2)) {
	    for (var j = 0; j < 3; j++) {
		
		if (! cells[(i*3) + j]) {
		    move = i*3 + j;
		    console.log(i, " is i. Bot Row. Move = ", move);
		    return move;
		}
	    }
	}
	else {
	    console.log("fuck if I know");
	}
	
    }
    
    // check cols
    
    for (var i = 0; i < 3; i++) {
	var count = 0;
	
	
	for (var j = 0; j < 3; j++) {
	    
	    if (cells[(j*3) + i] == play) {
		count++;
	    }
	}
	
	
	
	if ((count == 2) && (i == 0)) {

	    for (var j = 0; j < 3; j++) {
		
		if (! cells[(j*3) + i]) {
		    move = j*3 + i;
		    console.log(i, " is i. left Row. Move = ", move);
		    return move;
		}
	    }
	    
	}
	else if ((count == 2) && (i == 1)) {
	    for (var j = 0; j < 3; j++) {
	    
		if (! cells[(j*3) + i]) {
		    move = j*3 + i;
		    console.log(i, " is i. middle Row. Move = ", move);
		    return move;
		}
	    }
	}
	
	else if ((count == 2) && (i == 2)) {
	    for (var j = 0; j < 3; j++) {
		
		if (! cells[(j*3) + i]) {
		    move = j*3 + i;
		    console.log(i, " is i. right Row. Move = ", move);
		    return move;
		}
	    }
	}
	else {
	    console.log("fuck if I know");
	}
	
    }
    
    
    // check diagonals
    
    // 00 11 22
    
    var count_diagonal_1 = 0;
    for (var i = 0; i < 3; i++) {	
	if (cells[(i*3) + i] == play) {
	    count_diagonal_1++;
	}
	
	if (count_diagonal_1 == 2) {
	    for (var i = 0; i < 3; i++) {
		
		
		if (! cells[(i*3) + i]) {
		    move = (i*3) + i;
		    console.log(i, " is i. daig 1. Move = ", move);
		    return move;
		    
		}
	    }
	}
	
	
	else {
	    
	    console.log("fuck if I know");
	    
	}
	
    }
    
    //Checking other diagnol
    var count_diagonal_2 = 0;
    for (var i = 0; i < 3; i++) {
	if (cells[(i*3) + (2 - i)] == play) {
	    count_diagonal_2++;
	}
	
	if (count_diagonal_2 == 2) {
	    for (var i = 0; i < 3; i++) {
		if (! cells[(i*3) + (2 - i)]) {
		    move = (i*3) + (2 - i);
		    console.log(i, " is i. diag 2. Move = ", move);
		    return move;
		}
	    }
}
    } 
}




function findRandomMove() {
    var emptyCells = [];
    
    for (var i = 0; i < cells.length; i++) {
	if (cells[i] === undefined) {
	    emptyCells.push(i);
	}
    }

    if (emptyCells.length > 0) {
	var randomCell = Math.floor(Math.random() * emptyCells.length);
	return emptyCells[randomCell];
    } else {
	console.log("board is full BITCH");
    }
}
    

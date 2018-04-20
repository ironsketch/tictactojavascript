// Variables

var dash_img = '<img src="dash.png">';
var x_img = '<img src="x.png">';
var o_img = '<img src="o.png">';
var domCells = [
    td1, td2, td3,
    td4, td5, td6,
    td7, td8, td9
];
var cells = [];

//Test Variables

var playcount = 0 ;

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

//Main Function

function xify(selection) {
}

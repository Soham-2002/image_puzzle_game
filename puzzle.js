var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {

    // BOARD
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            tile.setAttribute("draggable", true); // ✅ IMPORTANT

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // PIECES
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }

    // SHUFFLE (better method)
    for (let i = pieces.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    for (let i = 0; i < pieces.length; i++) {

        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";

        tile.setAttribute("draggable", true); // ✅ IMPORTANT

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
};

// DRAG FUNCTIONS
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {

    if (!currTile || !otherTile) return;

    // ❗ prevent dragging blank tile
    if (currTile.src.includes("blank")) return;

    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns++;
    document.getElementById("turns").innerText = turns;
}
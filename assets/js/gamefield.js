function createTable() {
    document.write("<table>");
    let bombLocations = generateBombLocations();

    for (let i = 1; i <= 9; i++) {
        document.write("<tr>");
        for (let j = 1; j <= 9; j++) {
            let stringID = parseInt(i * 10 + j);
            let isBomb = bombLocations.includes(stringID) ? 'bomb' : '';
            document.write('<td id="' + stringID + '" onclick="revealTile(event, ' + stringID + ')" oncontextmenu="flagTile(event, ' + stringID + ')" class="' + isBomb + '"><a href="#"><img src="assets/img/SVGs/unoppened.svg" alt="one"></a></td>');
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

// ===================================================================================================================

function generateBombLocations() {
    let bombLocations = [];
    while (bombLocations.length < 10) {
        let randomLocation = Math.floor(Math.random() * 81) + 1; // Generate random number between 1 and 81
        if (!bombLocations.includes(randomLocation)) {
            bombLocations.push(randomLocation);
        }
    }
    return bombLocations;
}

// ===================================================================================================================

function revealTile(event, id) {
    timerStart();
    document.getElementById(id).removeAttribute('oncontextmenu');
    event.preventDefault();
    var element = document.getElementById(id);
    var image = element.querySelector('img');


    if (element.classList.contains('bomb')) {
        timerStop();   //once we hit a bomb, the timer is stopped/ function is located in other script ( timer.js )
        console.log('Clicked tile has a bomb!');
        console.log('You DIED!');
        image.src = 'assets/img/SVGs/bomb.svg'
        for (var ai = 1; ai <= 9; ai++)
            for (var aj = 1; aj <= 9; aj++) {
                var IDD = parseInt(ai * 10 + aj);

                document.getElementById(IDD).removeAttribute("onclick");
                document.getElementById(IDD).removeAttribute('oncontextmenu');
                if (document.getElementById(IDD).classList.contains('bomb'))
                    document.getElementById(IDD).querySelector('img').src = 'assets/img/SVGs/bombFill.svg';
                if (IDD == id)
                    image.src = 'assets/img/SVGs/bomb.svg';
            }
        // window.alert("You lost the game. GAME OVER!");
        return;
    }

    checkMines(id);


}

// ===================================================================================================================

function checkMines(id) {
    var bombCount = 0;
    var idAsInt = parseInt(id);

    var row = Math.floor(idAsInt / 10);
    var col = idAsInt % 10;

    if (idAsInt == 11) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 19) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 91) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (idAsInt == 99) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (row == 1) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        for (var l = (row + 1) * 10 + col - 1; l <= ((row + 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++
    }
    else if (row == 9) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        for (var l = (row - 1) * 10 + col - 1; l <= ((row - 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
    }
    else if (col == 1) {
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col + 1).classList.contains("bomb"))
            bombCount++;
    }
    else if (col == 9) {
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row + 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById((row - 1) * 10 + col - 1).classList.contains("bomb"))
            bombCount++;
    }
    else {
        for (var l = (row - 1) * 10 + col - 1; l <= ((row - 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
        for (var l = (row + 1) * 10 + col - 1; l <= ((row + 1) * 10 + col - 1) + 2; l++)
            if (document.getElementById(l).classList.contains("bomb"))
                bombCount++;
        if (document.getElementById(idAsInt + 1).classList.contains("bomb"))
            bombCount++;
        if (document.getElementById(idAsInt - 1).classList.contains("bomb"))
            bombCount++;
    }
    printBombNumberImg(bombCount, idAsInt);
}

// ===================================================================================================================

function printBombNumberImg(bombCount, tileID) {
    var element = document.getElementById(tileID);
    var image = element.querySelector('img');
    image.src = 'assets/img/SVGs/' + bombCount + 's.svg';
    element.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent the default right-click context menu
    });
    if (bombCount == 0) {
        floodFillTile(tileID);
        console.log("we fill");
    }
}

// ===================================================================================================================

// this was idea from chatGPT
function flagTile(event, id) {
    event.preventDefault(); // Prevent the default context menu from appearing

    var element = document.getElementById(id);
    var image = element.querySelector('img');

    if (element.classList.contains("flagged")) {
        element.classList.remove("flagged");
        document.getElementById(id).setAttribute('onclick', 'revealTile(event, ' + id + ')');
        image.src = 'assets/img/SVGs/unoppened.svg'
    }
    else {
        element.classList.add('flagged');
        document.getElementById(id).removeAttribute("onclick");
        image.src = 'assets/img/SVGs/flag.svg';
    }
}

// ===================================================================================================================

function floodFillTile(id) {
    const element = document.getElementById(id);

    if (!element || element.classList.contains('bomb') || element.classList.contains('revealed')) {
        return; // Stop recursion if the tile is a bomb, already revealed, or not found
    }

    element.classList.add('revealed'); // Mark the tile as revealed

    const row = Math.floor(id / 10); // Extract row number from id
    const col = id % 10; // Extract column number from id

    // Define the eight possible directions of adjacent tiles
    const directions = [
        { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
        { row: 0, col: -1 }, /* Current tile */ { row: 0, col: 1 },
        { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];

    let bombCount = 0;

    for (let i = 0; i < directions.length; i++) {
        const direction = directions[i];
        const newRow = row + direction.row;
        const newCol = col + direction.col;
        const newId = newRow * 10 + newCol;

        const adjacentTile = document.getElementById(newId);
        if (adjacentTile && adjacentTile.classList.contains('bomb')) {
            bombCount++;
        }
    }

    if (bombCount === 0) {
        for (const direction of directions) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;
            const newId = newRow * 10 + newCol;

            floodFillTile(newId); // Recursively call floodFillTile on neighboring tiles
        }
    }

    // Update the image source
    const image = element.querySelector('img');
    image.src = 'assets/img/SVGs/' + bombCount + 's.svg';
}








// I NEED RECURSIVE FUNCTION TO REVEAL EMPTY TILES/




























// ===================================================================================================================
// place reserved for the timer
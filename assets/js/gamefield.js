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
    document.getElementById(id).removeAttribute('oncontextmenu');
    event.preventDefault(); 3
    var element = document.getElementById(id);
    var image = element.querySelector('img');

    // image.src = 'assets/img/SVGs/1s.svg';

    if (element.classList.contains('bomb')) {
        console.log('Clicked tile has a bomb!');
        console.log('You DIED!');
        image.src = 'assets/img/SVGs/bomb.svg'
        for (var ai = 1; ai <= 9; ai++)
            for (var aj = 1; aj <= 9; aj++) {
                var IDD = parseInt(ai * 10 + aj);
                document.getElementById(IDD).removeAttribute("onclick");
                document.getElementById(IDD).removeAttribute('oncontextmenu');
            }
        // window.alert("You lost the game. GAME OVER!");
        return;
    }

    checkMines(id);

    if (!element.classList.contains('bomb')) {
        floodFill(id);
    }

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
    if (bombCount == 0)
        floodFillTile(tileID);
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
  
    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
      const newId = newRow * 10 + newCol;
  
      floodFillTile(newId); // Recursively call floodFillTile on adjacent tiles
    }
  }
  
  
  


// I NEED RECURSIVE FUNCTION TO REVEAL EMPTY TILES/
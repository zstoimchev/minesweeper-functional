function createTable() {
    document.write("<table>");
    let bombLocations = generateBombLocations();

    for (let i = 1; i <= 9; i++) {
        document.write("<tr>");
        for (let j = 1; j <= 9; j++) {
            let stringID = parseInt(i * 10 + j);
            let isBomb = bombLocations.includes(stringID) ? 'bomb' : '';
            // document.write('<td id="' + stringID + '" class="' + isBomb + '" onclick="revealTile(' + stringID + ')"><a href="#"><img src="assets/img/SVGs/unoppened.svg" alt="one"></a></td>');
            document.write('<td id="' + stringID + '" onclick="revealTile(' + stringID + ')" class="' + isBomb + '"><a href="#"><img src="assets/img/SVGs/unoppened.svg" alt="one"></a></td>');

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

function revealTile(id) {
    var element = document.getElementById(id);
    var image = element.querySelector('img');

    image.src = 'assets/img/SVGs/1s.svg';

    if (element.classList.contains('bomb')) {
        console.log('Clicked tile has a bomb!');
        console.log('Tou DIED!');
        image.src = 'assets/img/SVGs/bomb.svg';

        for(var ai=1; ai<=9; ai++){
            for(var aj=1; aj<=9; aj++){
                var IDD = parseInt(ai*10+aj);
                document.getElementById(IDD).removeAttribute("onclick");
            }
        }
    }

}

// ===================================================================================================================

function checkMines(id){
    var idAsInt = parseInt(id)+1;
    var element = document.getElementById(idAsInt);

    if(element.classList.contains("bomb")){
        console.log("there is something up here next");
    }

}




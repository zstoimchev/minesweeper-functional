function createTable() {
    document.write("<table>")
    for (let i = 1; i <= 9; i++) {
        document.write("<tr>");
        for (let j = 1; j <= 9; j++) {
            let stringID = parseInt(i * 10 + j);
            document.write('<td id="' + stringID + '" onclick="revealTile(' + stringID + ')"><a href="#"><img src="assets/img/SVGs/unoppened.svg" alt="one"></a></td>');
        }
        document.write("</tr>");
    }
    document.write("</table>")
}

// ===========================================================

function revealTile(id) {
    var element = document.getElementById(id);
    var image = element.querySelector('img');
    image.src = 'assets/img/SVGs/1s.svg'
}



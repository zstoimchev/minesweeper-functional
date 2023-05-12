function createTable() {
    document.write("<table>")
    for (let i = 1; i <= 9; i++) {
        document.write("<tr>");
        for (let j = 1; j <= 9; j++) {
            document.write('<td id="11" onclick="revealTile(this)"><a href="#"><img src="assets/img/SVGs/1s.svg" alt="one"></a></td>');
        }
        document.write("</tr>");
    }
    document.write("</table>")
}

// ===========================================================

function revealTile(){
    
}
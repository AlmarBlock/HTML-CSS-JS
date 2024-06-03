let currentRow = 1;
let currentColumn = 1;
let currentTryLetters = [];
let stillPlaying = true;
let statsHaveBeenImported = false;

let daysInRow = "0000";
let daysPlayed = "0000";
let daysWon = "0000";
let daysInRowLongest = "0000";

let words = [];
let todaysword = "";

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        words = data;

        todaysword = getWord(words);

        function init() {
            importStatsFromCookie();
            for (let row = 1; row <= 6; row++) {
                clearRow(row);
            }
        }
        
        function getWord(words) {
            let day = new Date().getDate();
            let month = new Date().getMonth() + 1;
            if (day.toString().length == 1) {
                day = "0" + day.toString();
            }
            if (month.toString().length == 1) {
                month = "0" + month.toString();
            }
            let year = new Date().getFullYear();
            year = year + "";
            return words[seededRandom(day+month+year)-1].split("");
        }
        
        
        function seededRandom(seed) {
            const a = 16807;
            const m = 2147483647;

            if (!/^\d{8}$/.test(seed)) {
                throw new Error('Seed must be a string with 8 digits');
            }

            let seedNumber = Number(seed);
            seedNumber = (a * seedNumber) % m;

            return 1 + (seedNumber % words.length);
        }
        init();
    })
    .catch((error) => console.error('Fehler:', error));

function clearRow(row) {
    if (stillPlaying) {
        for (let column = 1; column <= 5; column++) {
          document.getElementById(row + "-" + column).textContent = "";
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (stillPlaying && !IsInputSelected()) {
        let key = event.key;
        if (key === "Enter") {
            key = "SEND";
            document.getElementById("SEND").classList.add("pressed");
            keybord(key);
            setTimeout(function() {
                document.getElementById("SEND").classList.remove("pressed");
            }, 200);
        } else if (key === "Backspace") {
            key = "BACK";
            document.getElementById("BACK").classList.add("pressed");
            keybord(key);
            setTimeout(function() {
                document.getElementById("BACK").classList.remove("pressed");
            }, 200);
            return;
        } else if (/^[a-zA-ZäöüÄÖÜß,;]$/.test(key)) {
            if (key === "ß") {
                key = "ẞ";
            } else if (key === "," || key === ";") {
                key = "ẞ";
            } else {
                key = key.toUpperCase();
            } 
            document.getElementById(key).classList.add("pressed");
            keybord(key);
            setTimeout(function() {
                document.getElementById(key).classList.remove("pressed");
            }, 200);
            return;
        }
    }
});

function keybord(id) {
    if (stillPlaying && !IsInputSelected()) {
        if (id === "SEND") {
            if (currentTryLetters.length === 5) {
                checkWord();
            }
        } else if (id === "BACK") {
            currentTryLetters.pop();
        } else if (currentTryLetters.length < 5) {
            if (currentTryLetters.length === 0) {
                currentTryLetters = [id];
            } else {

                currentTryLetters.push(id);
            }
        }
        putLetters(currentTryLetters);
    }   
}

function checkWord() { 
    is_valid_word = false;
    for (let i = 0; i < words.length; i++) {
        if (words[i] === currentTryLetters.join("")) {
            is_valid_word = true;
            break;
        }
    }
    if (is_valid_word == true) {
        if (!statsHaveBeenImported) {
            alert("Bitte importiere zuerst deine Stats, wenn du das Spiel fortsetzen willst.\nWenn du noch kein Spiel angefangen hast, kannst du einfach auf 'OK' klicken und los spielen.");
            statsHaveBeenImported = true;
        } else {
            document.getElementById("state-input").style.display = "none";
            document.getElementById("state-input-submit").style.display = "none";
            for (let column = 1; column <= 5; column++) {
                if (todaysword[column-1] === currentTryLetters[column-1]) {
                    document.getElementById(currentTryLetters[column-1]).classList.add("correct");
                    document.getElementById(currentRow + "-" + column).classList.add("green");
                } else if (todaysword.includes(currentTryLetters[column-1])) {
                    const letter = currentTryLetters[column-1];
                    const countInTodaysWord = todaysword.join('').split(letter).length - 1;
                    const countInCurrentTryLetters = currentTryLetters.join('').slice(0, column).split(letter).length - 1;
                    if (countInCurrentTryLetters > countInTodaysWord || todaysword[column-1] === letter) {
                        document.getElementById(currentTryLetters[column-1]).classList.add("out");
                        document.getElementById(currentRow + "-" + column).classList.add("red");
                    } else {
                        document.getElementById(currentTryLetters[column-1]).classList.add("found");
                        document.getElementById(currentRow + "-" + column).classList.add("yellow");
                    }
                } else {
                    document.getElementById(currentTryLetters[column-1]).classList.add("out");
                    document.getElementById(currentRow + "-" + column).classList.add("red");
                }
            }
            if (currentTryLetters.join("") === todaysword.join("")) {
                stillPlaying = false;
                daysInRow++;
                daysPlayed++;
                daysWon++;
                if (Number(daysInRow) > Number(daysInRowLongest)) {
                    daysInRowLongest = daysInRow;
                }
                daysPlayed = addLetter(daysPlayed);
                daysInRow = addLetter(daysInRow);
                daysInRowLongest = addLetter(daysInRowLongest);
                daysWon = addLetter(daysWon);
                showStates(daysPlayed, daysInRow, daysWon, daysInRowLongest);
                let value = DecimalToHex(daysPlayed.toString() + daysInRow.toString() + daysWon.toString() + daysInRowLongest.toString());
                document.cookie = `score = ${value}; expires=Wen, 18 Dec 3000 12:00:00 UTC path=/;`;
                DecimalToHex(daysPlayed.toString() + daysInRow.toString() + daysWon.toString() + daysInRowLongest.toString());
                if (Number(daysPlayed) == 1) {
                    document.getElementsByClassName("text-box")[0].innerHTML = `<h2 id="win">Richtig!</h2>` + document.getElementsByClassName("text-box")[0].innerHTML;            
                } else { 
                    document.getElementsByClassName("text-box")[0].innerHTML = `<h2 id="win">Richtig!</h2>` + document.getElementsByClassName("text-box")[0].innerHTML;            
                }
            }
            if (stillPlaying) {
                currentRow++;
                currentTryLetters = [];
            }
            if (currentRow == 7) {
                daysPlayed++;
                daysInRow = 0;
                daysPlayed = addLetter(daysPlayed);
                daysInRow = addLetter(daysInRow);
                daysInRowLongest = addLetter(daysInRowLongest);
                daysWon = addLetter(daysWon);
                let value = DecimalToHex(daysPlayed.toString() + daysInRow.toString() + daysWon.toString() + daysInRowLongest.toString());
                document.cookie = `score = ${value}; expires=Wen, 18 Dec 3000 12:00:00 UTC path=/;`;
                DecimalToHex(daysPlayed.toString() + daysInRow.toString() + daysWon.toString() + daysInRowLongest.toString());
                stillPlaying = false;
                showStates(daysPlayed, daysInRow, daysWon, daysInRowLongest);
                if (Number(daysPlayed) == 1) {
                    document.getElementsByClassName("text-box")[0].innerHTML = `<h2 stlye="margin-top: 0px; text-align: center;">Game Over</h2>
                    <p style="padding-bottom: 20px; text-align: center;">Das gesuchte Wort war: <b style="color: red; padding-bottom:20px;">`+ todaysword.join("") + `</b></p>` + document.getElementsByClassName("text-box")[0].innerHTML;       
                } else {
                    document.getElementsByClassName("text-box")[0].innerHTML = `<h2 stlye="margin-top: 0px; text-align: center;">Game Over</h2>
                    <p style="padding-bottom: 20px; text-align: center;">Das gesuchte Wort war: <b style="color: red; padding-bottom:20px;">`+ todaysword.join("") + `</b></p>` + document.getElementsByClassName("text-box")[0].innerHTML;
                }
            }
        }
    }
}

function addLetter(input) {
    while (input.toString().length % 4 != 0) {
        input = "0" + input.toString();
    }
    return input
}

function putLetters(letters) {
    clearRow(currentRow);
    for (let column = 1; column <= letters.length; column++) {
        document.getElementById(currentRow + "-" + column).innerHTML = letters[column-1];
    }
}

function IsInputSelected() {
    if (document.querySelector('#state-input:focus')) {
        return true
    } else {
        return false
    }
}

function importStats() {
    inputNum = HexToDecimal(document.getElementById("state-input").value);
    let inputNumArray = [];
    for (let i = 0; i < inputNum.length; i+=4) {
        inputNumArray.push(inputNum.slice(i, i+4));
    }
    inputNumArray = inputNumArray.map(x => x.slice(1));
    daysPlayed = inputNumArray[0];
    daysInRow = inputNumArray[1];
    daysWon = inputNumArray[2];
    daysInRowLongest = inputNumArray[3];

    if (daysPlayed == undefined || daysInRow == undefined || daysWon == undefined || daysInRowLongest == undefined) {
        alert("Der eingegebene Code ist ungültig. Bitte versuche es erneut.");
        return
    }

    document.getElementById("state-input").style.display = "none";
    document.getElementById("state-input-submit").style.display = "none";
    showStates(daysPlayed, daysInRow, daysWon, daysInRowLongest);
    statsHaveBeenImported = true;
}

function showStates(daysPlayed, daysInRow, daysWon, daysInRowLongest) {
    document.getElementById("Played").textContent = Number(daysPlayed);
    document.getElementById("Row").textContent = Number(daysInRow);
    document.getElementById("Longest-Row").textContent = Number(daysInRowLongest);
    document.getElementById("Correct").textContent = Number(daysWon);
    document.getElementById("Export-Stats").style.display = "unset";
    document.getElementById("stats").style.display = "block";
}

function DecimalToHex(x) {
    return parseInt(x, 10).toString(16).toUpperCase();
}


function HexToDecimal(x) {
    num = parseInt(x, 16).toString().toUpperCase();
    if (num.length % 4 != 0) {
        while (num.length % 4 != 0) {
            num = "0" + num.toString();
        }
    }
    return num
}

function CopyToClipboard() {
    var TextToCopy = DecimalToHex(daysPlayed.toString() + daysInRow.toString() + daysWon.toString() + daysInRowLongest.toString());
    var copyText = document.getElementById("copy_input");
    copyText.value = TextToCopy;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Dein Score: " + copyText.value + " wurde in die Zwischenablage kopiert!");
}

function importStatsFromCookie() {
    cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i+=1) {
        if (cookies[i].slice(0, 6) == "score=") {
            inputNum = HexToDecimal(cookies[i].slice(6));
            let inputNumArray = [];
            for (let i = 0; i < inputNum.length; i+=4) {
                inputNumArray.push(inputNum.slice(i, i+4));
            }
            inputNumArray = inputNumArray.map(x => x.slice(1));
            daysPlayed = inputNumArray[0];
            daysInRow = inputNumArray[1];
            daysWon = inputNumArray[2];
            daysInRowLongest = inputNumArray[3];
            document.getElementById("state-input").style.display = "none";
            document.getElementById("state-input-submit").style.display = "none";
            showStates(daysPlayed, daysInRow, daysWon, daysInRowLongest);
            statsHaveBeenImported = true;
        }
    }
    
}

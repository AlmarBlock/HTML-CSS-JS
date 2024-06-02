const question_div = document.getElementById('question');
let questionIndex = 1;
let answers = [];
let double = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let score = 0;
const sv_1 =        [1, 2, 1, 2, 1, 1, 1, 2, 3, 1]
const sv_2 =        [2, 3, 1, 1, 2, 2, 3, 2, 1, 2]
const sv_1_double = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]
const sv_2_double = [0, 0, 1, 0, 0, 1, 0, 0, 0, 1]
const sv_1_score = calculateScore(sv_1, sv_1_double)
const sv_2_score = calculateScore(sv_2, sv_2_double)

const questions =  [
"Sollten Holzschiete legalisiert werden?",
"Sollten die Steuern gleich bleiben?",
"Sollte Musik nur noch in Dreivierteltakt komponiert werden?",
"Sollte man die Farbe von Bananen vorschreiben?",
"Sollten Bäume Wi-Fi haben?",
"Darf Wasser in quadratischen Flaschen verkauft werden?",
"Sollte es illegal sein, Socken zu falten?",
"Sollten Briefkästen nur noch blau sein dürfen?",
"Sollte es ein Gesetz gegen das Niesen von Katzen geben?",
"Sollten Uhren rückwärts laufen?"
];

function init() {
    question_div.innerHTML = getquestion(questionIndex - 1, questions);
}

function whatsDouble() {
    question_div.innerHTML = `<div class="text-box">
    <h2>Ergebnis</h2>
    <p>Wähle, wass die besonder wichtig ist!</p>` + 
    createTableFromArray(questions, answers, true) + `<table id="resulte_grid"><tbody><tr>
    <td class="invis">` + getLongestString(questions) + `</td>
    <td class="invis"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00ab22" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg></td>
    <td><button class="button resulte" id="11" onclick="double_clicked(this.id)">Weiter</button></td>
    </tr></tbody></table></div>`;
    transformTable();
}

function getLongestString(array) {
    return array.reduce((a, b) => a.length > b.length ? a : b, "");
}

function resulte() {
    console.log("answers " + answers);
    console.log("double  " + double);
    console.log("sv_1_score " + sv_1_score);
    console.log("sv_2_score " + sv_2_score);
    console.log("score " + score);
    question_div.innerHTML = `<div class="text-box">
    <h2>Ergebnis</h2>
    <p>Die ` +  getbesstsv(sv_1_score, sv_2_score, score)  + ` passt am besten zu ihnen!</p>` + 
    createTableFromArray(sv_1, sv_2, answers, false, questions) +
    createTableFromArray(sv_1_double, sv_2_double, double, true, questions) + `</div>`;
    transformTable();
}

function transformTable() {
    let tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        if (tds[i].textContent == "1") {
            tds[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00ab22" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>';
        } else if (tds[i].textContent == "2") { 
            tds[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#d61010" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>';
        } else if (tds[i].textContent == "3") { 
            tds[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#cccccc" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>';
        }
    }
}

function calculateScore(array, double) {
    let score = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            if (double[i] == 1) {
                score += 2;
            } else {
                score++;
            }
        } else if (array[i] == 2) {
            if (double[i] == 1) {
                score -= 2;
            } else {
                score--;
            }
        }
    }
    return score;
}

function getbesstsv(sv_1_score, sv_2_score, score) {
    if (Math.abs(sv_1_score - score) < Math.abs(sv_2_score - score)) {
        return `<b>SV 1</b>`;
    } else {
        return `<b>SV 2</b>`;
    }

}

function createTableFromArray(array1, array2, array3, double = false, array4) {
    if (double === true) {
        let table = document.createElement('table');
        table.classList.add("double-indicator");

        for (let i = 0; i < array1.length; i++) {
            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
                cell1.innerHTML = `<div class="invis">` + array4[i] + `<div>`;
            let cell2 = document.createElement('td');
                if (array1[i] == 1) {
                    cell2.innerHTML = `<b>2x</b>`;
                } else {
                    cell2.innerHTML = `<div>1x</div>`;
                }
            let cell3 = document.createElement('td');
                if (array2[i] == 1) {
                    cell3.innerHTML = `<b>2x</b>`;
                } else {
                    cell3.innerHTML = `<div>1x</div>`;
                }
            let cell4 = document.createElement('td');
                if (array3[i] == 1) {
                    cell4.innerHTML = `<b>2x</b>`;
                } else {
                    cell4.innerHTML = `<div>1x</div>`;
                }
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            table.appendChild(row);
        }
        return table.outerHTML;
    } else {
        if (array3 === true) {
            let table = document.createElement('table');

            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
            cell1.innerHTML = "<b>Frage</b>";
            let cell2 = document.createElement('td');
            cell2.innerHTML = "<b>Antwort</b>";
            let cell3 = document.createElement('td');
            cell3.innerHTML = "<b>Doppelt</b>";
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            table.appendChild(row);

            for (let i = 0; i < array1.length; i++) {
                let row = document.createElement('tr');
                let cell1 = document.createElement('td');
                    cell1.textContent = array1[i];

                let cell2 = document.createElement('td');
                    cell2.textContent = array2[i];

                let cell3 = document.createElement('td');
                let button_cell3 = document.createElement('button');
                    button_cell3.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#cccccc"  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
                    button_cell3.setAttribute("onclick","double_clicked(this.id);");
                    button_cell3.id = i + 1;
                    button_cell3.classList.add("button");
                    button_cell3.classList.add("button_double");
                    button_cell3.classList.add("button_off");

                cell3.appendChild(button_cell3);
                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
                table.appendChild(row);
            }
            return table.outerHTML;
        } else {
            let table = document.createElement('table');

            let row = document.createElement('tr');
            let cell1 = document.createElement('td');
            cell1.innerHTML = "<b>Frage</b>";
            let cell2 = document.createElement('td');
            cell2.innerHTML = "<b>SV 1</b>";
            let cell3 = document.createElement('td');
            cell3.innerHTML = "<b>SV 2</b>";
            let cell4 = document.createElement('td');
            cell4.innerHTML = "<b>Sie</b>";
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            table.appendChild(row);

            for (let i = 0; i < array1.length; i++) {
                let row = document.createElement('tr');
                let cell1 = document.createElement('td');
                cell1.textContent = array4[i];
                let cell2 = document.createElement('td');
                cell2.textContent = array1[i];
                let cell3 = document.createElement('td');
                cell3.textContent = array2[i];
                let cell4 = document.createElement('td');
                cell4.textContent = array3[i];
                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
                row.appendChild(cell4);
                table.appendChild(row);
            }
            return table.outerHTML;
        }
    }
}

function getquestion(index, questions) {
    let question_struktur = `<div class="text-box">
                <h2>` + (index + 1) + `. Frage</h2>
                <p>` + questions[index] + `</p>
                <div id="button-container">
                    <div id="buttons1-2">
                        <button class="button" id="1" onclick="answer(this.id)">Ja</button>
                        <button class="button" id="2" onclick="answer(this.id)">Nein</button>
                    </div>
                    <div id="buttons3">
                        <button class="button" id="3" onclick="answer(this.id)">Weiß nicht</button>
                    </div>
                </div>
            </div>`;
    return question_struktur;
}

function double_clicked(id) {
    if (id == 11) {
        resulte();
    } else if (double[id - 1] === 0) {
        double[id - 1] = 1;
        document.getElementById(id).classList.remove("button_off");
        document.getElementById(id).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#00ab22" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
    } else {
        double[id - 1] = 0;
        document.getElementById(id).classList.add("button_off");
        document.getElementById(id).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#cccccc" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
    }
}  

function answer(id) {
    answers[questionIndex - 1] = id;
    if (id == 1) {
        score++;
    } else if (id == 2) {
        score--;
    } else {
        score = score;
    }
    questionIndex++;
    if (questionIndex <= questions.length) {
        question_div.innerHTML = getquestion(questionIndex - 1, questions);
    } else {
        whatsDouble();
    }
}

init();
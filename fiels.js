function Polyrhythmik() {
    window.location.href = "./pages/polyrhymik/polyrhymik.html";
}
function WahlAutoMat() {
    window.location.href = "./pages/wahlautomat/wahlautomat.html";
}
function Woedle() {
    window.location.href = "./pages/woerdle/woerdle.html";
}

const Polyrhythmik_string = 'Polyrhythmik ist eine musikalische Technik, bei der zwei oder mehr verschiedene Rhythmen gleichzeitig gespielt werdfill';
const Woerdle_string = 'Wordle ist ein 2021 veröffentlichtes, kostenlos spielbares Online-Buchstabenspiel; entwickelt wurde es vonfill';


function getTextWidth(text, style) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = style.font;
    return context.measureText(text).width;
}

function getFirstXCharacters(x, string) {
    return string.substring(0, x);
}

function calculateMaxCharacters(string, id) {
    const teaserElement = document.getElementById(id);
    const teaserWidth = teaserElement.offsetWidth;
    const teaserStyle = getComputedStyle(teaserElement);
    const teaserPadding = parseFloat(teaserStyle.paddingLeft) + parseFloat(teaserStyle.paddingRight);
    const teaserMaxWidth = teaserWidth - teaserPadding;

    let maxCharacters = 0;
    let currentWidth = 0;

    for (let i = 0; i < string.length; i++) {
        const charWidth = getTextWidth(string[i], teaserStyle);
        currentWidth += charWidth;
        
        if (currentWidth <= teaserMaxWidth) {
            maxCharacters++;
        } else {
            break;
        }
    }
    const firstXCharacters = getFirstXCharacters(maxCharacters - 4, string);
    return firstXCharacters + "...";
}

function updateTeaserWithIdAndString(id, string) {
    const teaserElement = document.getElementById(id);
    teaserElement.textContent = calculateMaxCharacters(string, id);
}

window.addEventListener('resize', function() {
    updateTeaserWithIdAndString("Polyrhythmik-Teaser", Polyrhythmik_string);
    updateTeaserWithIdAndString("Wordle-Teaser", Woerdle_string);
});

updateTeaserWithIdAndString("Polyrhythmik-Teaser", Polyrhythmik_string);
updateTeaserWithIdAndString("Wordle-Teaser", Woerdle_string);
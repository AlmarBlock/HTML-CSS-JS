if (window.location.href.includes("polyrhymik")) {
    document.getElementById("Woerdle-Footer-Link").href = "../woerdle/woerdle.html";
    document.getElementById("Wahl-Auto-Mat-Footer-Link").href = "../wahlautomat/wahlautomat.html";
    document.getElementById("Polyrhythmik-Footer-Link").href = "./polyrhymik.html";
} else if (window.location.href.includes("wahlautomat")) {
    document.getElementById("Polyrhythmik-Footer-Link").href = "../polyrhymik/polyrhymik.html";
    document.getElementById("Woerdle-Footer-Link").href = "../woerdle/woerdle.html";
    document.getElementById("Wahl-Auto-Mat-Footer-Link").href = "./wahlautomat.html";
} else if (window.location.href.includes("woerdle")) {
    document.getElementById("Polyrhythmik-Footer-Link").href = "../polyrhymik/polyrhymik.html";
    document.getElementById("Wahl-Auto-Mat-Footer-Link").href = "../wahlautomat/wahlautomat.html";
    document.getElementById("Woerdle-Footer-Link").href = "./woerdle.html";
}
if (window.location.href.includes("index") == false || window.location.href.includes("impressum") == false) {
    for (let i = 0; i < document.getElementsByClassName("Index-Link").length; i++) {
        document.getElementsByClassName("Index-Link")[i].href = "../../index.html";
    }
    for (let i = 0; i < document.getElementsByClassName("Impressum-Footer-Link").length; i++) {
        document.getElementsByClassName("Impressum-Footer-Link")[i].href = "../../impressum.html";
    }
}
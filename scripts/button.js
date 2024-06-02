
function back() {
    window.location.href = document.referrer;
}

function random() {
    let pages = ["polyrhymik/polyrhymik.html", "wahlautomat/wahlautomat.html", "woerdle/woerdle.html"];
    let random = Math.floor(Math.random() * pages.length);
    while (window.location.href.includes(pages[random])) {
        random = Math.floor(Math.random() * pages.length);
    }
    window.location.href = "../" + pages[random];
}
function initFooter() {
    if (document.getElementsByTagName('footer')[0] !== undefined) {
        const footer = document.getElementsByTagName('footer')[0];
            footer.innerHTML = `
            <div id="footer-contant-container">
            <ul class="footer_list">
            <li><a class="Index-Link" href="./index.html">Home</a></li>
            <li><p></p></li>
            <li><p></p></li>
            </ul>
            <ul class="footer_list">
            <li><p><a class="Index-Link" href="./index.html">Themen</a></p></li>
            <li><p><a id="Polyrhythmik-Footer-Link" href="./pages/polyrhymik/polyrhymik.html">&#8614; Polyrhythmik</a></p></li>
            <li><p><a id="Wahl-Auto-Mat-Footer-Link" href="./pages/wahlautomat/wahlautomat.html">&#8614; Wahl-Auto-Mat</a></p></li>
            <li><p><a id="Woerdle-Footer-Link" href="./pages/woerdle/woerdle.html">&#8614; Wördle</a></p></li>
            </ul>
            <ul class="footer_list">
            <li><p><a class="Impressum-Footer-Link" href="./impressum.html">Impressum</a></p></li>
            <li><p></p></li>
            <li><p></p></li>
            </ul>
            </div>
            <p><a class="Impressum-Footer-Link" href="./impressum.html" style="text-decoration: none;">&copy; 2024 Demo Name</a></p>
            `;
    }
    if (document.getElementsByTagName('buttons')[0] !== undefined) {
        const buttons = document.getElementsByTagName('buttons')[0];
            buttons.innerHTML = `
                <div id="back" onclick="back()"><span>&#10140;</span> Back</div>
                <div id="next" onclick="random()">Next &#10140;</div>
            `;
    }
    if (document.getElementsByTagName('logo')[0] !== undefined) {
        const logo = document.getElementsByTagName('logo')[0];
            logo.innerHTML = `
                <a class="Index-Link" href="./index.html">Logo <br> goes <br> here!</a>
            `;
    }
};
    
initFooter();
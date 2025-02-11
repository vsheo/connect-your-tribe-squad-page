// selecteer alle cirkels
cirkels = document.querySelectorAll(".profile-bubble")

// genereer nieuwe x & y om de 2s
let cirkelAnimation = setInterval(setPropertyXY, 2000);

// event listener op elke cirkel
cirkels.forEach(cirk => {
    // stop de animatie bij een hover
    cirk.addEventListener("mouseover", () => {
        clearInterval(cirkelAnimation)
    });

    // start de animatie opniew wanneer er geen hover is
    cirk.addEventListener("mouseleave", () => {
        cirkelAnimation = setInterval(setPropertyXY, 2000);
    });
});


// https://www.w3schools.com/js/js_random.asp
// genereer een random getal tussen 0 en 100
function random100() {
    return Math.floor(Math.random() * 30);
}

// genereer een random x & y voor elke cirkel
function setPropertyXY() {
    cirkels.forEach(cirkel => {
        x = random100() + "dvh";
        y = random100() + "dvw";
    
        cirkel.style.setProperty('--x', x)
        cirkel.style.setProperty('--y', y)
    });
}


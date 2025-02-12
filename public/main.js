// selecteer alle cirkels
cirkels = document.querySelectorAll(".profile-bubble")

// genereer nieuwe x & y om de 2s
setPropertyXY()
let cirkelAnimation = setInterval(setPropertyXY, 10000);

// Bij een click stopt de cirkel met bewege, en gaat het open
cirkels.forEach(cirkel => {
    // stop de animatie bij een hover
    cirkel.addEventListener("click", () => {
        cirkel.classList.toggle("open")
    });
});


// genereer random getallen, seconden, voor de keyframe animatie
function setPropertyXY() {
    cirkels.forEach(cirkel => {
        // https://www.w3schools.com/js/js_random.asp
        durX = Math.floor(Math.random() * 20);
        durY = Math.floor(Math.random() * 20);
        // z-index
        z = Math.floor(Math.random() * 100);

        // maak custom properties van de random seconden
        cirkel.style.setProperty('--durX', durX)
        cirkel.style.setProperty('--durY', durY)
        cirkel.style.setProperty('--z', z)
    });
}


// selecteer alle cirkels
cirkels = document.querySelectorAll(".profile-bubble")

// genereer nieuwe x & y om de 2s
setPropertyXY()
let cirkelAnimation = setInterval(setPropertyXY, 10000);

// event listener op elke cirkel
cirkels.forEach(cirkel => {
    // stop de animatie bij een hover
    cirkel.addEventListener("click", () => {
        clearInterval(cirkelAnimation)
        console.log("ai wroko")
        // cirk.style.setProperty('--size-circle', 20 + 'em')
        cirkel.classList.toggle("open")
    });

    // // start de animatie opniew wanneer er geen hover is
    // cirk.addEventListener("mouseleave", () => {
    //     cirkelAnimation = setInterval(setPropertyXY, 1000);
    // });
});


// genereer een random x & y voor elke cirkel
function setPropertyXY() {
    cirkels.forEach(cirkel => {
        // https://www.w3schools.com/js/js_random.asp
        // genereer een random getal tussen 0 en 100
        durX = Math.floor(Math.random() * 20);
        durY = Math.floor(Math.random() * 20);

        // z-index
        z = Math.floor(Math.random() * 100);
    
        cirkel.style.setProperty('--durX', durX)
        cirkel.style.setProperty('--durY', durY)
        cirkel.style.setProperty('--z', z)
    });
}


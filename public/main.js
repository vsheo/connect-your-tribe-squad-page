// ************************************** index **************************************

// selecteer alle cirkels
cirkels = document.querySelectorAll(".profile-bubble")

// genereer nieuwe custom properties
setPropertyXY()
// genereer nieuwe custom properties om de 10s
// let cirkelAnimation = setInterval(setPropertyXY, 10000);


// Bij een click wordt een class toegevoegd aan de ge-klikte cirkel
cirkels.forEach(cirkel => {
    cirkel.addEventListener("click", () => {
        cirkel.classList.toggle("open")
    });
});


// genereer random getallen, seconden, voor de keyframe animatie
function setPropertyXY() {
    cirkels.forEach(cirkel => {
        // https://www.w3schools.com/js/js_random.asp
        durX = Math.floor(Math.random() * 10);
        durY = Math.floor(Math.random() * 10);
        // z-index
        z = Math.floor(Math.random() * 100);

        // maak custom properties van de random seconden
        cirkel.style.setProperty('--durX', durX)
        cirkel.style.setProperty('--durY', durY)
        cirkel.style.setProperty('--z', z)
    });
}


// ************************************** detail pagina **************************************
// drop down op de profile kaartjes
const dropDownButton = document.querySelectorAll('.drop-down')
const openItem = document.querySelector('.profile-card')
const favoHidden = document.querySelectorAll('.favo')


openDropDown()


function openDropDown() {
    // event listener op alle dropdown buttons
    dropDownButton.forEach(button => {
        button.addEventListener('click', (e) => {
            // zoek de parent container van de geklikte dropdown button
            const parentContainer = e.target.closest('.profile-card');
            // toggle de class open
            parentContainer.classList.toggle('open');
        });
    });
};

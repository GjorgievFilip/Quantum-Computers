// JavaScript source code
//Gamemode 
const togButton = document.getElementById("entanglementBtn");
togButton.innerHTML = "Toggle Entanglement: Off";

function ToggleEntangelmentOnClick() {
    if (!entangelment) {
        togButton.innerHTML = "Toggle Entanglement: On";
        entangelment = true;
        console.log("Entangelment: true / on");
    }
    else {
        togButton.innerHTML = "Toggle Entanglement: Off";
        entangelment = false;
        console.log("Entangelment: false / off");
    }
}

document.getElementById("entanglementBtn").addEventListener("click", ToggleEntangelment);
ToggleEntangelment();
//    togButton.addEventListener("click", myFunction);
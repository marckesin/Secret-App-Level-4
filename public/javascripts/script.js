
const checkBox = document.getElementById("showPass");
let passwordInput = document.getElementById("inputPass");

checkBox.addEventListener("change", isChecked);

function isChecked(event) {
    const checkState = event.target.checked;
    if (checkState) {
        passwordInput.type = "text";
        checkBox.setAttribute("aria-label", "Ocultar senha");
    } else {
        passwordInput.type = "password";
        checkBox.setAttribute("aria-label", "Mostra senha");
    }
}
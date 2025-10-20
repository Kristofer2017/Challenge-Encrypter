// Selecting elements from the DOM
const btnEncrypt = document.getElementById("encrypt-btn");
const btnDecrypt = document.getElementById("decrypt-btn");
const btnPaste = document.getElementById("paste-btn");
const btnClear = document.getElementById("clear-btn");
const btnCopy = document.getElementById("copy-btn");
const btnReset = document.getElementById("restart-btn");
const input = document.getElementById("input");
const output = document.getElementById("output");
const msgFound = document.getElementById("message-found");
const msgNotFound = document.getElementById("message-not-found");
const infoLabel = document.getElementById("information");
const darkModeBtn = document.getElementById("dark-mode-btn");

// Adding event listeners to the buttons
btnEncrypt.addEventListener("click", encrypting)
btnDecrypt.addEventListener("click", decrypting)
btnCopy.addEventListener("click", copying)
btnPaste.addEventListener("click", pasting)
btnClear.addEventListener("click", clearing)
btnReset.addEventListener("click", clearing)
darkModeBtn.addEventListener("click", setDarkMode)
input.addEventListener("input", verifyTextEntered);
input.addEventListener("change", verifyTextEntered);

initialConfiguration();

function initialConfiguration(){
    showOutput(false)
    infoLabel.classList.add("correct");
}

function encrypting(){
    output.value = encryptText(input.value);
    showOutput(true);
}

function decrypting(){
    output.value = decryptText(input.value);
    showOutput(true);
}

function encryptText(text){
    let txtEncrypted = "";
    
    for (let i = 0; i < text.length; i++){
        switch (text[i]){
            case 'e': txtEncrypted += "enter"; break;
            case 'i': txtEncrypted += "imes"; break;
            case 'a': txtEncrypted += "ai"; break;
            case 'o': txtEncrypted += "ober"; break;
            case 'u': txtEncrypted += "ufat"; break;
            default: txtEncrypted += text[i]; break;
        }
    }
    
    return txtEncrypted;
}

function decryptText(text){
    let txtDecrypted = "";
    
    for (let i = 0; i < text.length; i++){
        switch (text[i]){
            case 'e': txtDecrypted += 'e';
                if (text[i + 1] + text[i + 2] + text[i + 3] + text[i + 4] == "nter") i += 4;
                break;
            case 'i': txtDecrypted += 'i';
                if (text[i + 1] + text[i + 2] + text[i + 3] == "mes") i += 3;
                break;
            case 'a': txtDecrypted += 'a';
                if (text[i + 1] == 'i') i += 1;
                break;
            case 'o': txtDecrypted += 'o';
                if (text[i + 1] + text[i + 2] + text[i + 3] == "ber") i += 3;
                break;
            case 'u': txtDecrypted += 'u';
                if (text[i + 1] + text[i + 2] + text[i + 3] == "fat") i += 3;
                break;
            default: txtDecrypted += text[i]; break;
        }
    }
    
    return txtDecrypted;
}

function showOutput(show){
    if (show) {
        msgNotFound.style.display = "none";
        msgFound.style.display = "flex";
    } else {
        msgNotFound.style.display = "flex";
        msgFound.style.display = "none";
    }
}

function copying(){
    navigator.clipboard.writeText(output.value).catch(err => {
        console.error("Error al copiar: ", err);
    });
}

function pasting(){
    navigator.clipboard.readText().then(text => {
        input.value = text
        verifyTextEntered();
    }).catch(err => {
        console.error("Error al pegar: ", err);
    });
}

function clearing() {
    showOutput(false);
    input.value = "";
    output.value = "";
    verifyTextEntered();
}

function setDarkMode() {
    document.body.classList.toggle('dark');
}

function verifyTextEntered(){
    const allowed = /^[a-z ]*$/;

    if(input.value ==  "" || input.value.match(allowed)){
        infoLabel.classList.remove("wrong");
        infoLabel.classList.add("correct");
        btnEncrypt.disabled = btnDecrypt.disabled = false;
    }else{
        infoLabel.classList.remove("correct");
        infoLabel.classList.add("wrong");
        btnEncrypt.disabled = btnDecrypt.disabled = true;
    }
}
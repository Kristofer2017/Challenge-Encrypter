const select = (className) => document.querySelector("." + className);

let btnEncrypt = select("encrypt");
let btnDecrypt = select("decrypt");
let btnPaste = select("paste");
let btnClear = select("clear");
let btnCopy = select("copy-btn");
let btnReset = select("restart");
let input = select("text-entered");
let output = select("text-processed");


const addClickEventListener = (element, className) => element.addEventListener("click", className);

addClickEventListener(btnEncrypt, encrypting);
addClickEventListener(btnDecrypt, decrypting);
addClickEventListener(btnPaste, pasting);
addClickEventListener(btnClear, clearing);
addClickEventListener(btnCopy, copying);
addClickEventListener(btnReset, reseting);


function encrypting(){
    if (input.value == "") {
        return;
    }

    configureLeftPanel();
    
    // Adding the encrypted text to the textarea assigned
    output.value = encryptText(input.value);
}

function decrypting(){
    if (input.value == "") {
        return;
    }

    configureLeftPanel();

    // Adding the decrypted text to the textarea assigned
    output.value = decryptText(input.value);
}

function pasting(){
    navigator.clipboard.readText().then(text => input.value = text);
}

function clearing(){
    input.value = "";
    input.focus();
}

function copying(){
    let textToCopy = output.value;

    copyText(textToCopy);
}

function reseting(){
    // Hiding elements
    btnCopy.style.display = "none";
    btnReset.style.display = "none";
    output.style.display = "none";

    // Showing back elements
    document.querySelector(".boy-pic").style.display = "inline-block";
    document.querySelector(".title").style.display = "inline-block";
    document.querySelector(".subtitle").style.display = "inline-block";

    // Clearing any remianing text on the screen
    clearing();
}

function copyText(text){
    var input = document.createElement('textarea');
    input.value = text;

    document.body.appendChild(input);

    input.select();

    try{
        return document.execCommand("copy");
    }catch (ex){
        console.warn("Copy to clipboard failed.", ex);
        return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }finally{
        document.body.removeChild(input);
    }
}

function configureLeftPanel(){
    // Hides unnecesary elements
    document.querySelector(".boy-pic").style.display = "none";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".subtitle").style.display = "none";

    // Showing buttons and adding existing styles to them
    btnCopy.style.display = "inline-block";
    btnReset.style.display = "inline-block";
    btnCopy.classList.add("encrypt");
    btnReset.classList.add("decrypt");

    // Showing textarea cotaining the output
    output.style.display = "inline-block";
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

// Veryfy characters on the text entered are between a-z

document.addEventListener("keyup", verifyTextEntered);

function verifyTextEntered(){
    var allowed = /^[a-z ]*$/;

    if(input.value.match(allowed)){
        document.querySelector(".information").style.color = "#495057";
        btnEncrypt.disabled = btnDecrypt.disabled = false;
    }else{
        document.querySelector(".information").style.color = "#ff4735";
        btnEncrypt.disabled = btnDecrypt.disabled = true;
    }
}
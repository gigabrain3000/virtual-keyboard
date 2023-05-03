const KEYBOARD_KEYS = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace'], ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"], ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"], ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲","Shift"], ["Ctrl", "Alt", "Space", "Alt", "◄", "▼", "►", "Ctrl"]];
const LETTERS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
const KEYS_SPECIAL = ["Backspace", "Caps Lock", "Enter", "Shift"];
const KEYS_SYMBOLS = ["`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"];
const KEYS_ARROWS = ["▲", "◄", "▼", "►"];
const KEYS_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

let textarea = document.createElement('textarea');
let keyboard = document.createElement('div');
let title = document.createElement('h1');
let label = document.createElement('label');

function createKeyboard () {
  document.body.appendChild(title);
  document.body.appendChild(textarea);
  document.body.appendChild(label);
  label.appendChild(keyboard);
  keyboard.className = "keyboard";
  textarea.className = "textarea";
  title.className = "h1";
  title.innerText = "Virtual Keyboard";
  textarea.setAttribute("id", "textarea");
  label.setAttribute("for", "textarea");

  window.addEventListener("load", function() {
    textarea.focus();
  });

  for (let i = 0; i <= KEYBOARD_KEYS.length - 1; i++) {
    let keyboardRow = document.createElement('div');

    keyboard.appendChild(keyboardRow);
    keyboardRow.className = "keyboard-row"
    for (let j = 0; j <= KEYBOARD_KEYS[i].length - 1; j++) {
      let keyboardButton = document.createElement('div');

      keyboardRow.appendChild(keyboardButton).innerHTML = KEYBOARD_KEYS[i][j];
      keyboardButton.className = "keyboard-row__key";
      if (LETTERS.includes(keyboardButton.innerHTML)) {
        keyboardButton.classList.add("keyboard-row__key_letter");
      }
      else if (KEYS_SPECIAL.includes(keyboardButton.innerHTML)) {
        keyboardButton.classList.add("keyboard-row__key_special");
      }
      else if (keyboardButton.innerHTML.includes("Space")) {
        keyboardButton.classList.add("keyboard-row__key_space");
      }
      else if (KEYS_NUMBERS.includes(keyboardButton.innerHTML)) {
        keyboardButton.classList.add("keyboard-row__key_number");
      }
      else if (KEYS_SYMBOLS.includes(keyboardButton.innerHTML)) {
        keyboardButton.classList.add("keyboard-row__key_symbol");
      }
      else if (KEYS_ARROWS.includes(keyboardButton.innerHTML)) {
        keyboardButton.classList.add("keyboard-row__key_arrow");
      } else {
        keyboardButton.classList.add("keyboard-row__key_special_short")
      }
      console.log(KEYBOARD_KEYS[i][j]);
    }
  }
}

function interactVirtualKeyboard (e) {
  let startPos = textarea.selectionStart;
  let endPos = textarea.selectionEnd;
  let keyboardKey = e.target.closest(".keyboard-row__key");

  if (keyboardKey.className.includes("keyboard-row__key_special") || keyboardKey.className.includes("keyboard-row__key_special_short")) {
    if (keyboardKey.innerText === "Backspace") {
      simulateBackspace ();
    }
    else if (keyboardKey.innerText === "Del") {
      simulateDel ();
    }
    else if (keyboardKey.innerText === "Enter") {
      textarea.value = textarea.value.substring(0, startPos) + "\n" + textarea.value.substring(endPos);
      textarea.setSelectionRange(startPos + 1, startPos + 1);
    }
    else if (keyboardKey.innerText === "Tab") {
      textarea.value = textarea.value.substring(0, startPos) + "\t" + textarea.value.substring(endPos);
      textarea.setSelectionRange(startPos + 1, startPos + 1);
    }
    else if (keyboardKey.innerText === "Caps Lock") {
      simulateCapsLock (e);
    }
  }
  else if (keyboardKey.className.includes("keyboard-row__key_space")) {
    textarea.value = textarea.value.substring(0, startPos) + " " + textarea.value.substring(endPos);
    textarea.setSelectionRange(startPos + 1, startPos + 1);
  }
  else {
    textarea.value = textarea.value.substring(0, startPos) + keyboardKey.innerText + textarea.value.substring(endPos);
    textarea.setSelectionRange(startPos + 1, startPos + 1);
  }
}

function keyDown (e) {
  let startPos = textarea.selectionStart;
  let keyboardKey = document.querySelectorAll(".keyboard-row__key");
  textarea.focus();
  for (let i = 0; i <= keyboardKey.length - 1; i++) {
    if (keyboardKey[i].innerText == e.key || e.key == "Control" && keyboardKey[i].innerText == "Ctrl" || e.key == " " && keyboardKey[i].innerText == "Space") {
      keyboardKey[i].classList.add("keyboard-row__key_active");
      textarea.setSelectionRange(startPos + 1, startPos + 1);
    }
    else if (e.key == "CapsLock" && keyboardKey[i].innerText == "Caps Lock") {
      keyboardKey[i].click();
    }
  }
}

function keyUp (e) {
  let keyboardKey = document.querySelectorAll(".keyboard-row__key");
  for (let i = 0; i <= keyboardKey.length - 1; i++) {
    if (keyboardKey[i].innerText == e.key || e.key == "Control" && keyboardKey[i].innerText == "Ctrl" || e.key == " " && keyboardKey[i].innerText == "Space") {
      keyboardKey[i].classList.remove("keyboard-row__key_active");
    }
  }
}

function simulateBackspace () {
  let startPos = textarea.selectionStart;
  let endPos = textarea.selectionEnd;

  if (startPos === endPos) {
    startPos--;
  }
  
  textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos);
  textarea.setSelectionRange(startPos, startPos);
}

function simulateDel () {
  let startPos = textarea.selectionStart;
  let endPos = textarea.selectionEnd;

  if (startPos === endPos) {
    textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(startPos + 1);
  }
  
  textarea.value = textarea.value.slice(0, startPos) + textarea.value.slice(endPos);
  textarea.setSelectionRange(startPos, startPos);
}

function simulateCapsLock (e) {
  let keyboardKey = e.target.closest(".keyboard-row__key");
  let letterKeys = document.querySelectorAll(".keyboard-row__key_letter");
  if (keyboardKey.className.includes("keyboard-row__key_active")) {
    letterKeys.forEach((letter) => {
      letter.innerText = letter.innerText.toLowerCase();
    });
    keyboardKey.classList.remove("keyboard-row__key_active");
  }
  else {
    letterKeys.forEach((letter) => {
      letter.innerText = letter.innerText.toUpperCase();
    });
    keyboardKey.classList.add("keyboard-row__key_active");
  }
}

keyboard.addEventListener("click", interactVirtualKeyboard);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

createKeyboard ();
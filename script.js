const KEYBOARD_KEYS = [["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", 'Backspace'], ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"], ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"], ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲","Shift"], ["Ctrl", "Alt", "Space", "Alt", "◄", "▼", "►", "Ctrl"]];
const LETTERS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
const KEYS_SPECIAL = ["Backspace", "Caps Lock", "Enter", "Shift"];
const KEYS_SPECIAL_SHORT = ["Tab", "Ctrl", "Alt", "Del"];
const KEYS_SYMBOLS = ["`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"];
const KEYS_ARROWS = ["▲", "◄", "▼", "►"]

let textarea = document.createElement('textarea');
let keyboard = document.createElement('div');
let title = document.createElement('h1');

function createKeyboard () {
  document.body.appendChild(title);
  document.body.appendChild(textarea);
  document.body.appendChild(keyboard);
  keyboard.className = "keyboard";
  textarea.className = "textarea";
  title.className = "h1";
  title.innerText = "Virtual Keyboard";

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
  let keyboardKey = e.target.closest(".keyboard-row__key");

  if (keyboardKey.className.includes("keyboard-row__key_special") || keyboardKey.className.includes("keyboard-row__key_special_short")) {
    if (keyboardKey.innerText === "Backspace") {
      //textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    else if (keyboardKey.innerText === "Enter") {

    }
  }
  else if (keyboardKey.className.includes("keyboard-row__key_space")) {
    textarea.value += " ";
  }
  else {
    textarea.value += keyboardKey.innerText;
  }

}
keyboard.addEventListener("click", interactVirtualKeyboard);

createKeyboard ();
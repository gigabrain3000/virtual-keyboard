function keyboardCreating () {
  let textarea = document.createElement('textarea');
  let keyboard = document.createElement('div');
    
  const KEYBOARD_KEYS = [["`", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", 'Backspace'], ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"], ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"], ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲","Shift"], ["Ctrl", "Alt", "Space", "Alt", "◄", "▼", "►", "Ctrl"]];
  const LETTERS = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
  const KEYS_SPECIAL = ["Backspace", "Caps Lock", "Enter", "Shift"];

  document.body.appendChild(textarea);
  document.body.appendChild(keyboard);
  keyboard.className = "keyboard";
  textarea.className = "textarea";

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
      console.log(KEYBOARD_KEYS[i][j]);
    }
  }
}



keyboardCreating ();
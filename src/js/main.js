'use strict';

const keyboardKeysLayout = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowRight', 'ArrowDown']
];
const keyboardEN = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '⯅'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⯇', '⯈', '⯆']
];
const keyboardENShift = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
    ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', '⯅'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⯇', '⯈', '⯆']
];
const keyboardRU = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
    ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', '⯅'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⯇', '⯈', '⯆']
];
const keyboardRUShift = [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
    ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'Shift', '⯅'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⯇', '⯈', '⯆']
];
const keyboardSpecialLayout = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1]
];
let shiftIsPressed = false;
let ctrlIsPressed = false;
let altIsPressed = false;
let langChanged = false;
let rendered = false;
let isDark = false;

if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'EN');
}

// ============= Render the keyboard =============
document.body.innerHTML += "<main><section class=\"keyboard\"><div class=\"container\"><div class=\"keyboard__inner\"><textarea class=\"keyboard__text\"></textarea><div class=\"keyboard__lang\"></div><div class=\"keyboard__keys\"></div><button class=\"keyboard__theme-button\" onclick=\"changeTheme()\">Change theme</button></div></div></section></main>";
const keyboard = document.querySelector('.keyboard__keys');
const textarea = document.querySelector('.keyboard__text');
const langDisplay = document.querySelector('.keyboard__lang');
const keyboardThemeButton = document.querySelector('.keyboard__theme-button');

function changeTheme(){
    if (isDark) {
        document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./src/css/reset.css"><link rel="stylesheet" href="./src/css/light-mode.css">';
        isDark = false;
    } else {
        document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./src/css/reset.css"><link rel="stylesheet" href="./src/css/dark-mode.css">';
        isDark = true;
    }
}

function languageDisplay() {
    if (localStorage.getItem('lang') === 'EN') {
        langDisplay.innerHTML = 'Current language: English';
    } else if (localStorage.getItem('lang') === 'RU') {
        langDisplay.innerHTML = 'Current language: Russian';
    }
};

function renderSymbols(posx, posy) {
    console.log(`renderSymbol Triggered: ${shiftIsPressed} : ${localStorage.getItem('lang')}`);
    if (localStorage.getItem('lang') === 'EN' && shiftIsPressed === false) {
        return keyboardEN[posx][posy];
    } else if (localStorage.getItem('lang') === 'RU' && shiftIsPressed === false) {
        return keyboardRU[posx][posy];
    } else if (localStorage.getItem('lang') === 'EN' && shiftIsPressed === true) {
        return keyboardENShift[posx][posy];
    } else if (localStorage.getItem('lang') === 'RU' && shiftIsPressed === true) {
        return keyboardRUShift[posx][posy];
    }
};

function renderLayout() {
    keyboard.innerHTML = '';

    for (let j = 0; j < 14; j++) {
        if (keyboardSpecialLayout[0][j]) {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--special keyboard__key--special--inactive\" id=\"${keyboardKeysLayout[0][j]}\">${renderSymbols(0, j)}</div>`;
        }
        else {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--inactive\" id=\"${keyboardKeysLayout[0][j]}\">${renderSymbols(0, j)}</div>`;
        }
    }
    for (let j = 0; j < 15; j++) {
        if (keyboardSpecialLayout[1][j]) {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--special keyboard__key--special--inactive\" id=\"${keyboardKeysLayout[1][j]}\">${renderSymbols(1, j)}</div>`;
        }
        else {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--inactive\" id=\"${keyboardKeysLayout[1][j]}\">${renderSymbols(1, j)}</div>`;
        }
    }
    for (let j = 0; j < 13; j++) {
        if (keyboardSpecialLayout[2][j]) {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--special keyboard__key--special--inactive\" id=\"${keyboardKeysLayout[2][j]}\">${renderSymbols(2, j)}</div>`;
        }
        else {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--inactive\" id=\"${keyboardKeysLayout[2][j]}\">${renderSymbols(2, j)}</div>`;
        }
    }
    for (let j = 0; j < 13; j++) {
        if (keyboardSpecialLayout[3][j]) {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--special keyboard__key--special--inactive\" id=\"${keyboardKeysLayout[3][j]}\">${renderSymbols(3, j)}</div>`;
        }
        else {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--inactive\" id=\"${keyboardKeysLayout[3][j]}\">${renderSymbols(3, j)}</div>`;
        }
    }
    for (let j = 0; j < 9; j++) {
        if (keyboardSpecialLayout[4][j]) {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--special keyboard__key--special--inactive\" id=\"${keyboardKeysLayout[4][j]}\">${renderSymbols(4, j)}</div>`;
        }
        else {
            keyboard.innerHTML += `<div class=\"keyboard__key keyboard__key--inactive\" id=\"${keyboardKeysLayout[4][j]}\">${renderSymbols(4, j)}</div>`;
        }
    }
}



renderLayout();
languageDisplay();



// ============= Changes key background when active =============
keyboard.addEventListener('mousedown', event => {
    let key = event.target.innerHTML;
    if (key === 'Backspace') {
        textarea.value = textarea.value.slice(0, -1);
    }
    else if (key === 'Enter') {
        textarea.value = textarea.value + '\n';
    }
    else if (key === 'Tab' || key === 'Del' || key === 'Caps Lock' || key === 'Win' || key === 'Ctrl' || key === 'Shift' || key === 'Alt') {
        null;
    } else {
        textarea.value += key;
    }
    

    if (event.target.classList[0] === 'keyboard__key') {
        event.target.classList.remove('keyboard__key--inactive');
        event.target.classList.remove('keyboard__key--special--inactive');
        event.target.classList.add('keyboard__key--active');
    }  
})
keyboard.addEventListener('mouseup', event => {
    if (event.target.classList[0] === 'keyboard__key') {
        event.target.classList.remove('keyboard__key--active');
        if (event.target.classList[1] === 'keyboard__key--special') { event.target.classList.add('keyboard__key--special--inactive'); }
        else { event.target.classList.add('keyboard__key--inactive'); }
    }  
})

// ============= Listens to the keyboard input =============
document.body.addEventListener('keydown', event => {
    if (document.activeElement != textarea) {
        console.log(`Keydown event triggered: `)
        if (event.key === 'Backspace' || (ctrlIsPressed && event.code === 'KeyZ')) {
            textarea.value = textarea.value.slice(0, -1);
        }
        else if (event.key === 'Enter') {
            textarea.value = textarea.value + '\n';
        }
        else if (event.key === 'Shift') {
            shiftIsPressed = true;
        }
        else if (event.key === 'Alt') {
            altIsPressed = true;
        }
        else if (event.key === 'Control') {
            ctrlIsPressed = true;
        } else if (event.key === 'Tab' || event.key === 'Delete' || event.key === 'CapsLock' || event.key === 'Meta') {
            null;
        } else if (event.key === ' ') {
            textarea.value += ' ';
        }
        else {
            for (let i = 0; i < 5; i++) {
                if (keyboardKeysLayout[i].findIndex(element => element === event.code) != -1) {
                    textarea.value += renderSymbols(i, keyboardKeysLayout[i].findIndex(element => element === event.code));
                    break; 
                }
            }
        }

        if (shiftIsPressed && altIsPressed && !ctrlIsPressed && !langChanged) {
            langChanged = true;
            if (localStorage.getItem('lang') === 'EN') {
                console.log('Changed from EN to RU')
                localStorage.removeItem('lang');
                localStorage.setItem('lang', 'RU');
            } else {
                console.log('Changed from RU to EN');
                localStorage.removeItem('lang');
                localStorage.setItem('lang', 'EN');
            }

            languageDisplay();
            renderLayout();

            rendered = false;
            langChanged = true;
        }

        if (shiftIsPressed && !rendered) {
            renderLayout();

            rendered = true;
        }


        document.querySelector(`#${event.code}`).classList.remove('keyboard__key--inactive');
        document.querySelector(`#${event.code}`).classList.remove('keyboard__key--special--inactive');
        document.querySelector(`#${event.code}`).classList.add('keyboard__key--active');
    }
})
document.body.addEventListener('keyup', event => {
    console.log(`Keyup event triggered`)
    document.querySelector(`#${event.code}`).classList.remove('keyboard__key--active');
    if (document.querySelector(`#${event.code}`).classList[1] === 'keyboard__key--special') { document.querySelector(`#${event.code}`).classList.add('keyboard__key--special--inactive'); }
    else { document.querySelector(`#${event.code}`).classList.add('keyboard__key--inactive'); }

    if (event.key === 'Shift') {
        shiftIsPressed = false;
        langChanged = false;
        rendered = false;
        renderLayout();
    }
    else if (event.key === 'Alt') {
        altIsPressed = false;
        langChanged = false;
    }
    else if (event.key === 'Control') {
        ctrlIsPressed = false;
    }
})
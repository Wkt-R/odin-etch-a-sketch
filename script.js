const defaultColor = '#333333'
const defaultMode = 'color'
let currentColor = defaultColor;
let currentMode = defaultMode;
let click = true;
colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
eraserBtn.onclick = () => setCurrentMode('eraser')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
resetBtn.onclick = () => clearGrid()
function setCurrentColor(newColor) {
    currentColor = newColor
}
function setCurrentMode(newMode) {
    currentMode = newMode
}
function createDivs(size) {
    let sketch = document.querySelector(".sketch-container");
    let squares = sketch.querySelectorAll("div");
    squares.forEach((div) => div.remove());
    sketch.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketch.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let amount = size * size;
    for(let i = 0; i < amount ; i++) {
        let square = document.createElement('div');
        square.addEventListener('mouseover', changeColor)
        square.style.backgroundColor = "white";
        sketch.insertAdjacentElement("beforeend",square);
    }
}
function changeSize(input) {
    if (input >= 2 && input <=100) {
        document.querySelector('.error').style.display = 'none';
        createDivs(input);
    } else {
        document.querySelector('.error').style.display = 'flex';
    }
}

function changeColor(e) {
    if (click) {
        if (currentMode === 'rainbow') {
            const randomR = Math.floor(Math.random() * 256)
            const randomG = Math.floor(Math.random() * 256)
            const randomB = Math.floor(Math.random() * 256)
            e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`
        } else if (currentMode === 'color') {
            e.target.style.backgroundColor = currentColor
        } else if (currentMode === 'eraser') {
            e.target.style.backgroundColor = '#fefefe'
        }
    }
}
function clearGrid() {
    let sketch = document.querySelector(".sketch-container");
    let squares = sketch.querySelectorAll("div");
    squares.forEach((div) => div.remove());
    createDivs(16)
}
document.querySelector(".sketch-container").addEventListener("click",(e) => {
   if (e.target.tagName != 'BUTTON') {
    click = !click;
    if (click) {
        document.querySelector('.mode').textContent = "Drawing";
    } else {
        document.querySelector('.mode').textContent = "Not Drawing";
    }
   }
})
window.onload = () => {
    createDivs(16)
}
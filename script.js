window.onload = async function(){

let values = [];
var sleepVar = 10;

function renderValues(){
    const sandbox = document.getElementById("sandboxValues");
    sandbox.innerHTML = '';
    const barWidth = 100.0 / values.length;

    for (let i=0; i< values.length; i++){
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = barWidth + '%';
        bar.style.height = values[i]+'px';
        sandbox.appendChild(bar);
    }
}

function randomizeArray() {
    let currentIndex = values.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [values[currentIndex], values[randomIndex]] = [
        values[randomIndex], values[currentIndex]];
    }
}

async function bubbleSort() {

    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < (values.length - i - 1); j++) {
            if (values[j] > values[j + 1]) {
                var temp = values[j]
                values[j] = values[j + 1]
                values[j + 1] = temp

                await sleep();
                renderValues();
            }
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < values.length; i++) {
        let key = values[i];
        let j = i - 1;

        while (j >= 0 && values[j] > key) {
            values[j + 1] = values[j];
            j = j - 1;
        }
        values[j + 1] = key;

        await sleep();
        renderValues();
    }
}

function sleep() {
    return new Promise(resolve => setTimeout(resolve, sleepVar));
}

function fillArray (size){
    values = [];
    const step = 500 / size;
    for(let i = 1; i<= size; i++){
        values.push(i*step);
    }
}

fillArray(50);
renderValues();

document.getElementById("randomizeButton").onclick = function(){
    randomizeArray();
    renderValues();
}

document.getElementById("bubbleSortButton").onclick = function(){
    bubbleSort();
    renderValues();
}

document.getElementById("insertionSortButton").onclick = function(){
    insertionSort();
    renderValues();
}

document.getElementById("setSizeButton").onclick = function(){
    fillArray(parseInt(document.getElementById("sizeInput").value));
    renderValues();
}

document.getElementById("setSpeedButton").onclick = function(){
    sleepVar = parseInt(document.getElementById("speedInput").value);
}

}
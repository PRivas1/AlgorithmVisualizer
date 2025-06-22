window.onload = async function(){

let values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
310, 320, 330, 340, 350, 360, 370, 380, 390, 400,
410, 420, 430, 440, 450, 460, 470, 480, 490, 500];

function renderValues(){
    document.getElementById("sandboxValues").innerHTML = '';
    for(let i=0; i < values.length; i++){
        document.getElementById("sandboxValues").innerHTML += '<div class="bar" style="height: '+ values[i] +'px"></div>';
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

                await sleep(20);
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

        await sleep(20);
        renderValues();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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

}
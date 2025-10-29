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
    const n = values.length;
    document.getElementById("tcExpected").innerHTML = "O(n<sup>2</sup>): " + (n*n);

    let comparison = 0;
    let swap = 0;

    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < (values.length - i - 1); j++) {
            comparison ++;
            if (values[j] > values[j + 1]) {
                swap ++;
                var temp = values[j]
                values[j] = values[j + 1]
                values[j + 1] = temp

                await sleep();
                renderValues();
            }
        }
    }

    let time = comparison + swap;
    document.getElementById("tcActual").innerHTML = (time); 
}

async function insertionSort() {
    const n = values.length;
    document.getElementById("tcExpected").innerHTML = "O(n<sup>2</sup>): " + (n*n);

    let comparison = 0;
    let swap = 0;

    for (let i = 1; i < n; i++) {
        let key = values[i];
        let j = i - 1;

        while (j >= 0) {
            comparison++;

            if (values[j] > key) {
                swap++; 
                values[j + 1] = values[j];
                j = j - 1;
            } else {
                break;
            }
        }

        swap++;
        values[j + 1] = key;

        await sleep();
        renderValues();
    }

    let time = comparison + swap;
    document.getElementById("tcActual").innerHTML = (time); 
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


async function selectionSort() {
    const n = values.length;
    document.getElementById("tcExpected").innerHTML = "O(n<sup>2</sup>): " + (n*n);

    let comparison = 0;
    let swap = 0;

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < n; j++) {


            comparison++;

            if (values[j] < values[min_idx]) {
                min_idx = j;
            }
        }

        if (min_idx != i) {
            swap++;
            let temp = values[i];
            values[i] = values[min_idx];
            values[min_idx] = temp;
        }

        await sleep();
        renderValues();
    }

    let time = comparison + swap;
    document.getElementById("tcActual").innerHTML = (time);
}

async function mergeSort() {
    const n = values.length;
    const nLogN = (n * Math.log2(n)).toFixed(0);
    document.getElementById("tcExpected").innerHTML = "O(n log n): " + nLogN;

    let comparison = 0;
    let swap = 0; 

    async function mergeSortRecursive(l, r) {
        if (l >= r) {
            return;
        }
        let m = l + parseInt((r - l) / 2);
        await mergeSortRecursive(l, m);
        await mergeSortRecursive(m + 1, r);
        await merge(l, m, r);
    }

    async function merge(l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = values[l + i]; 
        }
        for (let j = 0; j < n2; j++) {
            R[j] = values[m + 1 + j];
        }

        let i = 0; 
        let j = 0; 
        let k = l; 

        while (i < n1 && j < n2) {
            comparison++;
            if (L[i] <= R[j]) {
                swap++;
                values[k] = L[i];
                i++;
            } else {
                swap++; 
                values[k] = R[j];
                j++;
            }
            await sleep();
            renderValues();
            k++;
        }

        while (i < n1) {
            swap++; 
            values[k] = L[i];
            await sleep();
            renderValues();
            i++;
            k++;
        }

        while (j < n2) {
            swap++; 
            values[k] = R[j];
            await sleep();
            renderValues();
            j++;
            k++;
        }
    }

    await mergeSortRecursive(0, n - 1);

    let time = comparison + swap;
    document.getElementById("tcActual").innerHTML = (time);
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

document.getElementById("mergeSortButton").onclick = function(){
    mergeSort();
    renderValues();
}

document.getElementById("selectionSortButton").onclick = function(){
    selectionSort();
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
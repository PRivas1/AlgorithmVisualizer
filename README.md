# Sorting Algorithm Visualizer

This project is an interactive web-based "sandbox" built with plain HTML, CSS, and JavaScript. It visualizes classic sorting algorithms and provides a real-time analysis of their performance.

Users can watch algorithms sort an array of bars and compare the **theoretical $O(n^2)$ complexity** to the **actual number of operations** (comparisons + swaps) performed.

## Features

* **Interactive Visualization:** Watch algorithms sort the array in real-time.
* **Algorithm Selection:** Includes Bubble Sort, Insertion Sort, Merge Sort, and Selection Sort.
* **Runtime Analysis:**
    * **Theoretical $O(n^2)$:** Displays the $n \times n$ value for the given array size.
    * **Actual Operations:** Displays the sum of all **comparisons + swaps** performed in a single run.
* **User Controls:**
    * **Set Size:** Change the number of elements in the array.
    * **Set Speed:** Control the visualization speed (delay in ms).
    * **Randomize:** Shuffle the array.

## How It Works

1.  **`fillArray(size)`:** Creates an array of numbers (`values`).
2.  **`renderValues()`:** Draws the current `values` array onto the screen as CSS bars.
3.  **Sorting Functions (`async bubbleSort()`, etc.):**
    * Each algorithm is an `async` function.
    * Counters for `comparison` and `swap` are incremented as those operations occur.
    * After a key step, `await sleep()` and `renderValues()` are called to pause and update the animation.
4.  **Performance Calculation:**
    * Before a sort, the "Expected" $O(n^2)$ value is calculated.
    * After the sort, the `comparison` and `swap` counters are added and displayed as the "Actual" operation count.

## How to Use

Visit live demo at [privas1.github.io/AlgorithmVisualizer/](https://privas1.github.io/AlgorithmVisualizer/)

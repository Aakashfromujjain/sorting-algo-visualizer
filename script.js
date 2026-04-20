const container = document.getElementById("array-container");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");
const algoSelect = document.getElementById("algorithm");

let array = [];
let isSorting = false; // Prevents triggering sort multiple times

// Utility function to pause execution for animations
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a random array and render it
function generateArray() {
    if (isSorting) return;
    container.innerHTML = "";
    array = [];
    const size = sizeSlider.value;

    for (let i = 0; i < size; i++) {
        // Random value between 10 and 100
        const value = Math.floor(Math.random() * 90) + 10;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        // Convert value to a percentage of the container's height
        bar.style.height = `${value}%`;
        container.appendChild(bar);
    }
}

// Visual swapping function
async function swap(bars, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    // Update heights in the DOM
    bars[i].style.height = `${array[i]}%`;
    bars[j].style.height = `${array[j]}%`;
}

// Algorithm: Bubble Sort
async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            bars[j].style.backgroundColor = "var(--bar-compare)";
            bars[j + 1].style.backgroundColor = "var(--bar-compare)";

            await sleep(320 - speedSlider.value); // Delay based on slider

            if (array[j] > array[j + 1]) {
                await swap(bars, j, j + 1);
            }

            // Reset colors
            bars[j].style.backgroundColor = "var(--bar-default)";
            bars[j + 1].style.backgroundColor = "var(--bar-default)";
        }
        // Mark the sorted element at the end
        bars[n - i - 1].style.backgroundColor = "var(--bar-sorted)";
    }
    bars[0].style.backgroundColor = "var(--bar-sorted)";
}

// Algorithm: Selection Sort
async function selectionSort() {
    const bars = document.querySelectorAll(".bar");
    const n = array.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = "var(--bar-compare)";

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = "orange"; // Scanning color
            await sleep(320 - speedSlider.value);

            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = "var(--bar-default)";
                minIdx = j;
                bars[minIdx].style.backgroundColor = "var(--bar-compare)";
            } else {
                bars[j].style.backgroundColor = "var(--bar-default)";
            }
        }

        if (minIdx !== i) {
            await swap(bars, i, minIdx);
        }
        bars[minIdx].style.backgroundColor = "var(--bar-default)";
        bars[i].style.backgroundColor = "var(--bar-sorted)";
    }
}

// Trigger the sorting process
sortBtn.addEventListener("click", async () => {
    if (isSorting) return;
    
    // Lock the UI
    isSorting = true;
    generateBtn.disabled = true;
    sizeSlider.disabled = true;
    sortBtn.disabled = true;

    const algo = algoSelect.value;
    if (algo === "bubble") await bubbleSort();
    if (algo === "selection") await selectionSort();
    // (Add Insertion Sort logic here later!)

    // Unlock the UI
    isSorting = false;
    generateBtn.disabled = false;
    sizeSlider.disabled = false;
    sortBtn.disabled = false;
});

// Event Listeners for UI
generateBtn.addEventListener("click", generateArray);
sizeSlider.addEventListener("input", generateArray);

// Initialize on load
generateArray();
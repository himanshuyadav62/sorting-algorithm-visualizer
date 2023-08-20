const arrayContainer = document.getElementById("arrayContainer");
const startButton = document.getElementById("startButton");
const generateArraybtn = document.getElementById("randomArray");
let input = document.getElementById("array");
input.value = "";
generateArraybtn.addEventListener("click", () => {
  let randomArray = generateRandomArray(20, 40);
  input.value = randomArray.toString();
  if (startButton.disabled === false) {
    displayArray(randomArray);
  }
});

var time = 150;
const rangeBar = document.getElementById("range");
rangeBar.value = time;
let val = document.getElementById("rangeValue");
val.innerHTML = time;
rangeBar.addEventListener("input", () => {
  time = parseInt(rangeBar.value);
  val.innerHTML = time;
});

function reduceArray(array) {
  // Find the greatest value in the array
  const greatestValue = Math.max(...array);

  if (greatestValue > 40) {
    const scalingFactor = 40 / greatestValue;
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i] * scalingFactor;
    }
    for (let i = 0; i < array.length; i++) {
      array[i] = Number(array[i].toFixed(3));
    }
  }
  return array;
}

async function displayArray(array, index1, index2, barColor) {
  let temp = array.slice();
  temp = reduceArray(temp);
  arrayContainer.innerHTML = "";
  let i = 0;
  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = temp[i] * 5 + "px";
    const h = document.createElement("span");
    h.innerHTML = value;
    h.classList.add("height");
    bar.appendChild(h);
    if (index === index1 || index === index2) {
      bar.style.backgroundColor = barColor; // Set the bar color for swapping bars
    }
    arrayContainer.appendChild(bar);
    i++;
  });
  await new Promise((resolve) => setTimeout(resolve, time));
}

function generateRandomArray(size, maxValue) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return array;
}

async function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;

  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; ++i) L[i] = arr[l + i];
  for (let j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

  let i = 0,
    j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      await displayArray(arr, k, j + m + 1, "red");
      i++;
    } else {
      arr[k] = R[j];
      await displayArray(arr, i + l, j + m + 1, "red");
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    await displayArray(arr, k, -1, "red");
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = R[j];
    await displayArray(arr, k, -1, "red");
    j++;
    k++;
  }
  await displayArray(arr);
}

async function mergeSort(arr, l, r) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }
}

async function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Display the swapping bars in a different color (e.g., red)
        displayArray(array, j, j + 1, "red");
        await new Promise((resolve) => setTimeout(resolve, time));

        // Revert the color back to the original (dodgerblue)
        displayArray(array, j, j + 1, "dodgerblue");
        await new Promise((resolve) => setTimeout(resolve, time));
      }
    }
  }
}

// Selection Sort
async function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    displayArray(array, i, minIndex, "red");
    await new Promise((resolve) => setTimeout(resolve, time));
    displayArray(array, i, minIndex, "dodgerblue");
  }
}

// Insertion Sort
async function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let currentValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currentValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentValue;
    displayArray(array, j + 1, i, "red");
    await new Promise((resolve) => setTimeout(resolve, time));
    displayArray(array, j + 1, i, "dodgerblue");
  }
}

// Quick Sort
async function quickSort(array, low, high) {
  if (low < high) {
    const pivotIndex = await partition(array, low, high);
    await quickSort(array, low, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, high);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      displayArray(array, i, j, "red");
      await new Promise((resolve) => setTimeout(resolve, time));
      displayArray(array, i, j, "dodgerblue");
    }
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  displayArray(array, i + 1, high, "red");
  await new Promise((resolve) => setTimeout(resolve, time));
  displayArray(array, i + 1, high, "dodgerblue");
  return i + 1;
}

// Heap Sort
async function heapSort(array) {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    displayArray(array, 0, i, "red");
    await new Promise((resolve) => setTimeout(resolve, time));
    displayArray(array, 0, i, "dodgerblue");
    await heapify(array, i, 0);
  }
}

async function heapify(array, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    displayArray(array, i, largest, "red");
    await new Promise((resolve) => setTimeout(resolve, time));
    displayArray(array, i, largest, "dodgerblue");
    await heapify(array, n, largest);
  }
}
function parseNumberArray(inputText) {
  const numberStrings = inputText.match(/\d+/g);
  if (numberStrings) {
    const numberArray = numberStrings.map(Number);
    return numberArray;
  }
  return [];
}

startButton.addEventListener("click", async () => {
  const button = document.getElementById("startButton");
  button.disabled = true;
  const size = 20; // Number of bars
  const maxValue = 40; // Maximum height of bars

  let array = generateRandomArray(size, maxValue);

  const inputText = document.getElementById("array").value;

  if (inputText.length > 0) {
    let inputArray = parseNumberArray(inputText);
    if (inputArray.length > 0) {
      array = inputArray;
    }
  }
  displayArray(array);

  const sortingMethod = document.getElementById("method").value;
  if (sortingMethod == "Merge Sort") {
    await mergeSort(array, 0, array.length - 1);
  } else if (sortingMethod == "Bubble Sort") {
    await bubbleSort(array);
  } else if (sortingMethod == "Selection Sort") {
    await selectionSort(array);
  } else if (sortingMethod == "Heap Sort") {
    await heapSort(array);
  } else if (sortingMethod == "Insertion Sort") {
    await insertionSort(array);
  } else if (sortingMethod == "Quick Sort") {
    await quickSort(array);
  }
  displayArray(array);
  console.log(array);
  button.disabled = false;
});

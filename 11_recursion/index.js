function fibs(num) {
  if (num < 1) return [];
  if (num === 1) return [0];
  let array = [0, 1];
  for (let i = 2; i < num; i++) {
    // add the previous two numbers to the array
    array.push(array[i - 1] + array[i - 2]);
  }
  return array;
}

function fibsRec(num) {
  if (num < 1) return [];
  if (num === 1) return [0];
  if (num === 2) return [0, 1];
  let prev = fibsRec(num - 1);
  let last = prev[prev.length - 1];
  let secondLast = prev[prev.length - 2];
  prev.push(last + secondLast);
  return prev;
}

const mergeSort = (array) => {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);

  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  // While both arrays have elements to compare
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

console.log(fibsRec(6)); // [ 0, 1, 1, 2, 3, 5 ]
console.log(fibs(6)); // [ 0, 1, 1, 2, 3, 5 ]
console.log(mergeSort([5, 2, 4, 1, 3])); // [ 1, 2, 3, 4, 5 ]

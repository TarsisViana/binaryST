export default function mergeSort(arr) {
  let leftHalf = [];
  let rightHalf = [];
  if (arr.length == 1) return arr;
  if (arr.length == 0) return;
  if (arr.length == 2) return sort(arr);
  else {
    leftHalf = arr.slice(0, arr.length / 2);
    rightHalf = arr.slice(arr.length / 2);
    let leftSorted, rightSorted;
    leftSorted = mergeSort(leftHalf);
    rightSorted = mergeSort(rightHalf);
    return merge(leftSorted, rightSorted);
  }
}

function merge(arr1, arr2, arrSorted = []) {
  if (arr1.length == 0) {
    arrSorted.push(...arr2);
    return arrSorted;
  } else if (arr2.length == 0) {
    arrSorted.push(...arr1);
    return arrSorted;
  }
  if (arr1[0] > arr2[0]) {
    arrSorted.push(arr2[0]);
    arr2.shift();
    merge(arr1, arr2, arrSorted);
  } else if (arr1[0] < arr2[0] || arr1[0] === arr2[0]) {
    arrSorted.push(arr1[0]);
    arr1.shift();
    merge(arr1, arr2, arrSorted);
  }
  return arrSorted;
}

function sort(arr) {
  if (arr.length == 1) return arr;
  if (arr[0] > arr[1]) return [arr[1], arr[0]];
  return arr;
}

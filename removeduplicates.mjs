export default function removeDuplicates(arr) {
  return arr.filter((value, index, array) => {
    if (index == 0) return true;
    if (value != array[index - 1]) return true;
    return false;
  });
}

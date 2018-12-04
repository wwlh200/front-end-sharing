const bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {// i current 
    for (let j = i + 1; j < arr.length; j++) {// i+1 next
      // Circle the bubbling
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
}

console.log(bubbleSort([1, 8, 5, 7, 6, 6, 2, 2, 5, 2, 0]));

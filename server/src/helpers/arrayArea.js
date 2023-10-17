const getArea = (a, i, j) => {
  const w = Math.abs(j - i + 1); // width
  const h = Math.min(a[i], a[j]) // height
  return w * h;
}

const arrayArea = a => {
  // We need 3 pointers: a left (minI), a right(j), and an in-between: i
  let i = 0; // first index
  let j = a.length - 1; // last index
  let minI = 0; // starting point for i 
  	// on each outer loop.
  let max = 0;

  while (j > i) {
        const area = getArea(a, i, j);
        if (area > max) {
            max = area // Set new max
        }

        if(i === j - 1){
            minI++;
            i = minI;
            j--;
        } else {
            i++
        }
  }

  return max;
}

export default arrayArea;

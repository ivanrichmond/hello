/**
 * Bubble sort for scalars.  Will not work for objects, as it uses simple GT comparison.
 * @param Array array of scalars to sort.
 * @return Array sorted array.
 */
export const bubbleSort = (array: Array < number | string > ) => {
    let done = false; // must start out false for while to work.
    while (!done) {
        // Set done to true and only set back to false if array not sorted.
        // This needs to be true, because we find out if the array is NOT sorted, rather
        // than if it is.
        done = true;
        array.forEach((element, i) => {
            if (array[i - 1] && array[i - 1] > array[i]) {
                done = false; // Set done to false, because we know the array is not sorted.
                let tempArray = array[i - 1];
                array[i - 1] = array[i];
                array[i] = tempArray;
            }
        })
    }
    return array;
}
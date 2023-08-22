/**
 * Perform a binary search to find an element in a sorted array.
 * @param array - flat sorted array of int | string
 * @param int | string - element to find
 * @return int - index of found element
 */
export const binarySearch = (array: Array < number | string >, search: number | string ) => {
    let index = -1;
    let found = false;

    const getMidpoint = (l,r) => {
        const midPoint = Math.floor((l + r) / 2)
        return midPoint
    }

    let i = getMidpoint(0,array.length - 1)

    while(!found && i >= 0 && i < array.length){
        const element = array[i]
        if(element === search){
            index = i
            found = true;
        } else if(element > search) {
            // element is too far right, so narrow to the left
            i = getMidpoint(0,i)
        } else if(element < search){
            // element is too far left, so narrow to the right
            i = getMidpoint(i + 1,array.length - 1)
        } else {
            // Something went wrong.
            throw new Error("binarySearch: the array was not sorted or something else went wrong.")
        }
    }

    return index;
}

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
            if (array[i - 1] > array[i]) {
                done = false; // Set done to false, because we know the array is not sorted.
                let tempArray = array[i - 1];
                array[i - 1] = array[i];
                array[i] = tempArray;
            }
        })
    }
    return array;
}
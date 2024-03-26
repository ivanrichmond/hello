/**
 * Perform a binary search to find an element in a sorted array.
 * @param array - flat sorted array of int | string
 * @param int | string - element to find
 * @return int - index of found element
 */
const getMidpoint = (l,r) => { return Math.floor((l + r) / 2) }
export const binarySearch = (array: Array < number | string >, search: number | string ) => {
    let index = -1
    if(array.length === 1 && array[0] === search) return 0 // CASE: [n]
    let l = 0
    let r = array.length - 1

    while( l < r && array.length > 1 ){
        let m = getMidpoint(l,r)
        let num = array[m]
        if(num === search){
            index = m
            break
        } else if( search < num ){
            r = m - 1
            if(array[r] === search) return r // avoid not finding because l = r
        } else if( search > num ){
            l = m + 1
            if(array[l] === search) return l // avoid not finding because l = r
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
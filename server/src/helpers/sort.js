//@flow
// Used for sort functions.

// Bubble Sort
export function bubbleSort<T: string | number>(array: Array<T>): Array<T> {
    let newArray = [...array] // Keep parameter immutable
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < newArray.length; i++){
            let a = newArray[i]
            let b = newArray[i + 1]
            // Since > is polymorphic, we need to account for both number and string comparisons.
            const shouldSwap = (typeof a === 'number' && typeof b === 'number' && a > b) ||
                               (typeof a === 'string' && typeof b === 'string' && a > b);
            if (shouldSwap) {
                newArray[i] = b;
                newArray[i + 1] = a;
                swapped = true;
            }
        }
    } while(swapped)
    return newArray
}
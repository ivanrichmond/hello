//@flow
// Used for sort functions.

// Bubble Sort
export type SortableArray = (number | string)[];
export function bubbleSort<T: string | number>(array: Array<T>): Array<T> {
    let newArray = [...array] // Keep parameter immutable
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < newArray.length; i++){
            let a = newArray[i]
            let b = newArray[i + 1]
            // To keep Flow happy, we need 
            if(typeof a === 'number' && typeof b === 'number'){
                if(a > b){
                    // swap
                    const temp = a
                    a = b
                    b = temp
                }
            }
            if(typeof a === 'string' && typeof b === 'string'){
                if(a > b){
                    // swap
                    const temp = a
                    a = b
                    b = temp
                }
            }
            swapped = true
        }
    } while(swapped)
    return newArray
}
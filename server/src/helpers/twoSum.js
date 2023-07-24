/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    // Use a dictionary, pre-filled with the first 
    // element, since we always need two indices.
    let found = {[nums[0]]: 0} // dictionary of found nums and indices.
    for(let i = 1; i < nums.length; i++){
        let num = nums[i]
        let x = target - num
        if(found[x] >= 0){
            return [found[x], i]
        } else {
            found[num] = i
        }
    }

    return []
};

export default twoSum
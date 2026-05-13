//@flow

// --- Linked List --- //
import isNull from "lodash/fp/isNull";

export class LinkedListNode {
    data: any; // Appropriate typing given that we don't know what data will be linked
    next: LinkedListNode | null;
    constructor(data: any){
        this.data = data
        this.next = null
    }

    toString(): string {
        let result: string = ''
        let temp = this
        result += this.data
        while (temp !== null && temp !== undefined && temp.next) {
            result += String(temp.next.data)
            temp = temp?.next
        }
        return result
    }
}

export class TreeNode {
    data: any;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: any){
        this.data = data
        this.left = null
        this.right = null
    }
}

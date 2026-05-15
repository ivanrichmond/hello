//@flow

// --- Linked List --- //
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

// --- Tree --- //
export class BinaryTreeNode {
    data: number;
    left: BinaryTreeNode | null;
    right: BinaryTreeNode | null;
    constructor(data: number){
        this.data = data
        this.left = null
        this.right = null
    }
}

export class BinaryTree {
    root: BinaryTreeNode | null;
    constructor(){
        this.root = null
    }

    contains(data: number): boolean {
        const nodeFound = this.find(data)
        return !!nodeFound
    }

    find(data: number): BinaryTreeNode | null {
        // If there's no root, data obviously won't be there.  Return null to indicate failure.
        if(this.root === null) return null
        // Start serching at the root.
        let current = this.root
        let found = false
        // Be careful not to infinite-loop.  found must become true at some point
        while(current && !found){
            if(data < current.data){
                // Move left
                current = current.left
            } else if(data > current.data){
                // Move right
                current = current.right
            } else {
                // Found it!
                found = true
            }
        }
        if(!found) return null
        return current
    }

    // $FlowFixMe -- Flow doubts that this always returns something.
    insert(data: number): BinaryTree | null {
        const newNode = new BinaryTreeNode(data)
        // If we have no root, this is the root.  Done.
        if(this.root === null){
            this.root = newNode;
            return this;
        }

        // If we already have a root, start recursing.
        let current = this.root
        // Be careful not to have an infinite loop.  We exit by returning this.
        while(true){
            // If the value is already there, return null to show that insert failed.
            if(data === current.data) return null
            // Otherwise, place it.
            if(data < current.data){
                // If there's an available node left place it.
                if(current.left === null){
                    current.left = newNode
                    return this
                }
                // Otherwise, move left.
                current = current.left
            } else {
                // It's >, so place right.
                // If there's an available node right place it. 
                if(current.right === null){
                    current.right = newNode
                    return this
                }
                // Otherwise, move right.
                current = current.right
            }
        }
    }
}
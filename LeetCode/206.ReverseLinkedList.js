// 206. Reverse Linked List
// Given the head of a singly linked list, reverse the list, and return the reversed list.

 

// Example 1:


// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:


// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // it's improtant to give null 
    let prev=null;//1st node head
    let current=head;
    while(current!==null){
        // swap pointers so that the current node points to the previous node
        const nextNode=current.next
        current.next=prev
        prev=current
        current=nextNode
    }
    return prev
};
var reverseList1=function(head){
    // previous node is null it work like current node and we will return it
    let prev=null;
    let current=head;
    while(current!==null){
        let nextNode=current.next
        // current.next will be previous node
        current.next=prev
        prev=current
        // current will be nextNode=> we store it current.next value;
        current=nextNode
    }
    return prev
}
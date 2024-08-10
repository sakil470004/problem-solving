// 141. Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.


// Example 1:
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
// Example 2:

// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
// Example 3:

// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.

//? To solve the "Linked List Cycle" problem, you can use Floyd's Cycle Detection Algorithm, also known as the "Tortoise and Hare" algorithm. This approach is efficient in terms of both time and space complexity.

// Problem Understanding:
// You are given the head of a linked list, and you need to determine if the linked list has a cycle.
// A cycle occurs if there is some node in the list that can be reached again by continuously following the next pointer.
// Approach:
// Use two pointers: one moving slowly (slow pointer, or "tortoise") and one moving quickly (fast pointer, or "hare").
// Initially, both pointers start at the head of the linked list.
// Move the slow pointer by one step and the fast pointer by two steps in each iteration.
// If there is a cycle, the fast pointer will eventually meet the slow pointer within the cycle.
// If the fast pointer reaches the end of the list (i.e., fast or fast.next is null), then there is no cycle.

var hasCycle = function(head) {
    if (!head || !head.next) {
        return false; // If the list is empty or has only one node, there is no cycle.
    }

    let slow = head;
    let fast = head;

    // Loop until the fast pointer reaches the end or they meet
    while (fast && fast.next) {
        slow = slow.next;           // Move slow pointer by one step
        fast = fast.next.next;      // Move fast pointer by two steps

        // If the slow and fast pointers meet, there is a cycle
        if (slow === fast) {
            return true;
        }
    }

    // If we exit the loop, there is no cycle
    return false;
};
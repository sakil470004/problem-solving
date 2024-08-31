// 21. Merge Two Sorted Lists
// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// Return the head of the merged linked list.
// Example 1:
// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]
 

// Constraints:

// The number of nodes in both lists is in the range [0, 50].
// -100 <= Node.val <= 100
// Both list1 and list2 are sorted in non-decreasing order.

var mergeTwoLists = function(list1, list2) {
    // Handle empty lists
    if (!list1) return list2;
    if (!list2) return list1;

    let p1 = list1;
    let p2 = list2;
    let result = new ListNode(0);
    let current = result;

    while (p1 && p2) {
        if (p1.val > p2.val) {
            current.next = p2;
            p2 = p2.next;
        } else {
            current.next = p1;
            p1 = p1.next;
        }
        current = current.next;
    }

    // Attach the remaining nodes
    if (p1) {
        current.next = p1;
    } else {
        current.next = p2;
    }

    return result.next;
};
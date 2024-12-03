class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addFirst(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  addLast(data) {
    const newNode = new Node(data);
    // if no data in linked list
    if (!this.head) {
      this.head = new Node(data);
      return;
    }
    let current = this.head;
    // find the next node that is null
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
  addAt(index, data) {
    if (index < 0 || index > this.size()) {
      console.error("Index out of range");
      return;
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    // current is the node before the index
    newNode.next = current.next;
    // current.next is the node at the index
    current.next = newNode;
  }
  removeTop() {
    if (!this.head) {
      console.error("Linked list is empty");
      return;
    }
    this.head = this.head.next;
  }
  removeLast() {
    if (!this.head) {
      console.error("Linked list is empty");
      return;
    }
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
  }
  removeAt(index) {
    if (index < 0 || index > this.size()) {
      console.error("Index out of range");
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }
 
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}


const linkedList = new LinkedList();
linkedList.addFirst(1);
linkedList.addFirst(2);
linkedList.addFirst(3);
linkedList.addFirst(4);
linkedList.addLast(6);
console.log("size",linkedList.size());
linkedList.addAt(2, 5);
linkedList.removeTop();
linkedList.print()

// for youtube video idea for mynul . VisualAlgo can be used to show the linked list
//? What is linked list?
// A linked list is a linear data structure where each element is a separate object. Each element (we will call it a node) of a list is comprising of two items - the data and a reference to the next node. The last node has a reference to null. The entry point into a linked list is called the head of the list. It should be noted that head is not a separate node, but the reference to the first node. If the list is empty then the head is a null reference.
//?Benefits of Linked Lists
// They are a dynamic in nature which allocates the memory when required.
// Insertion and deletion operations can be easily implemented.
// Stacks and queues can be easily executed.
// Linked List reduces the access time.
//? Drawbacks of Linked Lists
// The memory is wasted as pointers require extra memory for storage.
// No element can be accessed randomly; it has to access each node sequentially.
// Reverse Traversal is difficult in linked list.

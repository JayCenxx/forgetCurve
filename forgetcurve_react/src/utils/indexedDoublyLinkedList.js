class ListNode {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
 export class IndexedDoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.nodes = []; // Using an array to store nodes
    }
  
    add(value) {
      const newNode = new ListNode(value);
      this.nodes.push(newNode);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
      this.length++;
    }
  
    get(index) {
      if (index < 0 || index >= this.length) return null;
      return this.nodes[index];
    }
  
    delete(index) {
      if (index < 0 || index >= this.length) return;
  
      const nodeToDelete = this.nodes[index];
  
      if (nodeToDelete.prev) {
        nodeToDelete.prev.next = nodeToDelete.next;
      } else {
        this.head = nodeToDelete.next;
      }
  
      if (nodeToDelete.next) {
        nodeToDelete.next.prev = nodeToDelete.prev;
      } else {
        this.tail = nodeToDelete.prev;
      }
  
      // Remove the node from the array and decrement the length
      this.nodes.splice(index, 1);
      this.length--;
    }
  
    insertAt(index, value) {
        if (index < 0 || index > this.length) return;

        const newNode = new ListNode(value);
      
        // Special case for inserting at the head
        if (index === 0) {
          newNode.next = this.head;
          if (this.head) {
            this.head.prev = newNode;
          }
          this.head = newNode;
          // If there was no tail, the list was empty, now the new node is both head and tail
          this.tail = this.tail || newNode;
          this.nodes.splice(index, 0, newNode);
          this.length++;
          return;
        }
      
        // Special case for appending at the tail
        if (index === this.length) {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
          this.nodes.splice(index, 0, newNode);
          this.length++;
          return;
        }
      
        // General case for inserting in the middle
        const nextNode = this.nodes[index];
        const prevNode = nextNode.prev;
      
        newNode.next = nextNode;
        newNode.prev = prevNode;
        prevNode.next = newNode;
        nextNode.prev = newNode;
      
        // Insert the new node into the array
        this.nodes.splice(index, 0, newNode);
        this.length++;
    }
  
  move(index,targetIndex){
    if(typeof index!=="number" && typeof targetIndex!=="number" ){
        console.log('must enter a proper index for moving')
    return
    }
    if(index=== targetIndex){
        console.log('same index stay');
        return
    }
    if(index>this.length-1 || index<0 || targetIndex<0 || targetIndex>this.length-1){
      console.log('index out of bound yo')
      return;
    }
    // already save the about to delete element
    const tempElement=this.get(index).value
    // now delete that target
    this.delete(index)
    //insert
    this.insertAt(targetIndex,tempElement)
  }
  
   set(index, value) {
      if (index < 0 || index >= this.length) return;
  
      const node = this.nodes[index];
      if (node) {
        node.value = value;
      }
    }
  
  }
  
  // test
//   const list = new IndexedDoublyLinkedList();
//   list.add('a');
//   list.add('b');
//   list.add('c');
  
//   list.insertAt(1, 'x'); // List is now a, x, b, c
//   console.log(list.get(1).value); 
//     list.delete(0)
//   list.move(0, 'd')
//   for(let i=0;i<list.length;i++){
//     console.log(list.get(i).value)
//   }
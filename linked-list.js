import { keyNode as Node } from "./node.js";

class LinkedList {
  list = null;

  append(value) {
    const newNode = new Node(value);
    if (!this.list) {
      this.list = newNode;
    } else {
      let currentNode = this.list;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.list) {
      this.list = newNode;
    } else {
      newNode.nextNode = this.list;
      this.list = newNode;
    }
  }

  size() {
    if (!this.list) {
      return 0;
    } else {
      let numNodes = 1;
      let currentNode = this.list;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
        numNodes++;
      }
      return numNodes;
    }
  }

  head() {
    return this.list;
  }

  tail() {
    if (!this.list) {
      return this.list;
    } else {
      let currentNode = this.list;
      while (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    }
  }

  at(index) {
    if (index < 0 || index > this.size() - 1 || !this.list) {
      throw new Error(
        "Index must be non-negative, less than the size of the list, and list cannot be empty"
      );
    }

    let currentNode = this.list;
    let currentIndex = 0;
    while (currentNode.nextNode) {
      if (index === currentIndex) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return currentNode;
  }

  pop() {
    if (!this.list) {
      throw new Error("Cannot pop from an empty list");
    }

    const lastNode = this.tail();
    if (this.size() === 1) {
      this.list = null;
    } else {
      let currentNode = this.list;
      while (currentNode.nextNode !== lastNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = null;
    }
    return lastNode;
  }

  contains(value) {
    let currentNode = this.list;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.list;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }

  toString() {
    let strRepresentation = "";
    let currentNode = this.list;
    while (currentNode) {
      strRepresentation += `( ${String(currentNode.value)} ) -> `;
      currentNode = currentNode.nextNode;
    }
    strRepresentation += "null";
    return strRepresentation;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size() - 1 || !this.list) {
      throw new Error(
        "Index must be non-negative, less than the size of the list, and list cannot be empty"
      );
    }

    const newNode = new Node(value);
    let currentNode = this.list;
    let previousNode = currentNode;
    let currentIndex = 0;
    while (currentNode) {
      if (currentIndex === index && previousNode === currentNode) {
        this.list = newNode;
        newNode.nextNode = currentNode;
        return;
      } else if (currentIndex === index && previousNode !== currentNode) {
        previousNode.nextNode = newNode;
        newNode.nextNode = currentNode;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
  }

  removeAt(index) {
    if (index < 0 || index > this.size() - 1 || !this.list) {
      throw new Error(
        "Index must be non-negative, less than the size of the list, and list cannot be empty"
      );
    }

    let currentNode = this.list;
    let previousNode = currentNode;
    let currentIndex = 0;
    while (currentNode) {
      if (currentIndex === index) {
        if (currentNode === this.head()) {
          this.list = currentNode.nextNode;
        } else if (currentNode === this.tail()) {
          previousNode.nextNode = null;
        } else {
          previousNode.nextNode = currentNode.nextNode;
        }
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
  }
}

export class keyLinkedList extends LinkedList {
  constructor() {
    super();
  }

  contains(value) {
    let currentNode = this.list;
    while (currentNode) {
      if (currentNode.key === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.list;
    let currentIndex = 0;
    while (currentNode) {
      if (currentNode.key === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }

  toString() {
    let strRepresentation = "";
    let currentNode = this.list;
    while (currentNode) {
      strRepresentation += `( ${String(currentNode.key)} ) -> `;
      currentNode = currentNode.nextNode;
    }
    strRepresentation += "null";
    return strRepresentation;
  }
}

import { keyLinkedList as LinkedList } from "./linked-list.js";

class HashMap {
  capacity = 16;
  buckets = new Array(this.capacity);
  loadFactor = 0.75;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode += primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // TODO: Check and grow buckets if needed

    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      const linkedList = new LinkedList();
      linkedList.append(key);
      linkedList.head().value = value;
      this.buckets[index] = linkedList;
    } else {
      const isExistingKey = this.buckets[index].contains(key);

      if (isExistingKey) {
        const keyIndex = this.buckets[index].find(key);
        let currentNode = this.buckets[index].head();
        for (let currentIndex = 0; currentIndex <= keyIndex; currentIndex++) {
          if (currentIndex === keyIndex) {
            currentNode.value = value;
            return;
          }
          currentNode = currentNode.nextNode;
        }
      } else {
        this.buckets[index].append(key);
        this.buckets[index].tail().value = value;
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return null;
    }

    const isExistingKey = this.buckets[index].contains(key);
    if (isExistingKey) {
      const keyIndex = this.buckets[index].find(key);
      const targetNode = this.buckets[index].at(keyIndex);
      return targetNode.value;
    } else {
      return null;
    }
  }
}

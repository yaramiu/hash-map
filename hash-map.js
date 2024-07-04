import { keyLinkedList as LinkedList } from "./linked-list.js";

class HashMap {
  capacity = 16;
  buckets = new Array(this.capacity);
  loadFactor = 0.75;
  currentCapacity = 0;

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

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

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

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      return false;
    }

    return this.buckets[index].contains(key);
  }

  remove(key) {
    const isExistingKey = this.has(key);

    if (!isExistingKey) {
      return false;
    }

    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const keyIndex = this.buckets[index].find(key);
    this.buckets[index].removeAt(keyIndex);
    return true;
  }

  length() {
    let numKeys = 0;
    this.buckets.forEach((bucket) => {
      numKeys += bucket.size();
    });
    return numKeys;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.currentCapacity = 0;
  }

  keys() {
    const allKeys = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.head();
      while (currentNode) {
        const currentKey = currentNode.key;
        allKeys.push(currentKey);
        currentNode = currentNode.nextNode;
      }
    });
    return allKeys;
  }

  values() {
    const allValues = [];
    this.buckets.forEach((bucket) => {
      let currentNode = bucket.head();
      while (currentNode) {
        const currentValue = currentNode.value;
        allValues.push(currentValue);
        currentNode = currentNode.nextNode;
      }
    });
    return allValues;
  }

  entries() {
    const allEntries = [];
    const allKeys = this.keys();
    const allValues = this.values();
    for (let i = 0; i < allKeys.length; i++) {
      const entry = [];
      entry.push(allKeys[i]);
      entry.push(allValues[i]);
      allEntries.push(entry);
    }
    return allEntries;
  }
}

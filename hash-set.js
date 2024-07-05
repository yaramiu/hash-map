import { HashMap } from "./hash-map.js";
import { keyLinkedList as LinkedList } from "./linked-list.js";

export class HashSet extends HashMap {
  constructor() {
    super();
    delete this.values;
    delete this.entries;
  }

  set(key) {
    const growBucket = () => {
      const allKeys = this.keys();
      this.capacity *= 2;
      this.clear();
      allKeys.forEach((key) => {
        this.set(key);
      });
    };
    const growthThreshold = Math.ceil(this.capacity * this.loadFactor);

    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      this.currentCapacity++;
      if (this.currentCapacity > growthThreshold) {
        growBucket();
      }

      const linkedList = new LinkedList();
      linkedList.append(key);
      this.buckets[index] = linkedList;
    } else {
      const isExistingKey = this.buckets[index].contains(key);

      if (!isExistingKey) {
        this.currentCapacity++;
        if (this.currentCapacity > growthThreshold) {
          growBucket();
        }

        this.buckets[index].append(key);
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
      return targetNode.key;
    } else {
      return null;
    }
  }
}

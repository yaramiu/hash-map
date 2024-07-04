class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class keyNode extends Node {
  constructor(key = null, nextNode = null) {
    super(key, nextNode);
    this.key = this.value;
    delete this.value;
  }
}

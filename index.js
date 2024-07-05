import { HashMap } from "./hash-map.js";

const test = new HashMap();

console.log("populate hash map");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.buckets);
console.log("");

console.log("overwrite value in single node linked list");
test.set("ice cream", "green tea");
console.log(test.buckets[13]);
console.log("");
console.log("overwrite value in multi node linked list");
test.set("grape", "green");
console.log(test.buckets[5]);
console.log("");

console.log("expand buckets");
test.set("moon", "silver");
console.log(test.buckets);
console.log("");
console.log("check if added node exists");
console.log(test.buckets[14]);
console.log("");

console.log("overwrite value in single node linked list");
test.set("banana", "green");
console.log(test.buckets[1]);
console.log("");
console.log("overwrite value in multi node linked list");
test.set("dog", "shiba inu");
console.log(test.buckets[7]);
console.log("");

console.log("get hash map keys");
console.log(test.keys());
console.log("");

console.log("get hash map values");
console.log(test.values());
console.log("");

console.log("get hash map entries");
console.log(test.entries());
console.log("");

console.log("get value from single node linked list");
console.log(test.get("banana"));
console.log("get value from multi node linked list");
console.log(test.get("dog"));
console.log("get value from a key that doesn't exist");
console.log(test.get("cat"));
console.log("");

console.log("has key in single node linked list");
console.log(test.has("banana"));
console.log("has key in multi node linked list");
console.log(test.has("dog"));
console.log("checking non-existent key in hash map");
console.log(test.has("cat"));
console.log("");

console.log("remove single node");
console.log(test.remove("banana"));
console.log(test.buckets[1]);
console.log("remove child node");
console.log(test.remove("grape"));
console.log(test.buckets[5]);
console.log("remove parent node");
console.log(test.remove("apple"));
console.log(test.buckets[5]);
console.log("remove non-existent key");
console.log(test.remove("cat"));
console.log("");

console.log("get number of keys in hash map");
console.log(test.length());
console.log("clear hash map");
test.clear();
console.log("get number of keys in empty hash map");
console.log(test.length());

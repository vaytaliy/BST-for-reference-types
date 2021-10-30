"use strict";
exports.__esModule = true;
var Person_1 = require("./Person");
var Tree_1 = require("./Tree");
var Node_1 = require("./Node");
/*
Works with reference types which can be uniquely identified, see IBtreeItem interface
Must implement IBtreeItem interface to allow comparison of objects
Adding item with existing identification - will replace already existing item
*/
var person1 = new Node_1["default"](new Person_1["default"]("Ten", 10));
var person2 = new Node_1["default"](new Person_1["default"]("Seventy", 70));
var person3 = new Node_1["default"](new Person_1["default"]("Sixty", 60));
var person4 = new Node_1["default"](new Person_1["default"]("One", 1));
var person5 = new Node_1["default"](new Person_1["default"]("Fifteen", 15));
var person6 = new Node_1["default"](new Person_1["default"]("Hundrfifty", 150));
var person7 = new Node_1["default"](new Person_1["default"]("Four", 4));
var person8 = new Node_1["default"](new Person_1["default"]("Zero", 0));
var person9 = new Node_1["default"](new Person_1["default"]("Eighty", 80));
var person10 = new Node_1["default"](new Person_1["default"]("Hundrsixty", 160));
var bintree = new Tree_1["default"]();
/*
First insertion to empty tree creates root element
*/
bintree.insert(person1);
bintree.insert(person2);
bintree.insert(person3);
bintree.insert(person4);
bintree.insert(person5);
bintree.insert(person6);
bintree.insert(person7);
bintree.insert(person8);
bintree.insert(person9);
bintree.insert(person10);
/*find node for given object
Can be found by "identifier" which can be string or number
*/
var foundNodeByNumber = bintree.find(0);
/*
Node can also be found by class instance. If it exists
in the tree then it will be returned as node with its value,
parent and children
*/
var foundNodeByClass = bintree.find(person5.value);
// if (foundPerson){
//     foundPerson.leftChild = null;
// }
//get ordered list for a given node from smallest to largest value
bintree.insert(new Node_1["default"](new Person_1["default"]("Minus1", 10)));
var orderedList = bintree.list();
//nodes with fails: 0
var newlist = bintree.list();
console.log("size of the tree:", newlist.length);

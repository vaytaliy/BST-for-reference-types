import Person from "./Person";
import BinaryTree from "./Tree";
import Node from './Node'

/*
BinaryTree class is a BST container for generic classes which
implement IBtreeItem interface to allow comparison of 2 different objects
by their properties and by their identifications
*/
let person1: Node<Person> = new Node<Person>(new Person("Ten", 10));
let person2: Node<Person> = new Node<Person>(new Person("Seventy", 70));
let person3: Node<Person> = new Node<Person>(new Person("Sixty", 60));
let person4: Node<Person> = new Node<Person>(new Person("One", 1));
let person5: Node<Person> = new Node<Person>(new Person("Fifteen", 15));
let person6: Node<Person> = new Node<Person>(new Person("Hundrfifty", 150));
let person7: Node<Person> = new Node<Person>(new Person("Four", 4));
let person8: Node<Person> = new Node<Person>(new Person("Zero", 0));
let person9: Node<Person> = new Node<Person>(new Person("Eighty", 80));
let person10: Node<Person> = new Node<Person>(new Person("Hundrsixty", 160));

let bintree: BinaryTree<Person> = new BinaryTree<Person>();

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

/*
Node can be found by "identifier" which can be string or number
*/
let foundNodeByNumber: Node<Person> | null = bintree.find(0);

/*
Node can also be found by looking at object's properties. In this case person5.value is instance of Person 
*/
let foundNodeByClass: Node<Person> | null = bintree.find(person5.value);

/*
If such node already exists it will be replaced by provided value
*/
bintree.insert(new Node<Person>(new Person("Minus1", 10)));
let orderedList = bintree.list();

/*
list method returns array of nodes represented in ascending order (inorder traversed nodes)
*/
let newlist = bintree.list();
console.log("size of the tree:", newlist.length)

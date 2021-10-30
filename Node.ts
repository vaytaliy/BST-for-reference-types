import IComparable from "./IBtreeItem";

class Node<T extends IComparable>{
    public leftChild: Node<T> | null = null;
    public rightChild: Node<T> | null = null;
    public parent: Node<T> | null = null;
    public value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export default Node
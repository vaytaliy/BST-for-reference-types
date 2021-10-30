import IBtreeItem from "./IBtreeItem";
import Node from "./Node";

class BinaryTree<T extends IBtreeItem> {
  public root: Node<T> | null = null;

  constructor() { }

  public insert(node: Node<T>) {
    if (this.root == null) {
      this.root = node;
      return;
    }

    let root: Node<T> = this.root;
    let currentNode: Node<T> = this.root;
    recursiveInsert();
    this.root = root;

    function recursiveInsert() {

      let insertedNodeCompare: number = node.value.compareTo(currentNode.value);

      if (insertedNodeCompare == -1) {
        if (currentNode.leftChild == null) {
          currentNode.leftChild = node;
          currentNode.leftChild.parent = currentNode;
        } else {
          currentNode = currentNode.leftChild;
          recursiveInsert()
          return;
        }
      } else if (insertedNodeCompare == 1) {
        if (currentNode.rightChild == null) {
          currentNode.rightChild = node;
          currentNode.rightChild.parent = currentNode;
        } else {
          currentNode = currentNode.rightChild;
          recursiveInsert();
          return;
        }
      } else if (insertedNodeCompare == 0) {
        node.rightChild = currentNode.rightChild;
        node.leftChild = currentNode.leftChild;
        if (currentNode.parent == null) {
          root = node;
        } else {
          let currentNodeToParent: number = currentNode.value.compareTo(currentNode.parent.value);
          if (currentNodeToParent == 1) {
            currentNode.parent.rightChild = node
          } else if (currentNodeToParent == -1) {
            currentNode.parent.leftChild = node
          }
        }
      }
    }
  }

  //first node and parentnode
  public find(searchedObject: T | number | string): Node<T> | null {

    if (this.root == null) {
      return null;
    }

    let currentNode: Node<T> = this.root;
    let foundNode: Node<T> | null = null;

    recursiveSearch();

    return foundNode;

    function recursiveSearch(): void {

      let compareResult: number = 0;
      if (typeof searchedObject == "number" || typeof searchedObject == "string") {
        compareResult = -1 * currentNode.value.compareTo(null, searchedObject);
      } else {
        compareResult = searchedObject.compareTo(currentNode.value);
      }

      if (compareResult == 0) {
        foundNode = currentNode;
        return;
      } else if (compareResult == -1) {
        if (currentNode.leftChild != null) {
          let tempNode: Node<T> = currentNode.leftChild;
          currentNode = tempNode;
          recursiveSearch();
          return;
        }
      } else if (compareResult == 1) {
        if (currentNode.rightChild != null) {
          let tempNode: Node<T> = currentNode.rightChild;
          currentNode = tempNode;
          recursiveSearch();
          return;
        }
      }
    }
  }

  public delete(data: T | string | number): boolean {

    if (this.root == null) {
      throw new Error("The tree has no root, can't perform delete operation")
    }
    let node = this.find(data);
    if (node == null) {
      return false;
    }
    //keep for later when parent reference to original node would be needed
    let originalNode = node;

    if (node.leftChild != null && node.rightChild == null) {
      if (node.parent == null) {
        this.root = node.leftChild
      } else {
        node.parent.leftChild = node.leftChild;
      }
    } else if (node.leftChild == null && node.rightChild != null) {
      if (node.parent == null) {
        this.root = node.rightChild
      } else {
        node.parent.rightChild = node.rightChild;
      }
    } else if (node.leftChild == null && node.rightChild == null) {
      //node = undefined
      if (node.parent == null) {
        this.root = null;
      } else {
        let compareResult: number = node.value.compareTo(node.parent.value);
        if (compareResult == -1) {
          if (node.parent != null) {
            node.parent.leftChild = null
          }
        } else if (compareResult == 1) {
          if (node.parent != null) {
            node.parent.rightChild = null
          }
        }
      }
    } else if (node.leftChild != null && node.rightChild != null) {
      let successor: Node<T> | null = this.getSuccessor(node);
      let successorEqRightChild: number = node.rightChild.value.compareTo(successor!.value);

      //if the successor happens to be the right child of node
      if (successorEqRightChild == 0) {
        let oldLeftTree = node.leftChild;
        node = successor!
        node.leftChild = oldLeftTree;
      } else {
        //find parent of non-child successor - there will for sure be parent
        let successorSuccessor: Node<T> | null = this.getSuccessor(successor!);
        let oldNode = node;

        node = successor!
        successorSuccessor!.leftChild = null
        node.leftChild = oldNode.leftChild;
        node.rightChild = oldNode.rightChild;
      }
      //change child pointers for parent, disconnect old node from parent
      if (originalNode.parent != null) {
        let newNodeVsParent = node.value.compareTo(originalNode.parent.value);
        if (newNodeVsParent == -1) {
          originalNode.parent.leftChild = node;
        } else if (newNodeVsParent == 1) {
          originalNode.parent.rightChild = node;
        }
      } else {
        //parent node got removed, so now this is root
        this.root = node;
      }
    }
    return true;
  }

  public getSuccessor(rootNode: Node<T>): Node<T> | null {
    let result: Node<T> | null = null;

    if (rootNode.rightChild != null) {
      deepestLeftTraversal(rootNode.rightChild)
      console.log("pk")
      return result;
    } else {
      firstLeftSubtreeAncestor(rootNode);
      return result;
    }

    function deepestLeftTraversal(currentNode: Node<T>): void {
      if (currentNode.leftChild != null) {
        deepestLeftTraversal(currentNode.leftChild);
      } else {
        result = currentNode;
      }
    }

    function firstLeftSubtreeAncestor(currentNode: Node<T>): void {
      if (currentNode.parent) {
        let comparisonRes = currentNode.parent.value.compareTo(currentNode.value);
        if (comparisonRes == -1) {
          firstLeftSubtreeAncestor(currentNode.parent)
        } else {
          result = currentNode.parent;
        }
      }
    }
  }

  public list(): Array<Node<T>> {

    if (this.root == null) {
      return [];
    }

    let result: Array<Node<T>> = [];

    traversal(this.root)
    return result;

    function traversal(currentNode: Node<T>): void {
      if (currentNode.leftChild != null) {
        traversal(currentNode.leftChild);
      }
      result.push(currentNode);
      if (currentNode.rightChild != null) {
        traversal(currentNode.rightChild);
      }
    }
  }
}

export default BinaryTree;

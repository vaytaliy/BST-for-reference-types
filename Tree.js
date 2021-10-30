"use strict";
exports.__esModule = true;
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    BinaryTree.prototype.insert = function (node) {
        if (this.root == null) {
            this.root = node;
            return;
        }
        var root = this.root;
        var currentNode = this.root;
        recursiveInsert();
        this.root = root;
        function recursiveInsert() {
            var insertedNodeCompare = node.value.compareTo(currentNode.value);
            if (insertedNodeCompare == -1) {
                if (currentNode.leftChild == null) {
                    currentNode.leftChild = node;
                    currentNode.leftChild.parent = currentNode;
                }
                else {
                    currentNode = currentNode.leftChild;
                    recursiveInsert();
                    return;
                }
            }
            else if (insertedNodeCompare == 1) {
                if (currentNode.rightChild == null) {
                    currentNode.rightChild = node;
                    currentNode.rightChild.parent = currentNode;
                }
                else {
                    currentNode = currentNode.rightChild;
                    recursiveInsert();
                    return;
                }
            }
            else if (insertedNodeCompare == 0) {
                node.rightChild = currentNode.rightChild;
                node.leftChild = currentNode.leftChild;
                if (currentNode.parent == null) {
                    root = node;
                }
                else {
                    var currentNodeToParent = currentNode.value.compareTo(currentNode.parent.value);
                    if (currentNodeToParent == 1) {
                        currentNode.parent.rightChild = node;
                    }
                    else if (currentNodeToParent == -1) {
                        currentNode.parent.leftChild = node;
                    }
                }
            }
        }
    };
    //first node and parentnode
    BinaryTree.prototype.find = function (searchedObject) {
        if (this.root == null) {
            return null;
        }
        var currentNode = this.root;
        var foundNode = null;
        recursiveSearch();
        return foundNode;
        function recursiveSearch() {
            var compareResult = 0;
            if (typeof searchedObject == "number" || typeof searchedObject == "string") {
                compareResult = -1 * currentNode.value.compareTo(null, searchedObject);
            }
            else {
                compareResult = searchedObject.compareTo(currentNode.value);
            }
            if (compareResult == 0) {
                foundNode = currentNode;
                return;
            }
            else if (compareResult == -1) {
                if (currentNode.leftChild != null) {
                    var tempNode = currentNode.leftChild;
                    currentNode = tempNode;
                    recursiveSearch();
                    return;
                }
            }
            else if (compareResult == 1) {
                if (currentNode.rightChild != null) {
                    var tempNode = currentNode.rightChild;
                    currentNode = tempNode;
                    recursiveSearch();
                    return;
                }
            }
        }
    };
    BinaryTree.prototype["delete"] = function (data) {
        if (this.root == null) {
            throw new Error("The tree has no root, can't perform delete operation");
        }
        var node = this.find(data);
        if (node == null) {
            return false;
        }
        //keep for later when parent reference to original node would be needed
        var originalNode = node;
        if (node.leftChild != null && node.rightChild == null) {
            if (node.parent == null) {
                this.root = node.leftChild;
            }
            else {
                node.parent.leftChild = node.leftChild;
            }
        }
        else if (node.leftChild == null && node.rightChild != null) {
            if (node.parent == null) {
                this.root = node.rightChild;
            }
            else {
                node.parent.rightChild = node.rightChild;
            }
        }
        else if (node.leftChild == null && node.rightChild == null) {
            //node = undefined
            if (node.parent == null) {
                this.root = null;
            }
            else {
                var compareResult = node.value.compareTo(node.parent.value);
                if (compareResult == -1) {
                    if (node.parent != null) {
                        node.parent.leftChild = null;
                    }
                }
                else if (compareResult == 1) {
                    if (node.parent != null) {
                        node.parent.rightChild = null;
                    }
                }
            }
        }
        else if (node.leftChild != null && node.rightChild != null) {
            var successor = this.getSuccessor(node);
            var successorEqRightChild = node.rightChild.value.compareTo(successor.value);
            //if the successor happens to be the right child of node
            if (successorEqRightChild == 0) {
                var oldLeftTree = node.leftChild;
                node = successor;
                node.leftChild = oldLeftTree;
            }
            else {
                //find parent of non-child successor - there will for sure be parent
                var successorSuccessor = this.getSuccessor(successor);
                var oldNode = node;
                node = successor;
                successorSuccessor.leftChild = null;
                node.leftChild = oldNode.leftChild;
                node.rightChild = oldNode.rightChild;
            }
            //change child pointers for parent, disconnect old node from parent
            if (originalNode.parent != null) {
                var newNodeVsParent = node.value.compareTo(originalNode.parent.value);
                if (newNodeVsParent == -1) {
                    originalNode.parent.leftChild = node;
                }
                else if (newNodeVsParent == 1) {
                    originalNode.parent.rightChild = node;
                }
            }
            else {
                //parent node got removed, so now this is root
                this.root = node;
            }
        }
        return true;
    };
    BinaryTree.prototype.getSuccessor = function (rootNode) {
        var result = null;
        if (rootNode.rightChild != null) {
            deepestLeftTraversal(rootNode.rightChild);
            console.log("pk");
            return result;
        }
        else {
            firstLeftSubtreeAncestor(rootNode);
            return result;
        }
        function deepestLeftTraversal(currentNode) {
            if (currentNode.leftChild != null) {
                deepestLeftTraversal(currentNode.leftChild);
            }
            else {
                result = currentNode;
            }
        }
        function firstLeftSubtreeAncestor(currentNode) {
            if (currentNode.parent) {
                var comparisonRes = currentNode.parent.value.compareTo(currentNode.value);
                if (comparisonRes == -1) {
                    firstLeftSubtreeAncestor(currentNode.parent);
                }
                else {
                    result = currentNode.parent;
                }
            }
        }
    };
    BinaryTree.prototype.list = function () {
        if (this.root == null) {
            return [];
        }
        var result = [];
        traversal(this.root);
        return result;
        function traversal(currentNode) {
            if (currentNode.leftChild != null) {
                traversal(currentNode.leftChild);
            }
            result.push(currentNode);
            if (currentNode.rightChild != null) {
                traversal(currentNode.rightChild);
            }
        }
    };
    return BinaryTree;
}());
exports["default"] = BinaryTree;

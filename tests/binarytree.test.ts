import BinaryTree from "../Tree";
import Person from "../Person";
import Node from "../Node";

function getTree(): BinaryTree<Person> {

    let bintree: BinaryTree<Person> = new BinaryTree<Person>();

    bintree.insert(new Node<Person>(new Person("Ten", 10)));
    bintree.insert(new Node<Person>(new Person("Seventy", 70)));
    bintree.insert(new Node<Person>(new Person("Sixty", 60)));
    bintree.insert(new Node<Person>(new Person("One", 1)));
    bintree.insert(new Node<Person>(new Person("Fifteen", 15)));
    bintree.insert(new Node<Person>(new Person("Hundrfifty", 150)));
    bintree.insert(new Node<Person>(new Person("Four", 4)));
    bintree.insert(new Node<Person>(new Person("Zero", 0)));
    bintree.insert(new Node<Person>(new Person("Eighty", 80)));
    bintree.insert(new Node<Person>(new Person("Hundrsixty", 160)));

    return bintree;
}

function getList(bintree: BinaryTree<Person>): Array<string | number> {
    let result: Array<string | number> = [];
    let fullList = bintree.list();

    for (let i = 0; i < fullList.length; i++) {
        result.push(fullList[i].value.age)
    }
    return result
}

describe("Traversal tests", () => {
    it("Inorder traversal check", () => {
        let bintree = getTree();
        let inorder = getList(bintree);
        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150, 160]);
    });
});

describe("Insertion tests", () => {
    it("Insert leaf node to left most subtree", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", -1)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([-1, 0, 1, 4, 10, 15, 60, 70, 80, 150, 160]);
    });
    it("Insert leaf node to right most subtree", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 170)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150, 160, 170]);
    });
    it("Insert leaf node to left subtree, right most node", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 5)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 5, 10, 15, 60, 70, 80, 150, 160]);
    });
    it("Insert leaf node to right subtree, left most node", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 75)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 75, 80, 150, 160]);
    });
    it("Insert misc 1", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 155)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150, 155, 160]);
    });
    it("Insert misc 2", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 65)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 65, 70, 80, 150, 160]);
    });
    it("Insert misc 3", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 11)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 11, 15, 60, 70, 80, 150, 160]);
    });
    it("Insert misc 4", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 20)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 20, 60, 70, 80, 150, 160]);
    });

    it("inserting duplicate node doesnt cause duplication", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 150)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150, 160]);
    })

    it("inserting duplicate node into root doesn't screw stuff up", () => {
        let bintree = getTree();
        bintree.insert(new Node<Person>(new Person("test", 10)));
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150, 160]);
    })
});

describe("Deletion case 1 (leaf)", () => {
    it("Remove right subtree leaf", () => {
        let bintree = getTree();
        bintree.delete(160)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 150]);
    });
    it("Remove left subtree leaf", () => {
        let bintree = getTree();
        bintree.delete(4)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 10, 15, 60, 70, 80, 150, 160]);
    });
    it("Remove misc leaf 1", () => {
        let bintree = getTree();
        bintree.delete(80)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 150, 160]);
    });
    it("Remove misc leaf 2", () => {
        let bintree = getTree();
        bintree.delete(15)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 60, 70, 80, 150, 160]);
    });
    it("Remove misc leaf 3", () => {
        let bintree = getTree();
        bintree.delete(0)
        let inorder = getList(bintree);

        expect(inorder).toEqual([1, 4, 10, 15, 60, 70, 80, 150, 160]);
    });
});

describe("Deletion case 2 (parent has 1 child)", () => {

    it("Parent is up-right", () => {
        let bintree = getTree();
        bintree.delete(60)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 70, 80, 150, 160]);
    });
});

describe("Deletion case 3 (parent has both children)", () => {
    it("Right child is successor", () => {
        let bintree = getTree();
        bintree.delete(70)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 80, 150, 160]);
    });
    it("Right child not successor", () => {
        let bintree = getTree();
        bintree.delete(150)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 10, 15, 60, 70, 80, 160]);
    });
});

describe("Special cases", () => {
    it("Remove root", () => {
        let bintree = getTree();
        bintree.delete(10)
        let inorder = getList(bintree);

        expect(inorder).toEqual([0, 1, 4, 15, 60, 70, 80, 150, 160]);
    });
});
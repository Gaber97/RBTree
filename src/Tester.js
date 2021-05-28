//tester



class Tester {


    constructor(visualizer) {
        this.visualizer = visualizer;


    }

    findTest(num, val) {

        for (let i = 0; i < num; i++) {

            this.visualizer.operationInTree(val, "Find");
        }

    }

    everythingsOk() {

        this.visualizer.clear();
        for (let i = 0; i < 15; i++) {
            this.visualizer.operationInTree(random(1, 10000), "Add");
            this.visualizer.stepForwardSkip();
        }

        let isGood=true;

        for (let i = 0; i < 1000; i++) {

            this.visualizer.operationInTree(this.visualizer.tree.root.value, "Del");
            this.visualizer.stepForwardSkip();
            this.visualizer.operationInTree(random(1, 10000), "Add");
            this.visualizer.stepForwardSkip();

            isGood= isGood && this.isRedBlackTree(this.visualizer.tree);

        }

        console.log(isGood)

    }

    actualIsOk() {
        console.log(this.isRedBlackTree(this.visualizer.tree))
    }


    //check the tree is a valid rbtree
    isRedBlackTree(tree) {

        let isRBTree = true;


        isRBTree = isRBTree && tree.root.color == "Black";
        isRBTree = isRBTree && tree.nil.color == "Black";
        isRBTree = isRBTree && this.isRBTreeBlackHeightValid(tree);
        isRBTree = isRBTree && this.isRBTreeRedHaveBlackChildsValid(tree);
        isRBTree = isRBTree && this.isRBTreeNodesRedOrBlackValid(tree);

        return isRBTree;

    }

    isRBTreeBlackHeightValid(tree) {
        return this.computeBlackHeight(tree.root, tree.nil) != -1;
    }


    computeBlackHeight(currNode, nill) {

        if (currNode == nill) {
            return 0;
        }


        let leftHeight = this.computeBlackHeight(currNode.left, nill);
        let rightHeight = this.computeBlackHeight(currNode.right, nill);
        let add = currNode.color == "Black" ? 1 : 0;

        if (leftHeight == -1 || rightHeight == -1 || leftHeight != rightHeight) {
            return -1;
        }

        else {
            return leftHeight + add;
        }

    }

    isRBTreeRedHaveBlackChildsValid(tree) {
        return this.computeRedHaveBlackChilds(tree.root, tree.nil) != -1;
    }


    computeRedHaveBlackChilds(currNode, nill) {

        if (currNode == nill) {
            return 1;
        }

        let leftOkey = this.computeRedHaveBlackChilds(currNode.left, nill);
        let rightOkey = this.computeRedHaveBlackChilds(currNode.right, nill);

        let bad = false;

        if (currNode.color == "Red") {
            if (currNode.left.color == "Red" || currNode.right.color == "Red") {
                bad = true;
            }
        }


        if (leftOkey == -1 || rightOkey == -1 || bad) {
            return -1;
        }

        else {
            return 1;
        }

    }

    isRBTreeNodesRedOrBlackValid(tree) {
        return this.computeRBTreeNodesRedOrBlackValid(tree.root, tree.nil) != -1;
    }


    computeRBTreeNodesRedOrBlackValid(currNode, nill) {

        if (currNode == nill) {
            return 1;
        }

        let leftOkey = this.computeRBTreeNodesRedOrBlackValid(currNode.left, nill);
        let rightOkey = this.computeRBTreeNodesRedOrBlackValid(currNode.right, nill);

        let bad = false;


        if (currNode.color != "Red" && currNode.color != "Black") {
            bad = true;
        }


        if (leftOkey == -1 || rightOkey == -1 || bad) {
            return -1;
        }

        else {
            return 1;
        }

    }






}














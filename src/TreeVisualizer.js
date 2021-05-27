
class Treevisualizer {



    
    constructor() {

        this.speed = 0.01;
        this.anim = true;
        this.visSteps = [];
        this.visStepsSize = -1;
        this.actualStep = -1;
        this.actualStepElement = 0;
        this.userStop = false;

        this.visNode1;
        this.visNode2;

        this.tree = new VisRBTree();

        this.vistree = this.tree;
        this.counter = 0;
        this.nextStep = 300;

        this.moved = true;

    }

    operationInTree(val, operation) {

        //add operation in TreeVisualizer

        this.counter = 0;
        val = parseInt(val)


        //exit when the input is not a number, not add element the tree
        if (isNaN(val)) {
            console.log(NaN);
            return 0;
        }

        //exit when the tree is empty or reset to default, just add element is enabled

        if( operation != "Add"  && ( this.visStepsSize == -1 || this.actualStep == -1 )) return 0;

        switch (operation) {
            case "Add":
                let x = this.tree.max(this.tree.root);

                if (x.x > windowWidth - 50) { return 0; }

                this.addSteps(this.tree.addValue(val));
                break;
            case "Del":

                this.addSteps(this.tree.delValue(val));

                break;
            case "Find":
                this.addSteps(this.tree.visFind(val));



                break;
            case "Pre":

                this.addSteps(this.tree.visPrev(val));

                break;
            case "Next":

                this.addSteps(this.tree.visNext(val));

                break;
            case "PreOrder":
                this.addSteps(this.tree.visOrder("PreOrder"));

                break;
            case "InOrder":
                this.addSteps(this.tree.visOrder("InOrder"));

                break;
            case "PostOrder":
                this.addSteps(this.tree.visOrder("PostOrder"));

                break;
            default:

        }

        if (this.actualStep < this.visStepsSize) {

            if (this.actualStep == -1) {

                this.tree = new VisRBTree();


            }
            else {

                this.tree = this.visSteps[this.actualStep]["OldTree"].clone();
                this.tree.coordinateEquals();

            }

        }
    }



    addSteps(data) {

        if (data.length == 0) {
            return 0;
        }

        this.visStepsSize = this.actualStep + 1;
        this.actualStep = this.visStepsSize;
        this.actualStepElement = 0;

        this.visSteps[this.visStepsSize] = data;

        this.changeTree();

    }

    stepForward() {

        if (this.visStepsSize == -1) {

            return 0;

        }

        this.anim = true;

        if (this.actualStep == -1) {
            this.actualStep = 0;
            return 0;
        }

        if (this.actualStepElement + 1 >= this.visSteps[this.actualStep]["List"].length) {

            if (this.actualStep + 1 <= this.visStepsSize) {

                this.actualStep = this.actualStep + 1;
                this.tree = this.visSteps[this.actualStep]["OldTree"].clone();
                this.actualStepElement = 0;
                this.changeTree();

            }
            else {
                this.tree = this.visSteps[this.actualStep]["NewTree"].clone();
            }

        }
        else {

            this.actualStepElement = 1 + this.actualStepElement;
            this.changeTree();

        }
    }


    stepForwardSkip() {

        if (this.visStepsSize == -1) {

            return 0;
        }

        this.anim = true;

        if (this.actualStep == -1) {
            this.actualStep = 0;
            return 0;
        }

        if (this.actualStepElement + 1 == this.visSteps[this.actualStep]["List"].length) {
            this.stepForward();
        }
        else {
            this.actualStepElement = this.visSteps[this.actualStep]["List"].length - 1;
            this.changeTree();
        }

    }


    stepBackward() {


        if (this.visStepsSize == -1) {
            return 0;
        }

        this.anim = false;

        if (this.actualStepElement - 1 < 0) {

            if (this.actualStep - 1 > -1) {

                this.actualStep = this.actualStep - 1;
                this.actualStepElement = this.visSteps[this.actualStep]["List"].length - 1;
                //this.treeIsSet=false;
                this.tree = this.visSteps[this.actualStep]["NewTree"].clone();
                this.changeTree();
            }
            else if (this.actualStep - 1 == -1) {
                this.actualStep = this.actualStep - 1;
                this.actualStepElement = 0;
                this.tree = new VisRBTree();

            }

        }
        else {
            this.actualStepElement = this.actualStepElement - 1;
            this.changeTree();

        }

    }


    stepBackwardSkip() {

        if (this.visStepsSize == -1) {
            return 0;
        }

        this.anim = false;


        if (this.actualStepElement == 0) {

            this.stepBackward();

        }
        else {
            this.actualStepElement = 0;
            this.changeTree();
        }

    }


    drawTree() {

        let node1;
        let node2;
        let node3;

        this.moved = true;

        if (this.visStepsSize == -1 || this.actualStep == -1) return 0;

        let actual = this.visSteps[this.actualStep];

        let actualListelement = actual["List"][this.actualStepElement];

        switch (actualListelement.command) {
            case "AddAnimation":


                this.drawText(actualListelement.visElement3);

                break;
            case "RotationRight":

                node1 = this.visNode1;

                node2 = this.visNode2;


                this.moveNode(node1);
                this.moveNode(node2);
                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);

                fill(0, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                this.drawText(actualListelement.visElement4);


                break;
            case "RotationLeft":

                node1 = this.visNode1;

                node2 = this.visNode2;


                this.moveNode(node1);
                this.moveNode(node2);
                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);



                fill(0, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                this.drawText(actualListelement.visElement4);

                break;
            case "RotationSelectAndChange":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;


                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);

                fill(0, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                this.drawText(actualListelement.visElement4);

                break;
            case "AddPreaper":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;


                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);



                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                this.drawText(actualListelement.visElement4);

                break;
            case "AddPreaperGrandParent":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;

                node3 = actualListelement.visElement4;

                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);
                this.circleChange(node3, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);


                if(node3.value !="Nil"){
                    
                    this.circleChange(node3, 47, 55);
                    
                    fill(0, 100, 0);
                    ellipse(node3.drawx, node3.drawy, node3.round, node3.round);

                }

                this.drawText(actualListelement.visElement5);

                break;
            case "Find":

                node1 = actualListelement.visElement1;


                this.circleChange(node1, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                this.drawText(actualListelement.visElement2);

                break;
            case "FindMin":

                node1 = actualListelement.visElement1;
                node2 = actualListelement.visElement2;


                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);

                fill(0, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(100, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);


                this.drawText(actualListelement.visElement3);

                break;
            case "Del":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;

                node3 = actualListelement.visElement4;

                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);
                this.circleChange(node3, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                fill(0, 100, 0);
                ellipse(node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

                this.moved = actualListelement.visElement6;


                break;
            case "DelNil":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;



                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);


                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);



                this.drawText(actualListelement.visElement4);

                this.moved = actualListelement.visElement5;


                break;
            case "DelBinding":

                node1 = this.visNode1;

                node2 = this.visNode2;

                this.moved = actualListelement.visElement5;
                if (this.moved) {
                    this.moveNode(node1);
                    this.moveNode(node2);
                }


                this.circleChange(node1, 47, 55);
                this.circleChange(node2, 47, 55);


                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                fill(0, 100, 0);
                ellipse(node2.drawx, node2.drawy, node2.round, node2.round);



                this.drawText(actualListelement.visElement4);




                break;
            case "DelBindingNil":

                node1 = this.visNode1;

                this.moved = actualListelement.visElement4;

                if (this.moved) {
                    this.moveNode(node1);

                }

                this.circleChange(node1, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement3);

                this.moved = actualListelement.visElement4;

                break;
            case "FixDelCase1Part1":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;


                this.circleChange(node1, 47, 55);


                if (node2.value != this.vistree.nil.value) {

                    this.circleChange(node2, 47, 55);

                    fill(0, 100, 0);
                    ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                }

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                this.drawText(actualListelement.visElement4);

                break;
            case "FixDelCase1Part2":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;

                node3 = actualListelement.visElement4;


                if (node2.value != this.vistree.nil.value) {

                    this.circleChange(node2, 47, 55);

                    fill(0, 100, 0);
                    ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                }


                this.circleChange(node1, 47, 55);

                this.circleChange(node3, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0, 100, 0);
                ellipse(node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

                //this.moved=actualListelement.visElement4;

                break;
            case "FixDelCase2":

                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;


                this.circleChange(node1, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                if (node2.value != this.vistree.nil.value) {

                    this.circleChange(node2, 47, 55);

                    fill(0, 100, 0);
                    ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                }

                this.drawText(actualListelement.visElement4);

                break;
            case "FixDelCase3":


                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;

                node3 = actualListelement.visElement4;


                if (node2.value != this.vistree.nil.value) {

                    this.circleChange(node2, 47, 55);

                    fill(0, 100, 0);
                    ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                }


                this.circleChange(node1, 47, 55);

                this.circleChange(node3, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0, 100, 0);
                ellipse(node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

                break;
            case "FixDelCase4":


                node1 = actualListelement.visElement2;

                node2 = actualListelement.visElement3;

                node3 = actualListelement.visElement4;


                if (node2.value != this.vistree.nil.value) {

                    this.circleChange(node2, 47, 55);

                    fill(0, 100, 0);
                    ellipse(node2.drawx, node2.drawy, node2.round, node2.round);

                }


                this.circleChange(node1, 47, 55);

                this.circleChange(node3, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0, 100, 0);
                ellipse(node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

                break;
            case "Orders":

                node1 = this.visNode1;

                this.moved = actualListelement.visElement3;

                if (this.moved) {
                    this.moveNode(node1);

                }

                this.circleChange(node1, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement2);



                break;
            case "NextOrPre":

                node1 = this.visNode1;

                this.moved = actualListelement.visElement3;

                if (this.moved) {
                    this.moveNode(node1);

                }

                this.circleChange(node1, 47, 55);

                fill(100, 100, 0);
                ellipse(node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement2);



                break;
            case "End":

                this.drawText(actualListelement.visElement2);


                break;
        }

        if (this.vistree.root != this.vistree.nil && this.moved) this.preOrderMove(this.vistree.root, this.vistree.nil);

        if (this.vistree.root != this.vistree.nil) this.postOrderTreeDraw(this.vistree.root, this.vistree.nil);

        //this.drawNode(this.vistree.nil,0,0);


        switch (actualListelement.command) {
            case "Add":

                node1 = this.visNode1;
                node1.newy = node1.y - 5;
                node1.value = actualListelement.visElement2.value;
                node1.color = actualListelement.visElement2.color;

                this.stepanim = true;

                this.moveNodeVertically(node1);


                let val = actualListelement.visElement1.value;
                let value = actualListelement.visElement2.value;


                this.drawText(actualListelement.visElement3);

                if (val < value) {
                    this.drawNode(node1, 45, 0);
                }
                else if (val == value) {
                    this.drawNode(node1, 0, 0);
                }
                else {


                    this.drawNode(node1, -45, 0);
                }

                break;

        }
    }

    drawText(info) {

        fill(0);
        textAlign(LEFT, CENTER);
        textSize(20);

        //text(info,20,  (5*windowHeight/6) -100);
        text(info, 20, 400);
    }


    moveNodeVertically(n) {

        n.drawx = n.x;
        n.drawy = n.y * n.lambda + n.newy * (1 - n.lambda);
        n.lambda = n.lambda - 2 * this.speed * n.dir;

        if (n.lambda < 0 || n.lambda > 1) {
            n.dir = n.dir * -1;
        }
    }

    circleChange(n, min, max) {
        n.round = n.round + 7 * this.speed * n.dir;

        if (n.round < min || n.round > max) {
            n.dir = n.dir * -1;
        }
    }

    
    drawNode(n, xchange, ychange) {
        strokeWeight(1);
        stroke(0);
        fill(0, 0, 0);
        if (n.color == "Red") {
            fill(250, 30, 14);

        }

        ellipse(n.drawx + xchange, n.drawy + ychange, 40, 40);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(15);
        text(n.value, n.drawx + xchange, n.drawy + ychange);

    }

    postOrderTreeDraw(n, nil) {

        if (n.left != nil) {
            this.postOrderTreeDraw(n.left, nil);

        }
        else {
            //   stroke(255);
            // strokeWeight(3);
            //  line(n.left.drawx, n.left.drawy, n.drawx, n.drawy);
        }


        if (n.right != nil) {
            this.postOrderTreeDraw(n.right, nil);

        }
        else {

            //  stroke(255);
            // strokeWeight(3);
            // line(n.right.drawx, n.right.drawy, n.drawx, n.drawy);
        }

        if (n.parent != nil) {

            stroke(255);
            strokeWeight(2);
            line(n.parent.drawx, n.parent.drawy, n.drawx, n.drawy);
        }
        this.drawNode(n, 0, 0);

    }

    preOrderMove(n, nil) {

        if (n.left != nil) {
            this.preOrderMove(n.left, nil);

        }

        if (n.right != nil) {
            this.preOrderMove(n.right, nil);

        }
        this.moveNode(n);
    }

    moveNode(n) {
        if (this.anim) {

            if (n.x != n.newx || n.y != n.newy) {

                n.drawx = n.x * n.lambda + n.newx * (1 - n.lambda);
                n.drawy = n.y * n.lambda + n.newy * (1 - n.lambda);


                n.lambda = n.lambda - this.speed;


            }
            if (n.lambda < 0) {

                n.lambda = 1;
                n.x = n.newx;
                n.y = n.newy;
                n.drawx = n.newx;
                n.drawy = n.newy;

            }
        }
        else {
            n.lambda = 1;
            n.x = n.newx;
            n.y = n.newy;
            n.drawx = n.newx;
            n.drawy = n.newy;
        }
    }

    changeTree() {

        let actualvisElement = this.visSteps[this.actualStep]["List"][this.actualStepElement];

        let command = actualvisElement.command;


        if (command == "Add" || command == "Find" || command == "FindMin" || command == "Orders" || command == "NextOrPre") {
            this.vistree = this.visSteps[this.actualStep]["OldTree"].clone();
        }
        else {
            this.vistree = actualvisElement.visElement1.clone();
        }

        if (command == "Add" || command == "Orders" || command == "NextOrPre") {
            this.visNode1 = actualvisElement.visElement1.Copy();

        }
        else if (command == "DelBindingNil") {
            this.visNode1 = actualvisElement.visElement2.Copy();
        }
        else if (command == "RotationLeft" || command == "RotationRight" || command == "DelBinding") {
            this.visNode1 = actualvisElement.visElement2.Copy();
            this.visNode2 = actualvisElement.visElement3.Copy();
        }

    }

    clear() {
        this.visSteps = [];
        this.actualStep = -1;
        this.visStepsSize = -1;
        this.tree = new VisRBTree();
        this.counter= 0;

    }

    canAddAndDel() {
        if (this.visStepsSize == -1 || this.actualStep == -1) {
            return true;
        }
        if (this.actualStepElement == this.visSteps[this.actualStep]["List"].length - 1) {
            return true;
        }
        return false;
    }

    canStep() {
        return this.userStop;
    }

    counterNextStep() {

        if (!this.userStop && this.actualStep != -1) {
            this.counter++;
 
        }
        if (this.counter > this.nextStep) {

            if (this.actualStepElement < this.visSteps[this.actualStep]["List"].length) {
                this.stepForward();
            }
            this.counter = 0;
        }

    }


    stopOrStartInterval() {

        this.userStop = !this.userStop;
        this.counter = 0;
    }


    
    randomTree(num) {

        num = parseInt(num)

        if (isNaN(num)) {

            return 0;
        }
        if (num < 1 || num > 30) {

            return 0;
        }

        for (let i = 0; i < num; i++) {

            this.operationInTree(random(1, 1000), "Add");
        }


    }




}

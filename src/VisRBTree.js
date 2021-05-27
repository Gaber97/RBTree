
class VisRBTree extends RBTree {

  Steps;
  verticalchange;
  horizontalchange;

  constructor() {
    super();

    this.nil = new VisNode("Nil", "Black");
    this.nil.left = this.nil;
    this.nil.parent = this.nil;
    this.nil.right = this.nil;
    this.root = this.nil;

    this.verticalchange = 45;
    this.horizontalchange = 45;


    //vizaul things
    this.Steps = [];
    this.str = [];
  }

  addValue(val) {
    let z = new VisNode(val, "Red");
    z.parent = this.nil;
    let y = this.nil;
    let x = this.root;


    if (this.find(val) != this.nil) {
      return [];
    }
    this.Steps = [];
    let oldTree = this.clone();

    while (x != this.nil) {
      y = x;

      if (z.value < x.value) {

        this.Steps.push(new VisElement("Add", x.Copy(), z.Copy(), "Add an element. " + String(z.value) + " is less than " + String(x.value) + ". We continue in the left subtree."));
        if (this.root.value < x.value) this.piselSet(x, this.horizontalchange, 0, x.right);

        z.newx = x.newx - this.horizontalchange;
        z.newy = x.newy + this.verticalchange;
        x = x.left;

      }
      else {

        this.Steps.push(new VisElement("Add", x.Copy(), z.Copy(), "Add an element. " + String(z.value) + "  is greater than " + String(x.value) + ". We continue in the right subtree."));

        if (this.root.value > x.value) this.piselSet(x, -this.horizontalchange, 0, x.left);

        z.newx = x.newx + this.horizontalchange;
        z.newy = x.newy + this.verticalchange;
        x = x.right;

      }
    }
    z.parent = y;

    if (y == this.nil) {
      this.root = z;


      z.x = this.horizontalchange + 40;
      z.y = this.verticalchange;

      this.Steps.push(new VisElement("Add", z.Copy(), z.Copy(), "The added  " + String(z.value) + " element is the root of the tree."));

      z.newx = 2 * this.horizontalchange + 40;
      z.newy = this.verticalchange;

    }
    else if (z.value < y.value) {
      y.left = z;
      z.x = y.x - this.horizontalchange;
      z.y = y.y;

    }
    else {
      y.right = z;
      z.x = y.x + this.horizontalchange;
      z.y = y.y;
    }
    z.left = this.nil;
    z.right = this.nil;
    z.color = "Red";

    if (this.min(this.root).x < 165) {
      this.pixelChange(this.root, this.horizontalchange, 0);
    }

    this.Steps.push(new VisElement("AddAnimation", this.clone(), true, "The inserted element with value " + String(z.value) + " reached it's destination."));

    this.coordinateEquals();

    this.fixAdd(z);

    let newTree = this.clone();
    this.Steps.push(new VisElement("End", this.clone(), ""));

    this.coordinateEquals();

    return {
      "Operation": "Add",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };
  }

  fixAdd(z) {

    while (z.parent.color == 'Red') { 
      //The parent of the node x is red. Reordering is needed.
      this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), " The parent of the node with value " + String(z.value) + "  is red. Reordering is needed."));
      this.coordinateEquals();

      if (z.parent == z.parent.parent.left) {

        let y = z.parent.parent.right;

        if (y.color == "Red") {
          //First case: The right child of the grandparent of x is red.
          
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "First case: The right child of the grandparent of " + String(z.value) + " is red."));
          this.coordinateEquals();

          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red";


          //First case: the parent of 12 is black. The right child of it's grandparent is black, So the grandparent will be red. The next examined node will be 122.
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "First case: The parent of " + String(z.value) + " is black. The right child of it's grandparent is black, So the grandparent will be red."+
          "\nThe next examined node will be " + String(z.parent.parent.value) + "."));
          this.coordinateEquals();
          z = z.parent.parent;

        }
        else {

          if (z == z.parent.right) {
            //Second case: The 442 node's grandparent's right child is black. The node 442 the right child. Next we rotate left, to the third case.

            this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "Second case: The " + String(z.value) + " node's grandparent's right child is black.\nThe node " + String(z.value) + " the right child. Next we rotate left, to the third case."));
            this.coordinateEquals();

            z = z.parent;
            this.leftRound(z);
          }


          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "Third case: The " + String(z.value) + " node's grandparent's right child is black.\nThe node " + String(z.value) + " the left child."));
          z.parent.color = "Black";
          z.parent.parent.color = "Red";



          //Third case: The parent of the node 122 will be black. So the grandparent will become red.
          this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "Third case: The parent of the node " + String(z.value) + " will be black. So the grandparent will become red."));
          this.coordinateEquals();
          this.rightRound(z.parent.parent);

        }

      }
      else {
        let y = z.parent.parent.left;
        if (y.color == "Red") {
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "First case: The left child of the grandparent of " + String(z.value) + " is red."));
          this.coordinateEquals();

          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red"
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "First case: The parent of " + String(z.value) + " is black. The left child of it's grandparent is black, So the grandparent will be red."
          +"\nThe next examined node will be " + String(z.parent.parent.value) + "."));
          this.coordinateEquals();
          z = z.parent.parent;
        }
        else {

          if (z == z.parent.left) {
            this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "Second case: The " + String(z.value) + " node's grandparent's left child is black.\nThe node " + String(z.value) + " the left child. Next we rotate right, to the third case."));
            this.coordinateEquals();

            z = z.parent;
            this.rightRound(z);

          }
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "Third case: The " + String(z.value) + " node's grandparent's left child is black.\nThe node " + String(z.value) + " the right child."));

          z.parent.color = "Black";
          z.parent.parent.color = "Red";

          this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "Third case: The parent of the node " + String(z.value) + " will be black. So the grandparent will become red."));
          this.coordinateEquals();
          this.leftRound(z.parent.parent);
        }

      }

    }
    if (this.root.color == "Red") {
      this.Steps.push(new VisElement("AddPreaper", this.clone(), this.root.Copy(), this.root.Copy(), "The root has to be black."));
      this.coordinateEquals();
    }
    this.root.color = "Black";


  }

  findVisDel(k) {
    let change = false;
    if (this.find(k) != this.nil) change = true;

    let x = this.root;
    while (x != this.nil && x.value != k) {
      if (k < x.value) {

        // "Add an element. " + String(z.value) + " is less than " + String(x.value) + ". We continue in the left subtree."
        this.Steps.push(new VisElement("Find", x.Copy(), "Del an element.  " + String(k) + " is less than " + String(x.value) + ". We continue in the left subtree."));
        //console.log(this.root.value<x.value && change);
        if (this.root.value < x.value && change) this.piselSet(x, -this.horizontalchange, 0, x.right);

        x = x.left;
      }
      else {


        this.Steps.push(new VisElement("Find", x.Copy(), "Del an element.  " + String(k) + " is greater than " + String(x.value) + ". We continue in the right subtree."));

        if (this.root.value > x.value && change) this.piselSet(x, this.horizontalchange, 0, x.left);

        x = x.right;
      }
    }
    if (x == this.nil) {

      this.Steps.push(new VisElement("End", this.clone(), "Del an element.The node " + String(k) + " is not found."));
    }
    else {

      this.Steps.push(new VisElement("Find", x.Copy(), "Del an element. The node " + String(k) + " is found."));

    }

    return x;
  }

  delValue(k) {
    this.Steps = [];
    let oldTree = this.clone();

    let z = this.findVisDel(k);
    if (z == this.nil) {

      let newTree = this.clone();
      this.Steps.push(new VisElement("End", this.clone(), ""));
      return {
        "Operation": "Del",

        "OldTree": oldTree,

        "List": this.Steps,

        "NewTree": newTree
      };

    }

    let y;
    if (z.left == this.nil || z.right == this.nil) {
      y = z;
    }
    else {

      if (this.root.value > z.value) this.piselSet(z, this.horizontalchange, 0, z.left);

      y = this.nextWithChange(z);
    }
    let x;
    if (y.left != this.nil) {
      x = y.left;
    }
    else {
      x = y.right;
    }

    if (x != this.nil) {//Deletion the node 154. We copy the key of the node 360 into the place of the node we want to delete.
      this.Steps.push(new VisElement("Del", this.clone(), z.Copy(), y.Copy(), x.Copy(), "Deletion the node " + String(z.value) + " .We copy the key of the node " + String(y.value) + " into the place of the node we want to delete.", false));
    }
    else {
      this.Steps.push(new VisElement("DelNil", this.clone(), z.Copy(), y.Copy(), "Deletion the node " + String(z.value) + " .We copy the key of the node " + String(y.value) + " into the place of the node we want to delete.", false));
    }

    x.parent = y.parent;
    if (y.parent == this.nil) {
      this.root = x;
    }
    else if (y == y.parent.left) {
      y.parent.left = x;
    }
    else {
      y.parent.right = x;
    }
    if (y != z) {
      z.value = y.value;

      if (y.right != this.nil) {

        this.pixelChange(x, (y.newx - x.x), (y.newy - x.y));

        if (x != this.nil) {
          this.Steps.push(new VisElement("DelBinding", this.clone(), z.Copy(), x.Copy(), "Remove: Moving the node with value " + String(x.value) + " .", false));
        }
        else {
          this.Steps.push(new VisElement("DelBindingNil", this.clone(), z.Copy(), "Remove: Moving the node with value " + String(x.value) + " .", false));
        }

      }
    }
    else {
      if (y.right != this.nil) {
        if (this.root.value > x.value) {
          this.pixelChange(x, 0, -this.verticalchange);
        }
        else {
          this.pixelChange(x, -this.horizontalchange, -this.verticalchange);
        }

      }
      else if (y.left != this.nil) {
        if (this.root.value < x.value) {
          this.pixelChange(x, 0, -this.verticalchange);
        }
        else {
          this.pixelChange(x, this.horizontalchange, -this.verticalchange);
        }

      }

    }

    if (this.min(this.root).x > 200) {
      this.pixelChange(this.root, -this.horizontalchange, 0);
    }

    if (x != this.nil) {
      this.Steps.push(new VisElement("DelBindingNil", this.clone(), x.Copy(), "Remove: Moving the node with value " + String(x.value) + " .", true));

    }
    else {
      if (z != y) {
        this.Steps.push(new VisElement("DelBindingNil", this.clone(), z.Copy(), "Remove: Moving the node with value " + String(z.value) + " .", true));
      }
      else {
        this.Steps.push(new VisElement("End", this.clone(), "Remove: Moving the node with value " + String(z.value) + " ."));


      }

    }

    this.coordinateEquals();

    if (y.color == "Black") {

      this.fixDel(x);
    }
    let newTree = this.clone();
    this.coordinateEquals();

    this.Steps.push(new VisElement("End", this.clone(), ""));
    this.coordinateEquals();

    return {
      "Operation": "Del",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };

  }

  fixDel(x) {

    while (x != this.root && x.color == "Black") {
      if (x == x.parent.left) {
        let w = x.parent.right;

        if (w.color == "Red") {

          this.Steps.push(new VisElement("FixDelCase1Part1", this.clone(), w.Copy(), x.Copy(),
            "First case: The sibling of the " + String(x.value) + " is red."));
          w.color = "Black";
          x.parent.color = "Red";
          //First case: The sibling of the node 796 will be black. The parent is red. Rotate to one of the cases from 2,3,4.
          this.Steps.push(new VisElement("FixDelCase1Part2", this.clone(), w.Copy(), x.Copy(), x.parent.Copy(),
            "First case: The sibling of the node " + String(w.value) + " will be black. The parent is red.\nRotate to one of the cases from 2,3,4."));

          this.leftRound(x.parent);
          w = x.parent.right;


        }
        if (w.left.color == "Black" && w.right.color == "Black") {


          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "Second case: The sibling of the " + String(w.value) + " is black and both of it's child is also black.\nThe node " + String(w.value) + " will be red."));


          w.color = "Red";

          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "Second case: The next node to examine will be the parent of " + String(w.value) + "."));
          x = x.parent;

        }
        else {

          if (w.right.color == "Black") {

            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
              "Third case: The sibling of the node " + String(x.value) + " is " + String(w.value) + " and its black, and it's left child is red, the right child is black."));

            w.left.color = "Black";
            w.color = "Red";
            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
              "Third case: The node " + String(w.value) + " is red, it's left child will be black. We rotate into the 4. case."));


            this.rightRound(w);
            w = x.parent.right;

          }
          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
            "Fourth case: The sibling of " + String(x.value) + "  is the black " + String(w.value) + " and it's right child is red."));

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.right.color = "Black";

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.parent.Copy(), w.right.Copy(),
            "Fourth case: The colour of the node " + String(w.value) + " will be the same colour as " + String(x.parent.value) + "'s.\nThe "
            + String(x.parent.value) + "'s colour will be black. The " + String(w.right.value) + "'s colour will be also black.\nAfter the rotation the next element will be the root"));

          this.leftRound(x.parent);
          x = this.root;

        }

      }
      else {
        let w = x.parent.left;
        if (w.color == "Red") {
          this.Steps.push(new VisElement("FixDelCase1Part1", this.clone(), x.Copy(), w.Copy(),
          "First case: The sibling of the " + String(x.value) + " is red."));

          w.color = "Black";
          x.parent.color = "Red";
          this.Steps.push(new VisElement("FixDelCase1Part2", this.clone(), x.Copy(), w.Copy(), x.parent.Copy(),
          "First case: The sibling of the node " + String(w.value) + " will be black. The parent is red.\nRotate to one of the cases from 2,3,4."));
          this.rightRound(x.parent);
          w = x.parent.left;

        }
        if (w.right.color == "Black" && w.left.color == "Black") {
          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
          "Second case: The sibling of the " + String(w.value) + " is black and both of it's child is also black.\nThe node " + String(w.value) + " will be red."));

          w.color = "Red";

          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
          "Second case: The next node to examine will be the parent of " + String(w.value) + "."));
          x = x.parent;

        }
        else {

          if (w.left.color == "Black") {
            //"Third case: The sibling of the node " + String(x.value) + " is " + String(w.value) + " and its black, and it's left child is red, the right child is black."
            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
            "Third case: The sibling of the node " + String(x.value) + " is " + String(w.value) + " and its black, and it's right child is red, the left child is black."));


            w.right.color = "Black";
            w.color = "Red";
            // "Third case: The node " + String(w.value) + " is red, it's left child will be black. We rotate into the 4. case."
            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
            "Third case: The node " + String(w.value) + " is red, it's right child will be black. We rotate into the 4. case."));
            this.leftRound(w);
            w = x.parent.left;

          }

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
          "Fourth case: The sibling of " + String(x.value) + "  is the black " + String(w.value) + " and it's left child is red."));

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.left.color = "Black";

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.parent.Copy(), w.left.Copy(),
          "Fourth case: The colour of the node " + String(w.value) + " will be the same colour as " + String(x.parent.value) + "'s.\nThe "
          + String(x.parent.value) + "'s colour will be black. The " + String(w.right.value) + "'s colour will be also black.\nAfter the rotation the next element will be the root"));


          this.rightRound(x.parent);
          x = this.root;


        }

      }

    }

    x.color = "Black";

  }

  nextWithChange(p) {
    if (p.right != this.nil) {
      return this.visMinimumWithChange(p.right, p);
    }
    else {
      let s = p.parent;
      while (s != this.nil && p == s.right) {
        p = s;
        s = s.parent;
      }
      return s;
    }

  }
  
  visMinimumWithChange(node, rootOfSubTree) {
  
      while (node.left != this.nil) {
        this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "Finding the smallest node in the right sub-tree."));
        if (this.root.value < node.value) this.piselSet(node, -this.horizontalchange, 0, node.right);
        node = node.left;
      }
      if (this.root.value > node.value) this.piselSet(node, this.horizontalchange, 0, node.left)
  
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "The smallest value is " + String(node.value) + " in the right sub-tree."));
      return node;
  }

  visFind(k) {
    let oldTree = this.clone();

    this.Steps = [];
    let x = this.root;
    while (x != this.nil && x.value != k) {
      if (k < x.value) {
        this.Steps.push(new VisElement("Find", x.Copy(), "Find the key " + String(k) + " . The key " + String(k) + " is lesser than key " + String(x.value) + ".\nLooking the left Subtree."));

        x = x.left;
      }
      else {
        this.Steps.push(new VisElement("Find", x.Copy(), "Find the key " + String(k) + ". The key " + String(k) + " is greater than key " + String(x.value) + " .\nLooking the right Subtree."));

        x = x.right;
      }
    }
    if (x == this.nil) {
      this.Steps.push(new VisElement("End", this.clone(), "The key " + String(k) + " is not found."));
    }
    else {
      this.Steps.push(new VisElement("Find", x.Copy(), "The key " + String(k) + " is found."));
    }
    this.Steps.push(new VisElement("End", this.clone(), ""));

    let newTree = this.clone();

    return {
      "Operation": "Find",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };

  }

  leftRound(x) {

    let y = x.right;


    //Rotate left: The rotation of the x and the y nodes.
    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Rotate left: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes."));
    this.coordinateEquals();
    x.right = y.left;

    if (y.left != this.nil) y.left.parent = x;

    y.parent = x.parent;
    if (x.parent == this.nil) {
      this.root = y;
      y.parent = this.nil;
    }
    else if (x == x.parent.left) {
      x.parent.left = y;
    }
    else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;

    //Swapping the parents with the childrens.
    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Rotate left: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes.\nSwapping the parents with the childrens."));
    this.coordinateEquals();


    this.piselSet(y, 0, -this.verticalchange, y.right);

    this.piselSet(x, 0, this.verticalchange, x.left);

    this.Steps.push(new VisElement("RotationLeft", this.clone(), x.Copy(), y.Copy(), "Rotate left: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes reached it's destination"));
    this.coordinateEquals();


  }


  rightRound(x) {

    let y = x.left;

    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Rotate right: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes."));
    this.coordinateEquals();
    x.left = y.right;


    if (y.right != this.nil) y.right.parent = x;

    y.parent = x.parent;
    if (x.parent == this.nil) {
      this.root = y;
      y.parent = this.nil;
    }
    else if (x == x.parent.left) {
      x.parent.left = y;
    }
    else {
      x.parent.right = y;
    }
    y.right = x;
    x.parent = y;


    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Rotate right: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes.\nSwapping the parents with the childrens."));
    this.coordinateEquals();

    this.piselSet(y, 0, -this.verticalchange, y.left);
    this.piselSet(x, 0, this.verticalchange, x.right);

    this.Steps.push(new VisElement("RotationRight", this.clone(), x.Copy(), y.Copy(), "Rotate left: The rotation of the " + String(x.value) + " and the " + String(y.value) + " nodes reached it's destination"));
    this.coordinateEquals();
  }

  

  visOrder(ordertype) {

    this.Steps = [];

    let oldTree = this.clone();

    this.str = []

    this.visOrderRecursive(this.root, this.str, ordertype);

    let newTree = this.clone();

    this.Steps.push(new VisElement("End", this.clone(), ""));

    return {
      "Operation": "Orders",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };

  }

  visOrderRecursive(n, str, ordertype) {


    if (ordertype == "PreOrder") {

      str.push(n.value)
      this.Steps.push(new VisElement("Orders", n.Copy(), " PreOrder : " + str.toString(), true));

    }

    if (n.left != this.nil) {
      this.visOrderRecursive(n.left, str, ordertype);

    }

    if (ordertype == "InOrder") {

      str.push(n.value)
      this.Steps.push(new VisElement("Orders", n.Copy(), " InOrder : " + str.toString(), true));

    }


    if (n.right != this.nil) {
      this.visOrderRecursive(n.right, str, ordertype);

    }

    if (ordertype == "PostOrder") {

      str.push(n.value)
      this.Steps.push(new VisElement("Orders", n.Copy(), " PostOrder : " + str.toString(), true));

    }

  }

  visNext(val) {

    console.log(val);


    this.Steps = [];

    let oldTree = this.clone();

    let n = this.find(val)

    let node = n;

    if (n == this.nil) {
      this.Steps.push(new VisElement("End", this.clone(), "There is no such element."));

    }
    else {

      this.Steps.push(new VisElement("NextOrPre", n.Copy(), "Finding the next element of the node " + String(n.value) + "."));

      let p;

      if (n.right != this.nil) {
        p = this.visMinimum(n.right, n);

        this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is the next element"));
      }
      else {
        this.Steps.push(new VisElement("NextOrPre", n.Copy(), String(n.value) + " doesn't have a right child. To find the next element we have to look at the parent."));

        p = n.parent;
        while (p != this.nil && n == p.right) {

          this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is a right child. To find the next element we have to look at the parent."));
          n = p;
          p = p.parent;

        }


        if (p == this.nil) {
          this.Steps.push(new VisElement("NextOrPre", node.Copy(),  String(val) + " is the maximum value, so there is no next element."));

        }
        else {
          this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is the next element"));
        }


      }




    }

    let newTree = this.clone();

    this.Steps.push(new VisElement("End", this.clone(), ""));

    return {
      "Operation": "PrevOrNext",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };


  }

  visPrev(val) {


    this.Steps = [];

    let oldTree = this.clone();

    let n = this.find(val)

    let node = n;


    if (n == this.nil) {
      this.Steps.push(new VisElement("End", this.clone(), "There is no such element."));

    }
    else {

      this.Steps.push(new VisElement("NextOrPre", n.Copy(), "Finding the pre element of the node " + String(n.value) + "."));

      let p;

      if (n.left != this.nil) {
        p = this.visMaximum(n.left, n);

        this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is the previous element"));
      }
      else {
        this.Steps.push(new VisElement("NextOrPre", n.Copy(), String(n.value) + " doesn't have a left child. To find the prev element we have to look at the parent."));

        let p = n.parent;
        while (p != this.nil && n == p.left) {

          this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is a left child. To find the previous element we have to look at the parent."));
          n = p;
          p = p.parent;

        }

        if (p == this.nil) {
          this.Steps.push(new VisElement("NextOrPre", node.Copy(),  String(val) + " is the minimum value, so there is no prev element."));

        }
        else {
          this.Steps.push(new VisElement("NextOrPre", p.Copy(), String(p.value) + " is the previous element"));
        }


      }

    }

    let newTree = this.clone();

    this.Steps.push(new VisElement("End", this.clone(), ""));

    return {
      "Operation": "PrevOrNext",

      "OldTree": oldTree,

      "List": this.Steps,

      "NewTree": newTree
    };


  }




  visMinimum(node, rootOfSubTree) {

    while (node.left != this.nil) {
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "Finding the smallest node in the right sub-tree."));

      node = node.left;
    }

    this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(),"The smallest value is " + String(node.value) + " in the right sub-tree."));
    return node;
  }

  visMaximum(node, rootOfSubTree) {

    while (node.right != this.nil) {
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "Finding the biggest node in the left sub-tree."));

      node = node.right;
    }

    this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(),"The biggest value is " + String(node.value) + " in the left sub-tree."));
    return node;
  }


  piselSet(x, px, py, xchild) {


    //x.x=x.x-30;
    x.newx = x.newx + px;
    x.newy = x.newy + py;
    if (xchild != this.nil) {
      this.pixelChange(xchild, px, py);
    }



  }

  pixelChange(n, px, py) {

    //n.x=n.x-30;
    n.newx = n.newx + px;
    n.newy = n.newy + py;


    if (n.left != this.nil) {
      this.pixelChange(n.left, px, py);

    }
    if (n.right != this.nil) {
      this.pixelChange(n.right, px, py);

    }
  }

  clone() {

    let newTree = new VisRBTree();
    if (this.root == this.nil)
      return newTree;

    let root = this.root;
    newTree.root = root.Copy(newTree.nil);
    let clone = newTree.root;

    while (root != this.nil) {


      if (root.left != this.nil && clone.left == newTree.nil) {
        clone.left = root.left.Copy(newTree.nil);
        clone.left.parent = clone;
        root = root.left;
        clone = clone.left;
      }
      else if (root.right != this.nil && clone.right == newTree.nil) {
        clone.right = root.right.Copy(newTree.nil);

        clone.right.parent = clone;
        root = root.right;
        clone = clone.right;
      }
      else {
        root = root.parent;
        clone = clone.parent;
      }
    }
    return newTree;
  }


  coordinateEquals() {
    this.coordinateEqualsOrder(this.root, this.nil);
  }

  coordinateEqualsOrder(n, nil) {

    if (n.left != nil) {
      this.coordinateEqualsOrder(n.left, nil);

    }
    if (n.right != nil) {
      this.coordinateEqualsOrder(n.right, nil);

    }
    n.x = n.newx;
    n.y = n.newy;
    n.lambda = 1;


  }


}
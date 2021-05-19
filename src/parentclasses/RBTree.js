

class RBTree {

  nil;
  root;

  constructor() {
    this.nil = new RBNode(-99999, "Black");
    this.nil.left = this.nil;
    this.nil.parent = this.nil;
    this.nil.right = this.nil;
    this.root = this.nil;


  }

  addValue(val) {

    let z = new RBNode(val, "Red")
    let y = this.nil;
    let x = this.root;

    while (x != this.nil) {
      y = x;


      if (z.value < x.value) {

        x = x.left;

      }
      else {

        x = x.right;

      }
    }
    z.parent = y;


    if (y == this.nil) {
      this.root = z;

    }
    else if (z.value < y.value) {

      y.left = z;



    }
    else {

      y.right = z;

    }
    z.left = this.nil;
    z.right = this.nil;
    z.color = "Red";

    this.fixAdd(z);


  }

  find(k) {

    let x = this.root;
    while (x != this.nil && x.value != k) {
      if (k < x.value) {

        x = x.left;
      }
      else {

        x = x.right;
      }

    }

    return x;

  }


  delValue(k) {


    z = this.Find(k);
    if (z == this.nil) {

      return this.nil;

    }


    let y;

    if (z.left == this.nil || z.right == this.nil) {
      y = z;
    }
    else {
      y = this.max(z.left);
    }
    let x;

    if (y.left != this.nil) {
      x = y.left;
    }
    else {
      x = y.right;
    }


    x.parent = y.parent;

    if (y.parent = this.nil) {
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
      z.color = y.color;

    }



    if (y.color == "Black") {
      this.fixDel(x);
    }


    return y;


  }

  fixDel(x) {

    while (x != this.root && x.color == "Black") {
      if (x == x.parent.left) {
        let w = x.parent.right;

        if (w.color == "Red") {

          w.color = "Black";
          x.parent.color = "Red";

          this.leftRound(x.parent);
          w = x.parent.right;


        }
        if (w.left.color == "Black" && w.right.color == "Black") {
          w.color = "Red";
          x = x.parent;

        }
        else {

          if (w.right.color == "Black") {

            w.left.color = "Black";
            w.color = "Red";
            this.rightRound(w);
            w = x.parent.right;

          }

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.right.color = "Black";


          this.leftRound(x.parent);
          x = this.root;

        }

      }
      else {
        let w = x.parent.left;
        if (w.color == "Red") {


          w.color = "Black";
          x.parent.color = "Red";

          this.rightRound(x.parent);
          w = x.parent.left;

        }
        if (w.right.color == "Black" && w.left.color == "Black") {

          w.color = "Red";
          x = x.parent;
        }
        else {

          if (w.left.color == "Black") {

            w.right.color = "Black";
            w.color = "Red";

            this.leftRound(w);
            w = x.parent.left;

          }

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.left.color = "Black";

          x = this.root;


        }

      }

    }

    x.color = "Black";

  }







  max(node) {

    while (node.right != this.nil) {

      node = node.right;
    }


    return node;
  }



  min(node) {

    while (node.left != this.nil) {

      node = node.left;
    }


    return node;
  }







  leftRound(x) {


    let y = x.right;


    x.right = y.left;


    if (y.left != this.nil) y.left.parent = x;

    y.parent = x.parent;

    if (x.parent == this.nil) {
      this.root = y;
    }
    else if (x == x.parent.left) {
      x.parent.left = y;
    }
    else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;

  }
  //?jó?


  rightRound(x) {


    let y = x.left;



    x.left = y.right;



    if (y.right != this.nil) y.right.parent = x;

    y.parent = x.parent;

    if (x.parent == this.nil) {
      this.root = y;
    }
    else if (x == x.parent.left) {
      x.parent.left = y;
    }
    else {
      x.parent.right = y;
    }
    y.right = x;
    x.parent = y;




  }


  fixAdd(z) {


    while (z.parent.color == 'Red') {


      if (z.parent == z.parent.parent.left) {

        let y = z.parent.parent.right;



        if (y.color == "Red") {

          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red"


          z = z.parent.parent;


        }
        else {

          if (z == z.parent.right) {

            z = z.parent;
            this.leftRound(z);

          }


          z.parent.color = "Black";
          z.parent.parent.color = "Red";

          this.rightRound(z.parent.parent);



        }


      }
      else {




        let y = z.parent.parent.left;

        if (y.color == "Red") {



          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red"

          z = z.parent.parent;

        }
        else {

          if (z == z.parent.left) {

            z = z.parent;
            this.rightRound(z);

          }

          z.parent.color = "Black";
          z.parent.parent.color = "Red";

          this.leftRound(z.parent.parent);

        }



      }


    }

    this.root.color = "Black";


  }


}





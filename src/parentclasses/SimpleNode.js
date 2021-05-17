

class SimpleNode {

  value;
  left;
  right;
  parent;



  constructor(val) {

    this.value = val;
    this.left = null;
    this.right = null;
    this.parent = null;



  }



  Copy(nil) {

    var n = new node();


    n.value = this.value;
    n.x = this.x;
    n.y = this.y;



    if (nil != undefined) {

      n.left = nil;
      n.right = nil;
      n.parent = nil;
    }
    else {

      n.left = this.left;;
      n.right = this.right;
      n.parent = this.parent;
    }

    return n;

  }




}
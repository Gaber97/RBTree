
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

        this.Steps.push(new VisElement("Add", x.Copy(), z.Copy(), "Az beszúrandó " + String(z.value) + " elem kisebb mint " + String(x.value) + ". Balra megyünk tovább."));
        if (this.root.value < x.value) this.piselSet(x, this.horizontalchange, 0, x.right);

        z.newx = x.newx - this.horizontalchange;
        z.newy = x.newy + this.verticalchange;
        x = x.left;

      }
      else {

        this.Steps.push(new VisElement("Add", x.Copy(), z.Copy(), "Az beszúrandó " + String(z.value) + " elem nagyobb mint " + String(x.value) + ". Jobb megyünk tovább."));

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

      this.Steps.push(new VisElement("Add", z.Copy(), z.Copy(), "Az beszúrandó " + String(z.value) + " elem a gyöker."));

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

    this.Steps.push(new VisElement("AddAnimation", this.clone(), true, "Az beszúrandó " + String(z.value) + " elem a helyére kerül."));

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
      this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), " " + String(z.value) + " értékű csúcs szülője piros. Helyreigazítás szükséges!"));
      this.coordinateEquals();

      if (z.parent == z.parent.parent.left) {

        let y = z.parent.parent.right;

        if (y.color == "Red") {
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "1. eset : A " + String(z.value) + " értékű csúcs nagyszülőjének jobb gyereke piros."));
          this.coordinateEquals();

          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red"
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "1. eset : A " + String(z.value) + " értékű csúcs szülője Fekete, A nagy szüjő jobb gyerek Fekete, A nagyszülő színe Piros lesz.\n A következő vizsgált csúcs " + String(z.parent.parent.value) + " lesz."));
          this.coordinateEquals();
          z = z.parent.parent;

        }
        else {

          if (z == z.parent.right) {
            this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "2. eset : A " + String(z.value) + " értékű csúcs nagyszülőjének jobb gyereke piros\nA " + String(z.value) + " értékű csúcs szülőjének a jobb gyereke az adott csúcs.\nForgatás következik balra, a 3. esetbe."));
            this.coordinateEquals();

            z = z.parent;
            this.leftRound(z);
          }

          z.parent.color = "Black";
          z.parent.parent.color = "Red";
          this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "3. eset : A " + String(z.value) + " értékű csúcs szülőjének a színe fekete lesz. A nagyszülőjének a színe piros lesz. "));
          this.coordinateEquals();
          this.rightRound(z.parent.parent);

        }

      }
      else {
        let y = z.parent.parent.left;
        if (y.color == "Red") {
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "1. eset : A " + String(z.value) + " értékű csúcs nagyszülőjének bal gyereke piros "));
          this.coordinateEquals();

          z.parent.color = "Black";
          y.color = "Black";
          z.parent.parent.color = "Red"
          this.Steps.push(new VisElement("AddPreaperGrandParent", this.clone(), z.Copy(), z.parent.Copy(), y.Copy(), "1. eset : A " + String(z.value) + " értékű csúcs szülője fekete. A nagyszülöjő jobb gyerek Fekete, A nagyszülő színe Piros lesz"));
          this.coordinateEquals();
          z = z.parent.parent;
        }
        else {

          if (z == z.parent.left) {
            this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "2. eset :A " + String(z.value) + " értékű csúcs nagyszülőjének bal gyereke piros\n A " + String(z.value) + " értékű csúcs szülőjének a bal gyereke az adott csúcs.\nForgatás következik jobbra, a 3 esetbe ."));
            this.coordinateEquals();

            z = z.parent;
            this.rightRound(z);

          }
          z.parent.color = "Black";
          z.parent.parent.color = "Red";
          this.Steps.push(new VisElement("AddPreaper", this.clone(), z.Copy(), z.parent.Copy(), "3. eset : A " + String(z.value) + " értékű csúcs szülőjének a színe fekete lesz. A nagyszülőjének a színe Piros lesz. "));
          this.coordinateEquals();
          this.leftRound(z.parent.parent);
        }

      }

    }
    if (this.root.color == "Red") {
      this.Steps.push(new VisElement("AddPreaper", this.clone(), this.root.Copy(), this.root.Copy(), "A gyöker csúcs színe Fekete lesz. "));
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
        this.Steps.push(new VisElement("Find", x.Copy(), "Az törlendő " + String(k) + " elem kisebb mint " + String(x.value) + " ertékű elem.\nBalra megyünk tovább."));
        //console.log(this.root.value<x.value && change);
        if (this.root.value < x.value && change) this.piselSet(x, -this.horizontalchange, 0, x.right);

        x = x.left;
      }
      else {
        this.Steps.push(new VisElement("Find", x.Copy(), "Az törlendő " + String(k) + " elem nagyobb mint " + String(x.value) + " ertékű elem.\nJobbra megyünk tovább."));

        if (this.root.value > x.value && change) this.piselSet(x, this.horizontalchange, 0, x.left);

        x = x.right;
      }
    }
    if (x == this.nil) {
      this.Steps.push(new VisElement("End", this.clone(), "Az törlendő " + String(k) + " elem nem található"));
    }
    else {
      this.Steps.push(new VisElement("Find", x.Copy(), "Az törlendő " + String(k) + " elem megtalálva"));

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

    if (x != this.nil) {
      this.Steps.push(new VisElement("Del", this.clone(), z.Copy(), y.Copy(), x.Copy(), "A " + String(z.value) + " értékű csúcs törlése.Az " + String(y.value) + " értékének átmásolása a törlendő csúcs helyére.", false));
    }
    else {
      this.Steps.push(new VisElement("DelNil", this.clone(), z.Copy(), y.Copy(), "A " + String(z.value) + " értékű csúcs törlése. A " + String(y.value) + " érékének átmásolása a törelendő csúcs helyére.", false));
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
          this.Steps.push(new VisElement("DelBinding", this.clone(), z.Copy(), x.Copy(), "A " + String(x.value) + " értékű elem átkötése", false));
        }
        else {
          this.Steps.push(new VisElement("DelBindingNil", this.clone(), z.Copy(), "Törlés : " + String(x.value) + " értékű elem átkötése", false));
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
      this.Steps.push(new VisElement("DelBindingNil", this.clone(), x.Copy(), "A " + String(x.value) + " értékű elem átkötése", true));

    }
    else {
      if (z != y) {
        this.Steps.push(new VisElement("DelBindingNil", this.clone(), z.Copy(), "Törlés : " + String(z.value) + " értékű elem átkötése", true));
      }
      else {
        this.Steps.push(new VisElement("End", this.clone(), "Törlés : " + String(z.value) + " értékű elem törlése"));


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
            "1. eset: A " + String(x.value) + " testvére piros."));
          w.color = "Black";
          x.parent.color = "Red";
          this.Steps.push(new VisElement("FixDelCase1Part2", this.clone(), w.Copy(), x.Copy(), x.parent.Copy(),
            "1. eset: A " + String(w.value) + " testvére fekete lesz. A szülő piros. Átforgatjuk a 2,3,4 esetre."));

          this.leftRound(x.parent);
          w = x.parent.right;


        }
        if (w.left.color == "Black" && w.right.color == "Black") {


          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "2. eset: A " + String(w.value) + " testvér fekete és mindkét gyereke fekete. A " + String(w.value) + " piros lesz."));


          w.color = "Red";

          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "2. eset: A következő vizsgálandó elem " + String(w.value) + " szülője lesz."));
          x = x.parent;

        }
        else {

          if (w.right.color == "Black") {

            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
              "3. eset: A " + String(x.value) + " testvére " + String(w.value) + " fekete és bal gyere piros, jobb gyereke fekete."));

            w.left.color = "Black";
            w.color = "Red";
            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
              "3. eset: A " + String(w.value) + " csúcs piros, bal gyereke fekete lesz. Átforgatjuk a 4. esetre "));


            this.rightRound(w);
            w = x.parent.right;

          }
          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
            "4. eset: A " + String(x.value) + " testvére " + String(w.value) + " fekete és jobb gyereke piros"));

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.right.color = "Black";

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.parent.Copy(), w.right.Copy(),
            "4. eset: A " + String(w.value) + " színe " + String(x.parent.value) + "  színe lesz. A "
            + String(x.parent.value) + " a színe fekete lesz. A " + String(w.right.value) + " a színe fekete lesz. Forgatás után a következő elem a gyökér lesz."));

          this.leftRound(x.parent);
          x = this.root;

        }

      }
      else {
        let w = x.parent.left;
        if (w.color == "Red") {
          this.Steps.push(new VisElement("FixDelCase1Part1", this.clone(), x.Copy(), w.Copy(),
            "1. eset: A " + String(x.value) + " testvére piros."));

          w.color = "Black";
          x.parent.color = "Red";
          this.Steps.push(new VisElement("FixDelCase1Part2", this.clone(), x.Copy(), w.Copy(), x.parent.Copy(),
            "1. eset: A " + String(w.value) + " testvére fekete lesz. A szülő piros. Átforgatjuk a 2,3,4 esetre."));
          this.rightRound(x.parent);
          w = x.parent.left;

        }
        if (w.right.color == "Black" && w.left.color == "Black") {
          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "2. eset: A " + String(w.value) + " fekete és mindkét gyereke fekete. A " + String(w.value) + " piros lesz."));

          w.color = "Red";

          this.Steps.push(new VisElement("FixDelCase2", this.clone(), w.Copy(), x.Copy(),
            "2. eset: A következő vizsgálandó elem " + String(w.value) + " szülője lesz."));
          x = x.parent;

        }
        else {

          if (w.left.color == "Black") {

            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
              "3. eset: A " + String(x.value) + " testvére " + String(w.value) + " fekete és jobb gyereke piros, bal gyereke fekete."));


            w.right.color = "Black";
            w.color = "Red";

            this.Steps.push(new VisElement("FixDelCase3", this.clone(), w.Copy(), x.Copy(), w.right.Copy(),
              "3. eset: A " + String(w.value) + " csúcs piros, jobb gyereke fekete lesz. Átforgatjuk a 4. esetre "));
            this.leftRound(w);
            w = x.parent.left;

          }

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.Copy(), w.left.Copy(),
            "4. eset: A " + String(x.value) + " testvére " + String(w.value) + " fekete és bal gyereke piros"));

          w.color = x.parent.color;
          x.parent.color = "Black";
          w.left.color = "Black";

          this.Steps.push(new VisElement("FixDelCase4", this.clone(), w.Copy(), x.parent.Copy(), w.left.Copy(),
            "4. eset: A " + String(w.value) + " színe " + String(x.parent.value) + "  színe lesz. A "
            + String(x.parent.value) + " a színe fekete lesz. A " + String(w.left.value) + " a színe fekete lesz. Forgatás után a következő elem a gyökér lesz."));


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
        this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legkisebb elem keresése a jobb részfában."));
        if (this.root.value < node.value) this.piselSet(node, -this.horizontalchange, 0, node.right);
        node = node.left;
      }
      if (this.root.value > node.value) this.piselSet(node, this.horizontalchange, 0, node.left)
  
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legkisebb elem a " + String(node.value) + " a jobb részfában."));
      return node;
  }

  visFind(k) {
    let oldTree = this.clone();

    this.Steps = [];
    let x = this.root;
    while (x != this.nil && x.value != k) {
      if (k < x.value) {
        this.Steps.push(new VisElement("Find", x.Copy(), "Find the " + String(k) + " key. The " + String(k) + " key is lesser than " + String(x.value) + " key.\nLooking the left Subtree."));

        x = x.left;
      }
      else {
        this.Steps.push(new VisElement("Find", x.Copy(), "Find the " + String(k) + " key. The " + String(k) + " key is greater than " + String(x.value) + " key.\nLooking the right Subtree."));

        x = x.right;
      }
    }
    if (x == this.nil) {
      this.Steps.push(new VisElement("End", this.clone(), "The " + String(k) + " key is not found."));
    }
    else {
      this.Steps.push(new VisElement("Find", x.Copy(), "The " + String(k) + " key is found."));
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
    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Forgatás Balra: A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem forgatása."));
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

    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Forgatás Balra: A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem forgatása.\n A gyerekek és szülők cseréje "));
    this.coordinateEquals();


    this.piselSet(y, 0, -this.verticalchange, y.right);

    this.piselSet(x, 0, this.verticalchange, x.left);

    this.Steps.push(new VisElement("RotationLeft", this.clone(), x.Copy(), y.Copy(), "Forgatás Balra: A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem a helyére kerül"));
    this.coordinateEquals();


  }


  rightRound(x) {

    let y = x.left;

    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Forgatás Jobbra : A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem forgatása."));
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


    this.Steps.push(new VisElement("RotationSelectAndChange", this.clone(), x.Copy(), y.Copy(), "Forgatás Jobbra :A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem forgatása.\nA gyerekek és szülők cseréje,"));
    this.coordinateEquals();

    this.piselSet(y, 0, -this.verticalchange, y.left);
    this.piselSet(x, 0, this.verticalchange, x.right);

    this.Steps.push(new VisElement("RotationRight", this.clone(), x.Copy(), y.Copy(), "Forgatás Jobbra :A " + String(x.value) + " értékű és a " + String(y.value) + " értékű elem a helyére kerül"));
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
      this.Steps.push(new VisElement("End", this.clone(), "Nincs ilyen elem."));

    }
    else {

      this.Steps.push(new VisElement("NextOrPre", n.Copy(), "A " + String(n.value) + " a következő elemének megkeresése."));

      let p;

      if (n.right != this.nil) {
        p = this.visMinimum(n.right, n);

        this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " a következő elem."));
      }
      else {
        this.Steps.push(new VisElement("NextOrPre", n.Copy(), "A " + String(n.value) + " nincs jobb gyereke. Felfelé keresük a következő elemet."));

        p = n.parent;
        while (p != this.nil && n == p.right) {

          this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " jobb gyereke. Felfelé keresük a következő elemet."));
          n = p;
          p = p.parent;

        }


        if (p == this.nil) {
          this.Steps.push(new VisElement("NextOrPre", node.Copy(), "A " + String(val) + " a legnagyobb elem, nincs következő eleme."));

        }
        else {
          this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " a következő elem."));
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
      this.Steps.push(new VisElement("End", this.clone(), "Nincs ilyen elem."));

    }
    else {

      this.Steps.push(new VisElement("NextOrPre", n.Copy(), "A " + String(n.value) + " a előző elemének megkeresése."));

      let p;

      if (n.left != this.nil) {
        p = this.visMaximum(n.left, n);

        this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " a előző elem."));
      }
      else {
        this.Steps.push(new VisElement("NextOrPre", n.Copy(), "A " + String(n.value) + " nincs bal gyereke. Felfelé keresük a előző elemet."));

        let p = n.parent;
        while (p != this.nil && n == p.left) {

          this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " bal gyereke. Felfelé keresük a előző elemet."));
          n = p;
          p = p.parent;

        }

        if (p == this.nil) {
          this.Steps.push(new VisElement("NextOrPre", node.Copy(), "A " + String(val) + " a legkisebb elem, nincs előző eleme."));

        }
        else {
          this.Steps.push(new VisElement("NextOrPre", p.Copy(), "A " + String(p.value) + " a előző elem."));
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
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legkisebb elem keresése a jobb részfában."));

      node = node.left;
    }

    this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legkisebb elem a " + String(node.value) + " a jobb részfában."));
    return node;
  }

  visMaximum(node, rootOfSubTree) {

    while (node.right != this.nil) {
      this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legnagyobb elem keresése a bal részfában."));

      node = node.right;
    }

    this.Steps.push(new VisElement("FindMin", node.Copy(), rootOfSubTree.Copy(), "A legnagyobb elem a " + String(node.value) + " a bal részfában."));
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
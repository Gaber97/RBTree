//tester



class Tester  {


    constructor(visualizer){
        this.visualizer=visualizer;
        
        
    }
    
    findTest(num,val){

        for(let i=0;i<num;i++){
    
            this.visualizer.operationInTree(val,"Find");
        }
    
    }
    
    everythingsOk() {


        this.visualizer.clear();
        for (let i = 0; i < 20; i++) {
            this.visualizer.operationInTree(random(1, 10000), "Add");
            this.visualizer.stepForwardSkip();
        }

        for (let i = 0; i < 1000; i++) {


            //console.log(this.visualizer.tree.root.value)
            this.visualizer.operationInTree(this.visualizer.tree.root.value, "Del");
            this.visualizer.stepForwardSkip();
            this.visualizer.operationInTree(random(1, 10000), "Add");
            this.visualizer.stepForwardSkip();

            //console.log(this.isRBTreeBlackHeightValid(this.visualizer.tree.root));
            console.log(this.isRedBlackTree(this.visualizer.tree))

        }



        return 0;
    }

    actualIsOk() {
        console.log(this.isRedBlackTree(this.visualizer.tree))
    }

    isRedBlackTree(tree) {

        let isRBTree= true;


        isRBTree=isRBTree || tree.root.color=="Black";
        isRBTree=isRBTree || tree.nil.color=="Black";
        isRBTree=isRBTree || this.isRBTreeBlackHeightValid(tree);
        isRBTree=isRBTree || this.isRBTreeRedHaveBlackChildsValid(tree);
        isRBTree=isRBTree || this.computeRBTreeNodesRedOrBlackValid(tree);


    
        return isRBTree;

    }

    isRBTreeBlackHeightValid(tree) {
        return computeBlackHeight(tree.root, tree.nil) != -1;
    }


    computeBlackHeight(currNode, nill) {
        // For an empty subtree the answer is obviouss
        if (currNode == nill) {
            return 0;
        }

        // Computes the height for the left and right child recursively
        let leftHeight = computeBlackHeight(currNode.left, nill);
        let rightHeight = computeBlackHeight(currNode.right, nill);
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

    isRBTreeBlackHeightValid(tree)
    {
        return computeBlackHeight(tree.root,tree.nil) != -1;
    } 
    
    
    computeBlackHeight(currNode,nill) 
    {
        if (currNode == nill){
            return 0; 
        }
        let leftHeight = computeBlackHeight(currNode.left,nill);
        let rightHeight = computeBlackHeight(currNode.right,nill);
        let add = currNode.color == "Black" ? 1 : 0;
        
        if (leftHeight == -1 || rightHeight == -1 || leftHeight != rightHeight){
            return -1; 
        }
          
        else{
            return leftHeight + add;
        }
           
    }


    shuffle(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
        return array;
      }
      
      
      
      isRBTreeGrandTest(){
  
           let array=[];
      
          for (let index = 0; index < 100; index++) {
              
                  let tree=new VisRBTree();
              
                  for (var a=[],i=0;i<100;++i) array[i]=i;
              
                  array=this.shuffle(array);
                  
              
                  for (let index = 0; index < array.length; index++) {
                      const element = array[index];
                      
                      tree.addValue(element);
              
  
                      
                  }
              
              
                  array=shuffle(array);
  
              
                  for (let index = 0; index < array.length/2; index++) {
                      const element = array[index];
                      
                      tree.delValue(element);
  
              
                  }
  
  
                  console.log(this.isRedBlackTree(tree))
              
          }
      }
  



}














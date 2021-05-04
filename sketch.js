
function setup(){
    treeUI = new TreeUI();


}

function draw(){

  treeUI.drawTree()


}

function windowResized() {
  treeUI.Resized();

}

//tester

function randomTree(num){

    num=parseInt(num)

    if(isNaN(num)){
        
          return 0;
    }
    if(num<1 || num >30){
        
        return 0;
  }

    for(let i=0;i<num;i++){
        console.log(i)
        Visualazer.operationInTree(random(1,1000),"Add");
    }


}
function lessTree(num){


    for(let i=0;i<num;i++){


        Visualazer.operationInTree(num*2-2*i,"Add");
    }


}


function lessTreeDel(num){


    for(let i=0;i<num;i++){


        Visualazer.operationInTree(num*2-2*i,"Del");
    }


}


function GreaterTree(num){


    for(let i=0;i<num;i++){

        Visualazer.operationInTree(num+i,"Add");
    }


}


function FindTest(num,val){


    for(let i=0;i<num;i++){

        Visualazer.operationInTree(val,"Find");
    }


}

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}



function IsRBTree(){

    for (let index = 0; index < 100; index++) {
        
            let tree=new VisaulRBTree();
        
            for (var a=[],i=0;i<100;++i) a[i]=i;
        
            array=shuffle(a);
            
        
            valid=true;
        
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                
                tree.addValue(element);
        
                //console.log(isRBTreeBlackHeightValid(tree))
                //valid=valid&&isRBTreeBlackHeightValid(tree);
                
            }
        
            
            console.log(isRBTreeBlackHeightValid(tree))
            array=shuffle(array);
        
            for (let index = 0; index < array.length/2; index++) {
                const element = array[index];
                
                tree.delValue(element);
        
                //console.log(isRBTreeBlackHeightValid(tree));
                //valid=valid&&isRBTreeBlackHeightValid(tree);
        
            }
            console.log(isRBTreeBlackHeightValid(tree));
        const element = array[index];
        
    }
}

function isRBTreeBlackHeightValid(tree)
{
    return computeBlackHeight(tree.root,tree.nil) != -1;
} 


function computeBlackHeight(currNode,nill) 
{
    // For an empty subtree the answer is obviouss
    if (currNode == nill){
        return 0; 
    }
        
    // Computes the height for the left and right child recursively
    let leftHeight = computeBlackHeight(currNode.left,nill);
    let rightHeight = computeBlackHeight(currNode.right,nill);
    let add = currNode.color == "Black" ? 1 : 0;
    
    // The current subtree is not a red black tree if and only if
    // one or more of current node's children is a root of an invalid tree
    // or they contain different number of black nodes on a path to a null node.
    if (leftHeight == -1 || rightHeight == -1 || leftHeight != rightHeight){
        return -1; 
    }
      
    else{
        return leftHeight + add;
    }
       
}
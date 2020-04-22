
class Node{

  constructor(val,color){
    this.value = val;
    this.left = null;
    this.right= null;
    this.parent= null;
    this.x=400;
    this.y=400;
    this.newx=this.x;
    this.newy=this.y;
    this.lambda=1;
    this.color=color;
    this.drawx=this.x;
    this.drawy=this.y;
    
  }


  
 
  Copy(node,nil){

    this.value = node.value;
   
    this.x=node.x;
    this.y=node.y;
    this.newx=node.newx;
    this.newy=node.newy;
    this.lambda=node.lambda;
    this.color=node.color;
    this.drawx=node.x;
    this.drawy=node.y;
    this.left = nil;
    this.right= nil;
    this.parent= nil;

  }



 
}
 

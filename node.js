
class Node{

  constructor(val,color){
    this.value = val;
    this.left = null;
    this.right= null;
    this.parent= null;
    this.x=60;
    this.y=90;
    this.newx=this.x;
    this.newy=this.y;
    this.lambda=1;
    this.color=color;
    this.drawx;
    this.drawy;
    
  }


  
 
  Copy(node,nil){

    this.value = node.value;
   
    this.x=node.x;
    this.y=node.y;
    this.newx=node.newx;
    this.newy=node.newy;
    this.lambda=node.lambda;
    this.color=node.color;
    this.drawx=node.drawx;
    this.drawy=node.drawy;
    this.left = nil;
    this.right= nil;
    this.parent= nil;

  }



 
}
 


class VisNode extends RBNode {

  x;
  y;
  newx;
  newy;
  lambda;
  drawx;
  drawy;


  constructor(val,color){

    super(val,color);
    this.x=400;
    this.y=900;
    this.newx=this.x;
    this.newy=this.y;
    //change when move
    this.lambda=1;
    
    this.drawx=this.x;
    this.drawy=this.y;


    //just visual element
    this.dir=1;
    this.round=50;
    
  }


  
 
  Copy(nil){

    var n = new VisNode();


    n.value=this.value; 
    n.x=this.x;
    n.y=this.y;
    n.newx=this.newx;
    n.newy=this.newy;
    n.lambda=this.lambda;
    n.color=this.color;

  
    n.drawx=this.x;
    n.drawy=this.y;
    
   
    if(nil != undefined){
    
      n.left = nil;
      n.right= nil;
      n.parent= nil;
    }
    else{
     
      n.left = this.left;;
      n.right= this.right;
      n.parent= this.parent;
    }

    return n;

  }



 
}
 

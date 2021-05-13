
class RBNode{

    value;
    left;
    right;
    parent;
    color=color;


    constructor(val,color){
      this.value = val;
      this.left = null;
      this.right= null;
      this.parent= null;
      this.color=color;
 
      
    }
  
    Copy(nil){
  
      let n = new node();

      n.value=this.value; 
      n.x=this.x;
      n.y=this.y;
      n.color=this.color;

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
   
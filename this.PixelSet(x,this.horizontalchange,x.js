this.PixelSet(x,this.horizontalchange,x.right);



Tree.prototype.PixelSet= function(x,px,xchild){
  
    if(this.root!=x){
      //x.x=x.x-30;
      x.newx=x.newx-px;     
      if(xchild!=this.nil){      
        this.PixelChange(child,px);
      }
    }
    
    
  }
  
  Tree.prototype.PixelSet= function(x,px,xchild){
 
    if(this.root!=x){
      //x.x=x.x-30;
      x.newx=x.newx+px;     
      if(xchild!=this.nil){      
        this.PixelChange(xchild,px);
      }
    }
    
    
  }
  
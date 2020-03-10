

class Tree{

  constructor(){
    this.nil=new Node(-99999,0,0,"Black");
    this.root=this.nil;
    this.verticalchange=40;
    this.horizontalchange=40;

  }
  
}



Tree.prototype.addValue= function(val){
    val=int(val);
  
    var z = new Node(val)
    var y=this.nil;
    var x= this.root;

    //ha az elem megtalálható akkor nem szúrjuk be újra
    
    if(this.Find(x,val)){
      return [];
    }
    

    while(x!=this.nil){
      y=x;
      if(z.value<x.value){
        if(this.root.value<x.value){
          if(this.root!=x){
            //x.x=x.x+30;



            x.newx=x.newx+ this.horizontalchange;
            
            
            if(x.right!=this.nil){
               
                this.PixelChange(x.right, this.horizontalchange);
              }
          }
        
        }

        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
       
        if(this.root.value>x.value){
          if(this.root!=x){
            //x.x=x.x-30;
            x.newx=x.newx-this.horizontalchange;
            
          
            if(x.left!=this.nil){
              
              this.PixelChange(x.left,-this.horizontalchange);
            }
          }
          
        }
        //z.x=x.x+30;
        //z.y=x.y+40;
        z.newx=x.newx+ this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.right;
      
      }
    }
    z.parent=y;
    
    if(y==this.nil){
      this.root=z;
      //z.x=width/2;
      //z.y=40;
      z.x=width/2;
      z.y=this.verticalchange*2;

      z.newx=width/2;
      z.newy=this.verticalchange;

    }
    else if(z.value<y.value){
      y.left=z;
      z.x=y.x-this.horizontalchange*2;
      z.y=y.y+this.verticalchange*2;

    }
    else{
      y.right=z;
      z.x=y.x+this.horizontalchange*2;
      z.y=y.y+this.verticalchange*2;
    }
    z.left=this.nil;
    z.right=this.nil;
    z.color="Piros";



}

//nem a amegfelelő

Tree.prototype.Find= function(t,k){

  if(t==this.nil){  
    return false;
  }
  else
  {
    if(k==t.value){

      return true;
    }
    else if(k<t.value){
     
      this.Find(t.left,k);
    }
    else{
      
      this.Find(t.right,k);
    }

  }
 
}

Tree.prototype.Find= function(t,k){

  var x=t;
  while(x!=this.nil){
 
        if(k==x.value){
          return true;
        }
        else if(k<x.value){
        
          x=x.left;
        }
        else{
          
          x=x.right;
        }

  }

  return false;
 
}



Tree.prototype.PixelChange= function(n,px){

  
  //n.x=n.x-30;
  n.newx=n.newx+px;
  
 
  if(n.left!=this.nil){
      this.PixelChange(n.left);
     
  }

  if(n.right!=this.nil){
      this.PixelChange(n.right);
     
  }

}



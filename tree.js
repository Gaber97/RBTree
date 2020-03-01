

class Tree{

  constructor(){
    this.nil=new Node(-99999,0,0,"Black");
    this.root=this.nil;
    

  }
  


}



Tree.prototype.addValue= function(val){
    
    var z = new Node(val)
    var y=this.nil;
    var x= this.root;
    while(x!=this.nil){
      y=x;
      if(z.value<x.value){
        if(this.root.value<x.value){
          if(this.root!=x){
            //x.x=x.x+30;



            x.newx=x.newx+30;
            
            
            if(x.right!=this.nil){
               
                this.PixelUp(x.right);
              }
          }
        
        }

        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-30;
        z.newy=x.newy+40;
        x=x.left;
    
      }
      else{
        if(z.value==x.value){
          return 0;
        }

        if(this.root.value>x.value){
          if(this.root!=x){
            //x.x=x.x-30;
            x.newx=x.newx-30;
            
          
            if(x.left!=this.nil){
              
              this.PixelDown(x.left);
            }
          }
          
        }
        //z.x=x.x+30;
        //z.y=x.y+40;
        z.newx=x.newx+30;
        z.newy=x.newy+40;
        x=x.right;
      
      }
    }
    z.parent=y;
    if(y==this.nil){
      this.root=z;
      //z.x=width/2;
      //z.y=40;
      z.newx=width/2;
      z.newy=40;

    }
    else if(z.value<y.value){
      y.left=z;
    }
    else{
      y.right=z;
    }
    z.left=this.nil;
    z.right=this.nil;
    z.color="Piros";



}


Tree.prototype.PixelUp= function(n){

  
  //n.x=n.x+30;
  n.newx=n.newx+30;
  
 

  if(n.left!=this.nil){
      this.PixelUp(n.left);
     
  }

  if(n.right!=this.nil){
      this.PixelUp(n.right);
     
  }

 



}





Tree.prototype.PixelDown= function(n){

  
  //n.x=n.x-30;
  n.newx=n.newx-30;
  
 

  if(n.left!=this.nil){
      this.PixelDown(n.left);
     
  }

  if(n.right!=this.nil){
      this.PixelDown(n.right);
     
  }

 



}





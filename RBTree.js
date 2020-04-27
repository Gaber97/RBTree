

class RBTree{

    nil;
    root;

    constructor(){
      this.nil=new RBNode(-99999,"Black");
      this.nil.left=this.nil;
      this.nil.parent=this.nil;
      this.nil.right=this.nil;


    }

  
  
  
  
  addValue(val){
  
  
  
    
      var z = new PoorNode(val,"Red")
      var y=this.nil;
      var x=this.root;
  
   
      
      while(x!=this.nil){
        y=x;
        
  
        if(z.value<x.value){
  
          x=x.left;
      
        }
        else{
         
          x=x.right;
        
        }
      }
      z.parent=y;
  
      
      if(y==this.nil){
        this.root=z;
     
      }
      else if(z.value<y.value){
  
        y.left=z;
        
       
  
      }
      else{
  
        y.right=z;
     
      }
      z.left=this.nil;
      z.right=this.nil;
      z.color="Red";
  

  }
  
  //megfelelő
  
  
  Find(k){
    
    var x=this.root;
    while(x!=this.nil && x.value!=k){
          if(k<x.value){
          
            x=x.left;
          }
          else{
            
            x=x.right;
          }
  
    }
  
    return x;
   
  }
  
  
 
  
    delValue(k){
  
    
    z=this.Find(k);
    if(z==this.nil)
    {
  
      return this.nil;
  
    }
  
  
    var y;
  
    if(z.left ==this.nil ||z.right ==this.nil ){
      y=z;
    }
    else{
      y=this.max(z.left);
    }
    var x;
  
    if(y.left!=this.nil){
      x=y.left;
    }
    else{
      x=y.right;
    }
  
  
    x.parent=y.parent;
  
    if(y.parent=this.nil){
      this.root=x;
    }
    else if(y==y.parent.left){
      y.parent.left=x;
    }
    else{
      y.parent.right=x;
    }
  
   
  
    if( y!=z ){
      z.value=y.value;
      z.color=y.color;
  
    }
  
   
  
    if(y.color=="Black"){
      //javít
    }
   
  
    return y;
  
  
  }
  
  
    max(node){
  
      while(node.right != this.nil){
      
        node = node.right;
      }
  
     
      return node;
    }
  
  
 
  
  
  
  
  
    LeftRound(x){
    
  
    var y=x.right;
  
 
    x.right=y.left;
  
    
    if(y.left!=this.nil) y.left.parent=x;
    
    y.parent=x.parent;
  
    if(x.parent==this.nil){
      this.root=y;
    }
    else if(x==x.parent.left){
      x.parent.left=y;
    }
    else{
      x.parent.right=y;
    }
    y.left=x;
    x.parent=y;
  
    }
  //?jó?
  
  
    RightRound(x){
   
  
    y=x.left;
  
  
   
    x.left=y.right;
    
  
  
    if(y.left!=this.nil) y.right.parent=x;
    
    y.parent=x.parent;
  
    if(x.parent==this.nil){
      this.root=y;
    }
    else if(x==x.parent.left){
      x.parent.left=y;
    }
    else{
      x.parent.right=y;
    }
    y.right=x;
    x.parent=y;
  
  
  
  
  }
  
  
    RepairAdd(z){
  
   
    while(z.parent.color=='Red'){
  
     
      if(z.parent==z.parent.parent.left){
  
        var y=z.parent.parent.right;
  
  
  
        if(y.color=="Red"){
        
          z.parent.color="Black";
          y.color="Black";
          z.parent.parent.color="Red"
  
         
          z=z.parent.parent;
  
  
        }
        else{
           
          if(z==z.parent.right){
       
            z=z.parent;
            this.LeftRound(z);
  
          }
  
      
          z.parent.color="Black";
          z.parent.parent.color="Red";
          
          this.RightRound(z.parent.parent);
  
          
  
        }
   
  
    }
    else{
  
  
      
  
      var y=z.parent.parent.left;
  
        if(y.color=="Red"){
         
  
  
          z.parent.color="Black";
          y.color="Black";
          z.parent.parent.color="Red"
  
          z=z.parent.parent;
  
        }
        else{
         
          if(z==z.parent.left){
    
            z=z.parent;
            this.RightRound(z);
          
          }
  
          z.parent.color="Black";
          z.parent.parent.color="Red";
         
          this.LeftRound(z.parent.parent);
  
        }
  
      
  
    }
  
   
  }
 
  this.root.color="Black";
  

  }
  
  
}
  
  
  

  
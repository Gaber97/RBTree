

class Tree{

  constructor(){
    this.nil=new Node(-99999,"Black");
    this.nil.left=this.nil;
    this.nil.parent=this.nil;
    this.nil.right=this.nil;
    this.root=this.nil;
    this.verticalchange=40;
    this.horizontalchange=40;
    this.Steps=[];

  }
  
}



Tree.prototype.addValue= function(val){



  
    var z = new Node(val,"Red")
    var y=this.nil;
    var x=this.root;

    //ha az elem megtalálható akkor nem szúrjuk be újra
    
    if(this.Find(x,val)){
      return [];
    }

    this.Steps=[];

    var oldTree=this.Clone();

    
    while(x!=this.nil){
      y=x;
      var b=new Node;

      if(z.value<x.value){

        b.Copy(x);
        this.Steps.push(new visElement("Add",b,z,"Az beszurandó "+String(z.value)+" elem kisebb mint "+String(x.value)));

        if(this.root.value<x.value && this.x!=x ) this.PixelSet(x,this.horizontalchange,0,x.right);
        
        
        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
        b.Copy(x);
        
        this.Steps.push(new visElement("Add",b,z,"Az beszurandó "+String(z.value)+" elem nagyobb mint "+String(x.value)));
       
        if(this.root.value>x.value && this.x!=x ) this.PixelSet(x,-this.horizontalchange,0,x.left);
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
      z.x=width/2-40;
      z.y=this.verticalchange;


      var b=new Node;
      b.Copy(z);
      
      this.Steps.push(new visElement("Add",b,b,"Az beszurandó "+String(z.value)+" elem a gyöker"));
      

      z.newx=width/2;
      z.newy=this.verticalchange;

     

    }
    else if(z.value<y.value){

      y.left=z;
      z.x=y.x-this.horizontalchange;
      z.y=y.y;

    }
    else{

      y.right=z;
      z.x=y.x+this.horizontalchange;
      z.y=y.y;
    }
    z.left=this.nil;
    z.right=this.nil;
    z.color="Red";

    this.Steps.push(new visElement("Animation",z,z,"Az beszurandó "+String(z.value)+" elem a helyére kerül"));

    



    this.RepaerAdd(z);


    var newTree=this.Clone();

    //a fa kordínátáinak át állítása az újra
    this.CordinatEquals(this.root,this.nil);
    
    


    return {
      
      "OldTree": oldTree,
      
      "List":this.Steps,
      
      "NewTree": newTree
      };
}

//megfelelő


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

Tree.prototype.LeftRound= function(x){
  

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

  if(y==this.root){
    this.PixelChange(y,-(y.x-x.x),0);
  }

  this.PixelSet(y,0,-this.verticalchange,y.right);
  
  this.PixelSet(x,0,this.verticalchange,x.left);




}

//?jó?


Tree.prototype.RightRound= function(x){
 

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

  if(y==this.root){
    this.PixelChange(y,(x.x-y.x),0);
  }


  this.PixelSet(y,0,-this.verticalchange,y.left);
  this.PixelSet(x,0,this.verticalchange,x.right);



}


Tree.prototype.RepaerAdd= function(z){

 
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
        console.log("nagyszuloball");
        if(z==z.parent.left){
          console.log("Forgat");
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








Tree.prototype.PixelSet= function(x,px,py,xchild){
  
 
    //x.x=x.x-30;

    x.newx=x.newx+px; 
    x.newy=x.newy+py;  
    if(xchild!=this.nil){      
      this.PixelChange(xchild,px,py);
    }
  
  
 

}


Tree.prototype.PixelChange= function(n,px,py){

  
  //n.x=n.x-30;
  n.newx=n.newx+px;
  n.newy=n.newy+py;
  
 
  if(n.left!=this.nil){
      this.PixelChange(n.left,px,py);
     
  }

  if(n.right!=this.nil){
      this.PixelChange(n.right,px,py);
     
  }

}




Tree.prototype.Clone=function()
{

    newTree= new Tree();

    if (this.root == this.nil)
        return newTree;


    var root=this.root;
    newTree.root = new Node();
    newTree.root.Copy(root,newTree.nil);
    clone=newTree.root;
    
  
    while (root != this.nil)
    {
      
        
        if (root.left != this.nil && clone.left == newTree.nil)
        {
            clone.left = new Node();
        
            clone.left.Copy(root.left,newTree.nil);
            clone.left.parent=clone;

            root = root.left;
            clone = clone.left;
        }
        else if (root.right != this.nil && clone.right == newTree.nil)
        {
            clone.right = new Node();

            clone.right.Copy(root.right,newTree.nil);
            clone.right.parent=clone;

            root = root.right;
            clone = clone.right;
        }
        else
        {
            root =  root.parent;
            clone = clone.parent;
        }
    }

    return newTree;
}




  Tree.prototype.CordinatEquals=function(n,nil){
      
    if(n.left!= nil ){
        this.CordinatEquals(n.left,nil);
    
    }

    if(n.right!=nil){
        this.CordinatEquals(n.right,nil);
    
    }

    
    n.x=n.newx;
    n.y=n.newy;
    n.lambda=1;
    



}
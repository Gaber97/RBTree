

class Tree{

  constructor(){
    this.nil=new Node(-99999,0,0,"Black");
    this.root=this.nil;
    this.verticalchange=50;
    this.horizontalchange=50;

  }
  
}



Tree.prototype.addValue= function(val){


    val=parseInt(val)

    if(isNaN(val)){
      console.log(NaN);
      return [];
    }


  
    var z = new Node(val)
    var y=this.nil;
    var x=this.root;

    //ha az elem megtalálható akkor nem szúrjuk be újra
    
    if(this.Find(x,val)){
      return [];
    }

    Steps=[];

    oldTree=this.Clone();

    
    while(x!=this.nil){
      y=x;
      if(z.value<x.value){


        Steps.push(new visElement("Add",x.x,x.y,x.value,z,"Az beszurandó "+String(z.value)+" elem kisebb mint "+String(x.value)));

        if(this.root.value<x.value) this.PixelSet(x,this.horizontalchange,x.right);
        
        
        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
        
        a=new visElement("Add",x.x,x.y,x.value,z,"Az beszurandó "+String(z.value)+" elem nagyobb mint "+String(x.value));
        Steps.push(a);
       
        if(this.root.value>x.value) this.PixelSet(x,-this.horizontalchange,x.left);
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

      a=new visElement("Add",z.x,z.y,z.value,z,"Az beszurandó "+String(z.value)+" elem a gyöker");
      Steps.push(a);
      

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
    z.color="Piros";

    Steps.push(new visElement("Animation"));

    newTree=this.Clone();

    //a fa kordínátáinak át állítása az újra
    this.CordinatEquals(this.root,this.nil);
    
    


    return {
      
      "OldTree": oldTree,
      
      "List":Steps,
      
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


Tree.prototype.PixelSet= function(x,px,xchild){
  
  if(this.root!=x){
    //x.x=x.x-30;

    x.newx=x.newx+px;     
    if(xchild!=this.nil){      
      this.PixelChange(xchild,px);
    }
  }
  
 

}


Tree.prototype.PixelChange= function(n,px){

  
  //n.x=n.x-30;
  n.newx=n.newx+px;
  
 
  if(n.left!=this.nil){
      this.PixelChange(n.left,px);
     
  }

  if(n.right!=this.nil){
      this.PixelChange(n.right,px);
     
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
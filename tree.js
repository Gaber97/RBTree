

class Tree{

  constructor(){
    this.nil=new Node(-99999,0,0,"Black");
    this.root=this.nil;
    this.verticalchange=50;
    this.horizontalchange=50;

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

    Steps=[];
    
    while(x!=this.nil){
      y=x;
      if(z.value<x.value){


        Steps.push(new visElement("Add",x,"Az beszurandó "+String(z.value)+" elem kisebb mint "+String(x.value)));

        if(this.root.value<x.value) this.PixelSet(x,this.horizontalchange,x.right);
        
        
        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
        
        a=new visElement("Add",x,"Az beszurandó "+String(z.value)+" elem nagyobb mint "+String(x.value));
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
      z.x=width/2;
      z.y=this.verticalchange*2;

      z.newx=width/2;
      z.newy=this.verticalchange;

      a=new visElement("Add",x,"Az beszurandó"+String(z.value)+"elem a gyökér");
      Steps.push(a);

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


    return Steps;
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



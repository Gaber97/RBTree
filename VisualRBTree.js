
class VisaulRBTree extends RBTree{
  
  Steps;
  verticalchange;
  horizontalchange;

  constructor(){
    super();
    this.nil=new VisNode("Nil","Black");
    this.nil.left=this.nil;
    this.nil.parent=this.nil;
    this.nil.right=this.nil;
    this.root=this.nil;
    this.verticalchange=40;
    this.horizontalchange=40;
    this.Steps=[];
  }
addValue(val){
    let z = new VisNode(val,"Red");
    z.parent=this.nil;
    let y=this.nil;
    let x=this.root;
    //ha az elem megtalálható akkor nem szúrjuk be újra
    
    if(this.Find(val)!= this.nil){
      return [];
    }
    this.Steps=[];
    let oldTree=this.Clone();
    
    while(x!=this.nil){
      y=x;
    
      if(z.value<x.value){
        
        this.Steps.push(new visElement("Add",x.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem kisebb mint "+String(x.value)));
        if(this.root.value<x.value  ) this.PixelSet(x,this.horizontalchange,0,x.right);
        
        
        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
       
        this.Steps.push(new visElement("Add",x.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem nagyobb mint "+String(x.value)));
       
        if(this.root.value>x.value ) this.PixelSet(x,-this.horizontalchange,0,x.left);
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
      z.x=this.horizontalchange+40;
      z.y=this.verticalchange;

      this.Steps.push(new visElement("Add",z.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem a gyöker"));
      
      z.newx=2*this.horizontalchange+40;
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

    if(this.min(this.root).x<165){
      this.PixelChange(this.root, this.horizontalchange, 0);
    }
    
    this.Steps.push(new visElement("AddAnimation",this.Clone(),true,"Az beszurandó "+String(z.value)+" elem a helyére kerül"));
    this.CordinatEquals();
    

    this.RepaerAdd(z);

    let newTree=this.Clone();
    this.Steps.push(new visElement("End",this.Clone(),""));
    //a fa kordínátáinak át állítása az újra
    this.CordinatEquals();
    
    return {
      "Operation" : "Add",
      
      "OldTree": oldTree,
      
      "List":this.Steps,
      
      "NewTree": newTree
      };
}
//megfelelő

findVis(k){
  let oldTree=this.Clone();

  this.Steps=[];
  let x=this.root;
  while(x!=this.nil && x.value!=k){
        if(k<x.value){
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem kisebb mint "+String(x.value) + " ertékű elem . Balra megyünk tovább."));
        
          x=x.left;
        }
        else{
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem nagyobb mint "+String(x.value) + " ertékű elem . Jobbra megyünk tovább."));

          x=x.right;
        }
  }
  if(x==this.nil){
    this.Steps.push(new visElement("End",this.Clone(),"Az keresendő "+String(k)+" elem nem található"));
  }
  else{
    this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem megtalálva"));
  }
  this.Steps.push(new visElement("End",this.Clone(),""));
  
  let newTree=this.Clone();

  return {
    "Operation" : "Find",
    
    "OldTree": oldTree,
    
    "List":this.Steps,
    
    "NewTree": newTree
    };
 
}
findVisDel(k){
  let change=false;
  if(this.Find(k)!=this.nil) change=true;
  console.log(change);
  let x=this.root;
  while(x!=this.nil && x.value!=k){
        if(k<x.value){
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem kisebb mint "+String(x.value) + "ertékű elem.\nBalra megyünk tovább."));
          console.log(this.root.value<x.value && change);
          if(this.root.value<x.value && change ) this.PixelSet(x,-this.horizontalchange,0,x.right);
        
          x=x.left;
        }
        else{
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem nagyobb mint "+String(x.value) + " ertékű elem.\nJobbra megyünk tovább."));
         
          if(this.root.value>x.value && change ) this.PixelSet(x,this.horizontalchange,0,x.left);
          
          x=x.right;
        }
  }
  if(x==this.nil){
    this.Steps.push(new visElement("End",this.Clone(),"Az keresendő "+String(k)+" elem nem található"));
  }
  else{
    this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem megtalálva"));
  
  }

  return x;
}

delValue(k){
  this.Steps=[];
  let oldTree=this.Clone();
  
  let z=this.findVisDel(k);
  if(z==this.nil)
  {

    let newTree=this.Clone();
    this.Steps.push(new visElement("End",this.Clone(),""));
    return {
      "Operation" : "Del",
      
      "OldTree": oldTree,
      
      "List":this.Steps,
      
      "NewTree": newTree
      };
   

  }

  let y;
  if(z.left == this.nil ||z.right == this.nil ){
    y=z;
  }
  else{
    
    if(this.root.value>z.value ) this.PixelSet(z,this.horizontalchange,0,z.left);

    y=this.Next(z);
  }
  let x;
  if(y.left!=this.nil){
    x=y.left;
  }
  else{
    x=y.right;
  }
 
  if(x!=this.nil){
    this.Steps.push(new visElement("Del",this.Clone(),z.Copy(),y.Copy(),x.Copy(),"A "+ String(z.value) +" értékű csúcs törlése",false));
  }
  else{
    this.Steps.push(new visElement("DelNil",this.Clone(),z.Copy(),y.Copy(),"A "+ String(z.value) +" értékű csúcs törlése",false));
  }
  
  x.parent=y.parent;
  if(y.parent==this.nil){
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
   
  if(y.right!=this.nil){
  
    this.PixelChange(x,(y.newx-x.x),(y.newy-x.y));
    
    if(x!=this.nil){
      this.Steps.push(new visElement("DelBinding",this.Clone(),z.Copy(),x.Copy(),"A " +String(x.value)+" értékű elem átkötése",false));
    }
    else{
      this.Steps.push(new visElement("DelBindingNil",this.Clone(),z.Copy(),"Törlés : " +String(x.value)+" értékű elem átkötése",false));
    }
    
      
  }
  }
  else
  {
    if(y.right!=this.nil){
      if(this.root.value>x.value){
        this.PixelChange(x,0,-this.verticalchange);
      }
      else{
         this.PixelChange(x,-this.horizontalchange,-this.verticalchange);
      }
     
    }
    else if(y.left!=this.nil){
      if(this.root.value<x.value){
        this.PixelChange(x,0,-this.verticalchange);
      }
      else{
         this.PixelChange(x,this.horizontalchange,-this.verticalchange);
      }
      
    }
  
  }

  if(this.min(this.root).x>200){
    this.PixelChange(this.root, -this.horizontalchange, 0);
  }
  
  if(x!=this.nil){
    this.Steps.push(new visElement("DelBinding",this.Clone(),z.Copy(),x.Copy(),"A " +String(x.value)+" értékű elem átkötése",true));
  }
  else{
    if(z!=y){
      this.Steps.push(new visElement("DelBindingNil",this.Clone(),z.Copy(),"Törlés : " +String(x.value)+" értékű elem átkötése",true));
    }
  
  }

  this.CordinatEquals();
  console.log(z);
  console.log(y);
  console.log(x);
  if(y.color=="Black"){
    //javít
    this.PreaperDel(x);
  }
  let newTree=this.Clone();
  this.CordinatEquals();

  this.Steps.push(new visElement("End",this.Clone(),""));
  this.CordinatEquals();
  
  return {  "Operation" : "Del",
    
  "OldTree": oldTree,
    
  "List":this.Steps,
    
  "NewTree": newTree
  };

}

PreaperDel(x){

  while (x != this.root && x.color=="Black") {
    if(x == x.parent.left){
      let w =x.parent.right;
      if(w.color=="Red"){
        w.color="Black";
        x.parent.color="Red";
        this.LeftRound(x.parent);
        w=x.parent.right;
        console.log("1 eset");
      }
      if(w.left.color=="Black" && w.right.color=="Black"){
        w.color="Red";
        //x.parent.color="Black";
        x=x.parent;
        console.log("2 eset");
      }
      else {
        
          if( w.right.color=="Black"){
            w.left.color="Black";
            w.color="Red";
            this.RightRound(w);
            w=x.parent.right;
            console.log("3 eset");
          }
          w.color=x.parent.color;
          x.parent.color="Black";
          w.right.color="Black";
          this.LeftRound(x.parent);
          x=this.root;
          console.log("4 eset");
        
    }

    }
    else{
      let w =x.parent.left;
      if(w.color=="Red"){
        w.color="Black";
        x.parent.color="Red";
        this.RightRound(x.parent);
        w=x.parent.left;
        console.log("5 eset");
      }
      if(w.right.color=="Black" && w.left.color=="Black"){
        w.color="Red";
        //x.parent.color="Black";
        x=x.parent;
        console.log("6 eset");
      }
      else {
        
        
        
        if( w.left.color=="Black"){
        w.right.color="Black";
        w.color="Red";
        this.LeftRound(w);
        w=x.parent.left;
        console.log("7 eset");
        }
        w.color=x.parent.color;
        x.parent.color="Black";
        w.left.color="Black";
        this.RightRound(x.parent);
        x=this.root;
        console.log("8 eset");

    }
    
    }

  } 

  x.color="Black";

}

Next(p){
    if(p.right != this.nil){
      return this.VisMinimum(p.right,p);
    }
    else{
      let s=p.parent;
      while(s!=this.nil && p==s.right){
        p=s;
        s=s.parent;
      }
      return s;
    }

}

VisMinimum(node,rootOfSubTree){
 
  while(node.left != this.nil){
    this.Steps.push(new visElement("FindMin",node.Copy(),rootOfSubTree.Copy(),"A legkisebb elem keresése a jobb részfában."));
    if(this.root.value<node.value ) this.PixelSet(node,-this.horizontalchange,0,node.right); 
    node = node.left;
  }
  if(this.root.value>node.value ) this.PixelSet(node,this.horizontalchange,0,node.left)
  this.Steps.push(new visElement("FindMin",node.Copy(),rootOfSubTree.Copy(),"A legkisebb elem a "+String(node.value)+" a jobb részfában."));
  return node;
}

LeftRound(x){
  
  let y=x.right;
  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Balra: A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása balra"));
  this.CordinatEquals();
  x.right=y.left;
  
  if(y.left!=this.nil) y.left.parent=x;
  
  y.parent=x.parent;
  if(x.parent==this.nil){
    this.root=y;
    y.parent=this.nil;
  }
  else if(x==x.parent.left){
    x.parent.left=y;
  }
  else{
    x.parent.right=y;
  }
  y.left=x;
  x.parent=y;

  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Balra: A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása\n A gyerekek és szülők cseréje " ));
  this.CordinatEquals();
 
  /*
  if(y==this.root){
    this.PixelChange(y,-(y.x-x.x),0);
  }
  */
  this.PixelSet(y,0,-this.verticalchange,y.right);
  
  this.PixelSet(x,0,this.verticalchange,x.left);

  this.Steps.push(new visElement("RotationLeft",this.Clone(),x.Copy(),y.Copy(),"Forgatás Balra: A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem a helyére kerül"));
  this.CordinatEquals();


}
//?jó?

RightRound(x){
 
  let y=x.left;

  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Jobbra : A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása jobbra"));
  this.CordinatEquals();
  x.left=y.right;
  

  if(y.left!=this.nil) y.right.parent=x;
  
  y.parent=x.parent;
  if(x.parent==this.nil){
    this.root=y;
    y.parent=this.nil;
  }
  else if(x==x.parent.left){
    x.parent.left=y;
  }
  else{
    x.parent.right=y;
  }
  y.right=x;
  x.parent=y;

 
  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Jobbra :A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása\nA gyerekek és szülők cseréje " ));
  this.CordinatEquals();
  /*
  if(y==this.root){
    this.PixelChange(y,(x.x-y.x),0);
  }
  */
  this.PixelSet(y,0,-this.verticalchange,y.left);
  this.PixelSet(x,0,this.verticalchange,x.right);

  this.Steps.push(new visElement("RotationRight",this.Clone(),x.Copy(),y.Copy(),"Forgatás Jobbra :A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem a helyére kerül"));
  this.CordinatEquals();
}

RepaerAdd(z){
 
  while(z.parent.color=='Red'){
    this.Steps.push(new visElement("AddPreaper",this.Clone(),z.Copy(),z.parent.Copy()," "+ String(z.value) +" értékű csúcs szülője piros "));
    this.CordinatEquals();
  
    if(z.parent==z.parent.parent.left){


      let y=z.parent.parent.right;


      if(y.color=="Red"){
        this.Steps.push(new visElement("AddPreaperGrandParent",this.Clone(),z.Copy(),z.parent.Copy(),y.Copy(),"1. esett -A "+ String(z.value) +" értékű csúcs nagyszülőjének jobb gyereke piros"));
        this.CordinatEquals();
      
        z.parent.color="Black";
        y.color="Black";
        z.parent.parent.color="Red"
        this.Steps.push(new visElement("AddPreaperGrandParent",this.Clone(),z.Copy(),z.parent.Copy(),y.Copy(),"A "+ String(z.value) +" értékű csúcs szülője Fekete, A nagy szüjő jobb gyerek Fekete, A nagyszülő színe Piros lesz\n A következő vizsgált csúcs "+String(z.parent.parent.value )+" lesz "));
        this.CordinatEquals();
        z=z.parent.parent;

      }
      else{
         
        if(z==z.parent.right){
          this.Steps.push(new visElement("AddPreaper",this.Clone(),z.Copy(),z.parent.Copy(),"2. esettA "+ String(z.value) +" értékű csúcs nagyszülőjének jobb gyereke piros\nA "+ String(z.value) +" értékű csúcs szülőjének a jobb gyereke az adott csúcs.\nForgatás következik balra."));
          this.CordinatEquals();
          
          z=z.parent;
          this.LeftRound(z);
        }
    
        z.parent.color="Black";
        z.parent.parent.color="Red";
        this.Steps.push(new visElement("AddPreaper",this.Clone(),z.Copy(),z.parent.Copy(),"2. esett A "+ String(z.value) +" értékű csúcs szölőjének a színe fekete lesz a  nagyszülőjének a színe Piros lesz. "));
        this.CordinatEquals();
        this.RightRound(z.parent.parent);
        
      }
 
  }
  else{
    let y=z.parent.parent.left;
      if(y.color=="Red"){
        this.Steps.push(new visElement("AddPreaperGrandParent",this.Clone(),z.Copy(),z.parent.Copy(),y.Copy(),"1. esett A "+ String(z.value) +" értékű csúcs nagyszülőjének bal gyereke piros "));
        this.CordinatEquals();

        z.parent.color="Black";
        y.color="Black";
        z.parent.parent.color="Red"
        this.Steps.push(new visElement("AddPreaperGrandParent",this.Clone(),z.Copy(),z.parent.Copy(),y.Copy(),"A "+ String(z.value) +" értékű csúcs szülője Fekete, A nagy szüjő jobb gyerek Fekete, A nagyszülő színe Piros lesz"));
        this.CordinatEquals();
        z=z.parent.parent;
      }
      else{
       
        if(z==z.parent.left){
          this.Steps.push(new visElement("AddPreaper",this.Clone(),z.Copy(),z.parent.Copy(),"2. esettA "+ String(z.value) +" értékű csúcs nagyszülőjének bal gyereke piros\nA "+ String(z.value) +" értékű csúcs szülőjének a bal gyereke az adott csúcs.\nForgatás következik jobbra."));
          this.CordinatEquals();

          z=z.parent;
          this.RightRound(z);
        
        }
        z.parent.color="Black";
        z.parent.parent.color="Red";
        this.Steps.push(new visElement("AddPreaper",this.Clone(),z.Copy(),z.parent.Copy(),"2. esett A "+ String(z.value) +" értékű csúcs szülőjének a színe Fekete lesz. A nagyszülőjének a színe Piros lesz. "));
        this.CordinatEquals();
        this.LeftRound(z.parent.parent);
      }
    
  }
 
}
if(this.root.color=="Red"){
  this.Steps.push(new visElement("AddPreaper",this.Clone(),this.root.Copy(),this.root.Copy(),"A gyöker csúcs színe Fekete lesz. "));
  this.CordinatEquals();
}
this.root.color="Black";


}

PixelSet(x,px,py,xchild){
  
 
    //x.x=x.x-30;
    x.newx=x.newx+px; 
    x.newy=x.newy+py;  
    if(xchild!=this.nil){      
      this.PixelChange(xchild,px,py);
    }
  
  
 
}

PixelChange(n,px,py){
  
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


Clone(){
    let newTree= new VisaulRBTree();
    if (this.root == this.nil)
        return newTree;

    let root=this.root;
    newTree.root = root.Copy(newTree.nil);
     let clone=newTree.root;
   
    
  
    while (root != this.nil)
    {
      
        
        if (root.left != this.nil && clone.left == newTree.nil)
        {
            clone.left = root.left.Copy(newTree.nil);
            clone.left.parent=clone;
            root = root.left;
            clone = clone.left;
        }
        else if (root.right != this.nil && clone.right == newTree.nil)
        {
            clone.right = root.right.Copy(newTree.nil);
            
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
  CordinatEquals=function(){
    this.CordinatEqualsOrder(this.root,this.nil);
  }
  CordinatEqualsOrder=function(n,nil){
      
    if(n.left!= nil ){
        this.CordinatEqualsOrder(n.left,nil);
    
    }
    if(n.right!=nil){
        this.CordinatEqualsOrder(n.right,nil);
    
    }
    n.x=n.newx;
    n.y=n.newy;
    n.lambda=1;
}
}
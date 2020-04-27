

class VisaulRBTree extends RBTree{

  
  Steps;
  verticalchange;
  horizontalchange;


  constructor(){
    super();
    this.nil=new VisNode(-99999,"Black");
    this.nil.left=this.nil;
    this.nil.parent=this.nil;
    this.nil.right=this.nil;
    this.root=this.nil;
    this.verticalchange=45;
    this.horizontalchange=45;
    this.Steps=[];

    
  }
  


addValue(val){


    var z = new VisNode(val,"Red")
    var y=this.nil;
    var x=this.root;

    //ha az elem megtalálható akkor nem szúrjuk be újra
    
    if(this.Find(val)!= this.nil){
      return [];
    }

    this.Steps=[];

    var oldTree=this.Clone();

    
    while(x!=this.nil){
      y=x;
      

      if(z.value<x.value){

        
        this.Steps.push(new visElement("Add",x.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem kisebb mint "+String(x.value)));

        if(this.root.value<x.value && this.x!=x ) this.PixelSet(x,this.horizontalchange,0,x.right);
        
        
        //z.x=x.x-30;
        //z.y=x.y+40;
        z.newx=x.newx-this.horizontalchange;
        z.newy=x.newy+this.verticalchange;
        x=x.left;
    
      }
      else{
       
        this.Steps.push(new visElement("Add",x.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem nagyobb mint "+String(x.value)));
       
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
      z.x=200;
      z.y=this.verticalchange+40;


      this.Steps.push(new visElement("Add",z.Copy(),z.Copy(),"Az beszúrandó "+String(z.value)+" elem a gyöker"));
      

      z.newx=245;
      z.newy=this.verticalchange+40;

     

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

    if(z.x<165){
      this.PixelChange(this.root,45,0)
    }

    
    this.Steps.push(new visElement("AddAnimation",this.Clone(),true,"Az beszurandó "+String(z.value)+" elem a helyére kerül"));
    this.CordinatEquals();
    



    this.RepaerAdd(z);


    var newTree=this.Clone();
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
  var oldTree=this.Clone();


  this.Steps=[];
  var x=this.root;
  while(x!=this.nil && x.value!=k){
        if(k<x.value){
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem kisebb mint "+String(x.value) + "erékű elem . Balra megyünk tovább."));
        
          x=x.left;
        }
        else{
          this.Steps.push(new visElement("Find",x.Copy(),"Az keresendő "+String(k)+" elem nagyobb mint "+String(x.value) + "erékű elem . Jobbra megyünk tovább."));
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

  
  var newTree=this.Clone();


  return {

    "Operation" : "Find",
    
    "OldTree": oldTree,
    
    "List":this.Steps,
    
    "NewTree": newTree
    };
 
}




delValue(k){


  var z=this.findVis(k);

  if(z["List"][z["List"].length-2].command="End")
  {

   return z;

  }


  var y;

  if(z.left ==this.nil ||z.right ==this.nil ){
    y=z;
  }
  else{
    y=this.Vismax(z.left);
  }
  var x;

  if(y.left!=this.nil){
    x=y.left;
  }
  else{
    x=y.right;
  }

  this.Steps.push(new visElement("Del",this.Clone(),z.Copy(),y.Copy(),x.Copy(),"Törlés "+ String(z.value) +" értékű csúcs"));
  this.CordinatEquals();

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

  this.Steps.push(new visElement("Del",this.Clone(),z.Copy(),y.Copy(),x.Copy(),"Törlés : az elemek átkötése"));
  this.CordinatEquals();

  if( y!=z ){
    z.value=y.value;
    z.color=y.color;

  }

  this.Steps.push(new visElement("Del",this.Clone(),z.Copy(),y.Copy(),x.Copy(),"Törlés : az elemek átkötése"));
  this.CordinatEquals();

  if(y.color=="Black"){
    //javít
  }
  var newTree=this.Clone();
  this.CordinatEquals();



  
  return {  "Operation" : "Find",
    
  "OldTree": oldTree,
    
  "List":this.Steps,
    
  "NewTree": newTree
  };



}


Vismax(node){

    while(node.right != this.nil){
      this.Steps.push(new visElement("Find",node.Copy(),"A legnagyobb elem keresése a bal részfában."));
      node = node.right;
    }

    this.Steps.push(new visElement("Find",node.Copy(),"A legnagyobb elem a"+String(node.value)+" a bal részfában."));

    return node;


}


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






LeftRound(x){
  

  var y=x.right;

  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Balra: A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása balra"));
  this.CordinatEquals();
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
 

  var y=x.left;


  this.Steps.push(new visElement("RotationSelectAndChange",this.Clone(),x.Copy(),y.Copy(),"Forgatás Jobbra : A "+ String(x.value) +" értékű és a " + String(y.value)+" értékű elem forgatása jobbra"));
  this.CordinatEquals();
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




      var y=z.parent.parent.right;




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


    

    var y=z.parent.parent.left;

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

    var newTree= new VisaulRBTree();

    if (this.root == this.nil)
        return newTree;


    var root=this.root;

    newTree.root = root.Copy(newTree.nil);
     var clone=newTree.root;
   
    
  
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
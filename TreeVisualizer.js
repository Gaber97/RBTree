
class Treevisualizer {

    constructor(){



        this.nil=null;
    }
    

    drawTree=function(n) {
        
        this.nil=n.nil;
        if(n.root!=this.nil){
          
           this.Preorder(n.root);
       
        }
    

        
    }

    Preorder=function(n){
    
    

    if(n.left!= this.nil ){
        this.Preorder(n.left);
       
    }

    if(n.right!=this.nil){
        this.Preorder(n.right);
       
    }

    stroke(255);
    if(n.parent!=this.nil){
    line(n.parent.x, n.parent.y, n.x, n.y);
    }
    
    noStroke();
    fill(255,2,2);
    ellipse(n.x, n.y, 30, 30);
    fill(255); 
    textAlign(CENTER,CENTER);
    text(n.value, n.x, n.y);  



    }






}

class Treevisualizer {

    constructor(){

        this.speed=0.01;
        this.nil=null;
        this.dir=1;
        this.anim=true;
        
    }


    setAnimation(){

        if(this.anim){
            this.anim=false;
        }
        else{
            this.anim=true;
        }

    }
    
    setAnimationSpeed(val){

        this.speed=val;

    }



    drawTree=function(n) {

        var ismoved=true;
        
        
        this.nil=n.nil;
        //var is=this.IsMoved(n.root,ismoved);
        //console.log(is);
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



        if(this.anim){
            this.MoveNode(n);
        }
        else{
            n.lambda=1;
            n.x=n.newx;
            n.y=n.newy;
            n.drawx=n.newx;
            n.drawy=n.newy;
        }
        
        
        //console.log(this.x);
    
        //console.log(n.newx);
     

        stroke(255);
        if(n.parent!=this.nil){
        line(n.parent.drawx, n.parent.drawy, n.drawx, n.drawy);
        }
    
        noStroke();
        fill(255,2,2);
        ellipse( n.drawx,  n.drawy, 30, 30);
        fill(255); 
        textAlign(CENTER,CENTER);
        text(n.value, n.drawx, n.drawy);  
    

    }



    MoveNode(n){


        n.drawx = n.x*n.lambda + n.newx*(1-n.lambda);
        n.drawy = n.y*n.lambda + n.newy*(1-n.lambda);

            
        n.lambda = n.lambda - this.speed;
        
        if( n.lambda < 0){
            n.lambda=1;
            n.x=n.newx;
            n.y=n.newy;
              
        }


    }
    //kérdéses még


    IsMoved(tree,ismoved){

        if(tree!=this.nil){
            ismoved= ismoved && (tree.x != tree.newx && tree.y != tree.newy );
            console.log(tree.x != tree.newx && tree.y != tree.newy);
            console.log(tree.value);
            if(tree.left != this.nil){
                
                ismoved=this.IsMoved(tree.left,ismoved);
              
            }
            if(tree.right != this.nil){
                
                ismoved=this.IsMoved(tree.right,ismoved);
               
            }
            
        

        }

        return ismoved;
    }




}
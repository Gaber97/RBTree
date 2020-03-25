
class Treevisualizer {

    constructor(){

        this.speed=0.01;
        this.dir=1;
        this.anim=true;
        this.visSteps=[];
        this.visStepsNumber=-1;
        this.actualStep=-1;
        this.actualStepElement=0;



        this.stepanim=false;




        this.tree;
        this.vistree;
        this.treeIsSet=false;
        


        
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


    addSteps(data){

        if(data.length==0){
            return 0;
        }
        

        this.treeIsSet=false;

        
        this.visStepsNumber= this.actualStep+1;
        this.actualStep=this.visStepsNumber;
        this.actualStepElement=0;
        
        this.visSteps[this.visStepsNumber]=data;
    

        console.log( this.visStepsNumber);

    }

    stepForward(){
        console.log(this.visStepsNumber);
        console.log("Semmi");
        if(this.visStepsNumber==-1){
           
            return 0;
        }

        this.treeIsSet=false;

        if(this.actualStep==-1){
            this.actualStep=0;
            return 0;
        }

      
      
    

        
        if(this.actualStepElement+1>=this.visSteps[this.actualStep]["List"].length){
            
            if(this.actualStep+1<=this.visStepsNumber) {

                this.actualStep=this.actualStep+1;
                this.actualStepElement=0;
            }
            else{
                this.treeIsSet=true;
            }
         
       
           

        }
        else{
            this.actualStepElement=1+this.actualStepElement;
        }

      
        //console.log(this.visSteps[this.actualStep]["List"]);

        
        console.log( this.actualStepElement);
        console.log(this.actualStep);
        console.log( this.visStepsNumber);

    }
      
    
    stepBackward(){

        
        if(this.visStepsNumber==-1){
            return 0;
        }

        this.treeIsSet=false;
        
        if(this.actualStepElement-1<0){
            
            if(this.actualStep-1>=-1) {

                this.actualStep= this.actualStep-1;
                this.actualStepElement=0;
            }


        }
        else{
            this.actualStepElement=this.actualStepElement-1;
        }

        //console.log(this.visSteps[this.actualStep]["List"]);
        console.log( this.actualStepElement);
        console.log(this.actualStep);
        console.log( this.visStepsNumber);
        

    }



    drawTree=function() {
        
        if(this.visStepsNumber==-1 ||this.actualStep==-1) return 0;

        
       
        
        var actual=this.visSteps[this.actualStep];
        var actualNewTree=actual["NewTree"];
        var actualOldTree=actual["OldTree"];
        var actualListelement=actual["List"][this.actualStepElement];


        switch (actualListelement.command) {
            case "Add":
                
                this.setTree(actualOldTree,this.treeIsSet);
                this.stepanim=false;
                //kirajzolás

                
                var x=actualListelement.x;
                var y=actualListelement.y;
                var val=actualListelement.value;
                
                
                var value=actualListelement.node.value;
                
                 
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.information,10, 100);  




                if(val<value){
                    this.drawNode(x+50,y,value);
                }
                else{
                    
                    this.drawNode(x-50,y,value);
                }

                
               




              break;
           
            case "Animation":
                this.setTree(actualNewTree,this.treeIsSet);
                this.stepanim=true;
                
              break;
            case 3:
              day = "";
              break;
            case 4:
              day = "";
              break;
            case 5:
              day = "";
              break;
            case 6:
              day = "";
          }

          this.stepanim=true;
        

        if(this.vistree.root!=this.vistree.nil)  this.Preorder(this.vistree.root,this.vistree.nil);
       
 

    }



    drawNode(x,y,value,color="piros"){

        noStroke();
        fill(0,0,0);
        if(color){
            fill(255,2,2);

        }

        
        ellipse( x, y, 40, 40);
        fill(255); 
        textAlign(CENTER,CENTER);
        textSize(20);
        text(value,x, y);  

    }


    Preorder=function(n,nil){
    
        if(n.left!= nil ){
            this.Preorder(n.left,nil);
        
        }

        if(n.right!=nil){
            this.Preorder(n.right,nil);
        
        }

        
        n.drawx=n.x;
        n.drawy=n.y;
     
        

        if(this.stepanim){

            this.MoveNode(n)
        
        }
             
            //console.log(this.x);
        
            //console.log(n.newx);
        

           
            if(n.parent!=nil){
            stroke(255);
            line(n.parent.drawx, n.parent.drawy, n.drawx, n.drawy);
            }
        
            this.drawNode(n.drawx,n.drawy,n.value);
    

    }

    MoveNode(n){

 
        if(this.anim){
            n.drawx = n.x*n.lambda + n.newx*(1-n.lambda);
            n.drawy = n.y*n.lambda + n.newy*(1-n.lambda);
    
                
            n.lambda = n.lambda - this.speed;
            
            if( n.lambda < 0){
                n.lambda=1;
                n.x=n.newx;
                n.y=n.newy;
                  
            }
        }
        else{
            n.lambda=1;
            n.x=n.newx;
            n.y=n.newy;
            n.drawx=n.newx;
            n.drawy=n.newy;
        }


    }
    

    setTree(t,isset){

        if(!isset){
            this.vistree=t.Clone();
            this.treeIsSet=true;
        }



    }




}
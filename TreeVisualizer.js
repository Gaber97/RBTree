
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


        this.readyToAddElement=true;



        this.tree=new Tree;
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


    addElement(val){

        val=parseInt(val)

        if(isNaN(val)){
          console.log(NaN);
            return 0;
        }
    


        if(this.actualStep<this.visStepsNumber){

            if(this.actualStep==-1){
                this.tree=new Tree;

            }
            else{
                console.log("valami");
                this.tree=this.visSteps[this.actualStep]["NewTree"].Clone();
                this.tree.CordinatEquals(this.tree.root,this.tree.nil); 
            }
            
        }





        this.addSteps(this.tree.addValue(val));

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
    

      

    }

    stepForward(){
        
        if(this.visStepsNumber==-1){
           
            return 0;
  
        }

        this.treeIsSet=true;

        if(this.actualStep==-1){
            this.actualStep=0;
            return 0;
        }


      
      
    

        
        if(this.actualStepElement+1>=this.visSteps[this.actualStep]["List"].length){


            
            if(this.actualStep+1<=this.visStepsNumber) {

                this.actualStep=this.actualStep+1;
                this.actualStepElement=0;
                this.treeIsSet=false;
            }
          
       
           

        }
        else{

            this.actualStepElement=1+this.actualStepElement;

            if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command != this.visSteps[this.actualStep]["List"][this.actualStepElement-1].command){
                this.treeIsSet=false;
                console.log("d")
            }


            
        }

      
       

    }

    stepForwardSkip(){
        
        if(this.visStepsNumber==-1){
           
            return 0;
        }

        this.treeIsSet=false;

        if(this.actualStep==-1){
            this.actualStep=0;
            return 0;
        }

      
      
    
        if(this.actualStepElement+1==this.visSteps[this.actualStep]["List"].length){
            this.stepForward();
        }
        else{
            this.actualStepElement=this.visSteps[this.actualStep]["List"].length-1;
        }
        
   
      
       

    }
      
    
    stepBackward(){

        
        if(this.visStepsNumber==-1){
            return 0;
        }

        this.treeIsSet=true;
        
        if(this.actualStepElement-1<0){
            
            if(this.actualStep-1>-1) {

                this.actualStep= this.actualStep-1;
                this.actualStepElement=this.visSteps[this.actualStep]["List"].length-1;
                this.treeIsSet=false;

            }
            else if(this.actualStep-1==-1){
                this.actualStep= this.actualStep-1;
                this.actualStepElement=0;
                
            }


        }
        else{
            if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command != this.visSteps[this.actualStep]["List"][this.actualStepElement-1].command){
                this.treeIsSet=false;
            }
            
            this.actualStepElement=this.actualStepElement-1;

        }

       
        

    }


    stepBackwardSkip(){

        
        if(this.visStepsNumber==-1){
            return 0;
        }

        this.treeIsSet=false;
        
        if(this.actualStepElement==0){
            
         this.stepBackward();

        }
        else{
            this.actualStepElement=0;
        }

       
        

    }


    



    drawTree() {
        
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

                
                var x=actualListelement.visElement1.x;
                var y=actualListelement.visElement1.y;
                var val=actualListelement.visElement1.value;
                var color=actualListelement.visElement2.color;


                console.log()
                
                var value=actualListelement.visElement2.value;
                
                 
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.visElement3,90, 3*windowHeight/4-100);  




                if(val<value){
                    this.drawNode(x+50,y,value,color);
                }
                else{
                    
                    this.drawNode(x-50,y,value,color);
                }

              break;
           
            case "Animation":
                this.setTree(actualNewTree,this.treeIsSet);

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.visElement3,90,  3*windowHeight/4-100);  

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
        if(color=="Red"){
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
             
          
           
            if(n.parent!=nil){
            stroke(255);
            line(n.parent.drawx, n.parent.drawy, n.drawx, n.drawy);
            }
            
        
            this.drawNode(n.drawx,n.drawy,n.value,n.color);
    

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
            console.log("klonozás");
            this.vistree=t.Clone();
            this.treeIsSet=true;
        }



    }




}
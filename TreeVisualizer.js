
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


        

        this.visNode1=new Node();
        this.visNode2=new Node();

        this.tree=new Tree;
        this.vistree;
        
        this.treeIsSet=false;
        this.CloneNotSet=false;


       
        
        


        
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
                
                this.tree=this.visSteps[this.actualStep]["NewTree"].Clone();
                this.tree.CordinatEquals();
                
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

        

        
        this.visStepsNumber= this.actualStep+1;
        this.actualStep=this.visStepsNumber;
        this.actualStepElement=0;
        
        this.visSteps[this.visStepsNumber]=data;

        this.ChangeTree();
    

      

    }

    stepForward(){
        
        if(this.visStepsNumber==-1){
           
            return 0;
  
        }

       
        this.stepanim=true;
        this.anim=true;

        if(this.actualStep==-1){
            this.actualStep=0;
            return 0;
        }


      
      
    

        
        if(this.actualStepElement+1>=this.visSteps[this.actualStep]["List"].length){


            
            if(this.actualStep+1<=this.visStepsNumber) {

                this.actualStep=this.actualStep+1;
                this.actualStepElement=0;
                this.ChangeTree();
            }
          
       
           

        }
        else{

            this.actualStepElement=1+this.actualStepElement;
            this.ChangeTree();


            
        }

        

      
       

    }

    stepForwardSkip(){
        
        if(this.visStepsNumber==-1){
           
            return 0;
        }

        
        this.anim=false;

        if(this.actualStep==-1){
            this.actualStep=0;
            return 0;
        }

      
      
    
        if(this.actualStepElement+1==this.visSteps[this.actualStep]["List"].length){
            this.stepForward();
        }
        else{
            this.actualStepElement=this.visSteps[this.actualStep]["List"].length-1;
            this.ChangeTree();
        }
        
   
      
       

    }
      
    
    stepBackward(){

        
        if(this.visStepsNumber==-1){
            return 0;
        }

        //this.treeIsSet=true;
        this.anim=false;
        
        if(this.actualStepElement-1<0){
            
            if(this.actualStep-1>-1) {

                this.actualStep= this.actualStep-1;
                this.actualStepElement=this.visSteps[this.actualStep]["List"].length-1;
                //this.treeIsSet=false;
                this.ChangeTree();
            }
            else if(this.actualStep-1==-1){
                this.actualStep= this.actualStep-1;
                this.actualStepElement=0;
                
            }


        }
        else{
           
            
            this.actualStepElement=this.actualStepElement-1;
            this.ChangeTree();

        }

        
        

    }


    stepBackwardSkip(){

        

        
        if(this.visStepsNumber==-1){
            return 0;
        }

        this.anim=false;
        this.treeIsSet=false;
        
        if(this.actualStepElement==0){
            
         this.stepBackward();

        }
        else{
            this.actualStepElement=0;
            this.ChangeTree();
        }

       
        

    }


    



    drawTree() {
    


        if(this.CloneNotSet) {
            console.log("kihagy");
            return 0;
        }
       

 
        


  


        if(this.visStepsNumber==-1 ||this.actualStep==-1) return 0;


        
        
        
        var actual=this.visSteps[this.actualStep];
        var actualNewTree=actual["NewTree"];
        var actualOldTree=actual["OldTree"];
        var actualListelement=actual["List"][this.actualStepElement];


        switch (actualListelement.command) {
            case "Add":
                   
                //kirajzolás

                
                var x=actualListelement.visElement1.x;
                var y=actualListelement.visElement1.y;
                var val=actualListelement.visElement1.value;
                var color=actualListelement.visElement2.color;


                
                
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
                

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.visElement3,90,  3*windowHeight/4-100);  

                this.stepanim=true;
                
              break;
            case "AddAnimation":
              
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement3,90,  3*windowHeight/4-100);  

                this.stepanim=true;


              break;
            case "RotationRight":


                var nodex=this.visNode1;
          
                var nodey=this.visNode2;

                this.stepanim=true;   
                this.MoveNode(nodex);
                this.MoveNode(nodey);
           

                
                fill(100,97,2);
                ellipse( nodex.drawx, nodex.drawy, 50, 50);
                 
                fill(100,97,2);
                ellipse( nodey.drawx, nodey.drawy, 50, 50);

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);


                text(actualListelement.visElement4,90,  3*windowHeight/4-100);

                


              break;
            case "RotationLeft":

                var nodex=actualListelement.visElement2;
          
                var nodey=actualListelement.visElement3;
           
                this.stepanim=true;   
                this.MoveNode(nodex);
                this.MoveNode(nodey);
           
                
                
                
                fill(100,97,2);
                ellipse( nodex.x, nodex.y, 50, 50);
                 
                fill(100,97,2);
                ellipse( nodey.x, nodey.y, 50, 50);

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement4,90,  3*windowHeight/4-100);  

                this.stepanim=true;        

              break;
            case  "RotationSelectAndChange":

 
                var nodex=actualListelement.visElement2;
          
                var nodey=actualListelement.visElement3;
           

                
                
                
                fill(100,97,2);
                ellipse( nodex.x, nodex.y, 50, 50);
                 
                fill(100,97,2);
                ellipse( nodey.x, nodey.y, 50, 50);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement4,90,  3*windowHeight/4-100);  
              
            break;
           
          }

      
         
        
          if(this.vistree.root!=this.vistree.nil)  this.PostOrder(this.vistree.root,this.vistree.nil);  
        

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


    PostOrder=function(n,nil){
        
        if(n.left!= nil  ){
            this.PostOrder(n.left,nil);
        
        }

        if(n.right!=nil  ){
            this.PostOrder(n.right,nil);
        
        }

        
        n.drawx=n.x;
        n.drawy=n.y;
     

        if(this.stepanim){

            this.MoveNode(n);
        
        }
             
        
            if(n.parent!=nil){
                //console.log(n.parent.drawx + " "+ n.parent.drawy);
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


    ChangeTree(){

        
        if(this.actualStepElement==0){
            this.setTree(this.visSteps[this.actualStep]["OldTree"]);

        }
        /*
        else if(this.actualStepElement==this.visSteps[this.actualStep]["List"].length-1){
            this.setTree(this.visSteps[this.actualStep]["NewTree"]);
        }
        */
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'Add'){
            this.setTree(this.visSteps[this.actualStep]["OldTree"]);
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'AddAnimation'){
       
            this.setTree(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'Animation'){
       
            this.setTree(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
        }

        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationLeft'){
       
            this.setTree(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
            console.log(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
            this.visNode1.Copy(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement2);
            this.visNode2.Copy(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement3);

        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationRight'){
       
            this.setTree(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
            console.log(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
            this.visNode1.Copy(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement2);
            this.visNode2.Copy(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement3);
            
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationSelectAndChange'){
       
            this.setTree(this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1);
        }
 
     
      
    }

    setTree(t){
            
     
                this.vistree=t.Clone();
 
        
    }


    canAddAndDel(){
        
        if(this.visStepsNumber==-1){
            return true;
        }

        if(this.actualStepElement==this.visSteps[this.actualStep]["List"].length-1){
            return true;
        }

        return false;
    }




}
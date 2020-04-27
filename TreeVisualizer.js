
class Treevisualizer {

    constructor(){

        this.speed=0.01;
        this.dir=1;
        this.anim=true;

        this.visSteps=[];
        this.visStepsNumber=-1;
        this.actualStep=-1;
        this.actualStepElement=0;



        this.timeStoped=true;
        this.userStop=false;
        this.timer;
        this.StepForwardSpeed=2000;


        this.visNode1;
        this.visNode2;

        this.tree=new VisaulRBTree();
        this.vistree;
        

        
    }

 

    stopOrStartInterval(){
        if(!this.userStop){
            clearInterval(this.timer);
            this.userStop=true;
        }
        else{
            this.timer=setInterval(()=>{this.stepForward();console.log("klikk");},"2000");
            this.userStop=false;
        }
        
    }

    operationInTree(val,operation){

        val=parseInt(val)

        if(isNaN(val)){
          console.log(NaN);
            return 0;
        }

        switch(operation){
            case "Add":
                var x=this.tree.max(this.tree.root);
                
                if(x.x>windowWidth-50){return 0  ;}
                this.addSteps(this.tree.addValue(val));
                break;
            case "Del":
                
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                this.addSteps(this.tree.delValue(val));
      
                break;
            case "Find":
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                this.addSteps(this.tree.findVis(val));

              
            break;
              default:
                // code block


        }

        if(this.actualStep<this.visStepsNumber){

            if(this.actualStep==-1){
                console.log("f");
                this.tree=new VisaulRBTree();
                
                
            }
            else{
                
                this.tree=this.visSteps[this.actualStep]["NewTree"].Clone();
                this.tree.CordinatEquals();
                
            }
            
        }


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

        
  
        if(this.timeStoped && !this.userStop){
            this.timer= setInterval(()=>{this.stepForward();
            console.log("klikk");},String(this.StepForwardSpeed));
            this.timeStoped=false;
        }
        

      

    }

    stepForward(){
        
        if(this.visStepsNumber==-1){
           
            return 0;
  
        }

       
        
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

            
            clearInterval(this.timer);
            this.timeStoped=true;
        
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

        
        this.anim=true;

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
    
        
        if(this.actualStepElement==0){
            
         this.stepBackward();

        }
        else{
            this.actualStepElement=0;
            this.ChangeTree();
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
                   
                //kirajzolás

                /*
                
                var x=actualListelement.visElement1.x;
                var y=actualListelement.visElement1.y;
                */

               var nodex=this.visNode1;
               nodex.newy=nodex.y-10;
               nodex.value=actualListelement.visElement2.value;
               nodex.color=actualListelement.visElement2.color;

               this.stepanim=true;
                  
               this.MoveNodeVertical(nodex);
               

                var val=actualListelement.visElement1.value;   
                var value=actualListelement.visElement2.value;
                
                 
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.visElement3,90, 3*windowHeight/4-100);  




                if(val<value){
                    this.drawNode(nodex,50,0);
                }
                else{
                    
                    this.drawNode(nodex,-50,0);
                }

              break;
            case "AddAnimation":
              
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement3,90,  3*windowHeight/4-100);  


              break;
            case "RotationRight":
        
                var nodex=this.visNode1;
          
                var nodey=this.visNode2;

            
                this.MoveNode(nodex);
                this.MoveNode(nodey);
                this.CiyleChange(nodex,47,55);
                this.CiyleChange(nodey,47,55);
                
           
                
                fill(0,100,0);
                ellipse( nodex.drawx, nodex.drawy, nodex.round, nodex.round);
                 
                fill(0,100,0);
                ellipse( nodey.drawx, nodey.drawy, nodey.round, nodey.round);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);


                text(actualListelement.visElement4,90,  3*windowHeight/4-100);

            
              break;
            case "RotationLeft":
          
                var nodex=this.visNode1;
          
                var nodey=this.visNode2;
           
                
                this.MoveNode(nodex);
                this.MoveNode(nodey);

                this.CiyleChange(nodex,47,55);
                this.CiyleChange(nodey,47,55);
                
           
                
                fill(0,100,0);
                ellipse( nodex.drawx, nodex.drawy, nodex.round, nodex.round);
                 
                fill(0,100,0);
                ellipse( nodey.drawx, nodey.drawy, nodey.round, nodey.round);

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement4,90,  3*windowHeight/4-100);  

                

              break;
            case  "RotationSelectAndChange":

                var nodex=actualListelement.visElement2;
          
                var nodey=actualListelement.visElement3;
        
                this.CiyleChange(nodex,47,55);
                this.CiyleChange(nodey,47,55);
                 
                fill(0,100,0);
                ellipse( nodex.drawx, nodex.drawy, nodex.round, nodex.round);
                 
                fill(0,100,0);
                ellipse( nodey.drawx, nodey.drawy, nodey.round, nodey.round);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement4,90,  3*windowHeight/4-100);  
              
            break;
            case  "AddPreaper":

                var nodex=actualListelement.visElement2;
          
                var nodey=actualListelement.visElement3;
                
                this.CiyleChange(nodex,47,55);
                this.CiyleChange(nodey,47,55);
                
       
                fill(100,100,0);
                ellipse( nodex.drawx, nodex.drawy, nodex.round, nodex.round);
                 
                fill(0,100,0);
                ellipse( nodey.drawx, nodey.drawy, nodey.round, nodey.round);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);

                
                text(actualListelement.visElement4,90,  3*windowHeight/4-100);  
              
            break;
            case  "AddPreaperGrandParent":

                var node1=actualListelement.visElement2;
          
                var node2=actualListelement.visElement3;

                var node3=actualListelement.visElement4;
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                this.CiyleChange(node3,47,55);
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);

                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
            
                text(actualListelement.visElement5,90,  3*windowHeight/4-100);  
              
            break;
            case  "Find":

                var node1=actualListelement.visElement1;
          
                    
                this.CiyleChange(node1,47,55);
           
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
             
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
            
                text(actualListelement.visElement2,90,  3*windowHeight/4-100);  
              
            break;
            case  "Del":

                var node1=actualListelement.visElement2;
          
                var node2=actualListelement.visElement3;

                var node3=actualListelement.visElement4;
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                this.CiyleChange(node3,47,55);
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);

                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);
                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
            
                text(actualListelement.visElement5,90,  3*windowHeight/4-100);  
              
              
            break;
            case "End":
                

                fill(255); 
                textAlign(LEFT,CENTER);
                textSize(20);
                text(actualListelement.visElement2,90,  3*windowHeight/4-100);  

              
                
              break;
          }

      
          if(this.vistree.root!=this.vistree.nil)  this.PreOrderMove(this.vistree.root,this.vistree.nil);
        
          if(this.vistree.root!=this.vistree.nil)  this.PostOrderTreeDraw(this.vistree.root,this.vistree.nil);  
        

    }

    drawText(){

    }

    MoveNodeVertical(n){


        n.drawx = n.x;
        n.drawy = n.y*n.lambda + n.newy*(1-n.lambda);

            
        n.lambda = n.lambda - 2*this.speed * n.dir;
        
        if( n.lambda < 0 || n.lambda > 1 ){
            n.dir=n.dir*-1;
     

        }
    }

    CiyleChange(n,min, max){
        n.round = n.round +  7*this.speed * n.dir;

        
        if( n.round < min || n.round > max ){
            n.dir=n.dir*-1;
     

        }
    }



    drawNode(n,xchange,ychange){
        strokeWeight(1);
        stroke(0);
        fill(0,0,0);
        if(n.color=="Red"){
            fill(255,2,2);

        }

        
        ellipse( n.drawx+xchange, n.drawy+ychange, 40, 40);
        fill(255); 
        textAlign(CENTER,CENTER);
        textSize(20);
        text(n.value, n.drawx+xchange, n.drawy+ychange);  

    }

    PostOrderTreeDraw=function(n,nil){


        
        
        if(n.left!= nil  ){
            this.PostOrderTreeDraw(n.left,nil);
        
        }

        if(n.right!=nil  ){
            this.PostOrderTreeDraw(n.right,nil);
        
        }

   

        if(n.parent!=nil){
            //console.log(n.parent.drawx + " "+ n.parent.drawy);
            stroke(255);
            strokeWeight(3);
            line(n.parent.drawx, n.parent.drawy, n.drawx, n.drawy);
        }
        
    
        this.drawNode(n,0,0);

        //n.drawx=n.x;
        //n.drawy=n.y;

    }

    PreOrderMove=function(n,nil){
        
        if(n.left!= nil  ){
            this.PreOrderMove(n.left,nil);
        
        }

        if(n.right!=nil  ){
            this.PreOrderMove(n.right,nil);
        
        }
        
        this.MoveNode(n);

    }

    MoveNode(n){

 


        if(this.anim){
            
            if(n.x!=n.newx || n.y!=n.newy){
                
                n.drawx = n.x*n.lambda + n.newx*(1-n.lambda);
                n.drawy = n.y*n.lambda + n.newy*(1-n.lambda);
        
                    
                n.lambda = n.lambda - this.speed;

                console.log("move");


            }

            if( n.lambda < 0){
                n.lambda=1;
                n.x=n.newx;
                n.y=n.newy;

                console.log("set");
               
                  
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

        var actualvisElement= this.visNode1=this.visSteps[this.actualStep]["List"][this.actualStepElement];
        
        if(actualvisElement.command=="Add"){
            this.vistree=this.visSteps[this.actualStep]["OldTree"].Clone();
            this.visNode1=actualvisElement.visElement1.Copy();

        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'AddAnimation'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'End'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }

        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationLeft'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
          
            this.visNode1=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement2.Copy();
            this.visNode2=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement3.Copy();

        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationRight'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
          
            this.visNode1=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement2.Copy();
            this.visNode2=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement3.Copy();
            
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'RotationSelectAndChange'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'AddPreaper'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'AddPreaperGrandParent'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }
        else if(this.visSteps[this.actualStep]["List"][this.actualStepElement].command == 'Del'){
       
            this.vistree=this.visSteps[this.actualStep]["List"][this.actualStepElement].visElement1.Clone();
        }
 
     
      
    }


    clear(){

        this.visSteps=[];
        this.actualStep=-1;
        this.visStepsNumber=-1;
        this.tree=new VisaulRBTree();
        clearInterval(this.timer);


    }

  

    canAddAndDel(){
        
        if(this.visStepsNumber==-1 || this.actualStep==-1){
            return true;
        }

        if(this.actualStepElement==this.visSteps[this.actualStep]["List"].length-1){
            return true;
        }

        return false;
    }

    canStep(){
        
        return this.userStop;

    }



}
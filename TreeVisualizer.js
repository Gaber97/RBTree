
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
        this.counter=0;
        this.nextStep=300;
        this.manualStep=false;

        
    }

 

    counterNextStep(){


        if(!this.userStop && this.actualStep!=-1 ){
            this.counter++;
            //console.log(this.counter);

        }
        
        if(this.counter>this.nextStep){
            //console.log(this.counter);

            if(this.actualStepElement<this.visSteps[this.actualStep]["List"].length){
                this.stepForward();
                
            }
            
            this.counter=0;

            

        }   
        
    }

    stopOrStartInterval(){

        this.userStop=!this.userStop;




    }
    

    operationInTree(val,operation){

        val=parseInt(val)

        this.counter=0;
        if(isNaN(val)){
          console.log(NaN);
            return 0;
        }

        switch(operation){
            case "Add":
                let x=this.tree.max(this.tree.root);
                
                if(x.x>windowWidth-50){return 0  ;}
                //ha már nem fér el a képernyőn

                this.addSteps(this.tree.addValue(val));
                break;
            case "Del":
                
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;

                //még nincs mit törölni

                this.addSteps(this.tree.delValue(val));
      
                break;
            case "Find":
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                //még nincs mit

                this.addSteps(this.tree.findVis(val));

              
            break;
              default:
                // code block


        }

        if(this.actualStep<this.visStepsNumber){

            if(this.actualStep==-1){
                
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
                this.tree= this.visSteps[this.actualStep]["NewTree"].Clone();
                this.ChangeTree();
            }
            else if(this.actualStep-1==-1){
                this.actualStep= this.actualStep-1;
                this.actualStepElement=0;
                this.tree= new VisaulRBTree();
                
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

        let node1;
        let node2;
        let node3;

        let moved=true;

        

        if(this.visStepsNumber==-1 ||this.actualStep==-1) return 0;

        
        
        let actual=this.visSteps[this.actualStep];
      
        let actualListelement=actual["List"][this.actualStepElement];


        switch (actualListelement.command) {
            case "Add":
     

               node1=this.visNode1;
               node1.newy=node1.y-10;
               node1.value=actualListelement.visElement2.value;
               node1.color=actualListelement.visElement2.color;

               this.stepanim=true;
                  
               this.MoveNodeVertical(node1);
               

                let val=actualListelement.visElement1.value;   
                let value=actualListelement.visElement2.value;
                
  
                this.drawText(actualListelement.visElement3);


                if(val<value){
                    this.drawNode(node1,50,0);
                }
                else{
                    
                    this.drawNode(node1,-50,0);
                }

              break;
            case "AddAnimation":
              

                this.drawText(actualListelement.visElement3);

              break;
            case "RotationRight":
        
                node1=this.visNode1;
          
                node2=this.visNode2;

            
                this.MoveNode(node1);
                this.MoveNode(node2);
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
           
                
                fill(0,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
       
                this.drawText(actualListelement.visElement4);

            
              break;
            case "RotationLeft":
          
                node1=this.visNode1;
          
                node2=this.visNode2;

            
                this.MoveNode(node1);
                this.MoveNode(node2);
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
           
                
                fill(0,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
       
                this.drawText(actualListelement.visElement4);

              break;
            case  "RotationSelectAndChange":

                node1=actualListelement.visElement2;
          
                node2=actualListelement.visElement3;
        
                 
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
           
                
                fill(0,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
       
                this.drawText(actualListelement.visElement4);
              
            break;
            case  "AddPreaper":

                node1=actualListelement.visElement2;
          
                node2=actualListelement.visElement3;
        
                 
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
           
                
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
       
                this.drawText(actualListelement.visElement4);
              
            break;
            case  "AddPreaperGrandParent":

                node1=actualListelement.visElement2;
          
                node2=actualListelement.visElement3;

                node3=actualListelement.visElement4;
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                this.CiyleChange(node3,47,55);
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);

                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);
      
                this.drawText(actualListelement.visElement5);
              
            break;
            case  "Find":

                node1=actualListelement.visElement1;
          
                    
                this.CiyleChange(node1,47,55);
           
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
             
          
                this.drawText(actualListelement.visElement2);
              
            break;
            case  "FindMin":

                node1=actualListelement.visElement1;
                node2=actualListelement.visElement2;
          
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
           
                fill(0,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);

                fill(100,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
             
          
                this.drawText(actualListelement.visElement3);
              
            break;
            case  "Del":

                node1=actualListelement.visElement2;
          
                node2=actualListelement.visElement3;

                node3=actualListelement.visElement4;
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                this.CiyleChange(node3,47,55);
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);

                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);
            
                this.drawText(actualListelement.visElement5);

                moved=actualListelement.visElement6;
              
              
            break;
            case  "DelNil":

                node1=actualListelement.visElement2;
          
                node2=actualListelement.visElement3;

                
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);


            
                this.drawText(actualListelement.visElement4);

                moved=actualListelement.visElement5;
              
              
            break;
            case  "DelBinding":

                node1=this.visNode1;
          
                node2=this.visNode2;

                moved=actualListelement.visElement5;
                if(moved){
                    this.MoveNode(node1);
                    this.MoveNode(node2);
                }
               
                    
                this.CiyleChange(node1,47,55);
                this.CiyleChange(node2,47,55);
                
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
                 
                fill(0,100,0);
                ellipse( node2.drawx, node2.drawy, node2.round, node2.round);


            
                this.drawText(actualListelement.visElement4);

                
              
              
            break;
            case  "DelBindingNil":

                node1=this.visNode1;

                moved=actualListelement.visElement4;
                
                if(moved){
                    this.MoveNode(node1);
               
                }
               
             
          
                   
                this.CiyleChange(node1,47,55);
                
                
                     
                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);
              

            
                this.drawText(actualListelement.visElement3);

                moved=actualListelement.visElement4;
              
              
            break;
            case "End":
                
                    this.drawText(actualListelement.visElement2);
              
                
              break;
          }

      

          if(this.vistree.root!=this.vistree.nil && moved)  this.PreOrderMove(this.vistree.root,this.vistree.nil);
        
          if(this.vistree.root!=this.vistree.nil)  this.PostOrderTreeDraw(this.vistree.root,this.vistree.nil);  

          //this.drawNode(this.vistree.nil,0,0);
        

    }

    drawText(info){

        fill(0); 
        textAlign(LEFT,CENTER);
        textSize(20);
        text(info,20,  4*windowHeight/6-100);  
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
        else
        {
         //   stroke(255);
        // strokeWeight(3);
          //  line(n.left.drawx, n.left.drawy, n.drawx, n.drawy);
        }


        if(n.right!=nil  ){
            this.PostOrderTreeDraw(n.right,nil);
        
        }
        else{

          //  stroke(255);
           // strokeWeight(3);
           // line(n.right.drawx, n.right.drawy, n.drawx, n.drawy);
        }

   

        if(n.parent!=nil){
            //console.log(n.parent.drawx + " "+ n.parent.drawy);
            stroke(255);
            strokeWeight(2);
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



            }

            if( n.lambda < 0){

              

                n.lambda=1;
                n.x=n.newx;
                n.y=n.newy;
                n.drawx =n.newx;
                n.drawy = n.newy;


               
                  
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

        let actualvisElement= this.visNode1=this.visSteps[this.actualStep]["List"][this.actualStepElement];
        let command = actualvisElement.command;


        if(command == "Add" || command == "Find" ||command == "FindMin" ){
            this.vistree=this.visSteps[this.actualStep]["OldTree"].Clone();
        }
        else{
            this.vistree=actualvisElement.visElement1.Clone();
        }


        if(command == "Add"   ){
            this.visNode1=actualvisElement.visElement1.Copy();
        }
        else if(command=="DelBindingNil"){
            
            this.visNode1=actualvisElement.visElement2.Copy();
        }
        else if (command == "RotationLeft" || command == "RotationRight" || command =="DelBinding" ){

            this.visNode1=actualvisElement.visElement2.Copy();
            this.visNode2=actualvisElement.visElement3.Copy();
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
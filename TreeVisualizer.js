
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
        this.vistree=this.tree;
        this.counter=0;
        this.nextStep=300;
        this.manualStep=false;


        //// DEBUG:
        this.dialog=createDiv("");
        this.dialog.hide();
        this.dialog.size(50,50);
        this.moved=true;
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
        this.counter=0;
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
                //még nincs mit törölni
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;

                //még nincs mit törölni
                this.addSteps(this.tree.delValue(val));

                break;
            case "Find":
                //még nincs mit
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
        
                this.addSteps(this.tree.findVis(val));

            break;
            case "Pre":
                //még nincs mit
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                this.addSteps(this.tree.visPrev(val));

            break;
            case "Next":
                //még nincs mit
                console.log("Next")
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                this.addSteps(this.tree.visNext(val));

            break;
            case "PreOrder":
                //még nincs mit
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;

                this.addSteps(this.tree.visOrder("PreOrder"));

            break;
            case "InOrder":
                //még nincs mit
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
            
                this.addSteps(this.tree.visOrder("InOrder"));

            break;
            case "PostOrder":
                //még nincs mit
                if(this.visStepsNumber==-1 || this.actualStep==-1) return 0;
                

                this.addSteps(this.tree.visOrder("PostOrder"));

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
                this.tree= this.visSteps[this.actualStep]["OldTree"].Clone();
                this.actualStepElement=0;
                this.ChangeTree();

            }
            else{
                this.tree= this.visSteps[this.actualStep]["NewTree"].Clone();
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

        this.moved=true;

        if(this.visStepsNumber==-1 ||this.actualStep==-1) return 0;

        let actual=this.visSteps[this.actualStep];

        let actualListelement=actual["List"][this.actualStepElement];

        switch (actualListelement.command) {
            case "Add":

               node1=this.visNode1;
               node1.newy=node1.y-5;
               node1.value=actualListelement.visElement2.value;
               node1.color=actualListelement.visElement2.color;

               this.stepanim=true;

               this.MoveNodeVertical(node1);


                let val=actualListelement.visElement1.value;
                let value=actualListelement.visElement2.value;


                this.drawText(actualListelement.visElement3);

                if(val<value){
                    this.drawNode(node1,45,0);
                }
                else if(val==value){
                    this.drawNode(node1,0,0);
                }
                else{


                    this.drawNode(node1,-45,0);
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

                this.moved=actualListelement.visElement6;


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

                this.moved=actualListelement.visElement5;


            break;
            case  "DelBinding":

                node1=this.visNode1;

                node2=this.visNode2;

                this.moved=actualListelement.visElement5;
                if(this.moved){
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

                this.moved=actualListelement.visElement4;

                if(this.moved){
                    this.MoveNode(node1);

                }

                this.CiyleChange(node1,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement3);

                this.moved=actualListelement.visElement4;

            break;
            case  "FixDelCase1Part1":

                node1=actualListelement.visElement2;

                node2=actualListelement.visElement3;


                this.CiyleChange(node1,47,55);


                if(node2.value!=this.vistree.nil.value){
            
                    this.CiyleChange(node2,47,55);

                    fill(0,100,0);
                    ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
    
                }

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);


                this.drawText(actualListelement.visElement4);

            break;
            case  "FixDelCase1Part2":

                node1=actualListelement.visElement2;

                node2=actualListelement.visElement3;

                node3=actualListelement.visElement4;


                if(node2.value!=this.vistree.nil.value){
            
                    this.CiyleChange(node2,47,55);

                    fill(0,100,0);
                    ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
    
                }


                this.CiyleChange(node1,47,55);
 
                this.CiyleChange(node3,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

                //this.moved=actualListelement.visElement4;

            break;
            case  "FixDelCase2":

                node1=actualListelement.visElement2;

                node2=actualListelement.visElement3;


                this.CiyleChange(node1,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);


                if(node2.value!=this.vistree.nil.value){
            
                    this.CiyleChange(node2,47,55);

                    fill(0,100,0);
                    ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
    
                }

                this.drawText(actualListelement.visElement4);

            break;
            case  "FixDelCase3":


                node1=actualListelement.visElement2;

                node2=actualListelement.visElement3;

                node3=actualListelement.visElement4;


                if(node2.value!=this.vistree.nil.value){
            
                    this.CiyleChange(node2,47,55);

                    fill(0,100,0);
                    ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
    
                }


                this.CiyleChange(node1,47,55);
 
                this.CiyleChange(node3,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

            break;
            case  "FixDelCase4":


                node1=actualListelement.visElement2;

                node2=actualListelement.visElement3;

                node3=actualListelement.visElement4;


                if(node2.value!=this.vistree.nil.value){
            
                    this.CiyleChange(node2,47,55);

                    fill(0,100,0);
                    ellipse( node2.drawx, node2.drawy, node2.round, node2.round);
    
                }


                this.CiyleChange(node1,47,55);
 
                this.CiyleChange(node3,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);


                fill(0,100,0);
                ellipse( node3.drawx, node3.drawy, node3.round, node3.round);

                this.drawText(actualListelement.visElement5);

            break;
            case  "Orders":

                node1=this.visNode1;

                this.moved=actualListelement.visElement3;

                if(this.moved){
                    this.MoveNode(node1);

                }

                this.CiyleChange(node1,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement2);

                

            break;
            case  "NextOrPre":

                node1=this.visNode1;

                this.moved=actualListelement.visElement3;

                if(this.moved){
                    this.MoveNode(node1);

                }

                this.CiyleChange(node1,47,55);

                fill(100,100,0);
                ellipse( node1.drawx, node1.drawy, node1.round, node1.round);

                this.drawText(actualListelement.visElement2);

                

            break;
            case "End":

                    this.drawText(actualListelement.visElement2);
                    

              break;
          }

          if(this.vistree.root!=this.vistree.nil && this.moved)  this.PreOrderMove(this.vistree.root,this.vistree.nil);

          if(this.vistree.root!=this.vistree.nil)  this.PostOrderTreeDraw(this.vistree.root,this.vistree.nil);

          //this.drawNode(this.vistree.nil,0,0);
    }

    drawText(info){

        fill(0);
        textAlign(LEFT,CENTER);
        textSize(20);
        
        //text(info,20,  (5*windowHeight/6) -100);
        text(info,20, 400);
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
            fill(250,30,14);

        }

        ellipse( n.drawx+xchange, n.drawy+ychange, 40, 40);
        fill(255);
        noStroke();
        textAlign(CENTER,CENTER);
        textSize(15);
        text(n.value, n.drawx+xchange, n.drawy+ychange);

    }

    PostOrderTreeDraw(n,nil){

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

    PreOrderMove(n,nil){

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
        
        let actualvisElement= this.visSteps[this.actualStep]["List"][this.actualStepElement];
        //console.log(actualvisElement)
        let command = actualvisElement.command;

        //console.log(command);

        if(command == "Add" || command == "Find" ||command == "FindMin" || command == "Orders" || command == "NextOrPre" ){
            this.vistree=this.visSteps[this.actualStep]["OldTree"].Clone();
        }
        else{
            this.vistree=actualvisElement.visElement1.Clone();
        }

        if(command == "Add" || command == "Orders" || command == "NextOrPre"   ){
            this.visNode1=actualvisElement.visElement1.Copy();
            //this.visNode1.y=this.visNode1.y+7;
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
    
    showDialog(n,nil,x,y){
            if(n.left!= nil  ){
                this.showDialog(n.left,nil,x,y);
            }
            if(n.right!=nil  ){
                this.showDialog(n.right,nil,x,y);
            }
            if(Math.abs(n.drawx-x)<n.round/2 && Math.abs(n.drawy-y)<n.round/2 ){
                console.log("----------------------------");
                console.log("Value: %c"+n.value,"color:red");
                console.log("Left: %c"+n.left.value,"color:red");
                console.log("Right: %c"+n.right.value,"color:red");
                console.log("Parent: %c"+n.parent.value,"color:red");
                console.log("Color: "+n.color);
                console.log("X:NEWX: %c"+n.x+":"+n.newx,"color:red");
                console.log("Y:NEWY: %c"+n.y+":"+n.newy,"color:red");
                console.log("----------------------------");
            }


    }
    showNodeInfo(x,y){
      this.showDialog(this.vistree.root,this.vistree.nil,x,y);
    }

}

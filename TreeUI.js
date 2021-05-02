
class TreeUI {



    constructor(){

        
        this.maxSlider=400;
        this.sliderValue=250;
        this.sizex;
        this.sizey;

        //Vizual elements
        this.divVertical;
        this.divHorizontal1;
        this.divHorizontal2;
        this.input;
        this.randomInput;
        this.buttonAdd;
        this.buttonDel;
        this.buttonFind;
        this.buttonNext;
        this.buttonPre;
        this.buttonInOrder;
        this.buttonPreOrder;
        this.buttonPostOrder;
        this.buttonDiagrams;
        this.help;
        this.buttonForward;
        this.buttonForwardSkip;
        this.buttonBackward;
        this.buttonBackwardSkip;
        this.randomButton;
        this.slider;
        this.clearTreeButton;
        this.buttonPause;
        this.textDiv;


        this.helpDivElement;







        if(windowHeight>600){

            this.sizex=windowWidth;
            this.sizey=5*windowHeight/6;
        }
        else{
    
            this.sizex=windowWidth;
            this.sizey=600;
        }

        this.Visualizer= new Treevisualizer();
        this.createVisualElements();
        this.bindButtons();







    } 

    drawTree() {
        
        background(150);
        //this.Visualizer.setForwardSpeed(slider.value());
        this.Visualizer.counterNextStep();
        this.Visualizer.drawTree();
        this.LockOperations(this.Visualizer.canAddAndDel());
        this.LockSteps(this.Visualizer.canStep());
        this.Visualizer.nextStep=this.maxSlider-this.slider.value();
        this.Visualizer.speed=this.slider.value()/10000;


    }


    LockOperations(canClick) {
        if (canClick) {
    
            this.input.removeAttribute('disabled',"");
            this.buttonAdd.removeAttribute('disabled',"");
            this.buttonDel.removeAttribute('disabled',"");
            this.buttonFind.removeAttribute('disabled',"");
            this.buttonPre.removeAttribute('disabled',"");
            this.buttonNext.removeAttribute('disabled',"");
            this.buttonPreOrder.removeAttribute('disabled',"");
            this.buttonInOrder.removeAttribute('disabled',"");
            this.buttonPostOrder.removeAttribute('disabled',"");
    
        } else {
            this.input.attribute('disabled',"");
            this.buttonAdd.attribute('disabled',"");
            this.buttonDel.attribute('disabled',"");
            this.buttonFind.attribute('disabled',"");
            
            this.buttonPre.attribute('disabled',"");
            this.buttonNext.attribute('disabled',"");
            this.buttonPreOrder.attribute('disabled',"");
            this.buttonInOrder.attribute('disabled',"");
            this.buttonPostOrder.attribute('disabled',"");
    
        }
      }
    
    
    LockSteps(canClick) {
        if (canClick) {
    
            this.buttonForwardSkip.removeAttribute('disabled',"");
            this.buttonForward.removeAttribute('disabled',"");
            this.buttonBackward.removeAttribute('disabled',"");
            this.buttonBackwardSkip.removeAttribute('disabled',"")
    
    
        } else {
            this.buttonForwardSkip.attribute('disabled',"");
            this.buttonForward.attribute('disabled',"");
            this.buttonBackward.attribute('disabled',"");
            this.buttonBackwardSkip.attribute('disabled',"")
    
        }
      }

      helpDiv(){

        if(this.helpDivElement.isHide){
            this.helpDivElement.show();
            this.helpDivElement.isHide=false;
        }
        else{
            this.helpDivElement.hide();
            this.helpDivElement.isHide=true;
    
        }
    
    }

    createVisualElements(){



        translate(0, 0);
        //vizual elemet
        this.divVertical = createElement("div","");
        this.divVertical.id("vertical")
    
        this.divVertical.position(0,0);
        this.divVertical.size(70,this.sizey);
    
    
        this.divHorizontal1 = createElement("div","");
    
        this.divHorizontal1.position(0,0);
        this.divHorizontal1.size(this.sizex,50);
    
    
    
        this.divHorizontal2 = createElement("div","");
        this.divHorizontal2.position(0,this.sizey);
        this.divHorizontal2.size(this.sizex,50);
    
        canvas=createCanvas(this.sizex-70, this.sizey-50);
        canvas.position(70,50);
        //
        this.input = createInput();
        this.input.position(10, 10);
        this.input.size(50,30);
    
    
        this.buttonAdd = createButton('Add');
        this.buttonAdd.position(this.input.x + this.input.width+10, this.input.y );
    
        this.buttonAdd.size(50,30);
    
        this.buttonDel = createButton('Del');
        this.buttonDel.position(this.buttonAdd.x + this.buttonAdd.width+10, this.buttonAdd.y );
    
        this.buttonDel.size(50,30);
    
    
        this.buttonFind = createButton('Find');
        this.buttonFind.position(this.buttonDel.x + this.buttonDel.width+10, this.buttonDel.y );
        this.buttonFind.size(50,30);
    
        this.buttonPre = createButton('Pre');
        this.buttonPre.position(this.buttonFind.x + this.buttonFind.width+40, this.buttonFind.y );
        this.buttonPre.size(50,30);
    
        this.buttonNext = createButton('Next');
        this.buttonNext.position(this.buttonPre.x + this.buttonPre.width+10, this.buttonPre.y );
        this.buttonNext.size(50,30);
    
        
        this.buttonPreOrder = createButton('PreOrder');
        this.buttonPreOrder.position(this.buttonNext.x + this.buttonNext.width+40, this.buttonNext.y );
        this.buttonPreOrder.size(80,30);
    
        
        this.buttonInOrder = createButton('InOrder');
        this.buttonInOrder.position(this.buttonPreOrder.x + this.buttonPreOrder.width+10, this.buttonPreOrder.y );
        this.buttonInOrder.size(80,30);
        
        this.buttonPostOrder = createButton('PostOrder');
        this.buttonPostOrder.position(this.buttonInOrder.x + this.buttonInOrder.width+10, this.buttonInOrder.y );
        this.buttonPostOrder.size(80,30);
        
    
        this.buttonForwardSkip = createButton('>>');
        this.buttonForwardSkip.position(this.input.x, this.input.y + this.input.height+ 15);
        this.buttonForwardSkip.size(50,50);
    
        this.buttonForward = createButton('>');
        this.buttonForward.position(this.buttonForwardSkip.x, this.buttonForwardSkip.y + this.buttonForwardSkip.height+ 10);
        this.buttonForward.size(50,50);
    
        this.buttonBackward = createButton('<');
        this.buttonBackward.position(this.buttonForward.x ,this.buttonForward.y + this.buttonForward.height + 10);
    
        this.buttonBackward.size(50,50);
    
    
        this.buttonBackwardSkip = createButton("<<");
        this.buttonBackwardSkip.position(this.buttonBackward.x ,this.buttonBackward.y + this.buttonBackward.height + 10);
    
        this.buttonBackwardSkip.size(50,50);
    
    
        this.buttonPause = createButton("Pause/\nStart");
        this.buttonPause.position(this.buttonBackwardSkip.x ,this.buttonBackwardSkip.y + this.buttonBackwardSkip.height + 10);
    
        this.buttonPause.size(50,50);
    
    
        this.clearTreeButton = createButton('Clear Tree');
        this.clearTreeButton.size(100,30);
        this.clearTreeButton.position(this.sizex-this.clearTreeButton.width-20,this.sizey+10);
    
    
    
    
        
        this.randomButton= createButton("Random RBTree");
        this.randomButton.size(150,30);
        this.randomButton.position(this.input.x + this.input.width+10, this.sizey+10);
     
    
        this.randomInput= createInput();
        this.randomInput.size(50,25);
        this.randomInput.position(this.randomButton.x+this.randomButton.width+10, this.randomButton.y);
    
    
        this.textDiv = createElement("div","Animation Speed:");
        this.textDiv.id("text")
        this.textDiv.position(this.randomInput.x + this.randomInput.width+10,this.randomInput.y+3);
        this.textDiv.size(130,20);
    
    
    
        this.slider = createSlider(0, this.maxSlider+30, this.sliderValue);
        this.slider.position(this.randomInput.x + this.randomInput.width+this.textDiv.width, this.textDiv.y-3);
    
    
    
        this.help=createButton('?');
        this.help.size(30,30);
        this.help.position(this.sizex-this.help.width-20,10);
    
        this.buttonDiagrams=createButton('<a href="diagram.html"  >Diagrams</a>');
        this.buttonDiagrams.size(70,30);
        this.buttonDiagrams.position(this.help.x-this.help.width-100,10);
    
        
    
        this.helpDivElement = createElement("div","");
        this.helpDivElement.id("helpDialog");
        this.helpDivElement.size(900,750);
        this.helpDivElement.position(this.help.x-this.helpDivElement.width,this.help.y)
        
    
    
        //szépít
    
        this.helpDivElement.html('<h2 align="center">Program működése útmutató</h2>'+
        '<ul>'+
            '<li><h3><button type="button">Add</button> </h3>'+
                '<p>Ennek segítségével adhatsz elemet a Piros-Fekete fához.'+
                'Az elem beszúrodik és nyomonkövetheted, hogyan helyezkedik el a fában.</p>'+
    
            '</li>'+
            '<li>'+
                '<h3><button type="button">Del</button></h3>'+
                '<p>Ennek segítségével törölhetsz elemet a Piros-Fekete fából.'+
                'A fa megkeresi a törlendő elemet, kitörli és helyreigazítja a fát.</p>'+
    
    
           '</li>'+
           '<li>'+
           '<h3><button type="button">Find</button></h3>'+
           '<p> Ennek segítségével kereshetsz meg elemeket a Piros-Fekete fában.'+
           'Az fa megkeresi az adott elemet.</p>'+
            '</li>'+
            '<li>'+
            '<h3><button type="button">Pre</button></h3>'+
            '<p> Ennek segítségével kereshetsz meg az adott elem előző elemét a Piros-Fekete fában.'+
            'Az fa megkeresi az adott elemet. Majd az adott elem előző elemét.</p>'+
            '</li>'+
            '<li>'+
            '<h3><button type="button">Next</button></h3>'+
            '<p> Ennek segítségével kereshetsz meg az adott elem köbetkező elemét a Piros-Fekete fában.'+
            'Az fa megkeresi az adott elemet. Majd az adott elem következő elemét.</p>'+
            '</li>'+
            '<li>'+
            '<h3><button type="button">PreOrder</button></h3>'+
            '<p> Ennek segítségével kiírathatod a PreOrder sorrendet a Piros-Fekete fában.'+
            '</p>'+
            '</li>'+
            '<li>'+
            '<h3><button type="button">InOrder</button></h3>'+
            '<p> Ennek segítségével kiírathatod a InOrder sorrendet a Piros-Fekete fában.'+
            '</p>'+
            '</li>'+
            '<li>'+
            '<h3><button type="button">PostOrder</button></h3>'+
            '<p> Ennek segítségével kiírathatod a PostOrder sorrendet a Piros-Fekete fában.'+
            '</p>'+
            '</li>'+
            '<li> <h3><button type="button">Diagram</button></h3>'+
                '<p>Ennek segítségével nézhet statisztikákat a Piros-Fekete fában.</p>'+
            '</li>'+
            '<li><h3> <button type="button"> >> </button> </h3>'+
            '<p>Ennek segítségével léptetheted a fát az adott művelet legutolsó lépéséhez.</p></li>'+
            '<li><h3> <button type="button"> > </button> </h3>'+
            '<p>Ennek segítségével léptetheted a fát az adott művelet következő lépéséhez.</p></li>'+
            '<li><h3> <button type="button"> < </button> </h3>'+
            '<p>Ennek segítségével léptetheted a fát az adott művelet előző lépéséhez.</p></li>'+
    
            '<li><h3> <button type="button"> << </button> </h3>'+
            '<p>Ennek segítségével léptetheted a fát az adott művelet legelső lépéséhez.</p></li>'+
            '<li><h3> <button type="button"> Pause/Start </button> </h3>'+
            '<p>Ennek segítségével lehet az automata és manuális léptetés között váltani. Automatikus esetben a léptető gombok nem elérhetők.</p></li>'+
            '<li><h3> <button type="button"> Random RBTree </button> </h3>'+
            '<p>Ennek segítségével lehet random adott elemszámú fát beszúrni (1-30).</p></li>'+
            '<li><h4>  Animation Speed </h4>'+
            '<p>Ennek segítségével lehet a műveletek gyorsaságát állítani.</p></li>'+
            '<li><h3> <button type="button"> Clear RBTree </button> </h3>'+
            '<p>Törli a fát.</p></li>'+
    
        '</ul>'
      );
    
    
    
        this.helpDivElement.hide();
        this.helpDivElement.isHide=true;
    
    
    }

    bindButtons(){

        this.buttonAdd.mousePressed(() => {
    
            let n=this.input.value();
            this.Visualizer.operationInTree(n,"Add");
            this.input.value("");
    
        });
    
        this.buttonDel.mousePressed(() => {
            
            let n=this.input.value();
            this.Visualizer.operationInTree(n,"Del");
            this.input.value("");
    
        });
    
    
        this.buttonFind.mousePressed(() => {
    
            let n=this.input.value();
            this.Visualizer.operationInTree(n,"Find");
            this.input.value("");
    
        });
    
        this.buttonPreOrder.mousePressed(() => {
    
            
            this.Visualizer.operationInTree(0,"PreOrder");
            
    
        });
    
        this.buttonInOrder.mousePressed(() => {
    
            
            this.Visualizer.operationInTree(0,"InOrder");
            
    
        });
    
        this.buttonPostOrder.mousePressed(() => {
    
            
            this.Visualizer.operationInTree(0,"PostOrder");
            
    
        });
    
    
        this.buttonNext.mousePressed(() => {
    
            let n=this.input.value();
            this.Visualizer.operationInTree(n,"Next");
            this.input.value("");
     
            
    
        });
    
        this.buttonPre.mousePressed(() => {
    
           let  n=this.input.value();
            this.Visualizer.operationInTree(n,"Pre");
            this.input.value("");
     
            
    
        });
    
        this.buttonForwardSkip.mousePressed(() =>{
    
            this.Visualizer.stepForwardSkip();
        });
        this.buttonForward.mousePressed(()=>{
    
            this.Visualizer.stepForward();
    
        });
        this.buttonBackward.mousePressed(()=>{
    
            this.Visualizer.stepBackward();
    
        });
        this.buttonBackwardSkip.mousePressed(()=>{
    
            this.Visualizer.stepBackwardSkip();
    
        });
        this.buttonPause.mousePressed(()=>{
    
    
            this.Visualizer.stopOrStartInterval();
    
        });
        this.clearTreeButton.mousePressed(() =>{
    
            this.Visualizer.clear();
        });
    
        this.randomButton.mousePressed(() =>{
    
            this.Visualizer.clear();
            this.randomTree(this.randomInput.value());
            this.Visualizer.stepForwardSkip();
            this.randomInput.value("");
    
        });
        this.help.mousePressed(()=>{
            if (this.helpDivElement.isHide) {
                this.helpDivElement.show();
                this.helpDivElement.isHide=false;
    
             }
             else {
               this.helpDivElement.hide();
               this.helpDivElement.isHide=true;
             }
        });
    
        this.buttonDiagrams.mousePressed(()=>{
    
            
    
        });
    
    }
    

    Resized() {

        this.sizex=windowWidth;
        this.sizey=5*windowHeight/6;
    
        if(windowHeight<600) this.sizey=600;
        if(windowWidth<900) this.sizex=900;
    
    
        resizeCanvas(this.sizex-70, this.sizey-50);
        this.clearTreeButton.position(this.sizex-this.clearTreeButton.width-20,this.sizey+10);
    
        this.divVertical.size(70,this.sizey);
        this.divHorizontal1.size(this.sizex,50);
    
        this.divHorizontal2.size(this.sizex,50);
        this.divHorizontal2.position(0,this.sizey);
        this.help.position(this.sizex-this.help.width-20,10);
        this.helpDivElement.position(this.help.x-this.helpDivElement.width,this.help.y)
    
    
        this.randomButton.position(this.input.x + this.input.width+10, this.sizey+10);
        this.randomInput.position(this.randomButton.x+this.randomButton.width+10, this.randomButton.y+3);
        this.textDiv.position(this.randomInput.x + this.randomInput.width+10,this.randomInput.y+3);
    
        this.slider.position(this.randomInput.x + this.randomInput.width+this.textDiv.width, this.textDiv.y-5);
    
        this.buttonDiagrams.position(this.help.x-this.help.width-100,10);
    
    
    
    
    }
    
    
    randomTree(num){

        num=parseInt(num)
    
        if(isNaN(num)){
            
              return 0;
        }
        if(num<1 || num >30){
            
            return 0;
      }
    
        for(let i=0;i<num;i++){
            console.log(i)
            this.Visualizer.operationInTree(random(1,1000),"Add");
        }
    
    
    }
    













}
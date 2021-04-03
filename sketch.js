
let mouseX=0;
let mouseY=0;
let maxSlider=400;
let sliderValue=200;

function mousePos(e) {

   mouseX = e.clientX-70;
   mousey = e.clientY;
   //console.log(mouseX +"|"+mouseY);
   Visualazer.showNodeInfo(mouseX,mouseY);


}

function setup(){
console.log(windowHeight)
    if(windowHeight>600){

        sizex=windowWidth;
        sizey=5*windowHeight/6;
    }
    else{

        sizex=windowWidth;
        sizey=600;
    }


    background(150);


    Visualazer= new Treevisualizer();
    createVisualElements();
    blindButtons();


    this.addEventListener("click",mousePos)


}


function draw(){

    background(150);
    //Visualazer.setForwardSpeed(slider.value());
    Visualazer.counterNextStep();
    Visualazer.drawTree();
    LockOperations(Visualazer.canAddAndDel());
    LockSteps(Visualazer.canStep());
    Visualazer.nextStep=maxSlider-slider.value();
    Visualazer.speed=slider.value()/10000;
   // frameCount;



}

function LockOperations(canClick) {
    if (canClick) {

        input.removeAttribute('disabled',"");
        buttonAdd.removeAttribute('disabled',"");
        buttonDel.removeAttribute('disabled',"");
        buttonFind.removeAttribute('disabled',"");
        buttonPre.removeAttribute('disabled',"");
        buttonNext.removeAttribute('disabled',"");
        buttonPreOrder.removeAttribute('disabled',"");
        buttonInOrder.removeAttribute('disabled',"");
        buttonPostOrder.removeAttribute('disabled',"");

    } else {
        input.attribute('disabled',"");
        buttonAdd.attribute('disabled',"");
        buttonDel.attribute('disabled',"");
        buttonFind.attribute('disabled',"");
        
        buttonPre.attribute('disabled',"");
        buttonNext.attribute('disabled',"");
        buttonPreOrder.attribute('disabled',"");
        buttonInOrder.attribute('disabled',"");
        buttonPostOrder.attribute('disabled',"");

    }
  }


function LockSteps(canClick) {
    if (canClick) {

        buttonForwardSkip.removeAttribute('disabled',"");
        buttonForward.removeAttribute('disabled',"");
        buttonBackward.removeAttribute('disabled',"");
        buttonBackwardSkip.removeAttribute('disabled',"")


    } else {
        buttonForwardSkip.attribute('disabled',"");
        buttonForward.attribute('disabled',"");
        buttonBackward.attribute('disabled',"");
        buttonBackwardSkip.attribute('disabled',"")

    }
  }




function helpDiv(){

    if(helpDivElement.isHide){
        helpDivElement.show();
        helpDivElement.isHide=false;
    }
    else{
        helpDivElement.hide();
        helpDivElement.isHide=true;

    }

}

function createVisualElements(){



    translate(0, 0);
    //vizual elemet
    divVertical = createElement("div","");
    divVertical.id("vertical")

    divVertical.position(0,0);
    divVertical.size(70,sizey);


    divHorizontal1 = createElement("div","");

    divHorizontal1.position(0,0);
    divHorizontal1.size(sizex,50);



    divHorizontal2 = createElement("div","");
    divHorizontal2.position(0,sizey);
    divHorizontal2.size(sizex,50);

    canvas=createCanvas(sizex-70, sizey-50);
    canvas.position(70,50);
    //
    input = createInput();
    input.position(10, 10);
    input.size(50,30);


    buttonAdd = createButton('Add');
    buttonAdd.position(input.x + input.width+10, input.y );

    buttonAdd.size(50,30);

    buttonDel = createButton('Del');
    buttonDel.position(buttonAdd.x + buttonAdd.width+10, buttonAdd.y );

    buttonDel.size(50,30);


    buttonFind = createButton('Find');
    buttonFind.position(buttonDel.x + buttonDel.width+10, buttonDel.y );
    buttonFind.size(50,30);

    buttonPre = createButton('Pre');
    buttonPre.position(buttonFind.x + buttonFind.width+40, buttonFind.y );
    buttonPre.size(50,30);

    buttonNext = createButton('Next');
    buttonNext.position(buttonPre.x + buttonPre.width+10, buttonPre.y );
    buttonNext.size(50,30);

    
    buttonPreOrder = createButton('PreOrder');
    buttonPreOrder.position(buttonNext.x + buttonNext.width+40, buttonNext.y );
    buttonPreOrder.size(80,30);

    
    buttonInOrder = createButton('InOrder');
    buttonInOrder.position(buttonPreOrder.x + buttonPreOrder.width+10, buttonPreOrder.y );
    buttonInOrder.size(80,30);
    
    buttonPostOrder = createButton('PostOrder');
    buttonPostOrder.position(buttonInOrder.x + buttonInOrder.width+10, buttonInOrder.y );
    buttonPostOrder.size(80,30);
    

    buttonForwardSkip = createButton('>>');
    buttonForwardSkip.position(input.x, input.y + input.height+ 15);

    buttonForwardSkip.size(50,50);

    buttonForward = createButton('>');
    buttonForward.position(buttonForwardSkip.x, buttonForwardSkip.y + buttonForwardSkip.height+ 10);

    buttonForward.size(50,50);

    buttonBackward = createButton('<');
    buttonBackward.position(buttonForward.x ,buttonForward.y + buttonForward.height + 10);

    buttonBackward.size(50,50);


    buttonBackwardSkip = createButton("<<");
    buttonBackwardSkip.position(buttonBackward.x ,buttonBackward.y + buttonBackward.height + 10);

    buttonBackwardSkip.size(50,50);


    buttonPause = createButton("Pause/\nStart");
    buttonPause.position(buttonBackwardSkip.x ,buttonBackwardSkip.y + buttonBackwardSkip.height + 10);

    buttonPause.size(50,50);


    clearTreeButton = createButton('Clear Tree');
    clearTreeButton.size(100,30);
    clearTreeButton.position(sizex-clearTreeButton.width-20,sizey+10);




    
    randomButton= createButton("Random RBTree");
    randomButton.size(150,30);
    randomButton.position(input.x + input.width+10, sizey+10);
 

    randomInput= createInput();
    randomInput.size(50,25);
    randomInput.position(randomButton.x+randomButton.width+10, randomButton.y+3);


    textDiv = createElement("div","Animation Speed:");
    textDiv.id("text")
    textDiv.position(randomInput.x + randomInput.width+10,randomInput.y+3);
    textDiv.size(130,20);



    slider = createSlider(0, maxSlider+30, sliderValue);
    slider.position(randomInput.x + randomInput.width+textDiv.width, textDiv.y-5);



    help=createButton('?');
    help.size(30,30);
    help.position(sizex-help.width-20,10);
    

    helpDivElement = createElement("div","");
    helpDivElement.id("helpDialog");
    helpDivElement.size(900,750);
    helpDivElement.position(help.x-helpDivElement.width,help.y)
    


    //szépít

    helpDivElement.html('<h2 align="center">Program működése útmutató</h2>'+
    '<ul>'+
        '<li><h3><button type="button">Add</button> </h3>'+
            '<p>Ennek segítségével adhatsz elemet a Piros Fekete fához.'+
            'Az elem beszúrodik és nyomonkövedheted, hogyan helyezkedik el a fában.</p>'+

        '</li>'+
        '<li>'+
            '<h3><button type="button">Del</button></h3>'+
            '<p>Ennek segítségével törölhetsz elemet a Piros Fekete fából.'+
            'Az elem beszúrodik és nyomonkövedheted, hogyan helyezkedik el a fában.</p>'+


       '</li>'+
        '<li> <h3><button type="button">>></button></h3>'+
            '<p>Ennek segítségével léptetheted a rögtön a vég állapotba  a fát a beszúrás,vagy törlés esetén.</p>'+
        '</li>'+
        '<li><h3>></h3>'+
            '<p>Ennek segítségével léptetheted a fát előre a beszúrás vagy törlés esetén.</p></li>'+
        '<li><h3>< </h3>'+
            '<p>Ennek segítségével léptetheted a fát vissza a beszúrás vagy törlés esetén.</p></li>'+
        '<li><h3><<</h3>'+
           ' <p>Ennek segítségével léptetheted a fát előre a beszúrás vagy törlés esetén.'+
           ' Ezek segítségével léphetünk vissza, vagy előre előző beszúrt elemekhez is</p>'+
        '</li>'+
        '<li>'+
            '<h3>Animation set ON/Off</h3>'+
            '<p>Ennek az animációt be és ki lehet kaspcsolni.'+
            'Csúszka segítségével az animáció sebeségét nővelhetjük</p>'+
       '</li>'+
       '<li>'+
       '<h3>Animation set ON/Off</h3>'+
       '<p>Ennek az animációt be és ki lehet kaspcsolni.'+
       '<p>gnoivbuehbvuewjkgorwegervnoierorhorheongvob</p>'+
       'Csúszka segítségével az animáció sebeségét nővelhetjük</p>'+
  '</li>'+
    '</ul>'
  );



    helpDivElement.hide();
    helpDivElement.isHide=true;


}


function blindButtons(){

    buttonAdd.mousePressed(() => {

        n=input.value();
        Visualazer.operationInTree(n,"Add");
        input.value("");

    });

    buttonDel.mousePressed(() => {
        37,
        n=input.value();
        Visualazer.operationInTree(n,"Del");
        input.value("");

    });


    buttonFind.mousePressed(() => {

        n=input.value();
        Visualazer.operationInTree(n,"Find");
        input.value("");

    });

    buttonPreOrder.mousePressed(() => {

        
        Visualazer.operationInTree(0,"PreOrder");
        

    });

    buttonInOrder.mousePressed(() => {

        
        Visualazer.operationInTree(0,"InOrder");
        

    });

    buttonPostOrder.mousePressed(() => {

        
        Visualazer.operationInTree(0,"PostOrder");
        

    });

    buttonForwardSkip.mousePressed(() =>{

        Visualazer.stepForwardSkip();
    });
    buttonForward.mousePressed(()=>{

        Visualazer.stepForward();

    });
    buttonBackward.mousePressed(()=>{

        Visualazer.stepBackward();

    });
    buttonBackwardSkip.mousePressed(()=>{

        Visualazer.stepBackwardSkip();

    });
    buttonPause.mousePressed(()=>{


        Visualazer.stopOrStartInterval();

    });
    clearTreeButton.mousePressed(() =>{

        Visualazer.clear();
    });

    randomButton.mousePressed(() =>{

        Visualazer.clear();
        randomTree(randomInput.value());
        Visualazer.stepForwardSkip();
        randomInput.value("");

    });
    help.mousePressed(()=>{
        if (helpDivElement.isHide) {
            helpDivElement.show();
            helpDivElement.isHide=false;

         }
         else {
           helpDivElement.hide();
           helpDivElement.isHide=true;
         }
    });


}



//tester

function randomTree(num){

    num=parseInt(num)

    if(isNaN(num)){
        
          return 0;
    }
    if(num<1 || num >30){
        
        return 0;
  }

    for(let i=0;i<num;i++){
        console.log(i)
        Visualazer.operationInTree(random(1,1000),"Add");
    }


}

function lessTree(num){


    for(let i=0;i<num;i++){


        Visualazer.operationInTree(num*2-2*i,"Add");
    }


}


function lessTreeDel(num){


    for(let i=0;i<num;i++){


        Visualazer.operationInTree(num*2-2*i,"Del");
    }


}


function GreaterTree(num){


    for(let i=0;i<num;i++){

        Visualazer.operationInTree(num+i,"Add");
    }


}


function FindTest(num,val){


    for(let i=0;i<num;i++){

        Visualazer.operationInTree(val,"Find");
    }


}


function windowResized() {

    sizex=windowWidth;
    sizey=5*windowHeight/6;

    if(windowHeight<600) sizey=600;
    if(windowWidth<900) sizex=900;


    resizeCanvas(sizex-70, sizey-50);
    clearTreeButton.position(sizex-clearTreeButton.width-20,sizey+10);

    divVertical.size(70,sizey);
    divHorizontal1.size(sizex,50);

    divHorizontal2.size(sizex,50);
    divHorizontal2.position(0,sizey);
    help.position(sizex-help.width-20,10);
    helpDivElement.position(help.x-700,help.y);


    randomButton.position(input.x + input.width+10, sizey+10);
    randomInput.position(randomButton.x+randomButton.width+10, randomButton.y+3);
    textDiv.position(randomInput.x + randomInput.width+10,randomInput.y+3);

    slider.position(randomInput.x + randomInput.width+textDiv.width, textDiv.y-5);






}




function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}



function IsRBTree(){

    for (let index = 0; index < 100; index++) {
        
            let tree=new VisaulRBTree();
        
            for (var a=[],i=0;i<100;++i) a[i]=i;
        
            array=shuffle(a);
            
        
            valid=true;
        
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                
                tree.addValue(element);
        
                //console.log(isRBTreeBlackHeightValid(tree))
                //valid=valid&&isRBTreeBlackHeightValid(tree);
                
            }
        
            
            console.log(isRBTreeBlackHeightValid(tree))
            array=shuffle(array);
        
            for (let index = 0; index < array.length/2; index++) {
                const element = array[index];
                
                tree.delValue(element);
        
                //console.log(isRBTreeBlackHeightValid(tree));
                //valid=valid&&isRBTreeBlackHeightValid(tree);
        
            }
            console.log(isRBTreeBlackHeightValid(tree));
        const element = array[index];
        
    }
}


function isRBTreeBlackHeightValid(tree)
{
    return computeBlackHeight(tree.root,tree.nil) != -1;
} 


function computeBlackHeight(currNode,nill) 
{
    // For an empty subtree the answer is obviouss
    if (currNode == nill){
        return 0; 
    }
        
    // Computes the height for the left and right child recursively
    let leftHeight = computeBlackHeight(currNode.left,nill);
    let rightHeight = computeBlackHeight(currNode.right,nill);
    let add = currNode.color == "Black" ? 1 : 0;
    
    // The current subtree is not a red black tree if and only if
    // one or more of current node's children is a root of an invalid tree
    // or they contain different number of black nodes on a path to a null node.
    if (leftHeight == -1 || rightHeight == -1 || leftHeight != rightHeight){
        return -1; 
    }
      
    else{
        return leftHeight + add;
    }
       
}
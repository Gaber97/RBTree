
function setup(){

    if(windowHeight>600){

        sizex=windowWidth;
        sizey=4*windowHeight/6;
    }
    else{
        sizex=windowWidth;
        sizey=600;
    }
    

    background(150);

    
    Visualazer= new Treevisualizer();
    createButtons();
    blindButtons();
    
    //test

}


function draw(){
    
    background(150);
    //Visualazer.setForwardSpeed(slider.value());
    Visualazer.drawTree();
    LockOperations(Visualazer.canAddAndDel());
    LockSteps(Visualazer.canStep());
    
    
  
}

function LockOperations(canClick) {
    if (canClick) {
      
        input.removeAttribute('disabled',"");
        buttonAdd.removeAttribute('disabled',"");
        buttonDel.removeAttribute('disabled',"");
        buttonFind.removeAttribute('disabled',"");
       
    } else {
        input.attribute('disabled',"");
        buttonAdd.attribute('disabled',"");
        buttonDel.attribute('disabled',"");
        buttonFind.attribute('disabled',"");
     
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




function createButtons(){

    

    translate(0, 0);
    //vizual elemet
    divVertical = createElement("div","");

    divVertical.position(0,0);
    divVertical.size(80,sizey);

    divHorizontal1 = createElement("div","");

    divHorizontal1.position(0,0);
    divHorizontal1.size(sizex,50);


    divHorizontal2 = createElement("div","");
    divHorizontal2.position(0,sizey);
    divHorizontal2.size(sizex,50);

    canvas=createCanvas(sizex-80, sizey-50);
    canvas.position(80,50);
    //
    input = createInput();
    input.position(20, 10);
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

    buttonForwardSkip = createButton('>>');
    buttonForwardSkip.position(input.x, input.y + input.height+ 10);
    
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
    clearTreeButton.size(100,40);
    clearTreeButton.position(sizex-150,sizey+5);



    slider = createSlider(1, 5, 2,0.1);
    slider.position(clearTreeButton.x-slider.width-10, clearTreeButton.y+ clearTreeButton.height/4);

    help=createButton('?');
    help.position(sizex-50,10);
    help.size(30,30);
    
 


    helpDivElement = createElement("div","");
    helpDivElement.id("helpDialog");
    helpDivElement.position(help.x-700,help.y)
    helpDivElement.size(700,750);


    //szépít
  
    
    helpDivElement.html('<h2 align="center">Program működése útmutató</h2>'+
    '<ul>'+
        '<li><h3>Add</h3>'+
            '<p>Ennek segítségével adhatsz elemet a Piros Fekete fához.'+
            'Az elem beszúrodik és nyomonkövedheted, hogyan helyezkedik el a fában.</p>'+
        
        '</li>'+
        '<li>'+
            '<h3>Del</h3>'+
            '<p>Ennek segítségével törölhetsz elemet a Piros Fekete fából.'+
            'Az elem beszúrodik és nyomonkövedheted, hogyan helyezkedik el a fában.</p>'+
    
    
       '</li>'+
        '<li> <h3>>></h3>'+
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


    for(let i=0;i<num;i++){

        Visualazer.addElement(random(1,100+num));            
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

   

    resizeCanvas(sizex-80, sizey-50);
    clearTreeButton.position(sizex-150,sizey);
    slider.position(clearTreeButton.x-slider.width-10, clearTreeButton.y+ clearTreeButton.height/4);

    divVertical.size(80,sizey);
    divHorizontal1.size(sizex,50);
    
    divHorizontal2.size(sizex,50);
    divHorizontal2.position(0,sizey);
    help.position(sizex-50,10);
    helpDivElement.position(help.x-700,help.y);
    

  

    






}



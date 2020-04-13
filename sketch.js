




function setup(){


   
    
    
    canvas=createCanvas(windowWidth, 3*windowHeight/4);
    canvas.position(0,0);
    

    Visualazer= new Treevisualizer();

    createButtons();


    //test

}


function draw(){
    
    background(54);
    Visualazer.setAnimationSpeed(slider.value());
    Visualazer.drawTree();
  
}

function clicked(){

    n=input.value();
    Visualazer.addElement(n);

    
 
}

function stepForward(){

    Visualazer.stepForward();
    
 
}

function stepBackward(){

    Visualazer.stepBackward();
 
}
  

function setAnim(){

    Visualazer.setAnimation();
    
 
}

function stepForwardSkip(){

    Visualazer.stepForwardSkip();
    
 
}

function stepBackwardSkip(){

    Visualazer.stepBackwardSkip();
 
}
  

function setAnim(){

    Visualazer.setAnimation();
    
 
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

    input = createInput();
    input.position(20, 10);
    input.size(50,30);

 
    


    

    buttonAdd = createButton('Add');
    buttonAdd.position(input.x + input.width+10, input.y );
    buttonAdd.mousePressed(clicked);
    buttonAdd.size(50,30);

    buttonDel = createButton('Del');
    buttonDel.position(buttonAdd.x + buttonAdd.width+10, buttonAdd.y );
    //buttonDel.mousePressed(clicked);
    buttonDel.size(50,30);

    buttonForwardSkip = createButton('>>');
    buttonForwardSkip.position(input.x, input.y + input.height+ 10);
    buttonForwardSkip.mousePressed(stepForwardSkip);
    buttonForwardSkip.size(50,50);

    buttonForward = createButton('>');
    buttonForward.position(buttonForwardSkip.x, buttonForwardSkip.y + buttonForwardSkip.height+ 10);
    buttonForward.mousePressed(stepForward);
    buttonForward.size(50,50);

    buttonBackward = createButton('<');
    buttonBackward.position(buttonForward.x ,buttonForward.y + buttonForward.height + 10);
    buttonBackward.mousePressed(stepBackward);
    buttonBackward.size(50,50);

    
    buttonBackwardSkip = createButton("<<");
    buttonBackwardSkip.position(buttonBackward.x ,buttonBackward.y + buttonBackward.height + 10);
    buttonBackwardSkip.mousePressed(stepBackwardSkip);
    buttonBackwardSkip.size(50,50);


    animButton = createButton('SetAnimation ON/OFF');
    animButton.size(100,50);
    animButton.position(windowWidth-150,3*windowHeight/4-75);
    animButton.mousePressed(setAnim);
    


    slider = createSlider(0.001, 0.1, 0.01,0.001);
    slider.position(animButton.x-slider.width-10, animButton.y+ animButton.height/4);

    help=createButton('?');
    help.position(windowWidth-50,20);
    help.mousePressed(helpDiv);


    helpDivElement = createElement("div","");
    helpDivElement.position(help.x-500,help.y)
    helpDivElement.size(500,500);
    helpDivElement.innerHTML="saft";
   
    helpDivElement.hide();
    helpDivElement.isHide=true;


}



//tester

function randomTree(num){


    for(var i=0;i<num;i++){

        Visualazer.addElement(random(1,10000+num));            
    }

   
}

function lessTree(num){


    for(var i=0;i<num;i++){

        Visualazer.addElement(num*2-i);            
    }

   
}



function windowResized() {
    resizeCanvas(windowWidth, 3*windowHeight/4);
    animButton.position(windowWidth-200,3*windowHeight/4-50);





}



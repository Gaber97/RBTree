




function setup(){

   
    background(54);
    
    canvas=createCanvas(windowWidth, 3*windowHeight/4);
    canvas.position(0,0);
    background(54);

    Visualazer= new Treevisualizer();
    input = createInput();
    input.position(20, 10);

    button = createButton('Add');
    button.position(input.x + input.width, 10);
    button.mousePressed(clicked);

    slider = createSlider(0.001, 0.1, 0.01,0.001);
    slider.position(10, 3*windowHeight/4-50);


    buttonForward = createButton('Forward');
    buttonForward.position(slider.x + slider.width+ 10, slider.y);
    buttonForward.mousePressed(stepForward);

    buttonBackward = createButton('Backward');
    buttonBackward.position(buttonForward.x + buttonForward.width + 10 , slider.y);
    buttonBackward.mousePressed(stepBackward);


    animButton = createButton('SetAnimation ON/OFF');
    animButton.position(button.x + button.width, 10);
    animButton.mousePressed(setAnim);
    
  
    
    
    
    

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

















//tester

function randomTree(num){


    for(var i=0;i<num;i++){

        Visualazer.addElement(random(1,10000+num));            
    }

   
}



function windowResized() {
    resizeCanvas(windowWidth, 3*windowHeight/4);
  }



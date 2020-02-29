

var list=[67,99,87,100];


function setup(){


    background(54);
    canvas=createCanvas(1600,1000);
    background(54);
    tree=randomTree(0);
    Visualazer= new Treevisualizer();
    input = createInput();
    input.position(20, 10);

    button = createButton('Add');
    button.position(input.x + input.width, 10);
    button.mousePressed(clicked);
    
   
    
    console.log(tree);
    
    

    //test

}


function draw(){
    
    background(54);

    Visualazer.drawTree(tree);
  
}

function clicked(){

    n=input.value();
    tree.addValue(n);

   
    
  
  }
  
function randomTree(num){


    var tree = new Tree();

    for(var i=0;i<num;i++){
        
        tree.addValue(int(random(1,10000+num)));
            
    }

    return tree;
}


class DiagramTree extends RBTree {


    constructor(){
        super();
    }
    addRandomElements(num){
        for(let i=0;i<num;i++) this.addValue(Math.floor(Math.random() * num));
        
    }

    maxDepth(node)  
    {  
        if (node == this.nil)  
            return 0;  
        else
        {  
            /* compute the depth of each subtree */
            let leftmax = this.maxDepth(node.left);  
            let rightmax = this.maxDepth(node.right);  

            if (leftmax > rightmax)
            {
                return(leftmax + 1);  
            }     
            else 
            { 
                return(rightmax + 1); 
            }  
        }  
    }  

    minDepth(node)  
    {  
        if (node == this.nil)  
            return 0;  
        else
        {  
            /* compute the depth of each subtree */
            let leftmax = this.minDepth(node.left);  
            let rightmax = this.minDepth(node.right);  

            if (leftmax < rightmax)
            {
                return(leftmax + 1);  
            }     
            else 
            { 
                return(rightmax + 1); 
            }  
        }  
    }  


    BlackDepth(node){
        let black=1;

        
        while( node != this.nil){

            if(node != this.root && node.color=="Black")
            { 
                black=black+1;
            
            }

            node=node.left;

        }
        
        return black;

    }



}
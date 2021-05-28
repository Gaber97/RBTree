

class DiagramTree extends RBTree {


    constructor() {
        super();
        this.trees=[];


    }

    addRandomElements(num) {
        for (let i = 0; i < num; i++) this.addValue(Math.floor(Math.random() * num*5));

    }

    maxDepth(node) {
        if (node == this.nil)
            return 0;
        else {

            let leftmax = this.maxDepth(node.left);
            let rightmax = this.maxDepth(node.right);

            if (leftmax > rightmax) {
                return (leftmax + 1);
            }
            else {
                return (rightmax + 1);
            }
        }
    }

    minDepth(node) {
        if (node == this.nil)
            return 0;
        else {

            let leftmax = this.minDepth(node.left);
            let rightmax = this.minDepth(node.right);

            if (leftmax < rightmax) {
                return (leftmax + 1);
            }
            else {
                return (rightmax + 1);
            }
        }
    }

    blackDepth(node) {
        let black = 1;

        while (node != this.nil) {

            if (node != this.root && node.color == "Black") {
                black = black + 1;

            }

            node = node.left;

        }
        return black;
    }


    init(){

        let datamax = [];
        let datamin = [];
        let datablack = [];
        let name = [];
        //let trees = [];
        for (let i = 0; i < 7; i++) {
            this.trees.push(new DiagramTree());

        }



        for (let i = 0; i < 6; i++) {
            this.trees[i].addRandomElements(10 ** (i + 1));
            datamin.push(this.trees[i].minDepth(this.trees[i].root));
            datamax.push(this.trees[i].maxDepth(this.trees[i].root));
            datablack.push(this.trees[i].blackDepth(this.trees[i].root));

            name.push(String(10 ** (i + 1)));
        }

        var table = document.getElementsByClassName('table')[0]

        table.innerHTML = "";

        let tablebody = '  <tr><th scope="col">Minimun Heigh</th><th scope="col">Black Heigh</th><th scope="col">MaxHeigh</th></tr> ';



        for (let i = 0; i < 6; i++) {

            tablebody += "<tr>" + "<td>" + datamin[i] + "</td>" + "<td>" + datablack[i] + "</td>" + "<td>" + datamax[i] + "</td>" + "</tr>"




        }
        table.innerHTML = tablebody;

        var ctx = document.getElementsByClassName('Diagram')[0].getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: name,
                datasets: [{
                    label: 'MaxDepth',
                    data: datamax,
                    backgroundColor: [
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)',
                        'rgba(255, 0, 0,1)'
                    ]


                }, {
                    label: 'MinDepth',
                    data: datamin,
                    backgroundColor: [
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)',
                        'rgba(255, 133, 0,1)'
                    ]


                },
                {
                    label: 'blackDepth',
                    data: datablack,
                    backgroundColor: [
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)',
                        'rgba(0, 0, 0,1)'
                    ]


                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


    }



}
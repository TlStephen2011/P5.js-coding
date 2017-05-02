// an implementation of a randomized Kruskal's algorithm
// for maze generation
// source: https://en.wikipedia.org/wiki/Maze_generation_algorithm

var edgeArray = [];
var chooseFrom;
var arrayOfSets = [];
var borderSet = [];
var maze;
// the variable n will store the "num cols" = "num rows", and w will store size of cell.
var n, w, start, end; 
function setup() {

    n = floor(random(5,50));
    w = map(n, 5, 50, windowHeight/n, 15);
    var canvas = createCanvas(n*w, n*w);
    maze = new Maze();
    maze.generateEdges();
    maze.generateSets();
    maze.generateBorder();
    maze.startAndEnd();
    chooseFrom = edgeArray.slice();
    console.log(n + " " + w);  
}

function draw() {

    stroke(255, 0, random(255));
    background(0);
    strokeWeight(50/n);
    maze.displayEdges();
    strokeWeight(200/n);
    maze.displayBorder();
    if(chooseFrom && chooseFrom.length > 0){
        maze.theBrains();
    } else {
        console.log("DONE!!");
        noLoop();
    }

}


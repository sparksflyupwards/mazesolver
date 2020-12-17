canvas = document.getElementById('canva');
   ctx = canvas.getContext("2d");
    
    
    let map = [];
    let cell_size=10;
    let saturation_index = 2.34;

    let map_width = canvas.width/cell_size;
    let map_height = canvas.height/cell_size;

    let drawing = false;

    let start = {x:0,y:0};
	let finish = {x:map_width-1,y:map_height-1};
	let path = [];
    let been_to = [];

//draw the start
ctx.fillStyle = "yellow";
ctx.fillRect(start.x*cell_size,start.y*cell_size,cell_size,cell_size);

//draw the end
ctx.fillStyle = "blue";
ctx.fillRect(finish.x*cell_size,finish.y*cell_size,cell_size,cell_size);

//creates map with random walls
for(let i=0; i<map_width; i++){
	let row =[]
	for(let j=0; j<map_height; j++){
        random_num = Math.random()*10;
        if(random_num<saturation_index){
            row[j]=1;
            ctx.fillStyle = "green";
            ctx.fillRect(i*cell_size,j*cell_size,cell_size,cell_size);
        }
        else {
            row[j]=0;
        }
	
	}
    map[i]=row;
}
 
canvas.addEventListener("mousemove", function (e) {
       if(drawing){
       drawOnGrid(e);
   		}
    }, false);


   canvas.addEventListener("mousedown", function (e) {
       drawing = !drawing;
    }, false);






function drawOnGrid(e){
	let x = Math.floor(e.clientX/cell_size);
	let y = Math.floor(e.clientY/cell_size);
	console.log("x: "+x+" y: "+y);
   
    
        map[x][y]=1;
        ctx.fillStyle = "green";
        ctx.fillRect(x*cell_size,y*cell_size,cell_size,cell_size);
	


}



function printPath(_somePath){
    i=0
    timer = setInterval(() => {
        if(i>=_somePath.length){
            clearInterval(timer)
        }
        console.log("Path: " + _somePath[i].x+" "+_somePath[i].y)
        ctx.fillStyle = "red";
        let spot = _somePath[i];
        ctx.fillRect(spot.x*cell_size,spot.y*cell_size,cell_size,cell_size);
        i = i + 1

        
    }, 100);
}

function drawSolution(){
solveMaze(start);
 if(path){
    printPath(path)
    }
}

function solveMazeRecursive(pos){
    //TODO: remove and implement a*
    return solveMazeWorker(pos)

}
function solveMaze(pos){
  
	//solveMaze({x:pos.x-1,y:pos.y});
	
	
}





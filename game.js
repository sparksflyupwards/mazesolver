canvas = document.getElementById('canva');
   ctx = canvas.getContext("2d");
 

    
    let map = [];
    let cell_size=8;
    let saturation_index = 0;

    let map_width = canvas.width/cell_size;
    let map_height = canvas.height/cell_size;
    let drawing = false;

    let start = {x:0,y:0};
    let finish = {x:40,y:40};

    let player_pos ={x:map_width-1, y: map_height-1};
    //let player_path = [];
    let player_direction = "down";
    let player_loop = setInterval(()=>{
        console.log(player_direction)
        switch(player_direction){
            case "right":
                player_pos.x +=1;
                break;
            case "down":
                player_pos.y +=1;
                break;
            case "left":
                player_pos.x -=1;
                break;
            case "up":
                player_pos.y -=1;
                break;
        }

        if(map[player_pos.x][player_pos.y] == 1){
            alert("PLAYER LOSES DONT TOUCH THE WALLS")
        }
        else{
            ctx.fillStyle = "red";
            ctx.fillRect(player_pos.x*cell_size-1,player_pos.y*cell_size-1,cell_size,cell_size);
        }




    },1000)
                    
    //{x:map_width-1,y:map_height-1};
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
            if(random_num<saturation_index && (i != 0 & j != 0)){
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

    document.addEventListener("keydown", function (e) {
       
       switch(e.keyCode){
           case 39:
               player_direction = "right";
                break;
            case 40:
                player_direction = "down";
                break;
            case 37:
                player_direction = "left";
                break;
            case 38:
                player_direction = "up"
                break;

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
        if(i>=_somePath.length-1){
            clearInterval(timer)
        }
        console.log("Path: " + _somePath[i].x+" "+_somePath[i].y)
        ctx.fillStyle = "red";
        let spot = _somePath[i];
        ctx.fillRect(spot.x*cell_size,spot.y*cell_size,cell_size,cell_size);
        i = i + 1

        
    }, 0.1);
}

function drawSolution(){
solveMaze(start);
console.log("final path ")
console.log(path)
 if(path){
    printPath(path)
    }
}

function checkBeenTo(pos){
    for(point of been_to){
        if(point.x == pos.x && point.y == pos.y){
            return true;
        }
    }
    return false;
}

function distance(a,b){
    return Math.abs(Math.sqrt(Math.pow((b.x-a.x),2)+Math.pow((b.y-a.y),2)))
}

function solveMaze(pos){
try {

	if(pos.x ==  finish.x && pos.y == finish.y){
        console.log("found")
        return 1;
    }
    
    if(pos.x >= map_width || pos.x<0 || pos.y < 0 || pos.y >= map_height){
        console.log("out")
        console.log(pos)
        return -1;
    }
    //console.log("at "+pos.x+ map[pos.x])
    if(map[pos.x][pos.y]){
        //console.log("stepped wrong")
        return -1;
    }

    if(checkBeenTo(pos)){
        return -1;
    }
    
    been_to.push(pos);
    path.push(pos)
    
    //try right
    if(solveMaze({x:pos.x +1, y:pos.y}) == 1){
            return 1;
    }
    
    
    //try down
    if(solveMaze({x:pos.x, y:pos.y+1}) == 1){
        return 1;
    }
    //try left
    if(solveMaze({x:pos.x-1, y:pos.y}) == 1){
        return 1;
    }
    //try up
    if(solveMaze({x:pos.x, y:pos.y-1}) == 1){
        return 1;
    }
    
    return;
}
catch (ex){
    alert("yo we got exception: "+ex)
}
	
}





canvas = document.getElementById('canva');
   ctx = canvas.getContext("2d");
    
    
    let map = [];
	let cell_size=25;

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

//creates map of zeros
for(let i=0; i<map_width; i++){
	let row =[]
	for(let j=0; j<map_height; j++){
	row[j]=0;
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
solveMazeRecursive(start);
 if(path){
    printPath(path)
}


}


function solveMazeRecursive(pos){
    //TODO: remove and implement a*
    return solveMazeWorker(pos)

}

function checkPointInPath (pos,_path){
    for (point of _path){
        if (point.x == pos.x && point.y == pos.y){
            return true
        }
    }
    return false
}
function solveMazeWorker(pos) {
    //if we are there give the path back
 
        
            console.log("at: "+pos.x +" "+pos.y)
          
                ctx.fillStyle = "grey";
                let spot = pos;
                ctx.fillRect(spot.x*cell_size,spot.y*cell_size,cell_size,cell_size);
           
        
        
        if(pos.x ==finish.x && pos.y == finish.y){
            return true;
        }
    
        //x bounds
         if(pos.x<0||pos.x>=map_width){
            return false;
        }
        //y bounds
        if(pos.y<0||pos.y>=map_height){
            return false;
        }
        //checks to see if there is a wall there
        if(map[pos.x][pos.y]!=0){
            ctx.fillStyle = "purple";
            let spot = pos;
            ctx.fillRect(spot.x*cell_size,spot.y*cell_size,cell_size,cell_size);
            //console.log("STEPPED ON PATH")
            return false;
        }
        
        path.push(pos)
        
        //try moving right
      
        //console.log("move right")
        right_pos = {x:pos.x+1, y:pos.y}
        
        //console.log("we have been to right: " + checkPointInPath(right_pos, path))
        if(!checkPointInPath(right_pos, path)){
        right_path = solveMazeWorker(right_pos)
        if (right_path != false){
            return true
        }
        }
        
        //console.log("path is not right ")
        
    
        //try moving down
        down_pos = {x:pos.x, y:pos.y+1}
        if(!checkPointInPath(down_pos,path)){
            down_path = solveMazeWorker(down_pos)
            if (down_path != false){
                return true
            }
        }
        
        

        
        //console.log("the path is now: ")
        //printPath(path)
        //console.log("path is not down ")

        //try moving up
        up_pos = {x:pos.x, y:pos.y-1}
        if(!checkPointInPath(up_pos, path)){
            up_path = solveMazeWorker(up_pos)
            if (up_path != false){
                return true
            }
        }
        
        
        //console.log("path is not up ")


        //try moving left
       // console.log("move left")
        //alert("move left")
        left_pos = {x:pos.x-1, y:pos.y}
        if(!checkPointInPath(left_pos, path)){
            left_path = solveMazeWorker(left_pos)

        if (left_path != false){
            return true
        }
        }
        

       // console.log("path is not left ")
    
         
    
         path.pop()
    
         return false


   
    




}














function validateMove(pos){
  //check if we've already stepped here before
  let place;
  for(let i=0; i<been_to.length; i++){
    place = been_to[i];
    if(place.x==pos.x&&place.y==pos.y){
      return -1
    }
  }
  
	if(pos.x==finish.x&&pos.y==finish.y){
		console.log("done!")
		return true;
	}
	else if(pos.x<0||pos.x>=map_width){
		return -1;
	}
	else if(pos.y<0||pos.y>=map_height){
		return -1;
	}
	else if(map[pos.x][pos.y]!=0){
		return -1;
	}
	else {
   
		return 0;
	}
}


var printed = false;
function solveMaze(pos){
  
	//try to move right
	//if you come across a wall or out of bound make move invalid
	//if move invalid try to move down
	// if move invalid try to move left
	//if move invalid try to move up

    
		
		//try right
		let right = validateMove({x:pos.x+1,y:pos.y});
		let down = validateMove({x:pos.x,y:pos.y+1});
		let left = validateMove({x:pos.x-1,y:pos.y});
		let up = validateMove({x:pos.x,y:pos.y-1});
		if(right!=-1){
			if(right==0){
        been_to.push({x:pos.x+1,y:pos.y});
				path.push({x:pos.x+1,y:pos.y});
				solveMaze({x:pos.x+1,y:pos.y});
			}
			else{
				return true;
			}
		}
		else if(down!=-1){
			if(down==0){
        been_to.push({x:pos.x,y:pos.y+1});
				path.push({x:pos.x,y:pos.y+1});
				solveMaze({x:pos.x,y:pos.y+1});
			}
			else{
				return true;
			}

		}
		else if(up!=-1){
			if(up==0){
        been_to.push({x:pos.x,y:pos.y-1});
				path.push({x:pos.x,y:pos.y-1});
				solveMaze({x:pos.x,y:pos.y-1});
			}
			else{
				return true;
			}

		}
		else if(left!=-1){
			if(left==0){
        been_to.push({x:pos.x-1,y:pos.y});
				path.push({x:pos.x-1,y:pos.y});
				solveMaze({x:pos.x-1,y:pos.y});
			}
			else{
				return true;
			}

		}
		else {
			return true;
		}
	
}





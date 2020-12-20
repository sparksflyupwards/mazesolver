export {Que}

class Que {
    constructor(){
    this.size = 0
    this.data = []
    }
    
    add(value){
    this.data[this.size] = value;
    this.size = this.size + 1;
    }
    
    pop(){
        if(this.size <= 0) return
        const first_val = this.data[0];
        for(let i = 0; i<this.data.length-1; i++){
            this.data[i] = this.data[i+1];
        }
        this.data = this.data.splice(0,this.data.length-1);
        return first_val
    }
    
    printQue(){
         for(let i = 0; i<this.data.length; i++){
            console.log(this.data[i]);
        }
    }
    }
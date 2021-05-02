const canvas = document.getElementById("canvas")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")
const value = document.getElementById("value")
const colorEl = document.getElementById("color")
const clear = document.getElementById("clear")
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

// start
canvas.addEventListener("touchstart",startDrawing)
canvas.addEventListener("mousedown" , startDraw)

// draw

canvas.addEventListener("mousemove", draw )
// stop
canvas.addEventListener("touchend", stopDrawing )
canvas.addEventListener("mouseup", stopDraw )
canvas.addEventListener("mouseout", stopDraw )

canvas.addEventListener("touchmove", drawing)



const ctx = canvas.getContext("2d");
let isPressed = false;
var size = 2;
var color = "black"
// for mouse move
let x;
let y;
// for touch move
let u;
let v

let restore_array = [];
let index = -1;


// when mouse is up or out of board
function stopDraw(e){
    e.preventDefault()
    if (isPressed) {
        ctx.stroke()
        ctx.closePath()
        isPressed = false
    }
    if(e.type != "mouseout"){
        restore_array.push(ctx.getImageData(0,0, canvas.width, canvas.height))
        index += 1

    }
}


// for  screen touches
function stopDrawing(e){

    if (isPressed) {
        ctx.stroke()
        ctx.closePath()
        isPressed = false
    }
    if(e.type != "touchend"){
        restore_array.push(ctx.getImageData(0,0, canvas.width, canvas.height))
        index += 1

    }
}


var x2;
var y2
let x3;
let y3




// for  screen touches
function drawing(e){
    if(isPressed){
    if(e.type== "touchmove"){
         x3= e.touches[0].pageX- canvas.offsetLeft
          y3=  e.touches[0].pageY -canvas.offsetTop
    }

}
    draww(u,v, x3,y3)
    u = x3;
    v = y3
}




// mouse move
function draw(e){
    e.preventDefault()
    if (isPressed) {
        if(e.type=="mousemove"){
             x2 = e.offsetX 
             y2 = e.offsetY
        }
    }
        
   

    // clientX
    drawLine(x, y, x2,y2)

        x = x2;
        y = y2
    }


// to draw a circle
// the size was divided by two to reduce having too much circle in tyhe straight line
function drawCircle(x, y,u,v) {
    ctx.beginPath()
    // for mouse move
    ctx.arc(x, y, size/4, 0 , Math.PI * 2)
    // for touches
    ctx.arc(u, v, size/4, 0 , Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}
// draw a straight line
function drawLine(x1,y1 ,x2,y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1);

    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color;
    ctx.lineWidth = size *2;
    ctx.lineCap=   "round"   // Draw a line with rounded end caps:
    ctx.lineJoin = "round" // Create a rounded corner when the two lines meet
    ctx.stroke()
}


//update size on the screen
function updateSize(){
    value.innerText = size
}

// button
increase.addEventListener("click",()=>{
    size += 2
    if (size  >10){
        size = 10
    }
    updateSize()
})
decrease.addEventListener("click",()=>{
    size -= 2
    if (size < 2){
        size = 2
    }
    updateSize()
})



colorEl.addEventListener("change",(e)=> {
color= e.target.value
})

//  to clear canvas board
clear.addEventListener("click", clearRect)


//start drawCircle
// for  screen touches
function startDrawing(e){
    isPressed=true
    u= e.touches[0].pageX- canvas.offsetLeft
    v=  e.touches[0].pageY -canvas.offsetTop
   

}



function startDraw(e){
    e.preventDefault()
 
    isPressed=true
  

    x = e.offsetX //|| //( touch.pageX - canvas.offsetLeft)//+ rect.left );
    y = e.offsetY //|| //( touch.pageY  - canvas.offsetTop)//-rect.top ); //-+rect.top

}
function clearRect(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    restore_array= []
    index = -1
}

// undo last action
undoBtn.addEventListener("click", undoLast)
redoBtn.addEventListener("click", redoLast)



var c;
function undoLast(){
    if(index <= 0){
    clearRect()

    } else {
        index -= 1;
       c=  restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0)
    }
    
}
function redoLast(){

console.log("c")
}

// for touches
function draww(u,v ,x3,y3) {
   console.log(u,v,x3,y3) 
    ctx.beginPath()
    ctx.moveTo(u, v);
    ctx.lineTo(x3, y3)
    ctx.strokeStyle = color;
    ctx.lineWidth = size *2;
    ctx.lineCap=   "round"   // Draw a line with rounded end caps:
    ctx.lineJoin = "round" // Create a rounded corner when the two lines meet
    ctx.stroke()
}
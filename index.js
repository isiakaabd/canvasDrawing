const canvas = document.getElementById("canvas")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")
const value = document.getElementById("value")
const colorEl = document.getElementById("color")
const clear = document.getElementById("clear")
const undoBtn = document.getElementById("undo")

// start
canvas.addEventListener("touchstart",startDraw)
canvas.addEventListener("mousedown" , startDraw)

// draw
canvas.addEventListener("touchmove", draw )
canvas.addEventListener("mousemove", draw )
// stop
canvas.addEventListener("touchend", stopDraw )
canvas.addEventListener("mouseup", stopDraw )
canvas.addEventListener("mouseout", stopDraw )


const ctx = canvas.getContext("2d");
let isPressed = false;
var size = 2;
var color = "black"
let x;
let y;

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



// mouse move
function draw(e){
    e.preventDefault()
    if (isPressed) {
    const x2 =e.offsetX
    const y2 = e.offsetY

    drawLine(x, y, x2,y2)
    // drawCircle(x2, y2)
        x = x2;
        y = y2
    }
}


// to draw a circle
// the size was divided by two to reduce having too much circle in tyhe straight line
function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size/4, 0 , Math.PI * 2)
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
    ctx.lineCap="round"   // Draw a line with rounded end caps:
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
function startDraw(e){
    isPressed=true
    x = e.offsetX;
    y = e.offsetY
}

function clearRect(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    restore_array= []
    index = -1
}

// undo last action
undoBtn.addEventListener("click", undoLast)



function undoLast(){
    if(index <= 0){
    clearRect()

    } else {
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0)
    }
}
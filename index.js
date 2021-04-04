const canvas = document.getElementById("canvas")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")
const value = document.getElementById("value")
const colorEl = document.getElementById("color")
const clear = document.getElementById("clear")
const undoBtn = document.getElementById("undo")


const ctx = canvas.getContext("2d");
let isPressed = false;
var size = 2;
var  color = "black"
let x;
let y;

let index = -1
let restore_array =[];

canvas.addEventListener("touchstart",startDraw)
canvas.addEventListener("mousedown" , startDraw)
canvas.addEventListener("touchmove", draw )
canvas.addEventListener("mousemove", draw )
canvas.addEventListener("touchend", stopDraw )
canvas.addEventListener("mouseup", stopDraw )
canvas.addEventListener("mouseout", stopDraw )

canvas.addEventListener("mouseup" ,stopDraw)
canvas.addEventListener("mousemove" , draw)

function stopDraw(e){
    e.preventDefault()
    x = undefined;
    y = undefined
    if (isPressed) {
        ctx.stroke()
        ctx.closePath()
        isPressed = false
    }
    if(e.type !="mouseout"){
        restore_array.push(ctx.getImageData(0,0, canvas.width, canvas.height))
        index+=1

    }
console.log(restore_array)
}
// mouse moive
function draw(e){
    e.preventDefault()
    if (isPressed) {
    const x2 =e.offsetX
    const y2 = e.offsetY

    drawLine(x, y, x2,y2)
    drawCircle(x2, y2)
        x = x2;
        y = y2
    }
}


// to draw a circle
function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size/2, 0 , Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1,y1 ,x2,y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
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
    size += 5
    if (size  >50){
        size = 50
    }
    updateSize()
})
decrease.addEventListener("click",()=>{
    size -= 5
    if (size < 5){
        size = 5
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
    restore_array=[]
    index = -1
}

// undo last action
undoBtn.addEventListener("click", undo)



function undo(){
    if(index<=0){
    clearRect()
    }else{
        index +=1
        restore_array.pop()
        ctx.putImageData(restore_array[index], 0,0)
    }
}
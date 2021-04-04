const canvas = document.getElementById("canvas")
const increase = document.getElementById("increase")
const decrease = document.getElementById("decrease")
const value = document.getElementById("value")
const colorEl = document.getElementById("color")
const clear = document.getElementById("clear")


const ctx = canvas.getContext("2d");
let isPressed = false;
var size = 10;
var  color = "black"
let x;
let y;

canvas.addEventListener("mousedown" , (e)=>{
  x = e.offsetX;
  y = e.offsetY;

 isPressed=true
})


canvas.addEventListener("mouseup" , (e) => {
x= undefined;
y =undefined

isPressed=false


})

canvas.addEventListener("mousemove" , (e) => {
    if(isPressed){
    const x2 = e.offsetX;
    const y2 = e.offsetY


    drawCircle(x2, y2)
    drawLine(x, y, x2,y2)
    x=x2;
    y=y2
    }
})

// to draw a circle
function drawCircle(x,y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0 , Math.PI * 2)
    ctx.fillStyle= color
    // ctx.stroke()
    ctx.fill()
}

function drawLine(x1,y1 ,x2,y2) {
    ctx.beginPath()
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2)
    ctx.strokeStyle = black;
    ctx.lineWidth = size * 2
    ctx.stroke()
}


//update size on the screen
function updateSize(){
    value.innerHTML = size
}

// button
increase.addEventListener("click",()=>{
    size+=2
    if (size  >30){
        size =30
    }
    updateSize()
})
decrease.addEventListener("click",()=>{
    size-=2
    if (size  <2){
        size =2
    }
    updateSize()
})
colorEl.addEventListener("change",(e)=> {
color= e.target.value
})


clear.addEventListener("click", ()=>{
    ctx.clearRect(0,0, canvas.width, canvas.height)
})
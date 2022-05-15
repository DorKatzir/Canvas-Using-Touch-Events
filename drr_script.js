console.log("testing...")

// Set up the canvas
let ctx = document.getElementById('my_canvas').getContext('2d')
ctx.strokeStyle = '#222222'
ctx.lineWith = 2

// Set up mouse events for drawing
let drawing = false
let mousePos = { x:0, y:0 }
let lastPos = mousePos

ctx.canvas.addEventListener("mousedown", function (e) {
    drawing = true
    lastPos = getMousePos(ctx.canvas, e)
}, {passive: false})

ctx.canvas.addEventListener("mouseup", function (e) {
    drawing = false
}, {passive: false})

ctx.canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(ctx.canvas, e)
}, {passive: false})


// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  let rect = canvasDom.getBoundingClientRect()
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
                window.setTimeout(callback, 1000/60)
           }
})()

// Draw to the canvas
function renderCanvas() {
  if (drawing) {
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()
    lastPos = mousePos
  }
}

// Allow for animation
(function drawLoop () {
  requestAnimFrame(drawLoop)
  renderCanvas()
})()



// Set up touch events for mobile, etc
ctx.canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(ctx.canvas, e)
    let touch = e.touches[0]
    let mouseEvent = new MouseEvent("mousedown", {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    })
    ctx.canvas.dispatchEvent(mouseEvent)
}, {passive: false})


ctx.canvas.addEventListener("touchend", function (e) {
    let mouseEvent = new MouseEvent("mouseup", {})
    ctx.canvas.dispatchEvent(mouseEvent)
}, {passive: false})


ctx.canvas.addEventListener("touchmove", function (e) {
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    })
    ctx.canvas.dispatchEvent(mouseEvent)
}, {passive: false})


// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}




// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == ctx.canvas) {
        e.preventDefault()
    }
}, {passive: false})

document.body.addEventListener("touchend", function (e) {
    if (e.target == ctx.canvas) {
        e.preventDefault()
    }
}, {passive: false})

document.body.addEventListener("touchmove", function (e) {
    if (e.target == ctx.canvas) {
        e.preventDefault()
    }
}, {passive: false})
// the head, ie the main circle that we control
let circle = new Head(startx(), starty, 10)

//// the base of the walker
//let square = new Square(startx(), starty+150, 70, {
//  friction: 1
//})

let hw = 30; // half-width of bucket
let hh = 60; // half-height of bucket
let bw = 5; // thickness
let base = new Shape(startx(), starty+150, [
  {x: -hw, y: -hh},
  {x: -hw, y: hh},
  {x: hw, y: hh},
  {x: hw, y: -hh},
  
  {x: hw-bw, y: -hh},
  {x: hw-bw, y: hh-bw},
  {x: -hw+bw, y: hh-bw},
  {x: -hw+bw, y: -hh},
])

// make a spring constraint attaching head to base
constraint(circle, base, {
  length: 200,
  stiffness: 0.01,
  damping: 0,
  pointB: {x: 0, y: -hh}
})

// keep the head attracted to a point above the circle.
// we update this pos location before every rendering
let pos = {x: width/2, y: 150};
constraint(circle, pos, {
  length: 0,
  stiffness: 0.0001,
  damping: 0.08,
  render: {visible: false},
})


function Head(x, y, r, options) {
  let head = new Circle(x, y, r, options);
  let forcex = 0.02;
  let forcey = 0.04;
  head.pushup = () => applyForceY(head.body, -forcey);
  head.pushdown = () => applyForceY(head.body, forcey);
  head.pushleft = () => applyForceX(head.body, -forcex);
  head.pushright = () => applyForceX(head.body, forcex);
  return head;
}

// controls with arrow keys
keyMap.ArrowUp = circle.pushup
keyMap.ArrowDown = circle.pushdown
keyMap.ArrowLeft = circle.pushleft
keyMap.ArrowRight = circle.pushright

// controls with mouse click
render.canvas.onclick = e => {
  let x = e.clientX;
  let y = e.clientY;
  if (x > base.pos().x)
    circle.pushright()
  if (x < base.pos().x)
    circle.pushleft()
  if (y < base.pos().y)
    circle.pushup()
  if (y > base.pos().y)
    circle.pushdown()
}

Events.on(render, 'beforeRender', event => {
  // reset the constraint pos to be directly above the base
  pos.x = base.pos().x;
  pos.y = Math.min(200, circle.pos().y) - 100;
  
  let w2 = width/2;
  let x = base.body.position.x;
  Render.lookAt(render, {
    min: {x: x - w2, y: 0},
    max: {x: x + w2, y: height}
  })
  
  score = 0
  raindrops.forEach(rd => {
    if (insideOf(rd, base))
      score++;
  })
  
})

Events.on(render, 'afterRender', event => {
  let ctx = render.context;
  ctx.font = "30px Arial"
  ctx.fillStyle = 'white'
  ctx.textAlign = 'left'
  ctx.fillText('Score: ' + score, 20, 50)
  
  if (base.pos().y > height + 100) {
    // game over!
    let ctx = render.context;
    ctx.font = "30px Arial";
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    ctx.fillText("Game Over", width/2, height/2);
  }
})
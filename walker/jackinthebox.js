// the head, ie the main circle that we control
let circle = new Head(startx(), starty, 10)

//// the base of the walker
//let square = new Square(startx(), starty+150, 70, {
//  friction: 1
//})

let hw = 50; // half-width of bucket
let hh = 40; // half-height of bucket
let bw = 15; // thickness
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
  
  
})

let best = 0;
Events.on(render, 'afterRender', event => {
  
  score = 0
  raindrops.forEach(rd => {
    if (insideOf(rd, base))
      score++;
  })
  if (score > best)
    best = score;
  
  let ctx = render.context;
  ctx.font = "30px Arial"
  ctx.fillStyle = 'white'
  ctx.textAlign = 'left'
  
  ctx.fillText('Score: ' + score, 20, 50)
  ctx.fillText('Best: ' + best, 20, 100)
  
  if (base.pos().y > height + 100) {
    // game over!
    ctx.font = "30px Arial";
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    ctx.fillText("Game Over", width/2, height/2);
  }
})



// ground blocks
let minx = -500;
let maxx = width + 5000;
for (var x=-500; x<width+5000; x+=300) {
  let r = new Rect(x, height-30, 150, 60, {isStatic: true})
//  Body.rotate(r.body, 0.3)
}

//// make some bodies (shapes)
//let bodies = [
//    Bodies.rectangle(startx(), starty, 80, 80),
//    Bodies.circle(startx(), starty+10, 40, 10),
//    Bodies.circle(startx(), starty, 40, 10)
//  ]
//add(bodies);

function rainx() {
  return render.bounds.min.x + Math.random() * width;
}
function rainy() {
  return render.bounds.min.y - Math.random() * height * 2;
}

let raindrops = [];
for (var i=0; i<500; i++) {
  raindrops.push(new Circle(rainx(), rainy(), 4))
}

let score = 0;
Events.on(render, 'beforeRender', event => {
  raindrops.forEach(rd => {
    if (rd.pos().y > height + 100)
      Body.setPosition(rd.body, {x: rainx(), y: rainy()})
  })
})
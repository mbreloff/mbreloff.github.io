let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Events = Matter.Events;

let engine = Engine.create(),
    world = engine.world,
    width = window.innerWidth-1,
    height = window.innerHeight-1,
    render = Render.create({
          element: document.body,
          engine: engine,
          options: {
            width: width, 
            height: height,
//            background: 'rgba(0,0,0,0)',
            wireframes: false
          }});
console.log(render)

// some helpers for coordinates
let centerx = width/2,
    starty = 50,
    bottom = height-60,
    startx = () => centerx + Math.random()*100;


function getBody(maybeBody) {
  return maybeBody.body ? maybeBody.body : maybeBody;
}

// convenience for adding to the World
function add(body) {
  World.add(world, getBody(body));
}
function constraint(bodyA, bodyB, options) {
  if (bodyA.x)
    options.pointA = bodyA;
  else
    options.bodyA = getBody(bodyA);
  if (bodyB.x)
    options.pointB = bodyB;
  else
    options.bodyB = getBody(bodyB);
  add(Constraint.create(options));
}


// -------------------------------------------

//let ground = new Rect(centerx, height-30, width*100, 60, {
//  isStatic: true,
//  friction: 0.7
//})

// ground blocks
for (var x=-500; x<width+5000; x+=300) {
  new Rect(x, height-30, 150, 60, {isStatic: true})
}

// make some bodies (shapes)
let bodies = [
    Bodies.rectangle(startx(), starty, 80, 80),
    Bodies.circle(startx(), starty+10, 40, 10),
    Bodies.circle(startx(), starty, 40, 10)
  ]
add(bodies);

// the head, ie the main circle that we control
let circle = new Circle(startx(), starty, 20)

// the base of the walker
let square = new Square(startx(), starty+150, 70, {
  friction: 1
})

// make a spring constraint attaching head to base
constraint(circle, square, {
  length: 200,
  stiffness: 0.01,
  damping: 0,
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

// -------------------------------------------

let keyMap = {
  'ArrowUp': circle.pushup,
  'ArrowDown': circle.pushdown,
  'ArrowLeft': circle.pushleft,
  'ArrowRight': circle.pushright,
  'f': () => pos.x += 10,
}

window.onkeydown = e => {
  let key = e.key;
  if (keyMap[key])
    keyMap[key]();
}

// start the simulation
Engine.run(engine);
Render.run(render);

Events.on(render, 'beforeRender', event => {
  // reset the constraint pos to be directly above the base
  pos.x = square.pos().x;
  pos.y = Math.min(200, circle.pos().y) - 100;
  
  let w2 = width/2;
  let x = square.body.position.x;
  Render.lookAt(render, {
    min: {x: x - w2, y: 0},
    max: {x: x + w2, y: height}
  });
})

Events.on(render, 'afterRender', event => {
  if (square.pos().y > height + 100) {
    // game over!
    let ctx = render.context;
    ctx.font = "30px Arial";
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    ctx.fillText("Game Over", width/2, height/2);
  }
})

function applyForceX(body, force) {
  Body.applyForce(
    body, 
    body.position, 
    {x: force, y: 0});
}
function applyForceY(body, force) {
  Body.applyForce(
    body, 
    body.position, 
    {x: 0, y: force});
}

function Circle(x, y, r, options) {
  this.body = Bodies.circle(x, y, r, options);
  add(this);
  this.pos = () => this.body.position;
  let forcex = 0.03;
  let forcey = 0.1;
  this.pushup = () => applyForceY(this.body, -forcey);
  this.pushdown = () => applyForceY(this.body, forcey);
  this.pushleft = () => applyForceX(this.body, -forcex);
  this.pushright = () => applyForceX(this.body, forcex);
}
function Rect(x, y, w, h, options) {
  this.body = Bodies.rectangle(x, y, w, h, options);
  add(this);
  this.pos = () => this.body.position;
}
function Square(x, y, w, options) {
  return new Rect(x, y, w, w, options);
}


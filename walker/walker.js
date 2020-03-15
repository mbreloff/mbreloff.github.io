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

// -------------------------------------------

// add keys to keyMap to register callbacks
let keyMap = {}
window.onkeydown = e => {
  let key = e.key;
  if (keyMap[key])
    keyMap[key]();
}

// start the simulation
Engine.run(engine);
Render.run(render);



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
  this.hw = r;
  this.pos = () => this.body.position;
}
function Rect(x, y, w, h, options) {
  this.body = Bodies.rectangle(x, y, w, h, options);
  add(this);
  this.hw = w/2;
  this.hh = h/2;
  this.pos = () => this.body.position;
}
function Square(x, y, w, options) {
  return new Rect(x, y, w, w, options);
}
function Shape(x, y, vertices, options) {
  this.body = Bodies.fromVertices(x, y, vertices, options);
  add(this);
  let minx = 0, miny = 0, maxx = 0, maxy = 0;
  vertices.forEach(v => {
    if (v.x < minx)
      minx = v.x;
    if (v.x > maxx)
      maxx = v.x;
    if (v.y < miny)
      miny = v.y;
    if (v.y > maxy)
      maxy = v.y;
  })
  this.hw = (maxx - minx) / 2;
  this.hh = (maxy - miny) / 2;
  this.pos = () => this.body.position;
}

function insideOf(a, b) {
  let ax = a.pos().x, ay = a.pos().y;
  let bx = b.pos().x, by = b.pos().y;
  return ax > bx - b.hw && ax < bx + b.hw
      && ay > by - b.hh && ay < by + hh;
}

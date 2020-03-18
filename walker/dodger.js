// -------------------------------------------
// add the ground

let floorDepth = 60;
let ground = new Rect(centerx, height-floorDepth/2, width*100, floorDepth, {
  isStatic: true,
  friction: 0.7
})
let floor = height - floorDepth;

// -------------------------------------------
// boulders

//for (var x=0; x<width*3; x+=250) {
//  let boulderSize = 10 + Math.random() * 60;
//  new Circle(x, floor-boulderSize, boulderSize)
//}

// -------------------------------------------
// body parts

// width and height of the whole person
// is relative to the height of the screen
let h = floor * 0.3;
let w = h * 0.25;

// this is the position where the top of the head is "pinned"
let pos = {x: width / 2, y: floor - h}

// these are the body parts
let head = new Circle(pos.x, pos.y, w * 0.4)
let chest = new Rect(pos.x, pos.y, w, h * 0.3)

// -------------------------------------------
// constraints/joints connecting body parts

// head pinned
constraint(head, pos, {
  length: 0,
  pointA: {x: 0, y: -head.hh}
})

// head connected to chest
constraint(head, chest, {
  length: 0,
  pointA: {x: 0, y: head.hh},
  pointB: {x: 0, y: -chest.hh}
})


// -------------------------------------------


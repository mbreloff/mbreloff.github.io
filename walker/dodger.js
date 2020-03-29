// -------------------------------------------
// add the ground

let groundCategory = 0x0016;
let floorDepth = 60;
let ground = new Rect(centerx, height-floorDepth/2, width*100, floorDepth, {
  isStatic: true,
  friction: 0.7,
  collisionFilter: {
    category: groundCategory
  }
})
let floor = height - floorDepth;

// -------------------------------------------
// an invisible floor for the head to rest on/above

let defaultCategory = 0x0001
let headCategory = 0x0002
let hyperextensionBlockerL = 0x0004  // stop lower legs from hyperextending
let hyperextensionBlockerR = 0x0008  // stop lower legs from hyperextending

let headCollision = {
  category: headCategory,
  mask: headCategory
}
let groundHead = new Rect(centerx, (height-floorDepth)*0.82, width*100, floorDepth, {
  isStatic: true,
  friction: 0.7,
  collisionFilter: headCollision,
  render: {
    visible: true
  }
})
console.log(groundHead)

// -------------------------------------------
// boulders

// for (var x=0; x<width*3; x+=250) {
//  let boulderSize = 10 + Math.random() * 60;
//  new Circle(x, floor-boulderSize, boulderSize)
// }

// -------------------------------------------
// body parts

// width and height of the whole person
// is relative to the height of the screen
let h = floor * 0.3;
let w = h * 0.25;

// this is the position where the top of the head is "pinned"
let pos = {x: width / 5, y: floor - h - 100}

let noCollision = {
  collisionFilter: 0
}
let normalCollision = {
  collisionFilter: {
    mask: defaultCategory
  }
}

// these are the body parts
let head = new Circle(pos.x, pos.y, w * 0.4, {collisionFilter: headCollision})
let armL = new Rect(pos.x, pos.y, w * 0.2, h * 0.3, noCollision)
let chest = new Rect(pos.x, pos.y, w, h * 0.3, normalCollision)
let armR = new Rect(pos.x, pos.y, w * 0.2, h * 0.3, noCollision)
let legUL = new Rect(pos.x, pos.y, w * 0.4, h * 0.25, noCollision)
let legUR = new Rect(pos.x, pos.y, w * 0.4, h * 0.25, noCollision)

let blockerFilterL = {
  category: hyperextensionBlockerL,
  mask: hyperextensionBlockerL
}
let blockerFilterR = {
  category: hyperextensionBlockerR,
  mask: hyperextensionBlockerR | groundCategory
}

let legLL = new Rect(pos.x, pos.y, w * 0.2, h * 0.25, {collisionFilter: blockerFilterL})
let legLR = new Rect(pos.x, pos.y, w * 0.2, h * 0.25, {collisionFilter: blockerFilterR})

let blockerL = new Circle(pos.x, pos.y, w*0.2, {collisionFilter: blockerFilterL})
let blockerR = new Circle(pos.x, pos.y, w*0.2, {collisionFilter: blockerFilterR})
let blockerL2 = new Circle(pos.x, pos.y, w*0.2, {collisionFilter: blockerFilterL})
let blockerR2 = new Circle(pos.x, pos.y, w*0.2, {collisionFilter: blockerFilterR})

// -------------------------------------------
// constraints/joints connecting body parts

// // head pinned
// constraint(head, pos, {
//   length: 0,
//   pointA: {x: 0, y: -head.hh}
// })

// head connected to chest
constraint(head, chest, {
  length: 0,
  pointA: {x: 0, y: head.hh},
  pointB: {x: 0, y: -chest.hh}
})

// arms to chest
constraint(chest, armL, {
  length: 0,
  pointA: {x: 0, y: -chest.hh * 0.9},
  pointB: {x: 0, y: -armL.hh * 0.9}
})
constraint(chest, armR, {
  length: 0,
  pointA: {x: 0, y: -chest.hh * 0.9},
  pointB: {x: 0, y: -armR.hh * 0.9}
})

// upper legs to chest
constraint(chest, legUL, {
  length: 0,
  pointA: {x: 0, y: chest.hh},
  pointB: {x: 0, y: -legUL.hh}
})
constraint(chest, legUR, {
  length: 0,
  pointA: {x: 0, y: chest.hh},
  pointB: {x: 0, y: -legUR.hh}
})

// upper legs to lower legs
constraint(legUL, legLL, {
  length: 0,
  pointA: {x: 0, y: legUL.hh},
  pointB: {x: 0, y: -legLL.hh}
})
constraint(legUR, legLR, {
  length: 0,
  pointA: {x: 0, y: legUR.hh},
  pointB: {x: 0, y: -legLR.hh}
})

// upper legs to lower leg blockers (to prevent hyperextension)
constraint(legUL, blockerL, {
  length: 0,
  pointA: {x: legUL.hw + blockerL.hw, y: legUL.hh + legLL.hh},
  pointB: {x: 0, y: 0}
})
constraint(legUR, blockerR, {
  length: 0,
  pointA: {x: legUR.hw + blockerR.hw, y: legUR.hh + legLR.hh},
  pointB: {x: 0, y: 0}
})

// blockers to prevent lower leg going through upper leg
constraint(legUL, blockerL2, {
  length: 0,
  pointA: {x: 0, y: 0},
  pointB: {x: 0, y: 0}
})
constraint(legUR, blockerR2, {
  length: 0,
  pointA: {x: 0, y: 0},
  pointB: {x: 0, y: 0}
})

let a = Math.PI/20;
function rot(body, angle) {
  Body.setAngularVelocity(body, angle)
}
keyMap.ArrowRight = () => {
  rot(legUR.body, -a)
  rot(legUL.body, a)
}
keyMap.ArrowLeft = () => {
  rot(legUR.body, a)
  rot(legUL.body, -a)
}

// let forceScale = 0.8
// let forceHead = 0.01 * forceScale
// let forceLeg = 0.03 * forceScale
// let forceArm = 0.002 * forceScale
// let forceLegLx = -0.02 * forceScale
// let forceLegLy = 0.10 * forceScale

// // controls with arrow keys
// keyMap.ArrowRight = () => {
//   applyForceX(legUR.body, forceLeg)
//   applyForceX(armR.body, -forceArm)
//   applyForceX(armL.body, forceArm)
//   applyForceX(head.body, forceHead)
//   applyForce(legLL.body, forceLegLx, forceLegLy)
// }
// keyMap.ArrowLeft = () => {
//   applyForceX(legUL.body, forceLeg)
//   applyForceX(armL.body, -forceArm)
//   applyForceX(armR.body, forceArm)
//   applyForceX(head.body, forceHead)
//   applyForce(legLR.body, forceLegLx, forceLegLy)
// }

// -------------------------------------------

console.log(world)

// var geometry = new THREE.BoxGeometry(10,10,10);
// // basic material has no depth to it
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// // standard is better... it'll have depth
// var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// // var material = new THREE.MeshDepthMaterial();
// var cube = new THREE.Mesh( geometry, material );
// console.log(cube)
// scene.add( cube );
// camera.position.z = 1000;

let shapes = [];

// assumes shape contains a body field, and that will be a matter.js Body
function make3d(label, shape, leftOrRight) {
  console.log(label, shape)
  shape.leftOrRight = leftOrRight;
  let geometry;
  if (shape.body.label == 'Circle Body') {
    geometry = new THREE.SphereGeometry(shape.hw)
  }
  else if (shape.body.label == 'Rectangle Body') {
    geometry = new THREE.BoxGeometry(shape.hw * 2, shape.hh * 2, shape.hw * 2)
  }
  else
    console.log(shape.body.label)
  let material = new THREE.MeshStandardMaterial({
    color: shape.body.render.fillStyle
  })
  shape.mesh = new THREE.Mesh(geometry, material);
  scene.add(shape.mesh);
  shapes.push(shape);
}

make3d('ground', ground)
make3d('head', head)
make3d('armL', armL, 'l')
make3d('chest', chest)
make3d('armR', armR, 'r')
make3d('legUL', legUL, 'l')
make3d('legUR', legUR, 'r')
make3d('legLL', legLL, 'l')
make3d('legLR', legLR, 'r')


// add a point light source which will give shadows
var pointLight2 = new THREE.PointLight( 0xffffff, 1 );
pointLight2.position.set( 25, 20, 25 );
scene.add( pointLight2 );

// called on every frame
function updateScene() {
  // // make the cubes rotate a little bit each frame
  // cube.rotation.x += 0.04;
  // cube.rotation.y += 0.01;

  shapes.forEach(shape => {
    shape.mesh.position.x = shape.body.position.x;
    shape.mesh.position.y = -shape.body.position.y;
    if (shape.leftOrRight == 'l')
      shape.mesh.position.z = chest.hw
    else if (shape.leftOrRight == 'r')
      shape.mesh.position.z = -chest.hw

    shape.mesh.rotation.z = -shape.body.angle
  })

  camera.position.x = chest.body.position.x + 100
  camera.position.y = -chest.body.position.y
  camera.position.z = 200
  camera.lookAt(chest.body.position.x, -chest.body.position.y, 0)

  pointLight.position.set( camera.position.x, -camera.position.y, camera.position.z );
  pointLight2.position.set( camera.position.x, 500-camera.position.y, camera.position.z );
}

// start the animation!
let last_ts = undefined;
function animate() {
  requestAnimationFrame( animate );

  let now = Date.now()
  let delta = last_ts ? 0 : now-last_ts;
  last_ts = now;
  Engine.update(engine, delta)

  updateScene();
  renderer.render( scene, camera );
}
animate();
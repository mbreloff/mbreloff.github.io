// setup the scene and three.js renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// pull the camera back so we can see the cube
camera.position.z = 5;

// add a light source
// white light with half intensity
// it lights everything equally so no shadows
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
scene.add( ambientLight )

// add a point light source which will give shadows
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 20, 25 );
scene.add( pointLight );

// // start the animation!
// function animate() {
// 	requestAnimationFrame( animate );
//     updateScene();
//     renderer.render( scene, camera );
// }
// animate();

// // TODO: define a setupScene method elsewhere!
// function setupScene() {
//     // add a cube
//     var geometry = new THREE.BoxGeometry();

//     // basic material has no depth to it
//     var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//     // standard is better... it'll have depth
//     var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
//     // var material = new THREE.MeshDepthMaterial();
//     var cube = new THREE.Mesh( geometry, material );
//     scene.add( cube );

//     // add a larger wireframe box
//     var geometry = new THREE.BoxGeometry( 3, 3, 3)
//     var material = new THREE.MeshBasicMaterial( {
//         color: "#dadada", 
//         wireframe: true, 
//         transparent: true
//     })
//     var wireframeCube = new THREE.Mesh ( geometry, material )
//     scene.add( wireframeCube )
// }

// // TODO: define an updateScene method elsewhere!
// function updateScene() {
//     // make the cubes rotate a little bit each frame
//     cube.rotation.x += 0.04;
//     cube.rotation.y += 0.01;
//     wireframeCube.rotation.x -= 0.01;
//     wireframeCube.rotation.y -= 0.01;
// }
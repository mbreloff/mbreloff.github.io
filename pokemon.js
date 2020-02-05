let names = ['Micah', 'Beck', 'Giorgi'];
let i = 0;

function setPokemon(pokemon) {
  document.querySelectorAll('#pokemon-name').item(0).innerHTML = pokemon.name;
  document.querySelectorAll('#hp').item(0).innerHTML = pokemon.hp;
  document.querySelectorAll('.attack-name').item(0).innerHTML = pokemon.attack;
  document.querySelectorAll('.damage').item(0).innerHTML = pokemon.damage;
  document.querySelectorAll('.picture').item(0).setAttribute('src', pokemon.picture);
  document.querySelectorAll('#type').item(0).setAttribute('src', pokemon.type);
  document.querySelectorAll('.card').item(0).style.backgroundColor= pokemon.background;
}

let charmander = {
  name: 'Charmander',
  hp: 80,
  attack: 'Fire Blast',
  damage: 40,
  picture: 'images/charmander.png',
  type: 'images/energy_fire.png',
  background: 'red',
}
let bolbusorre = {
  name: 'bolbusorre',
  hp: 50,
  attack: 'vine throe',
  damage: 30,
  picture: 'images/bulbasaur.png',
  type: 'images/energy_grass.png',
  background: 'green',
}
let pikachu = {
  name: 'pikachu',
  hp: 120,
  attack: 'thunderbolt',
  damage: 70,
  picture: 'images/pikachu.png',
  type:'images/energy_lightning.png',
  background: 'yellow',
}

window.setTimeout(() => {
  setPokemon(charmander);
}, 3000);

window.setTimeout(() => {
  setPokemon(bolbusorre);
}, 6000);

window.setTimeout(()=>{
  setPokemon(pikachu);
}, 9000);

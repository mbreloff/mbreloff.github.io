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
  hp: 100,
  attack: 'Fire Blast',
  damage: 50,
  picture: 'images/charmander.png',
  type: 'images/energy_fire.png',
  background: 'red'
}

window.setTimeout(() => {
  setPokemon(charmander);
}, 3000);
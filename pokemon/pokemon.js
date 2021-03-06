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
  let evolvance = pokemon.evolvance ? pokemon.evolvance : 'BASIC'
  document.querySelectorAll('.evolvance').item(0).innerHTML = evolvance;
}

let ekans = {
  name: 'Ekans',
  hp: 60,
  attack: 'Tail whap',
  damage: 30,
  picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png',
  type: 'images/energy_psychic.png',
  background: '#9871a3',
  evolvance: 'BASIC'
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
let squirtle = {
  name: 'squirtle',
  hp: 100,
  attack: 'woter blast',
  damage: 50,
  picture: 'images/squirtle.png',
  type: 'images/energy_water.png',
  background: 'blue',
}
let staryu = {
  name: 'staryu',
  hp:  50,
  attack: 'splash',
  damage: 10,
  picture: 'images/staryu.png',
  type: 'images/energy_water.png',
  background: 'blue',
}
let sandchru = {
  name: 'sandchru',
  hp: 90,
  attack: 'splits',
  damage: 100,
  picture: 'images/sandchru.png',
  type: 'images/energy_ground.png',
  background: 'tan',
}
let onix = {
  name: 'onix',
  hp:  '110',
  attack: 'rockblast',
  damage: 120,
  picture: 'images/onix.png',
  type: 'images/energy_rock.png',
  background: '#5e4d1e',
  
}
let kyogregx  =  {
  name: 'kyogre GX',
  hp: '130',
  attack: 'vortex',
  damage: '2190',
  picture: 'images/kyogre.png',
  type: 'images/energy_water.png',
  background: 'lightblue', 
  
  
}
let growlithe = {
  name: 'growlithe',
  hp: '90',
  attack: 'scrach',
  damage: '30',
  picture: 'images/growlithe.png',
  type: 'images/energy_fire.png',
  background: 'orange',
}

let arcanine = {
  name: 'Arcanine',
  hp: 120,
  attack: 'Sharp Fang',
  damage: 90,
  picture: 'images/arcanine2.png',
  type: 'images/energy_fire.png',
  background: 'orange',
  evolvance: 'Stage 1',
}
let rillabom = {
  name: 'rillabom',
  hp:'190',
  attack: 'drum roll',
//  'drum betinge',
  damage: 90,
  picture: 'images/rillboom.png',
  type: 'images/energy_grass.png',
  background: 'green',
  evolvance: 'stage 2',
}

let cards = [
  ekans,
  charmander,
  staryu,
  bolbusorre,
  pikachu,
  squirtle,
  sandchru,
  onix,
  kyogregx,
  growlithe,
  arcanine,
  rillabom,
]

cards.forEach(card => {
  let nameLink = document.createElement('div');
  nameLink.className = 'name-link';
  nameLink.innerHTML = card.name;
  nameLink.onclick = () => setPokemon(card);
  document.querySelectorAll('#name-list')[0].appendChild(nameLink);
})

/*
window.setTimeout(() => {
  setPokemon(charmander);
}, 3000);

window.setTimeout(() => {
  setPokemon(staryu);
}, 6000);

window.setTimeout(()=>{
  setPokemon(pikachu);
}, 9000);

window.setTimeout(() => {
  setPokemon(squirtle);
}, 10000);
*/                                       
                  
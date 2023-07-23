async function getAllPokemon() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon"
    );
    const data = await response.json();
    var pokemonResult = data.results;

    // for (pokemon of pokemonResult) {
    //   if (pokemon.name.length != 0) {
    //     let pokemonInfo = await fetch(pokemon.url);
    //     let pokemonData = await pokemonInfo.json();
    //     pokemon.specs = pokemonData;
    //   }
    // }
    console.log(pokemonResult);
    return pokemonResult;

  } catch (e) {
    console.error(e);
  }
}

async function getSpecPokemon() {
  try {
    var allPokemon = await getAllPokemon();
    var pokemonData = [];
    
    for (let pokemon of allPokemon) {
      let response = await fetch(pokemon.url);
      const pokemonInfo = await response.json();
      pokemonData.push(pokemonInfo);
      console.log(pokemonInfo);
    }
    return pokemonData;
  
  } catch (e) {
    console.error(e);
  }
}


const originalDiv = document.querySelector("#templateRow");

function fillCardData(card, pokemonInfo, i) {
  card.setAttribute("id", "pokemon-" + i);
  card.querySelector(".card-title").innerText = pokemonInfo.name;
  // card.querySelector(".card-text").innerText =
  //   "Abilities: " + pokemonInfo.abilities.ability.name;
  const abilities = pokemonInfo.abilities.map((ability) => ability.ability.name);
  card.querySelector(".card-text").innerText = "Abilities: " + abilities.join(", ");
}


async function generateContent(originalDiv) {
  let cloned;
  let clonedCard;
  let card;
  let data = await getSpecPokemon();

  data.forEach(function (value, i) {
    if (i % 3 === 0) {
      //I begin new div with first card
      cloned = originalDiv.cloneNode(true);
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else if (i % 3 === 1) {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
    } else {
      clonedCard = cloned.querySelector(".col").cloneNode(true);
      card = clonedCard.querySelector(".card");
      fillCardData(card, value, i);
      cloned.appendChild(clonedCard);
      cloned.removeChild(cloned.querySelector(".col"));
      document.querySelector(".container").appendChild(cloned);
    }
  });
  document.querySelector(".container").removeChild(originalDiv);
}

generateContent(originalDiv);

async function getAllObjects() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon"
    );

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function getSpecificObject(parameter) {
  try {
    let pokemonInfo = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${parameter}`
    );
    let singleObj = await pokemonInfo.json();
    return singleObj;
  } catch (e) {
    console.error(e);
  }
}
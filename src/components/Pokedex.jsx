import { useState } from 'react';
import "../App.css";


export default function Pokedex() {

  document.body.style.backgroundImage = "url(bg.jpg)";
  document.body.style.backgroundSize = "cover";

  const [pokemonData, setPokemonData] = useState([]);

  //Stores form input
  let [formData, setFormData] = useState({
    name: "",
    type: "",
    weaknesses: ""
  });


  fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    setPokemonData(data.pokemon);
  })
  .catch((err) => {
    console.error(err);
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
    [name]: value.charAt(0).toUpperCase() + value.slice(1)
    }));
  };

  

  const handleSubmit = (event) => {

    event.preventDefault();

    //Clears previous elements from the DOM
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    let filteredPokemon = pokemonData;

    
    //Name
    if(formData.name !== "") {
      for(let i = filteredPokemon.length - 1; i >= 0; i--) {
        if(!filteredPokemon[i].name.startsWith(formData.name)) {
          filteredPokemon.splice(i, 1);
        }
      }
    }

    //Type
    if(formData.type !== "") {
      for(let i = filteredPokemon.length - 1; i >= 0; i--) {
        if(!filteredPokemon[i].type.includes(formData.type)) {
          filteredPokemon.splice(i, 1);
        } 
      }
    }

    //Weakness
    if(formData.weaknesses !== "") {
      for(let i = filteredPokemon.length - 1; i >= 0; i--) {
        if(!filteredPokemon[i].weaknesses.includes(formData.weaknesses)) {
          filteredPokemon.splice(i, 1);
        }
      }
    }

    //Render
    for(let i = 0; i < filteredPokemon.length; i++) {
      const pokemonContainer = document.createElement("span");
      const pokemonImage = document.createElement("img");
      pokemonImage.src = filteredPokemon[i].img;
      const pokemonName = document.createElement("a");
      pokemonName.textContent = filteredPokemon[i].name;
      pokemonName.href = `/details/${filteredPokemon[i].name}`;
      pokemonName.style.color = "#00ff00";
      pokemonContainer.appendChild(pokemonImage);
      pokemonContainer.appendChild(pokemonName);
      const getContainer = document.getElementById("output");
      getContainer.appendChild(pokemonContainer);
      pokemonContainer.style.display = " inline grid";
      pokemonContainer.style.marginRight = "3rem";

    }


  } 


  return (
    <>
      <h1 id='title'>Pokedex</h1>

      <form id='form' onSubmit={handleSubmit}>
          <span>
            <label htmlFor="name" id='textLabel'>Name</label>
            <input 
            type="text"
            autoComplete='off'
            name='name'
            id='formText' 
            onChange={handleChange} 
            value={formData.name} />
          </span>

          <span>
            <label htmlFor="type" id='typeLabel'>Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange}>
              <option value="">Any</option>
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Electric">Electric</option>
              <option value="Bug">Bug</option>
              <option value="Flying">Flying</option>
              <option value="Ground">Ground</option>
              <option value="Rock">Rock</option>
              <option value="Poison">Poison</option>
              <option value="Fighting">Fighting</option>
              <option value="Steel">Steel</option>
              <option value="Psychic">Psychic</option>
              <option value="Ice">Ice</option>
              <option value="Ghost">Ghost</option>
              <option value="Dragon">Dragon</option>
            </select>
          </span>

          <span>
            <label htmlFor="weaknesses" id='weaknessLabel'>Weakness</label>
            <select name="weaknesses" id="weaknesses" value={formData.weaknesses} onChange={handleChange}>
              <option value="">Any</option>
              <option value="Normal">Normal</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              <option value="Electric">Electric</option>
              <option value="Bug">Bug</option>
              <option value="Flying">Flying</option>
              <option value="Ground">Ground</option>
              <option value="Rock">Rock</option>
              <option value="Poison">Poison</option>
              <option value="Fighting">Fighting</option>
              <option value="Steel">Steel</option>
              <option value="Psychic">Psychic</option>
              <option value="Ice">Ice</option>
              <option value="Ghost">Ghost</option>
              <option value="Dragon">Dragon</option>
            </select>
          </span>

          <span  id='submitButton'>
            <input type="submit" />
          </span>

      </form>

      <div id='output'>
        
      </div>
    </>
  )
}
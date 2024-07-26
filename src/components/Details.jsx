import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Details() {

    const { pokemonID } = useParams();
    let hasRan = false;

    useEffect(() => {
      fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
          .then((res) => res.json())
          .then((data) => {
              renderData(data);
          })
          .catch((err) => {
              console.error(err);
          });
    }, []);

    function renderData(data) {

      //Without this it runs twice
      if(hasRan === false) {
        let idNum = 0;

        //Get id number
        for(let i = 0; i < data.pokemon.length; i++) {
          if(pokemonID == data.pokemon[i].name) {
            idNum = data.pokemon[i].id - 1;
          }
        }

        const pokemonContainer = document.createElement("div");

        const pokemonImage = document.createElement("img");
        pokemonImage.src = data.pokemon[idNum].img;
        pokemonImage.style.width = "300px";
        pokemonImage.style.height = "300px";

        const pokemonNum = document.createElement("p");
        pokemonNum.textContent = `#${data.pokemon[idNum].id}`;

        const pokemonType = document.createElement("p");
        pokemonType.textContent = `Type: ${data.pokemon[idNum].type}`;

        const pokemonWeakness = document.createElement("p");
        pokemonWeakness.textContent = `Weaknesses: ${data.pokemon[idNum].weaknesses}`;

        //Gets evolutions
        const pokemonEvolutions = document.createElement("p");
        if(data.pokemon[idNum].next_evolution !== undefined) {
          const evoLength = data.pokemon[idNum].next_evolution.length;
          if(evoLength == 1) {
            pokemonEvolutions.textContent = `Evolutions: ${data.pokemon[idNum].next_evolution[0].name}`;
          }
          else if (evoLength == 2) {
            pokemonEvolutions.textContent = `Evolutions: ${data.pokemon[idNum].next_evolution[0].name}, ${data.pokemon[idNum].next_evolution[1].name}`;
          }
          else if (evoLength == 3) {
            pokemonEvolutions.textContent = `Evolutions: ${data.pokemon[idNum].next_evolution[0].name}, ${data.pokemon[idNum].next_evolution[1].name}, ${data.pokemon[idNum].next_evolution[2].name}`;
          }
          else {
            pokemonEvolutions.textContent = `Evolutions: None`;
          }
        }

        //Gets previous evolutions
        const prevEvolutions = document.createElement("p");
        if(data.pokemon[idNum].prev_evolution !== undefined) {
          const prevEvoLength = data.pokemon[idNum].prev_evolution.length;
          if(prevEvoLength == 1) {
            prevEvolutions.textContent = `Evolved From: ${data.pokemon[idNum].prev_evolution[0].name}`;
          }
          else if(prevEvoLength == 2) {
            prevEvolutions.textContent = `Evolved From: ${data.pokemon[idNum].prev_evolution[0].name}, ${data.pokemon[idNum].prev_evolution[1].name}`;
          }
          else {
            prevEvolutions.textContent = `Evolved From: None`;
          }
        }

        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonNum);
        pokemonContainer.appendChild(pokemonType);
        pokemonContainer.appendChild(pokemonWeakness);
        pokemonContainer.appendChild(pokemonEvolutions);
        pokemonContainer.appendChild(prevEvolutions);

        const renderer = document.getElementById("renderer");
        renderer.appendChild(pokemonContainer);

        hasRan = true;
      }

    }

    

    return (
        <>
            <h1>{pokemonID}</h1>

            <div id="renderer">

            </div>

            <Link to={"/"}>
                <button id="homeButton">Home</button>
            </Link>
            
        </>
    )
}
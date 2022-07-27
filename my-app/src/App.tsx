import axios from "axios"
import { useState } from 'react';
import './App.css';

function App() {
  //Declaring new state vairable which we are gonna call "pokemonName"
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined); //State vairable to sotre info from API

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2"
  return (
    <div>
      <h1>
        Pokemon Search
      </h1>

      <div>
        <label>Pokemon Name</label>
        <br />
        <input
          type='text'
          id='pokemon-name'
          name='pokmon-name'
          onChange={e => setPokemonName(e.target.value)}
        />
        <br />
        <button onClick={search}>
          Search
        </button>
      </div>

      <p>
        You have entered {pokemonName}
      </p>
      {pokemonInfo === undefined ?
        (
          //If true
          <p>Pokemon not found</p>
        )
        :
        (
          //If false
          <div id="pokemon-result">
            <img src={pokemonInfo.sprites.other.dream_world.front_default} />
          </div>
        )}
    </div>
  );

  function search() {
    axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName).then((res) => {
      setPokemonInfo(res.data);
    });
  }
}

export default App;

import React, { useEffect, useState } from 'react';
import Base from './Base';

function PokeWea() {
    const [pokemonList, setPokemonList] = useState(null);

    useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener la lista de Pokémon');
          }
          return response.json();
        })
        .then(data => {
          setPokemonList(data.results);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

  return (
    <>
    <div>
      <h1>Lista de Pokémon</h1>
      {pokemonList ? (
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>{pokemon.name} 
            a
            </li>
            
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
    </>
  );
}

export default PokeWea;

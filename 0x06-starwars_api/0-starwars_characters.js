#!/usr/bin/node
const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  if (response.statusCode !== 200) {
    console.error('Status code:', response.statusCode);
    return;
  }
  
  const movieData = JSON.parse(body);
  
  function fetchCharacter(characterUrl) {
    request(characterUrl, (charError, charResponse, charBody) => {
      if (charError) {
        console.error('Error:', charError);
        return;
      }
      
      if (charResponse.statusCode !== 200) {
        console.error('Status code:', charResponse.statusCode);
        return;
      }
      
      const characterData = JSON.parse(charBody);
      console.log(characterData.name);
      
      if (movieData.characters.length > 0) {
        fetchCharacter(movieData.characters.shift());
      }
    });
  }
  
  fetchCharacter(movieData.characters.shift());
});

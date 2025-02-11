import { readJSON } from '../utils.js';
import { randomUUID } from "crypto"; //modulo de node para generar ids unicos
//leer el archivo movies.json
const movies = readJSON('./movies.json')

export class MovieModel {
  static async  getAll  ({ genre }){
    if (genre) {
      //filterMovies es un array de peliculas que cumple con la condicion
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  };
  static async getById({id}) {
    const movie = movies.find((movie) => movie.id == id);
    return movie;
  }

  static async create({body}) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...body,
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete ({id}) {
    const movieIndex = movies.findIndex(
        (movie) => movie.id.toString() === id.toString()
      );

    if (movieIndex === -1) return false;
    movies.splice(movieIndex, 1);
    return true;
  }    
  
  static async update ({id, body}) {
    const movieIndex = movies.findIndex(
      (movie) => movie.id.toString() === id.toString()
    );

    if (movieIndex === -1) return false;
    movies[movieIndex] = { ...movies[movieIndex], ...body };
    return movies[movieIndex];
  }
}

//REALIZAMOS LA LOGICA DE NEGOCIO DE NUESTRA APLICACION
//EN ESTE CASO, LA LOGICA DE NEGOCIO ES MANIPULAR UN ARRAY DE PELICULAS
//PARA SIMULAR UNA BASE DE DATOS
//ESTA CLASE TIENE METODOS ESTATICOS QUE MANIPULAN EL ARRAY DE PELICULAS
//Y DEVUELVEN UNA RESPUESTA QUE SE VA A ENVIAR AL CLIENTE
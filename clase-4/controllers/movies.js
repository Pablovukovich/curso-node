import { MovieModel } from '../models/movie.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
    static async getAll (req, res) {
        //obtener el genero de la query
         const { genre } = req.query;
         //obtener todas las peliculas
         const movies = await MovieModel.getAll({ genre });
         //que es lo que renderiza
         res.json(movies);  
    }

    static async getById(req, res) {
        const { id } = req.params;
        const movie = await MovieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not found" });
    }

    static async create(req, res) {
        const result = validateMovie(req.body);
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        const newMovie = await MovieModel.create({ body: result.data });
        res.status(201).json(newMovie);
    }

    static async update(req, res) {
        console.log("ID recibido:", req.params.id);

        //validar el body de la request
        const result = validatePartialMovie(req.body);
      
        //si hay errores, devolver un 400
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
      
        const { id } = req.params;
        const updateMovie = await MovieModel.update({ id, body: result.data });
        return res.json(updateMovie);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const result = await MovieModel.delete({ id });
        if (result === false) {
          return res.status(404).json({ message: "Movie not found" });
        }
        res.status(204).send();
    }
}

//Procesa la lógica y responde a las solicitudes de la ruta /peliculas
//GET /peliculas -> devuelve todas las películas   
//GET /peliculas/:id -> devuelve una película por id
//POST /peliculas -> crea una nueva película
//PUT /peliculas/:id -> actualiza una película por id
//DELETE /peliculas/:id -> elimina una película por id

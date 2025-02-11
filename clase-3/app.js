const express = require("express"); //commonJS
const movies = require("./movies.json"); //importar el modulo movies
const crypto = require("crypto"); //modulo de node para generar ids unicos
const { validateMovie, validatePartialMovie } = require("./schemas/movies"); //importar la funcion validarMovie
const cors = require("cors"); //importar el modulo cors
const app = express();
app.disable("x-powered-by"); //desactivar la cabecera x-powered-by
app.use(express.json()); //middleware para parsear el body de la request
app.use(cors()); //middleware para habilitar cors
const PORT = 3000; //puerto donde va a escuchar el servidor

//recuperar peliculas y filtrar por genero
//todos los recursos que sean MOVIES se identifica con /peliculas
app.get("/peliculas", (req, res) => {
  //obtener el genero de la query
  const {genre} = req.query;
  //si el genero existe, filtrar las peliculas por genero
  if (genre) {
    //filterMovies es un array de peliculas que cumple con la condicion
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filterMovies);
  }
  //si no existe el genero, devolver todas las peliculas
  res.json(movies);
});

//recuperar una pelicula por id
app.get("/peliculas/:id", (req, res) => {
  //path to regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie not found" });
});

//crear una pelicula
app.post('/peliculas', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

//actualizar una pelicula (solo una parte)
app.patch('/peliculas/:id', (req, res) => {

  console.log("ID recibido:", req.params.id);

  //validar el body de la request
  const result = validatePartialMovie(req.body);

  //si hay errores, devolver un 400
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  
  const { id } = req.params
  console.log("IDs en movies.json:", movies.map(m => m.id)); // Ver todos los IDs
  const movieIndex = movies.findIndex(movie => movie.id.toString() === id.toString());
  console.log("Índice encontrado:", movieIndex);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  console.log("Película actualizada:", updateMovie);
  return res.json(updateMovie)
});  


app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});

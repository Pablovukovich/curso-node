import express, { json } from "express"; //commonJS
import { moviesRouter } from "./routes/movies.js"; //importar el router de movies
import { corsMiddleware } from "./middleware/cors.js";

//crear una aplicacion de express
const app = express();

//middlewares
app.disable("x-powered-by"); //desactivar la cabecera x-powered-by
app.use(json()); //middleware para parsear el body de la request
app.use(corsMiddleware); //middleware para habilitar cors

const PORT = process.env.PORT ?? 3000; //puerto donde va a escuchar el servidor

//montar el router de movies
app.use("/peliculas", moviesRouter);

app.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});

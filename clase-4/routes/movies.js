import { Router } from "express";
import { MovieController } from "../controllers/movies.js";


export const moviesRouter = Router();

//recuperar peliculas y filtrar por genero
//todos los recursos que sean MOVIES se identifica con /peliculas
moviesRouter.get("/", MovieController.getAll);

//recuperar una pelicula por id
moviesRouter.get("/:id", MovieController.getById )

//crear una pelicula
moviesRouter.post("/", MovieController.create);

//actualizar una pelicula (solo una parte)
moviesRouter.patch("/:id", MovieController.update);

//eliminar una pelicula
moviesRouter.delete("/:id", MovieController.delete);

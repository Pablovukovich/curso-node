import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '5000', 
    password: '',
    database: 'moviesdb'
}

// Conexión a la base de datos
const conection = await mysql.createConnection(config);

export class MovieModel {
    static async getAll({ genre }) {
        if (!genre) {
            // Si no se proporciona un género, podríamos retornar todas las películas o un array vacío
            return [];
        }
    
        // Convertir el nombre del género a minúsculas
        const lowerCaseGenre = genre.toLowerCase();
    
        // Obtener el ID del género
        const [genres] = await conection.execute(
            "SELECT id FROM genre WHERE LOWER(name) = ?",
            [lowerCaseGenre]
        );
    
        // Si no se encuentra el género, retornar un array vacío
        if (genres.length === 0) return [];
    
        // Extraer el ID del género
        const [{ id: genreId }] = genres;
    
        // Obtener todas las películas con el genre_id
        const [movies] = await conection.execute(
            `SELECT BIN_TO_UUID(m.id) AS movie_id,  
                    m.title, m.year, m.director, 
                    m.duration, m.poster, m.rate 
             FROM movie m
             JOIN movie_genres mg ON m.id = mg.movie_id
             WHERE mg.genre_id = ?`,
            [genreId]
        );
    
        // Devolver los resultados
        return movies;
    }


    static async getById({ id }) {
        const [movies] = await conection.execute(
            `SELECT BIN_TO_UUID(m.id) AS movie_id,  
                    m.title, m.year, m.director, 
                    m.duration, m.poster, m.rate 
             FROM movie m WHERE m.id = UUID_TO_BIN(?)`,
            [id]
        );
        if (movies.length === 0) return null;
        return movies[0];
    }

    static async create ({ input }) {
        const {
          genre: genreInput, // genre is an array
          title,
          year,
          duration,
          director,
          rate,
          poster
        } = input
    
        // todo: crear la conexión de genre
    
        // crypto.randomUUID()
        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult
    
        try {
          await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
              VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
          )
        } catch (e) {
          // puede enviarle información sensible
          throw new Error('Error creating movie')
          // enviar la traza a un servicio interno
          // sendLog(e)
        }
    
        const [movies] = await connection.query(
          `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie WHERE id = UUID_TO_BIN(?);`,
          [uuid]
        )
    
        return movies[0]
    }

    static async delete({ id}) {
        const [result] = await conection.execute(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
            [id]
        );
        return result.affectedRows > 0;
    }

    static async update({ id , input}) {
        const {
            genre: genreInput, // genre is an array
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [result] = await conection.execute(
            `UPDATE movie 
             SET title = ?, year = ?, director = ?, duration = ?, rate = ?, poster = ?
             WHERE id = UUID_TO_BIN(?)`,
            [title, year, director, duration, rate, poster, id]
        );
        return result.affectedRows > 0;

    }

}
import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import dotenv from "dotenv";
import connectDB from "../db/database.js";

const port = process.env.PORT ?? 3000;
const app = express();

//CREANDO EL WEB SOCKET
//servidor http
const server = createServer(app);
const io = new Server(server, {
  //evita perder info cuando estas offline
  connectionStateRecovery: {},
});

io.on("connection", async (socket) => {
  const db = await connectDB();
  console.log("user has connected");

  socket.on("disconnect", () => {
    console.log("user has disconnect");
  });

  socket.on("chat message", async (msg) => {
    const db = await connectDB() 
    let result;
    const username = socket.handshake.auth.username ?? "anonymous";
    try {
      
      [result] = await db.execute(
        "INSERT INTO messages (content, user) VALUES (?,?)",
        [msg, username] // Solo pasamos el mensaje
      );
    } catch (e) {
      console.error("❌ Error al insertar mensaje:", e);
      return;
    }

    io.emit("chat message", msg, result.insertId.toString(), username);

  });

  if (!socket.recovered) { 
    try {
        const [rows] = await db.execute(
            "SELECT id, content, user FROM messages WHERE id > ?",
            [socket.handshake.auth.serverOffset ?? 0]
        );

        if (rows && rows.length > 0) {
            rows.forEach(row => {
                socket.emit("chat message", row.content, row.id.toString(), row.user);
            });
        }

    } catch (e) {
        console.error("Error al recuperar mensajes:", e);
    }
}

});

//middleware
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

//utilizamos el server creado http
server.listen(port, () => {
  console.log(`server running in port ${port}`);
});

const express = require("express");
const ditto = require("../clase-2/pokemon/ditto.json");
const app = express();
const PORT = 3000;

//middleware
app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  //solo llegar las request que son POST y que tiene el header contet-type: application/json
  let body = "";

  //escuchar los datos que llegan
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = new Date();
    //mutar la request  y meter la info en el req.body
    req.body = data;
    next(); 
  })

});

//get
app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

//post
app.post("/pokemon", (req, res) => {
res.json(req.body);
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`server listening in port ${PORT}`);
});

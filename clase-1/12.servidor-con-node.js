const http = require('node:http')// protocolo http
const { findPort } = require('./13.free-port')

const puertoDeseado = process.env.PORT ?? 3000

//creamos un servidor 
const server = http.createServer((req, res)=>{
    //callback que gestiona la request y la response
    console.log('request recived')
    res.end('hola mundo!')
})

//escuchar el servidor 
// server.listen( 0, ()=>{
//     console.log(`servidor escuchando en el puerto http://localhost:${server.address().port}`)
// })

findPort (puertoDeseado).then( port =>{
    server.listen(port, ()=>{
        console.log(`servidor escuchando en el puerto http://localhost:${port}`)
    })
})
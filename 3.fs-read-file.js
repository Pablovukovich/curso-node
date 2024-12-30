const fs = require('node:fs')
const { text } = require('node:stream/consumers')
//SINCRONO
//para que sea asincrono es solo 'readFile()' despues se necesita
console.log('leyedo el primer archivo')
//Leer un fichero 
 fs.readFile('./archivo.txt','utf-8', (err, text) =>  {
    console.log(text)
})

console.log('Hacer cosas mientras lee el archivo...')
 


console.log('leyedo el segundo archivo')
//Leer un fichero 
 fs.readFile('./archivo2.txt','utf-8', (err, secondText) =>{
    console.log(secondText)
 })


//ASINCRONO CON CALLBACKS


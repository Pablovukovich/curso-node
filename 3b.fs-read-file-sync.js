const fs = require('node:fs')
const { text } = require('node:stream/consumers')
//SINCRONO
//para que sea asincrono es solo 'readFile()' despues se necesita


console.log('leyedo el primer archivo')
//Leer un fichero 
const  text = fs.readFileSync('./archivo.txt','utf-8')
console.log('primer texto:', text)
//--------------

console.log('Hacer cosas mientras lee el archivo...')
 
//--------------

console.log('leyedo el segundo archivo')
//Leer un fichero 
const secondText = fs.readFileSync('./archivo2.txt','utf-8')
console.log('segundo texto:', secondText);

 
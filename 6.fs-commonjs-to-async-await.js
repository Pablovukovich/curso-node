const { readFile } = require('node:fs/promises');


//funcion autoinvocada
//se le llama IIFE

( async ()=>{
    
    console.log('leyedo el primer archivo')
    //Leer un fichero 
    const text = await readFile('./archivo.txt','utf-8')
    console.log(text)
    
    console.log('Hacer cosas mientras lee el archivo...')
     
    
    console.log('leyedo el segundo archivo')
    //Leer un fichero 
    const secondText = await readFile('./archivo2.txt','utf-8')
    console.log(secondText)
})()


//ASINCRONO SECUENCIAL
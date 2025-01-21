//process 
//objeto global que te proporciona informacion y control del proceso actual de ejecucion

//argumentos de entrada 
//console.log(process.argv) //argumentos que recibe 

//controlar el proceso y su salida 
//process.exit(1)
// 1 <-- que hubo algun error y queremos que salga 
// 0 <-- todo fue bien y queremos que termine el proceso 

//controlar eventos del proceso 
//process.on('exit', () =>{
    //podemos limpiar los recursos o controlar errores que no pudimos
//} )

//current working directory 
console.log(process.cwd()) //recupera desde que carpeta estamos ejecutando el proceso

//plataform
console.log(process.env.VARIABLE) //Variables de entorno 
//modulos nativos 
//es recomendable usar la sintaxis: const [nombre] = require('node:[nombre del modulo]');

//os = da info del sistema operativo 
const os = require('node:os');

console.log('info del sistema operativo ')

console.log('----------------------------------')

console.log('nombre del sistema operativo:', os.platform())
console.log('version del sistema operativo:', os.release())
console.log('arquitectura del sistema operativo:', os.arch())
console.log('CPUs:', os.cpus()) //<--------- CON ESTO PODEMOS ESCALAR PROCESOS EN NODE 
console.log('memoria libre', os.freemem()/ 1024 /1024)
console.log('memoria totlal', os.totalmem()/1024/1024)
console.log('uptime', os.uptime()/60/60)
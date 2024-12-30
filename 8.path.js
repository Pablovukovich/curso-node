const path = require('node:path')

console.log(path.sep) // separacio nde rutas en el sistema operativo

//unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')

console.log(filePath)

//nombre del fichero
const base = path.basename('/tmp/pol-secret/password.txt')

console.log(base)

//nombre del fichero sin la extension 
const fileName = path.basename('/tmp/pol-secret/password.txt', '.txt')

console.log(fileName)

//obtener la extenesion 
const extenesion = path.extname('image.jpg')
console.log(extenesion)
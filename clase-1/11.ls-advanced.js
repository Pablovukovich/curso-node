const { promises } = require('node:dns');
const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('node:picocolors')

//carpeta que queremos listar
const folder = process.argv[2] ?? '.';

async function ls (folder) {

    let files

    try{
         files = await fs.readdir(folder)
    }catch{
        console.error(pc.red(`no se pudo leer el directorio ${folder}`))
        process.exit(1)
    }
    
    //creoamso todas las promesas de todos los archivos 
    const filePromises = files.map( async file =>{
        //recuperar la info de cada archivo
        const filePath = path.join(folder, file)
        //intentamos obtener el stat de cada uno 
        let fileStats
        try{
            fileStats = await fs.stat(filePath) //stat: te da la informacion del archivo
        }catch{
            console.error(`no se pudo leer el directorio ${folder}`)
            process.exit(1)
        }

        const isDirectory = fileStats.isDirectory()
        const fileType = isDirectory ? 'd':'-'
        const fileSize = fileStats.size
        const fileModified = fileStats.mtime.toLocaleString()
        return `${fileType} ${pc.blue(file)} ${fileSize.toString()} ${fileModified}`



    } )


   const fileInfo = await Promise.all(filePromises)

   fileInfo.forEach(files => console.log(fileInfo))
}
ls(folder)


   

const http = require('node:http')
const fs = require('node:fs')



const server = http.createServer((req, res)=>{

    if(req.url === '/'){
        res.statusCode = 200 //ok
        res.setHeader('Content-type', 'text/html')
        res.end('<h1>bienvenido a mi pagina de inicio</h1>')
    }else if (req.url === '/contacto'){
        res.statusCode = 200
        res.setHeader('Content-type', 'text/html')
        res.end('<h2>ruta de Contacto</h2> ')
    }else if(req.url === '/imagen-rose.jpg'){

       

        fs.readFile('../clase-2/rose.jpg', (err, data)=>{

            if(err){
                res.statusCode = 500
                res.end('<h1>error internal serverrrrrrr</h1>')

            }else{
                res.setHeader('Content-Type', 'image/jpg')
                res.end(data)
            }
        })
    }
    else{
        res.statusCode = 404
        res.setHeader('Content-type', 'text/html')
        res.end('<h1>404</h1>') 
    }
    
})


server.listen(3000, ()=>{
    console.log('server listening')
})

//STATUS CODE
//100 - 199 : RESPUESTAS INFORMATIVAS
//200 - 299 : RESPUESTAS SATIFACTORIAS 
//300 - 399 : REDIRECCIONES
//400 - 499 : ERRORES DEL CLIENTE 
//500 - 599 : ERROR DE SERVIDORES  
const http = require('node:http');
const ditto = require('./pokemon/ditto.json')

const processingRequest = (req, res)=>{
     const { method, url } = req

    switch(method){
        case 'GET':
            switch(url){
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    const dittoData = JSON.stringify(ditto);
                    return res.end(dittoData);
               default:
                res.statusCode = 404
                res.end('<h1>404</h1>')

            }

            break;

        case 'POST':
            switch(url){
                case '/pokemon':
                    let body = ''
                    req.on('data', (chunk)=>{
                        body += chunk.toString()
                    })

                    req.on('end', ()=>{
                        const  data = JSON.parse(body)

                        //llamar a una base de datos
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
                        res.end(JSON.stringify(data))

                    })
                    break;

            }
            default:
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/plain')
                res.end('404 not found')
    }

}


const server = http.createServer(processingRequest)
server.listen(4000, ()=>{
    console.log('server listening')
})

const child = require('child_process')
const path = require("path")
const cluster = require("cluster")
const os = require("os")
const numCpu = os.cpus().length


class ServerClusterFork {
    constructor() {}

    fork = (PORT, server) => {
        try {
            const forkServer = child.fork(path.join(__dirname, "./fork.js"))
            server
                .listen(PORT, () => {
                    forkServer.on('message', () => {
                        forkServer.send({ PORT })
                        console.log(`Oyendo desde puerto: ${PORT} - http://localhost:${PORT}`)
                    })
                })
                .on('error', error => { console.log('hubo un error', error) })
        }
        catch (err) { console.log('catcherror') }
    }


    cluster = (PORT, server) => {
        if(cluster.isPrimary) {
            for(let i = 0 ; i < numCpu; i++){
                    cluster.fork()
                    console.log(`Primario ${process.pid}: inizializado`)
                }
                cluster.on("exit", (worker, code, signal ) => {
                `worker ${worker.process.pid} died`
                cluster.fork()
            });
            } else {
                console.log(`Worker: corriendo en puerto:${PORT} - pid: ${process.pid} `)
                server.listen(PORT, () => console.log(`Oyendo desde ${PORT}`))
            }
    }

}

module.exports =  ServerClusterFork

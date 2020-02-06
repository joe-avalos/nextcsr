// let's go!
require('dotenv').config({path: 'variables.env'})

const createServer = require('./createServer')

const server = createServer()

//TODO Use express middleWare to handle cookies (JWT)
//TODO Use express middleWare to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`)
})

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

const db = require('./db')

const createServer = require('./createServer')

const server = createServer()

//Use express middleWare to handle cookies (JWT)
server.express.use(cookieParser())

server.express.use((req, res, next) => {
  const {token} = req.cookies
  if (token){
    const {userId} = jwt.verify(token, process.env.APP_SECRET)
    req.userId = userId
  }
  next()
})
// Use express middleWare to populate current user
server.express.use(async (req, res, next) =>{
  if (!req.userId) return next()
  const user = await db.query.user({where: {id: req.userId}},
    '{id, email, name, permissions}'
    )
  req.user = user
  next()
})

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`)
})

import express from 'express'
import createRouter from './AccountsRouter'
const app = express()

const port = 3000
const createServer = async (dependencies) => {
  app.use(express.json())
  app.use('/accounts', createRouter(dependencies))
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    return app
  })

}

export default createServer
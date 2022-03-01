import express from 'express'
import createAccountsRouter from './AccountsRouter'
import createMoviesRouter from './MoviesRouter'
const app = express()

const port = 3000
const createServer = async (dependencies) => {
  app.use(express.json())
  app.use('/accounts', createAccountsRouter(dependencies))
  app.use('/movies', createMoviesRouter(dependencies))
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    return app
  })

}

export default createServer
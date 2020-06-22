import express from 'express'
import compression from 'compression'
import ssr from './routes/ssr'
import api from './routes/api'
const app = express()

app.use(compression())
app.use(express.static('public'))

app.use('/', ssr)
app.use('/api', api)

const port = process.env.PORT || 3000
app.listen(port, function listenHandler() {
  console.info(`The server is running on ${port}...`)
})

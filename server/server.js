import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.static('../dist'))

const port = 5000

app.listen(port, () => console.log(`Server running on ${port} port!`))

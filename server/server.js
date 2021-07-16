import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port} port!`))

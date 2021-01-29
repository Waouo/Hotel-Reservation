import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()

const config = {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer nLRP8nyC8R5WZADLv3ANbeeq0wbgmRMxdyQ02xELMiiOLbwAR64tBGPKewp4`,
  },
}

app.get('/', (req, res) => {
  res.send(`_____212`)
})

app.get('/api', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      config
    )
    console.log(data)
  } catch (error) {
    console.error(error)
    next()
  }

  console.log('end')
})

const port = 5000

app.listen(port, () => console.log(`Server running on ${port} port!`))

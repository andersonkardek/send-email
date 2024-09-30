import express from 'express'

const app = express()
app.use(express.json())

app.get("/", (request, response) => {
  response.send("ola")
})
app.listen(3333, ()=> {
  console.log("Server running http://localhost:3333")
})
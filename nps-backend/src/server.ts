import express from "express"
import { router } from "./router"
import { errorHandler } from "./erros/ErrorHandler"

const app = express()
app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(3333, () => {
	console.log("Server running http://localhost:3333")
})

import "reflect-metadata"
import "express-async-errors"
import cors from "cors"
import express from "express"

import handleErrorMiddleware from "./middleware/handleError.middleware"
import { sessionRouter, userRouter } from "./routes/user.routes"
import { contactRouter } from "./routes/contact.routes"

const app = express()

app.use(cors())
app.use(express.json())

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./documentation/swagger.json"

app.use("/user", userRouter)
app.use("/contact", contactRouter)
app.use("/session", sessionRouter)

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(handleErrorMiddleware)

export default app
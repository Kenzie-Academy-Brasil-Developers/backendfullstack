import { Router } from "express"
import initSessionController from "../controller/session/initSession.controller"
import createUserController from "../controller/user/createUser.controller"
import listOneUserController from "../controller/user/listOneUser.controller"
import removeUserController from "../controller/user/removeUser.controller"
import updateUserController from "../controller/user/updateUser.controller"
import removeEmptyMiddleware from "../middleware/removeEmpty.middleware"
import validDataMiddleware from "../middleware/validData.middleware"
import validTokenMiddleware from "../middleware/validToken.middleware"
import { schemaInitSession } from "../serializer/session.serializer"
import { schemaCreateUser, schemaUpdateUser } from "../serializer/user.serializer"

export const userRouter = Router()
export const sessionRouter = Router()

sessionRouter.post("",
    validDataMiddleware(schemaInitSession),
    initSessionController
)

userRouter.post("",
    validDataMiddleware(schemaCreateUser),
    createUserController
)
userRouter.get("",
    validTokenMiddleware,
    listOneUserController
)
userRouter.patch("",
    validTokenMiddleware,
    removeEmptyMiddleware,
    validDataMiddleware(schemaUpdateUser),
    updateUserController
)
userRouter.delete("",
    validTokenMiddleware,
    removeUserController
)
import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.route("/updateData").post(
    (req,res)=>new UserController().updateData(req,res)
)

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)
userRouter.route("/loginAdmin").post(
    (req,res)=>new UserController().loginAdmin(req,res)
)


userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/getUser").post(
    (req,res)=>new UserController().getUser(req,res)
)
userRouter.route("/checkPassword").post(
    (req,res)=>new UserController().checkPassword(req,res)
)
userRouter.route("/changePassword").post(
    (req,res)=>new UserController().changePassword(req,res)
)

userRouter.route("/getWaiters").get(
    (req,res)=>new UserController().getWaiters(req,res)
)
userRouter.route("/getUsers").get(
    (req,res)=>new UserController().getUsers(req,res)
)



/*
userRouter.route("/addToFavourites").post(
    (req,res)=>new UserController().addToFavourites(req,res)
)

userRouter.route("/getUserByUsername/:username").get(
    (req,res)=>new UserController().getUserByUsername(req,res)
)

userRouter.route("/changeFavourite").post(
    (req,res)=>new UserController().changeFavourite(req,res)
)
*/

export default userRouter;
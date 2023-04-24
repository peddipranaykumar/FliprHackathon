import express from "express";
import { addFav, getAllUsers, login, signup, removeFav, getUser } from "../Controllers/user-controller"

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:name",getUser)
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/fav", addFav);
userRouter.delete("/removefav", removeFav);

export default userRouter;

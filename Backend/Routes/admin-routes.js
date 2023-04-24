import express from "express";
import { getAllAdmins, login, signup } from "../Controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.get("/", getAllAdmins);
adminRouter.post("/signup",signup);
adminRouter.post("/login",login);

export default adminRouter;
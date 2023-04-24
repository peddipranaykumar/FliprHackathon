import express, { Router } from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user-routes"
import adminRouter from "./Routes/admin-routes";
import podcastRouter from "./Routes/podcast-routes";
import cors from 'cors';

const app = express();


app.use(cors())

app.use(express.json());

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/podcast", podcastRouter)

mongoose.connect(
  "mongodb+srv://pranaykumarpeddi2003:EwzAN25Nr4GeCG1u@cluster0.krheekl.mongodb.net/Flipr?retryWrites=true&w=majority"
).then(() => app.listen(5000)).then(() => console.log("Connected to the DataBase and listening to local host of 5000"))
  .catch((err) => console.log(err));

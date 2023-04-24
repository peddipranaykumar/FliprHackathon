import express from "express";
import multer from "multer";
import { addPodcast, getAllPodcasts, getPodcast, removePodcast } from "../Controllers/podcast-controller";

const podcastRouter = express.Router();

// Multer middleware to handle file uploads
const upload = multer({ dest: "uploads/" });

podcastRouter.get("/", getAllPodcasts);
podcastRouter.get("/:name",getPodcast)
podcastRouter.post("/add", addPodcast);
podcastRouter.delete("/remove", removePodcast);

export default podcastRouter;

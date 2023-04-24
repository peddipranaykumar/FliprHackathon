import Podcast from "../Models/Podcast"

// Get all podcasts
export const getAllPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.find();
    if (!podcasts.length) {
      return res.json({ message: "No podcasts found" });
    }
    res.json({ podcasts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

//get product by id
export const getPodcast = async (req, res, next) => {
  let name = (req.params.name)
  try {
    const podcasts=await Podcast.findOne({name : name});
    if (!podcasts) {
      return res.json({ message: "No podcasts found" });
    }
    res.json({podcasts})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
}

// Add podcast
export const addPodcast = async (req, res, next) => {
  const { name, description, category, type, speaker, file } = req.body;

  try {
    const existingPodcast = await Podcast.findOne({ name });
    if (existingPodcast) {
      return res.status(400).json({ message: "Podcast with this name already exists" });
    }
    const podcast = new Podcast({
      name,
      description,
      category,
      type,
      speaker,
      file
    });
    await podcast.save();
    return res.status(201).json({ podcast });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
}

// Remove podcast
export const removePodcast = async (req, res, next) => {
  const { name } = req.body;

  try {
    const existingPodcast = await Podcast.findOneAndRemove({ name });
    if (!existingPodcast) {
      return res.status(400).json({ message: "Podcast doesn't exist" });
    }
    return res.status(200).json({ message: "Podcast removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
}

import User from "../Models/User";
import bcrypt from "bcryptjs";

//Get all User details
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  }
  catch (err) {
    console.log(err);
  }
  if (!users) {
    res.json({ message: "No user found" })
  }
  res.json({ users })
}

// Get User by name
export const getUser = async (req, res, next) => {
  const { name } = req.params;
  let user;
  try {
    user = await User.findOne({ name });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
}


//Create new User
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist?? " });
  }

  const hashedPassword = bcrypt.hashSync(password)

  const user = new User({
    name,
    email,
    password: hashedPassword
  })

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
}

//Login User
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User doesnt exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" })
  }
  return res.status(200).json({ message: "Login success" })
}


// Add podcast to user's favorites
export const addFav = async (req, res, next) => {
  const { email, name } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if podcast already exists in favorites
  if (user.favorites.includes(name)) {
    return res.status(400).json({ message: "Podcast already exists in favorites" });
  }

  user.favorites.push(name);

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ message: "Podcast added to favorites" });
}


// Remove podcast from user's favorites
export const removeFav = async (req, res, next) => {
  const { email, name } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const index = user.favorites.indexOf(name);
  if (index === -1) {
    return res.status(400).json({ message: "Podcast not found in favorites" });
  }

  user.favorites.splice(index, 1);

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ message: "Podcast removed from favorites" });
};


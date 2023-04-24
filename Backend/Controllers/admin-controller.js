import Admin from "../Models/Admin";
import bcrypt from "bcryptjs";

//Get all User details
export const getAllAdmins = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find();
  }
  catch (err) {
    console.log(err);
  }
  if (!admin) {
    res.json({ message: "No Admin found" })
  }
  res.json({ admin })
}

//Create new Admin
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exist?? " });
  }

  const hashedPassword = bcrypt.hashSync(password)

  const admin = new Admin({
    name,
    email,
    password: hashedPassword
  })

  try {
    await admin.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ admin });
}

//Login Admin
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(404).json({ message: "Admin doesnt exist" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" })
  }
  return res.status(200).json({ message: "Login success" })
}
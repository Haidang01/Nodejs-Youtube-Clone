import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  //check user exists
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json("User already exists");
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPass });
    await newUser.save();
    res.status(200).json('User created successfully');
  } catch (error) {
    //TODO 
    next(error);
  }
}
export const signin = async (req, res, next) => {
  //check user exists
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    //check password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json("Username or Password does not match");
    }
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res.status(200).json({ others, token });
    next();
  } catch (error) {
    //TODO 
    next(error);
  }
}
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const others = user._doc;
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res.status(200).json({ others, token });
    } else {
      const newUser = new User({
        ...req.body,
        formGoogle: true,
      })
      const saveUser = await newUser.save();
      const others = saveUser._doc;
      const token = jwt.sign({ id: saveUser._id }, process.env.JWT);
      res.status(200).json({ others, token });
    }

  } catch (error) {
    next(error);
  }
}
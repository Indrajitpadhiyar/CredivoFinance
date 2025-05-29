const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .josn({ message: "user already exist", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
      res.status(500).json({
      message: "internal server error",
      success: true,
    });
  }
};

module.exports = {
  signup,
};

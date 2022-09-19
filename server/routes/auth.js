const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(`user was not created - ${error}`);
  }
});

router.post("/login", async (req,res) =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        !user && res.status(404).json("user not exists")
        
        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json("wrong user or password")

        res.status(200).json({success:user})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//internal
const User = require("../models/user.model");

const signup = async (req, res) => {
    const {first_name, last_name, email, password, confirm_pass , type} = req.body;
    if(password !== confirm_pass) return res.status(400).json({message: "Passwords do not match"});
    try{
        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = await bcrypt.hash(password, 8);
        user.confirm_pass = await bcrypt.hash(confirm_pass, 8);
        user.type = type;

        await user.save();
        res.json(user)
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};

const signin = async (req, res)=>{
  const {email, password} = req.body;
  
  const user = await User.findOne({email}).select("+password");
  if(!user) return res.status(404).json({message: "Invalid Credentials"});
  if(user.banned === true) return res.status(400).json({message: "you are banned from the admin"});

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(404).json({message: "Invalid Credentials"});

  const token = jwt.sign({email: user.email, name: user.name}, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h'
  });
  res.status(200).json({
      'status': "success",
      'user':user,
      'token':token
  })
}

const userInfo = async (req, res) => {
  try {
    const currentUser = req.user;
    res.status(200).json(currentUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// export all the functions
module.exports = {
    signin,
    signup,
    userInfo,
};
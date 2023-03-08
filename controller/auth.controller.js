const User = require("../models/user.model");

const login = async (req, res) => {
  //login api logic here
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        message: "Please provide email and password",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "The email is not yet registered to an accout",
        statusCode: 400,
      });
    }

    const match = await user.checkPassword(password);

    if (!match) {
      return res.json({
        message: "The password does not match",
        statusCode: 400,
      });
    }

    const token = user.getJwtToken();
    //
    req.user = user;
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (email == '' || username == '' || password == '') {
      return res.json({
        status: "fasle",
        message: "email or username or password not found ",
      });
    }
    const finduser = await User.find({
      email: email,
      username: username,
      password: password,
    });

    // check whether user already registered

    if (finduser.length != 0) {
      return res.json({
        status: "false",  
        message: "user already exist with this username or email",
      });
    }
    console.log("object");
    const user = await User.create({ 
      email : email ,
      username : username,
      password : password
    });
    console.log("aa");
    const token = user.getJwtToken();
    console.log("a");
    res.status(201).json({ success: true, token: token });
  } catch (error) {
    return res.json({
      status: "false",
      message: error,
    });
  }
};

// const logout = async (req,res) => {

//     try {


        
//     } catch (error) {
//         return res.json({
//             "status" :"false" , 
//             "message" : error
//         })
//     }
    
// }


const AuthController = {
  login,
  register,
};

module.exports = AuthController;

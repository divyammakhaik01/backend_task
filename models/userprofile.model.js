const mongoose = require("mongoose");


const UserProfileSchema = new mongoose.Schema({
    email: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
    },
    age : {
      type : Number , 
      require : [true , "Please enter your age"]
    }
  
  });
  
  module.exports = mongoose.model("userProfile", UserProfileSchema);

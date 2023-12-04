

const {User} = require("../Schema/user.schema");
const crypto = require("crypto");


//reset password using the new token
const resetPassword = async(req, res)=>{
    const{resetToken, newPassword}= req.body;
  
    try{
  const user = await User.findOne({resetToken, resetTokenExpiration : {$gt: Date.now() },
  });
    
  
  if(!user){

    return

      res.status(400).json({message: "invalid or expired token"});
  }
    
  //update password
  user.password =newPassowrd;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();
   
  res.status(200).json({message: "password reset successfully"});
    }
    catch(error){
      console.error("error resetting password:", error);
      res.status(500).json({message: "an error occured while trying to reset password"});
    }
  }
  
  
  
  module.exports ={resetPassword};
  
const {forgotPassword} = require("../controllers/forgotPassword");
const {User} = require("../Schema/user.schema");



const resetPassword = async(req, res)=>{
    const{resetToken, expiresIn} = forgotPassword();
  
    try{
  const user = await User.findOne({resetToken, expiresIn: {$gt: Date.now() },
  });
    
  
  if(!user){
return res
.status(400).json({message: "invalid or expired token"});
  }
    if(user){
  
  user.password = newPassowrd;
  user.resetToken = undefined;
  user.expiresIn = undefined;
  await user.save();
   return res.status(200).json({message: "password reset successfully"});
    }
  }
    catch(err){
      console.error("error resetting password:", err);
      res.status(500).json({message: "an error occured while trying to reset password"});
    }
  }
  
  
  
  module.exports ={resetPassword};
  
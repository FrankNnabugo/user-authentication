
const {User} = require("../Schema/user.schema");
const crypto = require("crypto");


const generateToken =async(req, res)=>{
    const{email}= req.body;

    try{
//check if user exist
const check =await User.findOne({email});
if(!check)
{
  return
    res.status(404).json({message:"user doesn't exist"});
}

//generate token
 const resetToken = crypto.randomBytes(20).toString("hex");
 check.resetToken = resetToken;
 check.resetTokenExpiration = Date.now()+3600000; //token expires in 1 hour
await check.save();

res.status(200).json({message : "password reset token sent"});
}
catch(error){
    console.error("error generating a reset token:", error);
    res.status(500).json({message: "an error occured while trying to generate token"});
}

}




module.exports ={generateToken};


const {User} = require("../Schema/user.schema");
const crypto = require("crypto");


const forgotPassword = async(req, res)=>{
    const{email}= req.body;

    try{
const check = await User.findOne({email});
if(!check)
{
    return res
    .status(404).json({message:"user doesn't exist"});
}

 const resetToken = crypto.randomBytes(20).toString("hex");
 const expiresIn = new Date(Date.now()+360000)
 check.resetToken = resetToken;
 check.expiresIn = expiresIn;
await check.resetToken.save();

res.status(200).json({message : "token generated"});
}
catch(err){
    res.status(500).json({mssg: "error occured", err});
}
return {resetToken, expiresIn};
}
   
module.exports ={forgotPassword};
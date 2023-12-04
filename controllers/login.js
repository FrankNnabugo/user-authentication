const {User}= require("../Schema/user.schema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const userLogin = async(req, res)=>{
    const{email, password} = req.body;


//check if user exist before attempting to log user in
try{
    const checkUser = await User.findOne({email});
    if(!checkUser){
        return
         res.status(400).json({message: "user not found"});
    }

    //check if user password matches hashed password in the db
    const validatePassword = checkUser.password === password;
    if(!validatePassword)

    {
      return
       res.status(404).json({message: "invalid email or password"});
    }

    //generate a jwt token

const token = jwt.sign({userId : checkUser._id}, process.env.JWT_SECRET_KEY);
res.cookie("accessToken", token, {
httpOnly:true
});
res.status(200).json({message:"user logged in"});
}
catch(error){
    console.error("error logging in:", error);
    res.status(500).json({message : "an error occured while logging in"});
}

}
module.exports = {userLogin};

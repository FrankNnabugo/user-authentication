const {User}= require("../Schema/user.schema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");



const Login = async(req, res)=>{
    const{email, hashPassword} = req.body;

try{
    const checkUser = await User.findOne({email});
    if(!checkUser) throw new Error("user does not exist");

    const validatePassword = await checkUser.compare({hashPassword})
    if(!validatePassword) throw new Error("invalid email or password")

const token = jwt.sign({id:checkUser}, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m"
});
res.headers("authorization", token);
checkUser.token = token;

const refreshToken = jwt.sign({id:checkUser},process.env.REFRESH_TOKEN, {
    expiresIn: "30d"
});
res.cookie("refreshToken", refreshToken, {
    httpOnly:true,
    secure:true,
    sameSite:"none"
});
checkUser.refreshToken = refreshToken;

res.status(200).json({message:"user logged in:", checkUser});
}
catch(err){
    console.error("error logging in:", err);
    res.status(500).json({message : "an error occured while logging in"});
}
return{checkUser, token, refreshToken};
}


module.exports = {Login};

const jwt = require("jsonwebtoken");
const{Login} = require("../controllers/login");

    
const authenticate = async(req, res, next)=>{
    const{checkUser, refreshToken} = Login();
    const{token} = req.headers["authorization"];
if(!token){
           return res
           .status(401).json({mssg: "authorization token required"});
        }

    try{
        const verifyToken = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.checkUser = verifyToken;
    
        return next();
        }
        catch(err){
            console.err("error:", err);
            res.status(401)
            .json({mssg: "session expired, login to continue"});
        }
return verifyToken;
    }
        

    module.exports = {authenticate};
           
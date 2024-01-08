const {authenticate} = require("../middleware/authenticate");
const{Login} = require("../controllers/login");


const refreshToken = async(req, res)=>{
    const {verifyToken} = authenticate();
    const{checkUser} = Login();
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res
            .status(401).json({mssg: "no refresh token found"});   
        }
        try{
        const verifyRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        const accessToken = jwt.sign({id:verifyToken.checkUser}, process.env.JWT_ACCESS_TOKEN, {
            expiresIn :"10m"});
            res.headers("authorization", accessToken);
            res.status(200).send(verifyToken.checkUser);

        }
        
    catch(err){
        res.status(400).send("invalid refresh token:", err);
    }
}


module.exports = {refreshToken};
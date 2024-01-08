const {User} = require("../Schema/user.schema");
const bcrypt = require("bcryptjs");



const signUp = async(req, res)=>{

    const{firstname,lastname,email,password} = req.body;
try{
     const user= await User.findOne({email});
    if(user){
    return res
    .status(400).json({message: "user already exist"});
    }
    const hashPassword = await bcrypt.hash(password, 10)
const newUser = await User.create({firstname,lastname,hashPassword,email});

await newUser.save(); 

res.status(200).json("user created:", newUser)

}

catch(err){
    console.err("error registering user:", err);
    res.status(500).json({message: "error occured"});
}

};



module.exports = {signUp};


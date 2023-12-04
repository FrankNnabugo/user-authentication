const {User} = require("../Schema/user.schema");



const userRegister =async(req, res)=>{

    //extract user information from the request body
    const{firstname,lastname,username,password,email } = req.body;

//in the try block, check if user already exist
try{
    const checkUser = await User.findOne({email});

    if(checkUser){
    
       res.status(400).json({message: "user already exist"});
    }

//create a new user instance
const newUser = new User({firstname,lastname,username,password,email});

//save new user
await newUser.save();

res.status(200).json({message: "user created successfully",
user:{
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email
}

});

}

//catch error while trying to create a new user
catch(error){
    console.error("error registering user:", error );
    res.status(500).json({message: "an error occured while creating user "});
}
};


module.exports ={userRegister};

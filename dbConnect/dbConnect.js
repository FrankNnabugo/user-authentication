const mongoose = require("mongoose");
const dotenv = require("dotenv).config();



const dbconnect = async ()=>{

try{
  await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to database");
}
catch(err){
    console.log("error connecting to database:", err);
}

}

module.exports ={dbconnect};

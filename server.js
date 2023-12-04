const express = require ("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const {dbconnect} = require("./dbConnect/dbConnect");
const PORT = process.env.PORT || 3000;
const {router}= require("./route/auth.route")
const {errorHandling} = require("./middleware/errorHandling");

//init express
const app = express();


//middleware
app.use(express.json());
app.use(helmet());
app.use((req, res, next)=>{
console.log(req.path, req.method)
next();
});

app.use(errorHandling);

//use route

app.use("/auth", router);



//listen to port
app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is listening on port", PORT);
}); 

dbconnect();
const express = require ("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const {dbconnect} = require("./dbConnect/dbConnect");
const PORT = process.env.PORT;
const {router}= require("./route/auth.route")
const {errorHandler} = require("./middleware/errorHandler");


const app = express();


app.use(express.json());
app.use(helmet());
app.use((req, res, next)=>{
console.log(req.method, req.path);
});
app.use(errorHandler);


app.use("/auth", router);




app.listen(process.env.PORT, ()=>{
    console.log("server is listening on port", PORT);
}); 

dbconnect();
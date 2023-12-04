// custom middleware to handle error globally

const errorHandling = async(err, req, res, next)=>{
    await res.status(500).send("internal server error");
    next();
}



module.exports ={errorHandling};
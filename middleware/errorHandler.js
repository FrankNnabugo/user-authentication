

const errorHandler=(err, req, res, next)=>{
    const statusCode = res.statusCode;
switch(statusCode){
    case 400:
        res.send("Bad request");
        break;
        
        case 404:
            res.send("Not found");
            break;

            case 500:
                res.send("internal server error");
                break;

                default:
                    res.send("unknown error");
                    break;
}

    next();
}


module.exports = {errorHandler};
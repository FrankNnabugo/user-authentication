

const logOut = async(req, res)=>{

try{

    await res.clearCookie("refreshToken", {
       sameSite:"none",
       secure:true,
       path:"/auth/refreshToken"
    });
    res.status(200).json({message: "user logged out"})

}catch(err){
    console.error("error logging out:", err);
    res.status(500).json({message: "an error occcured while tyring to log user out"});
}
}

module.exports = {logOut};
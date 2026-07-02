import jwt from "jsonwebtoken"
const protect=async(req,res,next)=>{
    try{
        let token;
        if(
            req.headers.authorization&&
              req.headers.authorization.startsWith("Bearer")
        ){
                token = req.headers.authorization.split(" ")[1];
                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    req.user = {
        id: decoded.id,
      };
next();

        }else{
                  return res.status(401).json({
        message: "Not authorized, no token",
      });
        }
    }catch(err)
    {
         return res.status(401).json({
      message: "Invalid token",
    });
    }
}
export default protect;


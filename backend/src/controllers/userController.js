import User from "../models/User.js";
export const searchUsers=async(req,res)=>{
    try{
const keyword = req.query.search;
const users=await User.find({
 $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
    ],
     _id: { $ne: req.user.id },
});
res.status(200).json(users);
    }
    catch(err){
  res.status(500).json({
        message: err.message,
    });
    }
}
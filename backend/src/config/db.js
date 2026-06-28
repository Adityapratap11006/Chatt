const mongoose=require("mongoose");
const ConnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGODB connected')
    }
    catch(error){
            console.log(error.message);
        process.exit(1);
    }
};
module.exports=ConnectDB;
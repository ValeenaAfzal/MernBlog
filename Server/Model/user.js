import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        
        type:String,
        required:true,
        unique:true,
    },
    pass:{
        type:String,
        required:true,
    },
});

// tell in which table/collection you want to add

const user = mongoose.model('user',userSchema);

export default user;

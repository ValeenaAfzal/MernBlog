//signup api  import schema
import user from "../Model/user.js";
import bcrypt from 'bcrypt';
const Signup = async (req, res) => {

    try {
        console.log("Here afster saved");
         console.log(req.body.name);
         console.log(req.body.pass);
         console.log(req.body.username);
       // const adder = await bcrypt.genSalt(10);
        const hashpass= await bcrypt.hash(req.body.pass,8);//
        // this will receive complete signup object from react fie
        const User = {name:req.body.name, username:req.body.username, pass:hashpass};
        const newUser=new user(User);//returns validated object
        await newUser.save();//here we store data in database - mongodb fucntion - async request - returns promise
        //return to front end
        return res.status(200).json({msg:'signup Suceessful'});
    }
    catch (error) {
        return res.status(500).json({msg:'Error while Signup'});
    }
}

export default Signup;

export const updateProfile=async (req, res)=>{

    console.log("here in update");
    try {
        // this will receive complete chnage object from react fie
        const PrevUser = await user.findOne({username: req.body.prevusername});//find the editing username in DB
        if(!PrevUser)//if signed in user is not found
        {
            return res.status(400).json({msg:"username doesnot match"})
        }
        
        const hashpass= await bcrypt.hash(req.body.pass,8);// const adder = await bcrypt.genSalt(10);
         const filter = { username: req.body.prevusername };
         const update = { name:req.body.name, username:req.body.username,pass:hashpass };
         const doc = await user.findOneAndUpdate(filter,update,{//here we store data in database - mongodb fucntion - async request - returns promise
            new: true
         });
         const User = {name:req.body.name, username:req.body.username, pass:hashpass};
         const newUser=new user(User);//returns validated object

         //  await Post.findByIdAndUpdate( request.params.id, { $set: request.body })
         console.log("Here afster saved");
         console.log(doc.name);
         console.log(doc.pass);
         console.log(doc.username);
         //return to front end
         return res.status(200).json({msg:'Update Suceessful'});
     }
     catch (error) {
         return res.status(500).json({msg:'Error while Update'});
     }
}
//signup api  import schema
import user from "../Model/user.js";
import bcrypt from 'bcrypt';
const Signup = async (req, res) => {

    try {

       // const adder = await bcrypt.genSalt(10);
        const hashpass= await bcrypt.hash(req.body.pass,8);//
        // this will receive complete signup object from react fie
        const User = {name:req.body.name, username:req.body.username, pass:hashpass};
        const newUser=new user(User);//returns validated object
        console.log("here in Signuphjjhbhjbhj.js")
        console.log(req);
        console.log(newUser.name);
        console.log(newUser.pass);
        console.log(newUser.username);
        await newUser.save();//here we store data in database - mongodb fucntion - async request - returns promise
        //return to front end
        return res.status(200).json({msg:'signup Suceessful'});
    }
    catch (error) {
        return res.status(500).json({msg:'Error while Signup'});
    }
}

export default Signup;
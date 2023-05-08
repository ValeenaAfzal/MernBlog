//login api 

//import schema
import { response } from "express";
import user from "../Model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../Model/token.js";

dotenv.config();//init

const Logins = async (req, res) => {

    let User = await user.findOne({username: req.body.username});
    
    //if user not found
    if(!User)
    {
        return res.status(400).json({msg:"username doesnot match"})
    }

    try {
        let match = await bcrypt.compare(req.body.pass, User.pass);
        if (match) {
            const aToken = jwt.sign(User.toJSON(), process.env.ASecretKey, { expiresIn: '15m'});//not permanat
            const rToken = jwt.sign(User.toJSON(), process.env.RSecretKey);
            
            const newToken = new Token({ token: rToken });
            await newToken.save();
        
            res.status(200).json({ aToken: aToken, rToken: rToken,name: User.name, username: User.username });
        
        } else {
            res.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'error while login the user' })
    }

   // node 
//require('crypto').randomBytes(64).toString('hex')

}

export default Logins;
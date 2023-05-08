//create apis
import express from "express";
import Signup from "../Controller/Signup.js";
import Logins from "../Controller/LOGIN.js";

const router = express.Router();
router.post('/signup',Signup); //api endpoint - if want to call specific api use call back , now in controller
router.post('/login',Logins); //api endpoint - if want to call specific api use call back , now in controller
export default router;
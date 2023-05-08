import express  from "express";
import createDBconnection from "./database/createDBconnection.js";
import dotenv from 'dotenv';
import router from "./Routes/routes.js";
import cors from 'cors';
import bodyParser from "body-parser";

//initiliaze dotenv - env used to protect DB username and password - donot push env file in git
dotenv.config();
const server = express();//create express server
//
server.use(cors());
//body
server.use(bodyParser.json({extended:true}));
server.use(bodyParser.urlencoded({extended:true}));
// use router 
server.use('/',router);

const port =8080;
const username=process.env.Db_username;
const pass = process.env.Db_pass;

createDBconnection(username,pass);//create DB connection
server.listen(port, ()=>(console.log("server is running")));

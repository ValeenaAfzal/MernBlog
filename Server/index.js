import express  from "express";

const port =8080;
const server = express();//create express server

server.listen(port, function()
{
    console.log("server is running")
}
    )

const express = require("express");
const  socketio= require("socket.io");
const http = require("http");
const app=express()



const server = http.createServer(app)

const io =   socketio(server);





app.listen(4500,()=>{
     
    console.log("chat server is running")
})
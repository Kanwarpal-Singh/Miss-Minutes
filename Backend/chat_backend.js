const express = require("express");
const fs=require("fs")
const path=require("path")
const  socketio= require("socket.io");
const http = require("http");
const {UserModel}=require("./models/user.model")
const app=express()
 app.use(express.json())
const Path=path.join(__dirname,"../Frontend/")
 
app.use(express.static(Path+"/public"))

console.log(Path,"dflsjkd")



const server = http.createServer(app)


app.get("/chat/frontend", async(req,res)=>{

      try {
        const frontendPath = path.join(__dirname, '../Frontend/chat.html');
        console.log(frontendPath)
  
        res.sendFile(frontendPath)
      } catch (error) {
        console.log(error)
      }
})


/// Socket.io  setup : used for biderctional communicataion and event-based communication

const io =   socketio(server);


 io.on("connection",(socket)=>{

       console.log(socket.id,"socket id")

 })






server.listen(4500,()=>{
     
    console.log("chat server is running 4500")
})
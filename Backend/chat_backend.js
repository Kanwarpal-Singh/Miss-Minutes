const express = require("express");
const fs=require("fs")
const path=require("path")
const  socketio= require("socket.io");
const http = require("http");
const app=express()
 app.use(express.json())
const Path=path.join(__dirname,"../Frontend")
 
app.use(express.static(Path+"/public"))

console.log(Path,"dflsjkd")



const server = http.createServer(app)


app.get("/chat/frontend", async(req,res)=>{

      try {
        // res.send("hello")
        const frontendPath = path.join(__dirname, '../Frontend/chat.html');
        console.log(frontendPath)
        app.use((req, res, next) => {
            if (req.url.endsWith('.css')) {
              res.type('text/css');
            }
            next();
          });
        res.sendFile(frontendPath)
      } catch (error) {
        console.log(error)
      }
})

const io =   socketio(server);







server.listen(4500,()=>{
     
    console.log("chat server is running 4500")
})

// *  chat appliction js file     

// const axios=require("axios")

const  {user}=req.cookies
console.log(user)

const  socket= io("ws://localhost:4500",{transports:["websocket"]})


       socket.on("Welcome",(message)=>{

              console.log(message,"hlloo")
       }) 

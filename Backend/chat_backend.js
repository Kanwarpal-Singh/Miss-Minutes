const express = require("express");
const fs=require("fs")
const path=require("path")
const  socketio= require("socket.io");
const http = require("http");
const {UserModel}=require("./models/user.model");
const { userRoute } = require("./routes/chatting.routes");
const app=express()
 app.use(express.json())
const Path=path.join(__dirname,"../Frontend/")
 
app.use(express.static(Path+"/public"))

console.log(Path,"dflsjkd")




const server = http.createServer(app)

app.use("/chat-api",userRoute)
app.use("/messages",userRoute)
app.get("/chat/frontend", async(req,res)=>{

      try {
        const frontendPath = path.join(__dirname, '../Frontend/chat.html');
      //  console.log(frontendPath)
  
        res.sendFile(frontendPath)
      } catch (error) {
        console.log(error)
      }
})



/// Socket.io  setup : used for biderctional communicataion and event-based communication

const io =   socketio(server);





 let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};



io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
   
  socket.emit("Welcome","welcome mr.")

  //Taking  userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //Sending  and getting message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


server.listen(4500,()=>{
     
    console.log("chat server is running 4500")
})
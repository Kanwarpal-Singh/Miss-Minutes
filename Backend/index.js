const express  =require("express"); 
const cookieParser = require("cookie-parser")
var cors = require('cors')
const {connection} = require("./config/db");
const{userRoute} =require("./routes/user.route");
const { taskRoute } = require("./routes/task.route");
const { auth } = require("./middlewares/auth");
const { projectRoute } = require("./routes/project.route");

require ("dotenv").config();


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())


app.get("/", (req,res) => {
    res.send("welcome to the homepage")
})


app.use("/user",userRoute)
app.use("/project",auth,projectRoute)
app.use("/task",auth,taskRoute)



app.listen(process.env.port,async () =>{
   try {
    await connection;
    console.log("connected to the db")
   } catch (error) {
      console.log("could not connected to the db")
      console.log(error.message)
   }
   console.log(`server is running in the port:${process.env.port}`);
})


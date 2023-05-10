
const  socket= io("ws://localhost:4500",{transports:["websocket"]})


var username;
var chats=document.querySelector(".chats")
console.log(chats)
var users_list=document.querySelector(".users-list")
var  users_count=document.querySelector(".user-count")
var msg_send=document.querySelector("#user-send")
var user_msg=document.querySelector('#user-msg')


const emp = JSON.parse(sessionStorage.getItem("user")) || "";
console.log(emp)
console.log(emp.name)
username = emp.name
// do{
//     username=prompt("Enter your Name; ")
// }while(!username)



socket.emit("new-user-joined",username);
console.log(emp.name)
socket.on("user-connected",(socket_name)=>{
    console.log(socket_name)

    userJoinLeft(socket_name,"joined");
});

function userJoinLeft(name,status){

     let div=document.createElement("div")
     div.classList.add("user-join");
     let content=`<p><b>${name}</b> ${status} the chat</p>`;
     div.innerHTML=content;
          console.log(content)
     chats.appendChild(div);
     chats.scrollTop=chats.scrollHeight

}


socket.on("user-disconnected",(user)=>{

      userJoinLeft(user,"left");

})


socket.on("user-list",(users)=>{

    users_list.innerHTML="";
    users_arr=Object.values(users);
    for(i=0; i<users_arr.length;i++){

        let p=document.createElement("p")
        p.innerText=users_arr[i];
        users_list.appendChild(p);

    }
    users_count.innerHTML=users_arr.length

})



msg_send.addEventListener("click",()=>{


     let data={
        user:username,
        msg:user_msg.value
     };

     if(user_msg.value!=""){
        appendMesssage(data,"outgoing");
        socket.emit("message",data)
        user_msg.value=""
     }
});


function appendMesssage(data,status){

       let div =document.createElement("div")
       div.classList.add("message",status);

       let content=`
         <h5>${data.user}</h5>
         <p>${data.msg}</p>
       `
       div.innerHTML=content;
       chats.appendChild(div)
       chats.scrollTop=chats.scrollHeight
}


socket.on("message",(data)=>{

    appendMesssage(data,"incoming")
})

const homepage = document.getElementById("homepage")

homepage.addEventListener("click",()=>{
       window.location.href = "./dashboard.html"
})
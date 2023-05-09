const form = document.querySelector("form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");


const user = JSON.parse(sessionStorage.getItem("user")) || "";

const url ="http://localhost:8080/user/login"

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    fetch(`${url}`,{
      method: "POST",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        if (data.msg === "login Success"){
            alert(data.msg);
            emailInput.value = "";
            passwordInput.value = "";
            const user = {
              name: data.user.name,
              role: data.user.role,
              assignedTasks: data.user.assignedTasks || [],
              assignedProjects: data.user.assignedProjects || [],
            };
            sessionStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", data.accessToken);
             window.location.href = "./dashboard.html";
        }else{
            alert(data.msg);
            emailInput.value = "";
            passwordInput.value = "";
        } 
      })
      .catch((err)=>{
        console.log(err);
      });
  });
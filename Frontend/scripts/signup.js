const form = document.querySelector("form");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("name");
let passwordInput = document.getElementById("password");


const url ="http://localhost:8080/user/signup"

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
  
    fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Register Success"){
            alert(data.msg);
            usernameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
            window.location.href = "./login.html";
        }else{
            alert(data.msg);
            usernameInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
        } 
    
      })
      .catch((err) => {
        console.log(err);
      });
  });
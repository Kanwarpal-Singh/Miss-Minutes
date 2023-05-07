const form = document.querySelector("form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("pass");


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
        console.log(data.msg);
        if (data.msg === "login Success"){
            alert(data.msg);
            emailInput.value = "";
            passwordInput.value = "";
             window.location.href = "/Frontend/dashboard.html";
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
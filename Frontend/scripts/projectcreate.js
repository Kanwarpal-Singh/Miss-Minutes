const form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    

    fetch(`http://localhost:8080/project/create`,{
        method:"POST",
        body:JSON.stringify({name,description}),
        headers:{
            "Content-Type": "application/json",
             Authorization: token,
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        if(data.msg =="project created"){
            alert("Project Created Successfully")
            window.location.href = "./project.html";
        }else{
            alert(data.msg)
        }
    })
    .catch((err)=>{
        alert(err)
    })
})
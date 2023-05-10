// filter Dropdown function
const filterDropdown = document.querySelector('#filter');
filterDropdown.addEventListener('change', async() => {
  const filterOption = filterDropdown.value
  try {
    let res = await fetch(`http://localhost:8080/project/`, {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let completed =[];
      let in_progress = [];
      data.forEach((e)=>{
        if(e.status=="in progress"){
          in_progress.push(e)
        }
        else if(e.status=="completed"){
          completed.push(e)
        }
      })
      if(filterOption === "completed"){
        console.log(completed.length)
        // displayProjects(completed)
        displaytables(completed)
      }else if(filterOption === "in-progress"){
        console.log(in_progress)
        // displayProjects(in_progress)
        displaytables(in_progress)
      }else{
        fetchdata()
      }
    })
  } catch (error) {
    console.log(error)
  }
})



// project page search functionality

let search = document.getElementById("search")
let searchbtn = document.getElementById("searchbtn")
searchbtn.addEventListener("click",async()=>{
  try {
    let res = await fetch(`http://localhost:8080/project/searchProject/${search.value}`, {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  })
    .then((res) => res.json())
    .then((data) => {
        console.log([data])
        // displayProjects(data)
        displaytables([data])
    })
    
  } catch (error) {
    console.log("Project doesn't exists")
    alert("Project doesn't exists")
  }
})

// token which is stored in local storage
// let token = localStorage.getItem("token") || ""
// console.log(token)
// window onload function 
const total_projects_num = document.getElementById("total_projects_num")
const in_progress_num = document.getElementById("in_progress_num")
const completed_num = document.getElementById("completed_num")
const teams_num = document.getElementById("teams_num")
const employess_num = document.getElementById("employess_num")
const averagetasks_num = document.getElementById("averagetasks_num")
// ===> fetch function
// let employees = 0;

window.addEventListener("load",()=>{
    fetchdata()
    
})

async function fetchdata() {
    try {
      let res = await fetch(`http://localhost:8080/project/`, {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data)
          displayProjects(data)
          displaytables(data)
      })
      
    } catch (error) {
      console.log(error)
    }
  }

//   displayProjects on page

async function displayProjects(data){
    total_projects_num.innerText = data.length
    let ipp = 0;
    let cp = 0;
    let tasks = 0;
    data.forEach((e)=>{
      if(e.status=="in progress"){
        ipp++;
      }
      if(e.status=="completed"){
        cp++
      }
      tasks+=e.tasks.length
    })
    
   in_progress_num.innerText = ipp;
   completed_num.innerText = cp;
   teams_num.innerText = data.length;
   averagetasks_num.innerText = tasks/data.length;
   employess_num.innerText = tasks
}

// displaytables on page

const table = document.getElementById("table")
async function displaytables(data){
  table.innerHTML = null;
    const tr1 = document.createElement("tr")
    const th1 = document.createElement("th")
    th1.innerText = "Project Name";
    const th2 = document.createElement("th")
    th2.innerText = "Created On";
    const th3 = document.createElement("th")
    th3.innerText = "Managed By";
    const th4 = document.createElement("th")
    th4.innerText = "Tasks";
    const th5 = document.createElement("th")
    th5.innerText = "See Details";
    tr1.append(th1,th2,th3,th4,th5)
    table.append(tr1)
  data.forEach( async(e)=>{
    let managername = await getuser(e.createdBy)
    // console.log(managername)
    

    const tr = document.createElement("tr");
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")

    tr.setAttribute("data-id", e._id); 
    
    const button = document.createElement("button")
    button.addEventListener("click", function() {
      const projectId = this.parentNode.getAttribute("data-id");
      // alert(projectId)
      localStorage.setItem("projectId", projectId);
      window.location.href = "./task.html";
    });

    td1.innerText = e.name;
    td2.innerText = e.timeTracking.startDate;
    td3.innerText = managername;
    let tasks = e.tasks.length;
    if(tasks>0){
      td4.innerText = tasks;
    }else{
      td4.innerText = 0;
    }
    button.innerText = "See Details";
    button.className = "detailsbtn";
    tr.append(td1,td2,td3,td4,button);
    table.append(tr);
  })

}

async function getemp(emp){
  try {
    await fetch(`http://localhost:8080/user/employee`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res)=>res.json())
  .then((data)=>{
  // console.log(data);
  emp = data.length
  
  })
  // console.log(emp)
  return emp
  } catch (error) {
    console.log(error)
  }
  
}
// getuser function

async function getuser(id){
    let name ;
    await fetch(`http://localhost:8080/user/${id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=>res.json())
    .then((data)=>{
    // console.log(data.user);
    name = data.user
    })

    return name;
  }

//   create project function
 
let createproject = document.getElementById("create")
createproject.addEventListener("click",async()=>{
    window.location.href = "./projectcreate.html"
})
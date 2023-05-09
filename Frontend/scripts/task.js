let projectid = localStorage.getItem("projectid") || "6458e18073271c5354342b32"



const user1 = JSON.parse(sessionStorage.getItem("user")) || "";
// let token1 = localStorage.getItem("token") || ""

let task = document.querySelector(".create-task")

let title1 = document.getElementById("title-1")
let createddate = document.getElementById("details-date")
let detailsstatus = document.getElementById("details-status")
let taskcount = document.getElementById("details-total-task")
let employeecount = document.getElementById("details-total-employee")


//  create taskform 

const formEl = document.getElementById("create-task-form")
const taskinputtitle = document.getElementById("task-form-title")
const description = document.getElementById("description")
const projectinputtitle = document.getElementById("project-title-task-form")
const assignBySelect = document.getElementById("assignby");
const statusinput = document.getElementById("status")

let projecttitlename = localStorage.getItem("projecttitle") || "";



let backbtn = document.getElementById("back-btn")

backbtn.addEventListener("click",()=>{
    localStorage.removeItem("projectid")
    window.location.href="./project.html"
})

// back-btn add 

if (user1.role === "Employee") {
    task.style.display = "none"
}





window.addEventListener("load", () => {
    fetchdata()
    fetchdata1()
    fetchdata2()
})

async function fetchdata() {
    try {
        let res = await fetch(`http://localhost:8080/project/details/${projectid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {

                title1.innerText = data.name
                localStorage.setItem("projecttitle",data.name)
                const startDate = new Date(data.timeTracking.startDate);
                const formattedDate = startDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                });

                createddate.innerText = formattedDate;
                detailsstatus.innerText = data.status;
                taskcount.innerHTML = data.tasks.length


            })

    } catch (error) {
        console.log(error)
    }
}

// /alltask



async function fetchdata1() {
    try {
        let res = await fetch(`http://localhost:8080/task/project/${projectid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                displayData(data.data)
            })

    } catch (error) {
        console.log(error)
    }
}

let tbodyEl = document.querySelector("tbody")

 
function displayData(data) {
    tbodyEl.innerHTML = "";
    data.forEach(async (element) => {
        let tr = document.createElement("tr");
        tr.setAttribute("data-id", element._id); 

        let task = document.createElement("td");
        let CreatedOn = document.createElement("td");
        let Assignto = document.createElement("td");
        let Createdby = document.createElement("td");
        let Seedetails = document.createElement("td");

        task.innerText = element.title;

        const date = new Date(element.startTime);
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        CreatedOn.innerText = formattedDate;

        let assignedToUser = await fetchUserById(element.assignedTo);
        Assignto.innerText = assignedToUser ? assignedToUser.name : "Unknown";

        let createdByUser = await fetchUserById(element.createdBy);
        Createdby.innerText = createdByUser ? createdByUser.name : "Unknown";

        let button = document.createElement("button");
        button.innerText = "See Details";

        button.addEventListener("click", function() {
            const taskId = this.parentNode.parentNode.getAttribute("data-id");
            alert(taskId)
            localStorage.setItem("taskId", taskId);
            window.location.href = "./task1.html";
        });

        Seedetails.appendChild(button);
        tr.append(task, CreatedOn, Assignto, Createdby, Seedetails);
        tbodyEl.append(tr);
    });
}



async function fetchUserById(userId) {
  try {
    const res = await fetch(`http://localhost:8080/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// employee 

async function fetchdata2() {
    try {
        let res = await fetch(`http://localhost:8080/task/${projectid}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
            .then((res) => res.json())
            .then((data) => {

                employeecount.innerText=data.assignedUsers
            })

    } catch (error) {
        console.log(error)
    }
}



// have to work later//....
// task.addEventListener("click", () => {
    
// })

async function toggleDropdown3(createTaskform) {
    
    const response = await fetch('http://localhost:8080/user/employee', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    const employees = await response.json();
   
    assignBySelect.innerHTML = '';
    employees.forEach((employee) => {
        const option = document.createElement('option');
        option.value = employee._id;
        option.text = employee.name;
        assignBySelect.appendChild(option);
    });

    // Show or hide the create task form
    if (createTaskform.style.display === 'none') {
        createTaskform.style.display = 'block';
        projectinputtitle.value = projecttitlename;
    } else {
        createTaskform.style.display = 'none';
    }
}



formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const title = taskinputtitle.value;
    const desc = description.value;
    const assignById = assignBySelect.value; // value will be user id
    const statusVal = statusinput.value;
  
    // get project id from local storage
    const projectId = localStorage.getItem("projectid") || "6458e18073271c5354342b32";
     
    const requestBody = {
      title,
      description: desc,
      assignedTo: assignById,
      status: statusVal,
      createdBy:user1.id,
      startTime: new Date().toISOString(), 
      projectId 
    };
  
    const response = await fetch(`http://localhost:8080/task/create/${projectId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        // task created successfully
        const task = await response.json();
        console.log("Task created:", task);
        taskinputtitle.value="";
        description.value="";
        let createTaskform = document.getElementById("createTaskform")
        createTaskform.style.display = 'none'
        fetchdata1()
      } else {
        // task creation failed
        const errorData = await response.json();
        console.error("Task creation failed:", errorData);
        alert("Task creation failed")
        taskinputtitle.value="";
        description.value="";
      }
    
  });
  
const user2 = JSON.parse(sessionStorage.getItem("user")) || "";

let taskId = localStorage.getItem("taskId") || ""

let projecttitlename1 = localStorage.getItem("projecttitle") || "";

let task1edit = document.querySelector(".create-Edit")
let task1delete = document.querySelector(".Edit1")


if (user2.role === "Employee") {
    task1delete.style.display="none"
}

let backbtn2 = document.getElementById("back-btn2")

backbtn2.addEventListener("click", () => {
    localStorage.removeItem("taskId")
    window.location.href = "./task.html"
})


let title2 = document.getElementById("title-2")
let taskcreateddate = document.getElementById("taskdetails-date")
let taskdetailsstatus = document.getElementById("taskdetails-status")
let taskcreatedby = document.getElementById("taskdetails-createdby")
let taskdetailassignto = document.getElementById("taskdetails-assignto")
let taskdetailendtime = document.getElementById("taskdetails-endtime")
let taskdetailprojectname = document.getElementById("taskdetails-projectname")
let taskdetailtotaltime = document.getElementById("taskdetails-time")

taskdetailprojectname.innerText = projecttitlename1


window.addEventListener("load", () => {
    fetchdata()
})


async function fetchdata() {
    try {
        let res = await fetch(`http://localhost:8080/task/${taskId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        })
        let data = await res.json();


        title2.innerText = data.task.title

        const startDate = new Date(data.task.startTime);
        const currentDate = new Date()
        const endDate = new Date(data.task.endTime)
        var totalDays = 0;
        var totalTime = 0;
        

        
        if(data.task.endTime){
            totalDays = currentDate.getTime()-endDate.getTime();
            totalTime = Math.floor(totalDays / (1000 * 60 * 60));
            taskdetailendtime.innerText = endDate;
        }else{
            totalDays = currentDate.getTime()-startDate.getTime();
            totalTime = Math.floor(totalDays / (1000 * 60 * 60));
        }

        const formattedDate = startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });

        taskcreateddate.innerText = formattedDate;
        taskdetailsstatus.innerText = data.task.status;
        taskdetailtotaltime.innerText = totalTime+ "Hrs";
        

        await fetch(`http://localhost:8080/user/${data.task.createdBy}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }).then(res => res.json())
        .then(data => {
            taskcreatedby.innerText=data.user
        }).catch((error) => {
            console.log(error)
        })

        await fetch(`http://localhost:8080/user/${data.task.assignedTo}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }).then(res => res.json())
        .then(data => {
            taskdetailassignto.innerText=data.user
        }).catch((error) => {
            console.log(error)
        })


    } catch (error) {
        console.log(error)
    }
}





task1delete.addEventListener("click", async () => {
  console.log("hello")
    await fetch(`http://localhost:8080/task/delete/${taskId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    }).then(res => res.json())
        .then(data => {
            console.log("Task Will be Deleted")
            if (data.message === 'Task Deleted') {
                alert(data.message)
                localStorage.removeItem("taskId")
                window.location.href = "./task.html"
            }
        }).catch((error) => {
            console.log("couldn't delete the task")
            alert(error)
            console.log(error)
        })



})



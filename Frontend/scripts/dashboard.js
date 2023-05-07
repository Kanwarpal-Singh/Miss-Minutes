const menuIconBtn = document.getElementById('menu-icon-btn');
const menuIconBtn1 = document.getElementById('menu-icon1');
const sidebar = document.getElementById('sidebar');
const title = document.querySelector(".title")
const links = document.querySelectorAll('.link');

menuIconBtn.addEventListener('click', () => {
   if(sidebar.style.width==="80px"){
    sidebar.style.width="250px"
    title.style.display="block"
    links.forEach(link => link.style.display = "block");
   }else{
    sidebar.style.width="80px"
    title.style.display="none"
    links.forEach(link => link.style.display = "none");
   }
});

menuIconBtn1.addEventListener("click",()=>{
  if(sidebar.style.display === "none"){
    
    sidebar.style.display = "block"
  }else{
    sidebar.style.display ="none"
  }
})


const bellicon = document.getElementById("bell-icon")
const popup = document.getElementsByClassName("popup")[0]
const addnotification = document.getElementById("addnotification")
bellicon.addEventListener("click",()=>{
    if(addnotification.innerHTML===""){
        if(popup.style.display === "none"){
            popup.style.display = "flex"
          } else {
            popup.style.display = "none"
          }
    }else{
       if(addnotification.style.display==="none") {
        addnotification.style.display="block"
       }else{
        addnotification.style.display="none"
       }
    }
})


const username = document.getElementById("username").textContent;
const userlogo = document.getElementById("userlogo");
userlogo.textContent = username.charAt(0).toUpperCase();


function toggleDropdown1(dropdown1) {
  if (dropdown1.style.display === 'none') {
    dropdown1.style.display = 'block';
  } else {
    dropdown1.style.display = 'none';
  }
}



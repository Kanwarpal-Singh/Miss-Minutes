const myDiv = document.getElementsByClassName("navbar_right")[0];
let Navbar_divVisible = false;
if (window.innerWidth > 1184) {
  myDiv.style.display = "flex";
}

// Show/hide div on toggle
function toggleDiv() {
  if (Navbar_divVisible) {
    myDiv.style.display = "none";
    Navbar_divVisible = false;
  } else {
    myDiv.style.display = "block";
    Navbar_divVisible = true;
  }
}

// Show div if screen size is changed back to normal
function handleResize() {
  if (window.innerWidth > 1184) {
    myDiv.style.display = "flex";
  } else {
    myDiv.style.display = Navbar_divVisible ? "block" : "none";
  }
}

// Add event listener for resize event
window.addEventListener("resize", handleResize);

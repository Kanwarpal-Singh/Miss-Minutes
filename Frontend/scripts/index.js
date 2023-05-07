let wrapper_status;

function Wrapper_navbar() {
  const navbar_wrapper = document.getElementsByClassName("navbar_right")[0];
  if (wrapper_status) {
    navbar_wrapper.style.display = "none";
    wrapper_status = false;
    return;
  }
  navbar_wrapper.style.display = "flex";
  wrapper_status = true;
}

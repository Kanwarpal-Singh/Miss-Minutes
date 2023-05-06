const footerSection = () => {
  return `<section id="footer_section_1">
  <div>
    <p>Company</p>
    <a href="#">Home</a>
    <a href="#">Terms</a>
    <a href="#">Privacy</a>
    <a href="#">Cookies</a>
    <a href="#">Affiliate terms</a>
    <a href="#">Download app</a>
    <a href="#">Pricing</a>
    <a href="#">Affiliate</a>
    <a href="#">Press</a>
    <a href="#">DeskTime in your language</a>
  </div>
  <div>
    <p>Learn more</p>
    <a href="#">All resources</a>
    <a href="#">Employee monitoring guide</a>
    <a href="#">Online employee time clock</a>
    <a href="#">Best time tracking apps</a>
    <a href="#">DeskTime for business</a>
    <a href="#">DeskTime for freelancers</a>
    <a href="#">FAQ</a>
    <a href="#">Case studies</a>
    <a href="#">Webinars</a>
    <a href="#">Blog</a>
  </div>
  <div>
    <p>Learn more</p>
    <a href="#">All integrations</a>
    <a href="#">Trello</a>
    <a href="#">Basecamp</a>
    <a href="#">Jira</a>
    <a href="#">Asana</a>
    <a href="#">Outlook Calendar</a>
    <a href="#">Google Calendar</a>
  </div>
  <div>
    <p>Features</p>
    <a href="#">All features</a>
    <a href="#">Automatic time tracking</a>
    <a href="#">URL & App tracking</a>
    <a href="#">Screenshots</a>
    <a href="#">Project time tracking</a>
    <a href="#">Shift schedule</a>
    <a href="#">Offline time tracking</a>
    <a href="#">Absence calendar</a>
    <a href="#">Mobile app</a>
    <a href="#">Feature request</a>
  </div>
  <div>
    <p>Help center</p>
    <a href="#">Contact us</a>
    <a href="#">Schedule a call</a>
    <a href="#">Send us an e-mail</a>
    <a href="#">Request In-person training</a>
    <a href="#">Open chat</a>
    <p>Phone support</p>
    <a href="#">+1 (315) 6365354</a>
    <a href="#">MON-FRI 9:00-22:00 EET</a>
  </div>
</section>
<section id="footer_section_2">
        <div class="footer_logo">
          <img src="./images/miss-minutes-shy.png" alt="" />
          <span>Miss-Minutes</span>
        </div>
        <div>
          <a href="" class="fa-brands fa-square-facebook"></a>
          <a href="" class="fa-brands fa-square-twitter"></a>
          <a href="" class="fa-brands fa-square-youtube"></a>
          <a href="" class="fa-brands fa-linkedin"></a>
          <a href="" class="fa-brands fa-skype"></a>
          <a href="" class="fa-brands fa-whatsapp"></a>
        </div>
      </section>
      <section id="footer_section_3">
        <span>© 2011 - 2023 DeskTime</span>
        <span>DRAUGIEM GROUP</span>
      </section>
`;
};
document.getElementById("footer").innerHTML = footerSection();
export { footerSection };

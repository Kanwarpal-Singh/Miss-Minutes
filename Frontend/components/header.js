const headerSection = () => {
  return `<!-- Header section-1 -->
  <section class="header_top">
    <div>
      <h1>The ultimate all-in-one time tracker for your business</h1>
      <p class="header_text">
        A time tracker with additional workforce management features that
        will help you develop a high-performing team that smashes goals
        every time.
      </p>
      <input type="text" placeholder="Your work email" />
      <button onclick="window.location.href='./signup.html'">
        START FREE TRIAL
      </button>
      <p>Try free for 14 days. No credit card required.</p>
      <p>
        By signing up, you agree to our<strong> <u>terms</u></strong>
        and<strong><u>privacy policy.</u></strong>
      </p>
    </div>
    <div class="header_video">
      <iframe
        src="https://www.youtube.com/embed/auJ0kqjGEbM?playlist=auJ0kqjGEbM&amp;autoplay=0&amp;mute=1&amp;loop=1"
        title="YouTube video player"
        frameborder="0"
      ></iframe>
    </div>
  </section>
  <!-- Header section-2 -->
  <section class="header_bottom">
    <img
      src="https://desktime.com/static/web/clients/customer-sixt-logo-white.svg"
      class="img-fluid ls-is-cached lazyloaded"
      alt="Sixt"
    />
    <img
      src="https://desktime.com/static/web/clients/customer-mapon-logo-white.svg"
      class="img-fluid ls-is-cached lazyloaded"
      alt="Mapon"
    />
    <img
      src="https://desktime.com/static/web/clients/customer-montway-logo-white.svg"
      class="img-fluid ls-is-cached lazyloaded"
      alt="Montway"
    />
    <img
      src="https://desktime.com/static/web/clients/customer-onthemap-logo-white.svg"
      class="img-fluid ls-is-cached lazyloaded"
      alt="On the map"
    />
    <img
      src="https://desktime.com/static/web/clients/customer-printful-logo-white.svg"
      class="img-fluid active ls-is-cached lazyloaded"
      alt="Printful"
    />
  </section>`;
};
document.getElementsByTagName("header")[0].innerHTML = headerSection();
export { headerSection };

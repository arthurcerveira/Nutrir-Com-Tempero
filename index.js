const postsEndPoint = "https://nutrir-com-tempero.rj.r.appspot.com/scrap_posts";
const contactEndPoint =
  "https://cors-anywhere.herokuapp.com/https://arthur-email-bot.herokuapp.com/contact";

// Navigation control
function scrollToHome() {
  let home = document.querySelector(".showcase");
  scrollCompensation(home);

  // Close nav menu if on mobile
  closeNavMenu();
}

function scrollToServices() {
  let services = document.querySelector(".services");
  scrollCompensation(services);

  // Close nav menu if on mobile
  closeNavMenu();
}

function scrollToAbout() {
  let about = document.querySelector(".about");
  scrollCompensation(about);

  // Close nav menu if on mobile
  closeNavMenu();
}

function scrollToBlog() {
  let blog = document.querySelector(".blog");
  scrollCompensation(blog);

  // Close nav menu if on mobile
  closeNavMenu();
}

function scrollToContact() {
  let contact = document.querySelector(".contact");
  scrollCompensation(contact);

  // Close nav menu if on mobile
  closeNavMenu();
}

function scrollCompensation(element) {
  // Get navigation bar height
  let yOffset = document.querySelector(".navigation").clientHeight;

  let position = element.style.position;
  let top = element.style.top;

  // Workaround to fit navigation bar
  element.style.position = "relative";
  element.style.top = `-${yOffset}px`;
  element.scrollIntoView({ behavior: "smooth", block: "start" });

  // Revert back to normal
  element.style.top = top;
  element.style.position = position;
}

// Modify navbar background based on scroll
function setNavbarClass() {
  let nav = document.querySelector(".navigation");

  window.pageYOffset > 100
    ? nav.classList.add("navigation-scroll")
    : nav.classList.remove("navigation-scroll");
}

window.addEventListener("scroll", setNavbarClass);

// Navbar menu for mobile users
function toggleNavMenu() {
  let navMenuButton = document.querySelector(".menu");

  navMenuButton.classList.contains("show")
    ? navMenuButton.classList.remove("show")
    : navMenuButton.classList.add("show");

  let darkOverlay = document.querySelector(".dark-overlay");
  darkOverlay.classList.contains("dark-overlay-on")
    ? darkOverlay.classList.remove("dark-overlay-on")
    : darkOverlay.classList.add("dark-overlay-on");
}

window.onload = () =>
  document
    .querySelector(".nav-button")
    .addEventListener("click", toggleNavMenu);

function closeNavMenu() {
  let navMenuButton = document.querySelector(".menu");
  navMenuButton.classList.remove("show");

  let darkOverlay = document.querySelector(".dark-overlay");
  darkOverlay.classList.remove("dark-overlay-on");
}

// Accessibility
function handleFirstTab(keyDown) {
  if (keyDown.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

window.addEventListener("keydown", handleFirstTab);

// Set blog post image height based on width
function setPostImageHeight() {
  let postImages = document.getElementsByClassName("post-image");

  let width = postImages[0].clientWidth;
  let height = width * 0.8;

  for (let imageIndex = 0; imageIndex < postImages.length; imageIndex++) {
    postImages[imageIndex].style.height = `${height}px`;
  }
}

window.addEventListener("load", setPostImageHeight);
window.addEventListener("resize", setPostImageHeight);

// Get blog posts from Wordpress
function getPosts() {
  fetch(postsEndPoint)
    .then((response) => response.json())
    .then((posts) => {
      let firstImage = document.querySelector(".first-image");
      firstImage.src = posts.post0.img;
      let firstLink = document.querySelector(".first-link");
      firstLink.href = posts.post0.link;
      let firstTitle = document.querySelector(".first-title");
      firstTitle.innerHTML = posts.post0.title;

      let secondImage = document.querySelector(".second-image");
      secondImage.src = posts.post1.img;
      let secondLink = document.querySelector(".second-link");
      secondLink.href = posts.post1.link;
      let secondTitle = document.querySelector(".second-title");
      secondTitle.innerHTML = posts.post1.title;

      let thirdImage = document.querySelector(".third-image");
      thirdImage.src = posts.post2.img;
      let thirdLink = document.querySelector(".third-link");
      thirdLink.href = posts.post2.link;
      let thirdTitle = document.querySelector(".third-title");
      thirdTitle.innerHTML = posts.post2.title;

      setPostImageHeight();
    });
}

getPosts();

// Send message through contact form
function sendMessage(event) {
  event.preventDefault();
  setContactFeedback("");

  let name = document.querySelector(".name").value;

  if (name == "") {
    setContactFeedback("Campo 'Nome' não pode estar em branco");
    return;
  }

  let email = document.querySelector(".email").value;

  if (!validateEmail(email)) return;

  let subject = document.querySelector(".subject").value;

  if (subject == "") {
    setContactFeedback("Campo  'Mensagem' não pode estar em branco");
    return;
  }

  let data = { name: name, email: email, text: subject };

  fetch(contactEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        setContactFeedback("Mensagem enviada com sucesso");
        return;
      }

      if (data.error) {
        setContactFeedback("Houve um erro ao enviar a mensagem");
        return;
      }
    });
}

window.addEventListener("load", () =>
  document.querySelector(".submit-form").addEventListener("click", sendMessage)
);

function validateEmail(email) {
  if (email == "") {
    setContactFeedback("Campo 'Email' não pode estar em branco");
    return false;
  }

  let re = /\S+@\S+\.\S+/;

  if (re.test(email)) return true;

  setContactFeedback("Formato de email inválido");
  return false;
}

function setContactFeedback(message) {
  document.querySelector(".feedback").innerHTML = message;
}

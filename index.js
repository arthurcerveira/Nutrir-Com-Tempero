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

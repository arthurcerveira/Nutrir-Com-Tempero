// Navigation functions
function scrollToServices() {
  let services = document.getElementsByClassName("services")[0];
  services.scrollIntoView({ behavior: "smooth" });
}

function scrollToAbout() {
  let about = document.getElementsByClassName("about")[0];
  about.scrollIntoView({ behavior: "smooth" });
}

function scrollToBlog() {
  let blog = document.getElementsByClassName("blog")[0];
  blog.scrollIntoView({ behavior: "smooth" });
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

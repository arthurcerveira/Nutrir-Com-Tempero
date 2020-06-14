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

async function loadWork() {
  const res = await fetch("Fotos/work/_work.json");
  const projects = await res.json();
  console.log(projects);
  createCarousel(projects);
  createGallery(projects);
}

function createCarousel(projects) {
  const container = document.querySelector("#carousel-container");
  for (const project of projects) {
    const image = document.createElement("img");
    image.src = "Fotos/work/" + project.image;
    image.alt = project.title;
    const imageWidth = Math.round(Math.random() * 300);
    image.style.width = `${imageWidth}%`;
    image.addEventListener("click", moveImageToTheBack);
    container.appendChild(image);
  }
}

function moveImageToTheBack(e) {
  const image = e.target;
  const container = image.parentElement;
  container.removeChild(image);
  container.prepend(image);
}

function createGallery(projects) {
  const container = document.querySelector("#archive-container");
  for (const project of projects) {
    const image = document.createElement("img");
    image.src = "Fotos/work/" + project.image;
    image.alt = project.title;
    image.dataset.description = project.description;
    image.dataset.title = project.title;
    image.dataset.year = project.year;
    image.addEventListener("click", showGalleryPopup);
    container.appendChild(image);
  }
}

function showGalleryPopup(e) {
  console.log("clickced!!!", e);
  const image = e.target;
  document.querySelector("#archive-popup-image").src = image.src;
  document.querySelector("#archive-popup-year").textContent =
    image.dataset.year;
  document.querySelector("#archive-popup-title").textContent =
    image.dataset.title;
  document.querySelector("#archive-popup-description").textContent =
    image.dataset.description;
  document.querySelector("#archive-mask").style.display = "block";
}

function hideGalleryPopup() {
  document.querySelector("#archive-mask").style.display = "none";
}

loadWork();
document
  .querySelector("#archive-mask")
  .addEventListener("click", hideGalleryPopup);

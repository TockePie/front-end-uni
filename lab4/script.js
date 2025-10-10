const n = 79;
const variant = (n % 10) + 1;

const firstElement = document.getElementById(`el${variant}`);
const secondElement = document.querySelector(`#el${variant + 1}`);

firstElement.addEventListener("click", () => {
  firstElement.classList.add("f-element");

  firstElement.classList.toggle("active");
});

secondElement.addEventListener("click", () => {
  secondElement.classList.add("s-element");

  secondElement.classList.toggle("active");
});

// Task 2

const imageContainer = document.querySelector(".image-container");
let image = document.getElementById("el17");

const addBtn = document.getElementById("add-btn");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const removeBtn = document.getElementById("remove-btn");

addBtn.addEventListener("click", () => {
  if (imageContainer.querySelector("img")) {
    alert("Зображення вже додано!");
    return;
  }

  const newImg = document.createElement("img");
  newImg.id = "el17";
  newImg.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/20190503_Hungarian_Parliament_Building_1814_2263_DxO.jpg/640px-20190503_Hungarian_Parliament_Building_1814_2263_DxO.jpg";
  newImg.alt = "Панорама Будапешта";
  newImg.style.objectFit = "cover";
  newImg.style.width = "100%";
  newImg.style.height = "100%";

  imageContainer.appendChild(newImg);
  image = newImg;
});

function changeSize(scale) {
  const width = image.clientWidth;
  const height = image.clientHeight;
  image.style.width = width * scale + "px";
  image.style.height = height * scale + "px";
}

increaseBtn.addEventListener("click", () => {
  if (!image) {
    alert("Спочатку додайте зображення!");
    return;
  }

  changeSize(1.1);
});

decreaseBtn.addEventListener("click", () => {
  if (!image) {
    alert("Спочатку додайте зображення!");
  }

  changeSize(0.9);
});

removeBtn.addEventListener("click", () => {
  if (!image && !imageContainer.contains(image)) {
    alert("Зображення вже видалено!");
    return;
  }

  imageContainer.removeChild(image);
  image = null;
});

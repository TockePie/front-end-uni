const n = 79;
const variant = (n % 10) + 1;

let firstElement = document.getElementById(`el${variant}`);
let secondElement = document.querySelector(`#el${variant + 1}`);

firstElement.addEventListener("click", () => {
  firstElement.classList.add("f-element");

  firstElement.classList.toggle("active");
});

secondElement.addEventListener("click", () => {
  secondElement.classList.add("s-element");

  secondElement.classList.toggle("active");
});

const originalImg = document.getElementById("el16");

const img = document.getElementById("el17");

const addBtn = document.getElementById("add-btn");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const removeBtn = document.getElementById("remove-btn");

addBtn.addEventListener("click", () => {
  const newImg = img.cloneNode(true);
  newImg.removeAttribute("id");
  img.parentNode.appendChild(newImg);
});

increaseBtn.addEventListener("click", () => zoomIn(img));
decreaseBtn.addEventListener("click", () => zoomOut(img));

removeBtn.addEventListener("click", () => img.remove());

function zoomIn(element) {
  let currWidth = element.clientWidth;
  element.style.width = currWidth + 50 + "px";
}

function zoomOut(element) {
  let currWidth = element.clientWidth;
  element.style.width = currWidth - 50 + "px";
}

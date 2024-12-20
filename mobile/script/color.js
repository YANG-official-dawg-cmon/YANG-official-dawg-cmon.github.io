const root = document.documentElement;
const colorBtn = document.getElementById("change-color");
const colors = ["purple", "red", "blue", "green", "orange", "pink"];
let colorI = 0;

colorBtn.addEventListener("click", changePageColor);

function changePageColor() {
  console.log("yo", colorI, "var(--" + colors[colorI] + ")")
  colorI++;
  if (colorI >= colors.length) {
    colorI = 0;
  }
  document.documentElement.style.setProperty("--page-color", "var(--" + colors[colorI] + ")");
}

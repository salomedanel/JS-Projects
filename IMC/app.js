const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();
  calculateBMI();
}

const inputs = document.querySelectorAll("input");

function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;

  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }

  let bmi = weight / ((height / 100) * (height / 100));
  bmi = bmi.toFixed(1);
  showResult(bmi);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

function handleError() {
  displayBMI.textContent = "Woops";
  result.textContent = "Taille ou poids incorrect";
  displayBMI.style.color = "inherit";
}

function showResult(bmi) {
  const rank = BMIData.find((data) => {
    if (bmi >= data.range[0] && bmi < data.range[1]) return data;
    else if (typeof data.range === "number" && bmi >= data.range) return data;
  });
  displayBMI.textContent = bmi;
  displayBMI.style.color = `${rank.color}`;
  result.textContent = rank.name;
}
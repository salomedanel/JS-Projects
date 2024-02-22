const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

console.log("Hello");

const form = document.querySelector("form");
console.dir(form);

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    calculateBMI();
}

function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    if (!height || !weight || height <= 0 || weight <= 0) {
        handleError();
        return;
    }
    let bmi = weight / ((height / 100) * (height / 100));
    bmi = bmi.toFixed(1);
    displayBMI(bmi);
}

const bmiValue = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

function handleError() {
    bmiValue.textContent = "Woops";
    result.textContent = "Veuillez entrer une taille et un poids valides";
    bmiValue.style = "inherit";
}

function displayBMI(bmi) {
    bmiValue.textContent = bmi;
    const rank = BMIData.find((data) => {
        if (bmi > data.range[0] && bmi <= data.range[1]) return data;
        else if (typeof data.range === 'number' && bmi >= data.range)
            return data;
    })
    result.textContent = rank.name;
    bmiValue.style.color = rank.color;
}
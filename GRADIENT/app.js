const colorPicker = document.querySelectorAll('input[type="color"]');
const colorLabel = document.querySelectorAll(".input-group label");
const orientationLabel = document.querySelector(".orientation input");
const body = document.querySelector("body");

const gradientData = {
    angle: 90,
    colors: ["#FF5F5D", "#FFC371"],
    isDark: [false, false]
}

function populateUI() {
    colorLabel[0].style.color = "black";
    colorLabel[1].style.color = "black";

    colorLabel[0].textContent = gradientData.colors[0]; 
    colorLabel[1].textContent = gradientData.colors[1];
    
    colorPicker[0].value = gradientData.colors[0];
    colorPicker[1].value = gradientData.colors[1];

    gradientData.isDark[0] = isColorDark(gradientData.colors[0]);
    gradientData.isDark[1] = isColorDark(gradientData.colors[1]);
    console.log(gradientData.isDark[0], gradientData.isDark[1]);
    
    colorLabel[0].style.background = gradientData.colors[0];
    colorLabel[1].style.background = gradientData.colors[1];

    if (gradientData.isDark[0])
        colorLabel[0].style.color = "white";
    if (gradientData.isDark[1])
        colorLabel[1].style.color = "white";
    
    body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;
}

populateUI();

colorPicker.forEach(colorPicker => {
  colorPicker.addEventListener("input", e => updateColor(e, 'color'));
});

orientationLabel.addEventListener("input", e => updateColor(e, 'angle'));

const angleValue = document.querySelector(".orientation-value");

function updateColor(e, type) {
    if (type === 'color') {
        const colorPickerId = e.target.id.slice(-1) - 1;
        gradientData.colors[colorPickerId] = e.target.value;    
    } else if (type === 'angle') {
        gradientData.angle = e.target.value;
        angleValue.textContent = `${gradientData.angle}` + "°";
    }
    populateUI();
};

const copyBtn = document.querySelector(".cpy-btn");
const randomBtn = document.querySelector(".random-btn");

copyBtn.addEventListener("click", handleCopy);
randomBtn.addEventListener("click", handleRandom);

function handleCopy() {
    const textToCopy = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;
    navigator.clipboard.writeText(textToCopy);

    const toastCpy = document.querySelector(".msg-copy");
    toastCpy.style.visibility = "visible";
    console.log(toastCpy);
    
    setTimeout(() => {
        toastCpy.style.visibility = "hidden";
    }, 3000);
}

function handleRandom() {
    gradientData.colors[0] = randomHexColor();
    gradientData.colors[1] = randomHexColor();
    populateUI();
}

function randomHexColor () {
    // Générer des valeurs aléatoires pour chaque composante de couleur (rouge, vert, bleu)
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convertir les valeurs en code hexadécimal
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Concaténer les valeurs hexadécimales pour former le code couleur
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
}

function isColorDark(hexColor) {
    // Convertit le code hexadécimal en valeurs RGB
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    // Calcule la luminance
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Vérifie si la luminance est inférieure au seuil
    return luminance < 128;
}
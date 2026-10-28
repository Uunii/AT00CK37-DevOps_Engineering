
const hexForm = document.querySelector("#hex-form");
const rgbForm = document.querySelector("#rgb-form");

const hexInput = document.querySelector("#hex-input");
const redInput = document.querySelector("#red-input");
const greenInput = document.querySelector("#green-input");
const blueInput = document.querySelector("#blue-input");

const rgbResult = document.querySelector("#rgb-result");
const hexResult = document.querySelector("#hex-result");

const hexError = document.querySelector("#hex-error");
const rgbError = document.querySelector("#rgb-error");

const colorPreview = document.querySelector("#color-preview");
const previewValue = document.querySelector("#preview-value");

// Convert a six-digit hexadecimal color to RGB.
function hexToRgb(hex) {
    const cleaned = hex.trim().replace(/^#/, "");

    if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
        throw new Error(
            "Enter a valid six-digit hex color, such as #FF0000."
        );
    }

    return {
        red: parseInt(cleaned.slice(0, 2), 16),
        green: parseInt(cleaned.slice(2, 4), 16),
        blue: parseInt(cleaned.slice(4, 6), 16)
    };
}

// Convert RGB values to a hexadecimal color.
function rgbToHex(red, green, blue) {
    const values = [red, green, blue];

    if (
        values.some(value =>
            !Number.isInteger(value) || value < 0 || value > 255
        )
    ) {
        throw new Error(
            "RGB values must be whole numbers between 0 and 255."
        );
    }

    return "#" + values
        .map(value => value.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
}

// Update the color preview and its text.
function updatePreview(hex, red, green, blue) {
    colorPreview.style.backgroundColor = hex;
    previewValue.textContent =
        `${hex} · RGB(${red}, ${green}, ${blue})`;
}

// Handle Hex-to-RGB form submission.
hexForm.addEventListener("submit", function(event) {
    event.preventDefault();
    hexError.textContent = "";

    try {
        const { red, green, blue } = hexToRgb(hexInput.value);

        rgbResult.textContent = `${red}, ${green}, ${blue}`;

        // Keep both conversion sections synchronized.
        redInput.value = red;
        greenInput.value = green;
        blueInput.value = blue;

        const hex = rgbToHex(red, green, blue);
        hexResult.textContent = hex;

        updatePreview(hex, red, green, blue);
    } catch (error) {
        hexError.textContent = error.message;
    }
});

// Handle RGB-to-Hex form submission.
rgbForm.addEventListener("submit", function(event) {
    event.preventDefault();
    rgbError.textContent = "";

    try {
        const inputs = [
            redInput.value,
            greenInput.value,
            blueInput.value
        ];

        if (inputs.some(value => value.trim() === "")) {
            throw new Error("Please enter all three RGB values.");
        }

        const [red, green, blue] = inputs.map(Number);

        const hex = rgbToHex(red, green, blue);

        hexResult.textContent = hex;
        hexInput.value = hex;
        rgbResult.textContent = `${red}, ${green}, ${blue}`;

        updatePreview(hex, red, green, blue);
    } catch (error) {
        rgbError.textContent = error.message;
    }
});

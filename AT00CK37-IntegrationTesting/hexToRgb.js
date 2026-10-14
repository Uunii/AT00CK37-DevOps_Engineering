// hexToRgb.js - Small helper that converts a hex color string to RGB.
// Example: "#FF0000" becomes { red: 255, green: 0, blue: 0 }.

// Convert a hex color (like "#FF0000" or "FF0000") to its RGB values.
export function hexToRgb(hex) {
    // Input must be a string, otherwise we cannot process it.
    if (typeof hex !== "string") {
        throw new Error("Hex value must be a string");
    }

    // Remove the optional # at the beginning
    hex = hex.replace(/^#/, "");

    // Accept only six hexadecimal characters
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error("Invalid hex color");
    }

    // Take the first 2 letters for red and convert from hex to decimal.
    const red = parseInt(hex.substring(0, 2), 16);
    // Take the middle 2 letters for green and convert from hex to decimal.
    const green = parseInt(hex.substring(2, 4), 16);
    // Take the last 2 letters for blue and convert from hex to decimal.
    const blue = parseInt(hex.substring(4, 6), 16);

    // Return the three colors as a simple object.
    return { red, green, blue };
}


export function hexToRgb(hex) {
    if (typeof hex !== "string") {
        throw new Error("Hex value must be a string");
    }

    // Remove the optional # at the beginning
    hex = hex.replace(/^#/, "");

    // Accept only six hexadecimal characters
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error("Invalid hex color");
    }

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return { red, green, blue };
}

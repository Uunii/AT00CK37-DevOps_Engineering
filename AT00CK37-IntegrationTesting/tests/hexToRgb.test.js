// tests/hexToRgb.test.js - Unit tests for the hexToRgb() helper function.
// These tests check the function directly, without starting the server.

// Import Jest test helpers.
import { test, expect } from "@jest/globals";
// Import the function we want to test.
import { hexToRgb } from "../hexToRgb.js";

// Test: red color with "#" should convert correctly.
test("converts red correctly", () => {
    expect(hexToRgb("#FF0000")).toEqual({
        red: 255,
        green: 0,
        blue: 0
    });
});

// Test: green color without "#" should also work.
test("converts green correctly without the #", () => {
    expect(hexToRgb("00FF00")).toEqual({
        red: 0,
        green: 255,
        blue: 0
    });
});

// Test: black (all zeros) should give all zeros.
test("converts black correctly", () => {
    expect(hexToRgb("#000000")).toEqual({
        red: 0,
        green: 0,
        blue: 0
    });
});

// Test: white (all max) should give all 255s.
test("converts white correctly", () => {
    expect(hexToRgb("#FFFFFF")).toEqual({
        red: 255,
        green: 255,
        blue: 255
    });
});

// Test: letters outside 0-9/A-F should be rejected.
test("rejects invalid hex values", () => {
    expect(() => hexToRgb("XYZ123")).toThrow("Invalid hex color");
});

// Test: short 3-digit hex like "#F80" is not accepted (needs 6 digits).
test("rejects hex values with the wrong length", () => {
    expect(() => hexToRgb("#F80")).toThrow("Invalid hex color");
});

// Test: numbers (not strings) should be rejected.
test("rejects non-string input", () => {
    expect(() => hexToRgb(123456)).toThrow("Hex value must be a string");
});

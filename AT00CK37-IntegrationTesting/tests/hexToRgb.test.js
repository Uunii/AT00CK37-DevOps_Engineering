
import { test, expect } from "@jest/globals";
import { hexToRgb } from "../hexToRgb.js";

test("converts red correctly", () => {
    expect(hexToRgb("#FF0000")).toEqual({
        red: 255,
        green: 0,
        blue: 0
    });
});

test("converts green correctly without the #", () => {
    expect(hexToRgb("00FF00")).toEqual({
        red: 0,
        green: 255,
        blue: 0
    });
});

test("converts black correctly", () => {
    expect(hexToRgb("#000000")).toEqual({
        red: 0,
        green: 0,
        blue: 0
    });
});

test("converts white correctly", () => {
    expect(hexToRgb("#FFFFFF")).toEqual({
        red: 255,
        green: 255,
        blue: 255
    });
});

test("rejects invalid hex values", () => {
    expect(() => hexToRgb("XYZ123")).toThrow("Invalid hex color");
});

test("rejects hex values with the wrong length", () => {
    expect(() => hexToRgb("#F80")).toThrow("Invalid hex color");
});

test("rejects non-string input", () => {
    expect(() => hexToRgb(123456)).toThrow("Hex value must be a string");
});

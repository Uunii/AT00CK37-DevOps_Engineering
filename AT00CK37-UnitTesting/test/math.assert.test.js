// https://www.chaijs.com/guide/styles/

const assert = require("chai").assert;
const { add, isEven } = require("../src/math");

describe("math.js (assert skeleton)", () => {
  describe("add()", () => {
    it("should add two numbers correctly", () => {
      assert.equal(add(2, 3), 5);
    });

    it("should throw an error if inputs are not numbers", () => {
      assert.throws(() => add(2, "a"), "Inputs must be numbers");
    });
  });

  describe("isEven()", () => {
    it("should return true for even numbers", () => {
      assert.equal(isEven(4), true);
    });

    it("should return false for odd numbers", () => {
      assert.equal(isEven(7), false);
    });

    it("should throw an error if input is not a number", () => {
      assert.throws(() => isEven("4"), "Input must be a number");
    });
  });
});
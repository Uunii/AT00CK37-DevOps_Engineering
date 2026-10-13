// https://www.chaijs.com/guide/styles/

const { expect } = require("chai");
const { add, isEven } = require("../src/math");

describe("math.js (expect skeleton)", () => {
  describe("add()", () => {
    it("should add two numbers correctly", () => {
      expect(add(2,3)).to.equal(5);
    });

    it("should throw an error if inputs are not numbers", () => {
      expect(() => add(2, "a")).to.throw("Inputs must be numbers");
    });
  });

  describe("isEven()", () => {
    it("should return true for even numbers", () => {
      expect(isEven(4)).to.be.true
    });

    it("should return false for odd numbers", () => {
      expect(isEven(7)).to.be.false
    });

    it("should throw an error if input is not a number", () => {
      expect(() => isEven("4")).to.throw("Input must be a number");
    });
  });
});


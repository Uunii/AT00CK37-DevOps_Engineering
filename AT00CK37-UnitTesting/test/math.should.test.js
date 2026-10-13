// https://www.chaijs.com/guide/styles/

const chai = require("chai");
const should = chai.should();
const { add, isEven } = require("../src/math");

describe("math.js (should skeleton)", () => {
  describe("add()", () => {
    it("should add two numbers correctly", () => {
      add(2, 3).should.equal(5)
    });

    it("should throw an error if inputs are not numbers", () => {
      (() => add(2, "a")).should.throw("Inputs must be numbers")
    });
  });

  describe("isEven()", () => {
    it("should return true for even numbers", () => {
      isEven(4).should.be.true
    });

    it("should return false for odd numbers", () => {
      isEven(7).should.be.false
    });

    it("should throw an error if input is not a number", () => {
      (() => isEven("4")).should.throw("Input must be a number");
    });
  });
});


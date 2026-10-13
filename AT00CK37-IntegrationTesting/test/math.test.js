/**
 * @file math.test.js
 * @description Test suite for math utility functions (add and isEven).
 * @requires chai
 * @requires ../src/math
 */

const { expect } = require("chai");
const { add, isEven } = require("../src/math");

/**
 * Test suite for math.js utilities.
 */
describe("math.js", () => {
  
  /**
   * Test suite for the add function.
   */
  describe("add()", () => {

    /**
     * Test case: should add two numbers correctly.
     */
    it("should add two numbers correctly", () => {
      expect(add(2, 3)).to.equal(5);
    });

    /**
     * Test case: should throw an error if inputs are not numbers.
     */
    it("should throw an error if inputs are not numbers", () => {
      expect(() => add(2, "a")).to.throw("Inputs must be numbers");
    });
  });

  /**
   * Test suite for the isEven function.
   */
  describe("isEven()", () => {

    /**
     * Test case: should return true for even numbers.
     */
    it("should return true for even numbers", () => {
      expect(isEven(4)).to.be.true;
    });

    /**
     * Test case: should return false for odd numbers.
     */
    it("should return false for odd numbers", () => {
      expect(isEven(5)).to.be.false;
    });

    /**
     * Test case: should throw an error if input is not a number.
     */
    it("should throw an error if input is not a number", () => {
      expect(() => isEven("test")).to.throw("Input must be a number");
    });
  });
});
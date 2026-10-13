function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
  return a + b;
}
function isEven(n) {
  if (typeof n !== "number") {
    throw new Error("Input must be a number");
  }
  return n % 2 === 0;
}
module.exports = { add, isEven };
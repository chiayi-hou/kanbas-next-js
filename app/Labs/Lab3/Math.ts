// anything not exported is not avaliable outside the file
// can only have one default
export function add(a: number, b: number): number      { return a + b; }
export function subtract(a: number, b: number): number { return a - b; }
export function multiply(a: number, b: number): number { return a * b; }
export function divide(a: number, b: number): number   { return a / b; }
// object that names are add/subtract/... and values are the function itself
const Math = {
  add,
  subtract,
  multiply,
  divide,
};
export default Math;
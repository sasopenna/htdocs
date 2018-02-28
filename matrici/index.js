let m1 = new Matrix(2,3);
let m2 = new Matrix(3,3);

m1.setRandomNumbers();
m2.setRandomNumbers();

console.table(m1.getMatrix());
console.table(m2.getMatrix());

let m3 = m1.multiplyMatrix(m2);
console.table(m3.getMatrix());

const _MATRIX_PLUS = 0;
const _MATRIX_MINUS = 1;
const _MATRIX_DIVIDE = 2;
const _MATRIX_MULTIPLY = 3;
const _MATRIX_POWER = 4;

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    for(let r = 0; r < this.rows; r++) {
      this.matrix[r] = [];
      for(let c = 0; c < this.cols; c++) {
        this.matrix[r][c] = 0;
      }
    }
  }

  getRows() { return this.rows; }
  getCols() { return this.cols; }

  getMatrix(r, c) {
    if(r == undefined) return this.matrix; //returns matrix without paramters insert
    if((c == undefined) || (r < 0 || r >= this.getRows() || c < 0 || c >= this.getCols())) {
      console.log((c) ? "Wrong row/column." : "Parameter 'column' isn't defined.");
      return undefined;
    }
    return this.matrix[r][c];
  }

  getTranspose() {
    let transpose = new Matrix(this.getCols(), this.getRows());

    for(let r = 0; r < transpose.getRows(); r++) {
      for(let c = 0; c < transpose.getCols(); c++) {
        transpose.setMatrix(r, c, this.getMatrix(c, r));
      }
    }

    return transpose;
  }
////////////////////////////////////////////////////////////////////////////////
  powerMatrix(n)    { return this.operateNumber(n, _MATRIX_POWER); }

  plusMatrix(m)     { return this.operateMatrix(m, _MATRIX_PLUS); }
  plusNumber(n)     { return this.operateNumber(n, _MATRIX_PLUS); }

  minusMatrix(m)    { return this.operateMatrix(m, _MATRIX_MINUS); }
  minusNumber(n)    { return this.operateNumber(n, _MATRIX_MINUS); }

  divideMatrix(m)   { return this.operateMatrix(m, _MATRIX_DIVIDE); }
  divideNumber(n)   { return this.operateNumber(n, _MATRIX_DIVIDE); }

  multiplyMatrix(m) { return this.operateMatrix(m, _MATRIX_MULTIPLY); }
  multiplyNumber(n) { return this.operateNumber(n, _MATRIX_MULTIPLY); }
////////////////////////////////////////////////////////////////////////////////
  setMatrix(r, c, n) {
    if(r < 0 || r >= this.getRows() || c < 0 || c >= this.getCols()) return console.log("Wrong row/column.");
    this.matrix[r][c] = n;
  }

  setRandomNumbers() {
    for(let r = 0; r < this.getRows(); r++) {
      for(let c = 0; c < this.getCols(); c++) {
        this.setMatrix(r, c, Math.floor(Math.random() * 10));
      }
    }
  }
////////////////////////////////////////////////////////////////////////////////
  operateMatrix(m2, mid) {
    if(!m2 instanceof Matrix) {
      console.log("This isn't a Matrix.");
      return undefined;
    }

    let m1 = this;
    if(mid == _MATRIX_PLUS || mid == _MATRIX_MINUS) { // add and minus
      if(m1.getRows() != m2.getRows() && m1.getCols() != m2.getCols()) {
        console.log("Matrix aren't with the same number of rows and colums.");
        return undefined;
      }
      let result = new Matrix(m1.getRows(), m2.getCols());

      for(let r = 0; r < m1.getRows(); r++) {
        for(let c = 0; c < m1.getCols(); c++) {
          result.setMatrix(
            r,
            c,
            (mid == _MATRIX_PLUS) ? (m1.getMatrix(r, c) + m2.getMatrix(r, c)) : (m1.getMatrix(r, c) - m2.getMatrix(r, c))
          );
        }
      }
      return result;
    } else if(mid == _MATRIX_MULTIPLY) { //multiply
      if(m1.getCols() != m2.getRows()) {
        console.log("m1 cols aren't equal to m2 rows.");
        return undefined;
      }

      let result = new Matrix(m1.getRows(), m2.getCols());

      for(let r = 0; r < result.getRows(); r++) {
        for(let c = 0; c < result.getCols(); c++) {
          let sum = 0;
          for(let k = 0; k < m2.getRows(); k++) {
            sum += m1.getMatrix(r, k) * m2.getMatrix(k, c);
          }
          result.setMatrix(r, c, sum);
        }
      }

      return result;
    }

    console.log("No operations available.");
    return undefined;
  }

  operateFunction(fn) {
    for(let r = 0; r < this.getRows(); r++) {
      for(let c = 0; c < this.getCols(); c++) {
        let n = this.getMatrix(r, c);
        this.setMatrix(r, c, fn(n));
      }
    }
  }

  operateNumber(n, oid) {
    if(oid !== _MATRIX_POWER) {
      for(let r = 0; r < this.getRows(); r++) {
        for(let c = 0; c < this.getCols(); c++) {
          let num = this.getMatrix(r, c);
          switch(oid) {
            case _MATRIX_PLUS: num += n; break;
            case _MATRIX_MINUS: num -= n; break;
            case _MATRIX_DIVIDE: num /= n; break;
            case _MATRIX_MULTIPLY: num *= n; break;
          }
          this.setMatrix(r, c, num);
        }
      }
    } else {
      if(this.getRows() != this.getCols()) {
        console.log("Power is only applicable on quad matrix.")
        return undefined;
      }
      if(n <= 0) {
        console.log("Power number can't be 0 or less.")
        return undefined;
      }

      let result = new Matrix(this.getRows(), this.getCols());
      result.matrix = this.getMatrix();

      for(let power = 1; power < n; power++) {
        result = result.multiplyMatrix(result);
      }

      return result;
    }
    return undefined;
  }
}

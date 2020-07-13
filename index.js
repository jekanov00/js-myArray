'use strict';

function MyArray () {
  this.length = 0;
  this.isMyArray = function () {
    return this instanceof MyArray;
  };
  for (let i = 0; i < arguments.length; i++) {
    this[this.length++] = arguments[i];
  }
}

const MyArrayPrototype = new MyArray();


MyArrayPrototype.push = function push () {
  for (let element of arguments) {
    this[this.length++] = element;
  }
  return this.length;
};
MyArrayPrototype.find = function find (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
};
MyArrayPrototype.includes = function includes (searchElement) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === searchElement) {
      return true;
    }
  }
  return false;
};
MyArrayPrototype.join = function join (separator = ',') {
  let resultString = String(this[0]);
  for (let i = 1; i < this.length; i++) {
    resultString += separator + this[i];
  }
  return resultString;
};
MyArrayPrototype.filter = function filter (callback) {
  let resultArray = new MyArray();
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      resultArray.push(this[i]);
    }
  }
  return resultArray;
};
MyArrayPrototype.map = function map (callback) {
  let resultArray = new MyArray();
  for (let i = 0; i < this.length; i++) {
    resultArray.push(callback(this[i], i, this));
  }
  return resultArray;
};
MyArrayPrototype.reduce = function reduce (callback, initialValue) {
  let accumulator;
  if (!initialValue && this.length === 0) {
    throw 'TypeError!';
  } else if (!initialValue) {
    accumulator = this[0];
    for (let i = 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  } else {
    accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};
MyArrayPrototype.flat = function flat (depth = 1) {
  let resultArray = new MyArray();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== undefined) {
      if (Array.isArray(this[i]) || this[i] instanceof MyArray) {
        for (let j = 0; j < this[i].length; j++) {
          resultArray.push(this[i][j]);
        }
      } else {
        resultArray.push(this[i]);
      }
    }
  }
  while (depth > 1) {
    let k = 0;
    for (let i = 0; i < resultArray.length; i++) {
      if (Array.isArray(resultArray[i]) || resultArray[i] instanceof MyArray) {
        ++k;
      }
    }
    if (k === 0) {
      break;
    }
    resultArray = resultArray.flat();
    --depth;
  }
  return resultArray;
};
MyArrayPrototype.pop = function pop (){
  if (this.length === 0){
    return;
  }
  const tempValue = this[this.length-1];
  delete this[this.length-1];
  --this.length;
  return tempValue;
}

MyArray.prototype = MyArrayPrototype;


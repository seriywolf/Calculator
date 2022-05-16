const bigLCD = document.querySelector(".bigLCD");
bigLCD.textContent = "0";
const smallLCD = document.querySelector(".smallLCD");

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

let operator = "";
let argument = "";
let a = 0;
let b = 0;
let result = 0;
let pressedMath = false;
let pressedEnter = false;

function operate(operator, a, b) {
  if (operator === "") {
    if (argument === "") {
      result = 0;
    } else {
      result = +argument;
    }
  } else if (operator === "+") {
    result = add(a, b);
  } else if (operator === "-") {
    result = subtract(a, b);
  } else if (operator === "*") {
    result = multiply(a, b);
  } else if (operator === "/") {
    result = divide(a, b);
  }
  argument = "";
  let m = Math.pow(10, 12);
  result = Math.round(result * m) / m;
  bigLCD.textContent = result;
  //Limit to number of result digits to screen to 12
}

window.addEventListener("keydown", pressButton);
function pressButton(event) {
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  key.click();
}

function clearBigLCD() {
  bigLCD.textContent = "0";
}

function clearSmallLCD() {
  smallLCD.textContent = "";
}

function clearA() {
  a = 0;
}

function clearB() {
  b = 0;
}

document.querySelectorAll(".key").forEach((item) => {
  item.addEventListener("click", function (event) {
    const pressedKey = event.target.id;
    if (pressedEnter) {
      reset();
    }
    //First check for double "."
    if (pressedKey === "." && argument.includes(".")) {
      // Do nothing!!!
      //Then check if pressed "." without digit before;
    } else if (bigLCD.textContent === "0" && pressedKey === ".") {
      bigLCD.textContent = "0" + pressedKey;
      argument += "0" + pressedKey;
      //if 0 on LCD, then change LCD to pressedKey;
    } else if (bigLCD.textContent === "0") {
      bigLCD.textContent = pressedKey;
      argument += pressedKey;
    } else {
      if (bigLCD.textContent.length < 12) {
        bigLCD.textContent += pressedKey;
        argument += pressedKey;
      }
    }
  });
});
document.querySelectorAll(".math").forEach((item) => {
  item.addEventListener("click", function (event) {
    operator = event.target.id;
    if (pressedMath) {
      clearBigLCD();
      enter.click();
      smallLCD.textContent = result + operator;
      clearBigLCD();
      pressedEnter = false;
      pressedMath = false;
    } else if (pressedEnter) {
      clearBigLCD();
      a = result;
      smallLCD.textContent = result + operator;
      argument = "";
      pressedEnter = false;
    } else {
      if (argument === "") {
        smallLCD.textContent = "0" + operator;
        argument = "";
      } else {
        clearBigLCD();
        a = +argument;
        smallLCD.textContent = argument + operator;
        argument = "";
      }
    }
    pressedMath = true;
  });
});

const enter = document.querySelector(".enter");
enter.onclick = function () {
  b = +argument;
  if (operator === "/" && b === 0) {
    bigLCD.textContent = "ERROR";
  } else {
    smallLCD.textContent = "";
    operate(operator, a, b);
    a = result;
    b = 0;
  }
  pressedEnter = true;
};

const resetButton = document.querySelector(".reset");
function reset() {
  clearBigLCD();
  clearSmallLCD();
  a = 0;
  b = 0;
  operator = "";
  argument = "";
  result = 0;
  pressedMath = false;
  pressedEnter = false;
}

resetButton.onclick = function () {
  reset();
};

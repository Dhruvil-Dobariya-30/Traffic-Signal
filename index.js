let totalSecond = document.getElementById("totalSecond");
let signal_1_Input = document.getElementById("signal-1");
let signal_2_Input = document.getElementById("signal-2");
let signal_3_Input = document.getElementById("signal-3");
let signal_4_Input = document.getElementById("signal-4");

let currentIntervals = [];

function changeSettings() {
  let totalSecond_Value = Number(totalSecond.value);
  let signal_1_Value = Number(signal_1_Input.value);
  let signal_2_Value = Number(signal_2_Input.value);
  let signal_3_Value = Number(signal_3_Input.value);
  let signal_4_Value = Number(signal_4_Input.value);

  if (
    totalSecond_Value === "" ||
    signal_1_Value === "" ||
    signal_2_Value === "" ||
    signal_3_Value === "" ||
    signal_4_Value === ""
  ) {
    s;
    alert("Enter All Values");
  } else {
    if (
      signal_1_Value + signal_2_Value + signal_3_Value + signal_4_Value !==
      100
    ) {
      alert("All 4 fields value must be equal to 100%");
    } else {
      clearAllIntervals();
      startTimer(
        signal_1_Value,
        signal_2_Value,
        signal_3_Value,
        signal_4_Value
      );
    }
  }
}

function startTimer(value1, value2, value3, value4) {
  let totalSec = totalSecond.value;

  document
    .querySelectorAll(".yellowLight")
    .forEach((data) => data.classList.remove("yellow"));
  document
    .querySelectorAll(".redLight")
    .forEach((data) => data.classList.add("red"));

  function signal_1_Timer() {
    let timerDiv = document.querySelector(".timer1");
    let timing = Math.round((totalSec * value1) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight1").classList.add("green");
    document.getElementById("redLight1").classList.remove("red");

    let interval1 = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval1);
        timerDiv.innerHTML = 0;
        signal_2_Timer();
        restartTimer(".timer1", value2 + value3 + value4);

        document.getElementById("greenLight1").classList.remove("green");
        document.getElementById("redLight1").classList.add("red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);

    currentIntervals.push(interval1);
  }

  function signal_2_Timer() {
    let timerDiv = document.querySelector(".timer2");
    let timing = Math.round((totalSec * value2) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight2").classList.add("green");
    document.getElementById("redLight2").classList.remove("red");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_3_Timer();
        restartTimer(".timer2", value1 + value3 + value4);

        document.getElementById("greenLight2").classList.remove("green");
        document.getElementById("redLight2").classList.add("red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);

    currentIntervals.push(interval);
  }

  function signal_3_Timer() {
    let timerDiv = document.querySelector(".timer3");
    let timing = Math.round((totalSec * value3) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight3").classList.add("green");
    document.getElementById("redLight3").classList.remove("red");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_4_Timer();
        restartTimer(".timer3", value1 + value2 + value4);

        document.getElementById("greenLight3").classList.remove("green");
        document.getElementById("redLight3").classList.add("red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);

    currentIntervals.push(interval);
  }

  function signal_4_Timer() {
    let timerDiv = document.querySelector(".timer4");
    let timing = Math.round((totalSec * value4) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight4").classList.add("green");
    document.getElementById("redLight4").classList.remove("red");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_1_Timer();
        restartTimer(".timer4", value1 + value2 + value3);

        document.getElementById("greenLight4").classList.remove("green");
        document.getElementById("redLight4").classList.add("red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);

    currentIntervals.push(interval);
  }

  signal_1_Timer();
}

function restartTimer(id, Values) {
  let totalSecond_Value = Number(totalSecond.value);
  let timerDiv = document.querySelector(id);
  let count = Math.round((totalSecond_Value * Values) / 100) + 2;
  timerDiv.style.color = "red";

  let interval = setInterval(() => {
    if (count === 0) {
      clearInterval(interval);
      timerDiv.style.color = "green";
    } else {
      count--;
      timerDiv.innerHTML = count;
    }
  }, 1000);

  currentIntervals.push(interval);
}

function clearAllIntervals() {
  currentIntervals.forEach(clearInterval);
  currentIntervals = [];
}

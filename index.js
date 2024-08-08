let totalSecond = document.getElementById("totalSecond");
let signal_1_Input = document.getElementById("signal-1");
let signal_2_Input = document.getElementById("signal-2");
let signal_3_Input = document.getElementById("signal-3");
let signal_4_Input = document.getElementById("signal-4");

let currentIntervals = [];
let running = false;
let timerReady = false;
let timingJSON = [];

async function fetchData() {
  let data = await fetch("./data.json");
  data = await data.json();
  return data;
}

function changeSettings() {
  if (!timerReady) {
    alert("Signals Are Disabled.");
    return;
  }

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
      running = true;
      document.getElementById(
        "msg"
      ).innerHTML = `Signals Are <span class="word">Running...</span>`;
    }
  }
}

function updateTimerColor(timerNumber, color) {
  document.querySelector(`.timer${timerNumber}`).style.color = color;
}

function startTimer(value1, value2, value3, value4) {
  let totalSec = totalSecond.value;

  document
    .querySelectorAll(".redLight")
    .forEach((data) => data.classList.add("red"));
  document
    .querySelectorAll(".yellowLight")
    .forEach((data) => data.classList.remove("yellow"));
  document.querySelectorAll(".greenLight").forEach((light) => {
    light.classList.remove("green");
  });

  updateTimerColor(2, "red");
  updateTimerColor(3, "red");
  updateTimerColor(4, "red");

  document
    .querySelectorAll(".timer1, .timer2, .timer3, .timer4")
    .forEach((timer) => {
      timer.innerHTML = "0";
    });

  function signal_1_Timer() {
    let timerDiv = document.querySelector(".timer1");
    let secondDiv = document.querySelector(".timer2");
    let thirdDiv = document.querySelector(".timer3");
    let fourthDiv = document.querySelector(".timer4");
    let timing = Math.ceil((totalSec * value1) / 100);
    let timing3 = Math.ceil((totalSec * (value1 + value2)) / 100) + 1;
    let timing4 = Math.ceil((totalSec * (value1 + value2 + value3)) / 100) + 1;

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight1").classList.add("green");
    document.getElementById("redLight1").classList.remove("red");
    updateTimerColor(1, "green");

    let interval1 = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval1);
        timerDiv.innerHTML = 0;
        signal_2_Timer();
        restartTimer(".timer1", value2 + value3 + value4);
        document.getElementById("greenLight1").classList.remove("green");
        document.getElementById("redLight1").classList.add("red");
        updateTimerColor(1, "red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
        secondDiv.innerHTML = timing;
      }
    }, 1000);

    let thirdInterval = setInterval(() => {
      if (timing3 <= 0) {
        timing3 = 0;
      } else {
        timing3--;
        thirdDiv.innerHTML = timing3;
      }
    }, 1000);

    let fourthInterval = setInterval(() => {
      if (timing4 <= 0) {
        timing4 = 0;
      } else {
        timing4--;
        fourthDiv.innerHTML = timing4;
      }
    }, 1000);

    currentIntervals.push(interval1, thirdInterval, fourthInterval);
  }

  function signal_2_Timer() {
    let timerDiv = document.querySelector(".timer2");

    let timing = Math.floor((totalSec * value2) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight2").classList.add("green");
    document.getElementById("redLight2").classList.remove("red");
    updateTimerColor(2, "green");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_3_Timer();
        restartTimer(".timer2", value1 + value3 + value4);
        document.getElementById("greenLight2").classList.remove("green");
        document.getElementById("redLight2").classList.add("red");
        updateTimerColor(2, "red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);
    currentIntervals.push(interval);
  }

  function signal_3_Timer() {
    let timerDiv = document.querySelector(".timer3");
    let timing = Math.floor((totalSec * value3) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight3").classList.add("green");
    document.getElementById("redLight3").classList.remove("red");
    updateTimerColor(3, "green");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_4_Timer();
        restartTimer(".timer3", value1 + value2 + value4);
        document.getElementById("greenLight3").classList.remove("green");
        document.getElementById("redLight3").classList.add("red");
        updateTimerColor(3, "red");
      } else {
        timing--;
        timerDiv.innerHTML = timing;
      }
    }, 1000);

    currentIntervals.push(interval);
  }

  function signal_4_Timer() {
    let timerDiv = document.querySelector(".timer4");
    let timing = Math.ceil((totalSec * value4) / 100);

    timerDiv.innerHTML = timing;
    document.getElementById("greenLight4").classList.add("green");
    document.getElementById("redLight4").classList.remove("red");
    updateTimerColor(4, "green");

    let interval = setInterval(() => {
      if (timing <= 0) {
        clearInterval(interval);
        timerDiv.innerHTML = 0;
        signal_1_Timer();
        restartTimer(".timer4", value1 + value2 + value3);
        document.getElementById("greenLight4").classList.remove("green");
        document.getElementById("redLight4").classList.add("red");
        updateTimerColor(4, "red");
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
  let count = Math.round((totalSecond_Value * Values) / 100) + 1;

  let interval = setInterval(() => {
    if (count === 0) {
      clearInterval(interval);
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

function displayTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById(
    "time"
  ).innerHTML = `${h}:${m}:<span class="word">${s}</span>`;

  return [h, m, s];
}

function checkTime(i) {
  return i < 10 ? ("0" + i).slice(-2) : i;
}

setInterval(() => {
  let [h, m, s] = displayTime();
  let currentTime = `${h}:${m}`
    .split(":")
    .map((t) => checkTime(t))
    .join(":");
  checkTiming(currentTime);
}, 1000);

function manageUserInput(arr) {
  arr.map((d) => {
    d.start = d.start
      .split(":")
      .map((t) => checkTime(t))
      .join(":");

    d.end = d.end
      .split(":")
      .map((t) => checkTime(t))
      .join(":");
  });
  return arr;
}

function resetSignals() {
  document
    .querySelectorAll(".timer1, .timer2, .timer3, .timer4")
    .forEach((timer) => {
      timer.innerHTML = "0";
    });

  document.querySelectorAll(".redLight, .greenLight").forEach((light) => {
    light.classList.remove("red", "green");
  });

  document.querySelectorAll(".yellowLight").forEach((light) => {
    light.classList.add("yellow");
  });
  clearAllIntervals();
  running = false;
  timerReady = false;
}

async function checkTiming(currentTime) {
  let data = await fetchData();
  timingJSON = manageUserInput(data);

  let isWithinTimeSlot = false;

  // for (const timeSlot of timingJSON) {
  timingJSON.some((timeSlot) => {
    if (currentTime >= timeSlot.start && currentTime < timeSlot.end) {
      isWithinTimeSlot = true;
      if (!timerReady) {
        timerReady = true;
        document.getElementById(
          "msg"
        ).innerHTML = `Signals Are Ready To <span class="word">Start</span>`;
      }
    } else if (currentTime === timeSlot.end) {
      resetSignals();
    }
  });

  if (!isWithinTimeSlot) {
    if (running || timerReady) {
      resetSignals();
    }
    document.getElementById(
      "msg"
    ).innerHTML = `Signals Are <span class="word-red">Disabled</span>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetSignals();
  document.getElementById("msg").innerHTML = "Signals Are Disabled.";
});

function reset() {
  location.reload();
}

let totalSecond = document.getElementById("totalSecond");
let signal_1_Value = document.getElementById("signal-1");
let signal_2_Value = document.getElementById("signal-2");
let signal_3_Value = document.getElementById("signal-3");
let signal_4_Value = document.getElementById("signal-4");
let storeID = ["signal-1", "signal-2", "signal-3", "signal-4"];

function getTotalSeconds() {
  if (totalSecond.value < 0) {
    console.log("Invalid Timing");
  } else {
    console.log("total sec :", totalSecond.value);
    divideSeconds();
  }
}

function divideSeconds() {
  let allSignals = document.querySelectorAll(".signals");
  for (let i of allSignals) {
    i.value = 25;
    console.log(i.id, (i.value = 25), "%");
    startTimer(i.value);
  }
}

function manageChanges(id) {
  let changedInput = document.getElementById(id);
  let changedValue = changedInput.value;
  console.log("changedValue", changedValue);

  let remainingSeconds = 100 - changedValue;
  console.log("remaining ", remainingSeconds);

  let remainingInputs = storeID.filter((div) => div != id);
  console.log(remainingInputs);

  for (let i of remainingInputs) {
    document.getElementById(i).value = (
      remainingSeconds / remainingInputs.length
    ).toFixed(3);
  }
}

function startTimer() {
  storeID.forEach((id, index) => {
    let input = document.getElementById(id);
    let percentage = parseFloat(input.value);
    let totalSeconds = parseFloat(totalSecond.value);
    let signalTime = (totalSeconds * percentage) / 100;

    let timerDiv = document.querySelector(".timer");

    timerDiv.innerHTML = signalTime;
    setInterval(() => {
      if (signalTime <= 0) {
        timerDiv.innerHTML = 0;
      } else {
        signalTime--;
        timerDiv.innerHTML = signalTime;
      }
    }, 1000);
  });
}

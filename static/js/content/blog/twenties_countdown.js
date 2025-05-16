document.addEventListener('DOMContentLoaded', async () => {

  let countdownEl = document.getElementById("countdown");

  let countDownDate = new Date("May 16, 2026 00:00:00").getTime();

  // Returns `true` if there's still time remaining.
  let setCount = () => {
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    return distance >= 0;
  };

  let x = setInterval(() => {
    if (!setCount()) {
      clearInterval(x);
      countdownEl.innerHTML = "Over!!!";
    }
  }, 1000);

  setCount();
});

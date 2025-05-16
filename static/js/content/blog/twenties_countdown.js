document.addEventListener('DOMContentLoaded', async () => {

  let countdownEl = document.getElementById("countdown");

  let countDownDate = new Date("May 16, 2026 00:00:00").getTime();

  let x = setInterval(() => {
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      countdownEl.innerHTML = "Over!!!";
    }
  }, 1000);
});

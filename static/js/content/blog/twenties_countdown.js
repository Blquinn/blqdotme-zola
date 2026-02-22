document.addEventListener('DOMContentLoaded', async () => {

  const countdownEl = document.getElementById("countdown");

  const countDownDate = new Date("May 16, 2026 00:00:00").getTime();

  // Returns `true` if there's still time remaining.
  let setCount = () => {
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    return distance >= 0;
  };

  const x = setInterval(() => {
    if (!setCount()) {
      clearInterval(x);
      countdownEl.innerHTML = "Over!!!";
    }
  }, 1000);

  setCount();
});


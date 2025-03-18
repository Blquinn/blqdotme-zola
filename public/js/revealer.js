document.addEventListener('DOMContentLoaded', () => {
  const revealerButtons = document.querySelectorAll('.revealer .revealer-button');
  for (const btn of revealerButtons) {
    const revealer = btn.closest('.revealer');
    btn.addEventListener('click', () => {
      const isOpen = revealer.classList.contains('open');
      if (isOpen) {
        revealer.classList.remove('open');
      } else {
        revealer.classList.add('open');
      }
    });
  }
});

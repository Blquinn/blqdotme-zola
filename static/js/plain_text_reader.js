document.addEventListener('DOMContentLoaded', async () => {
  const readerDivs = document.getElementsByClassName("plain-text-reader");
  for (const r of readerDivs) {
    const src = r.dataset.contentSrc;
    const res = await fetch(src);
    const txt = await res.text();
    r.querySelector('textarea').value = txt
  }
});

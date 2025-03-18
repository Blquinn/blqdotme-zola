document.addEventListener('DOMContentLoaded', async () => {
  const readers = document.getElementsByClassName("plain-text-reader");
  for (const r of readers) {
    const src = r.dataset.contentSrc;
    const res = await fetch(src);
    const txt = await res.text();
    r.value = txt;
  }
});

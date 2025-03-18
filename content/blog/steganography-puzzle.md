---
draft: false
title: Steganography Puzzle
author: Benjamin Quinn
date: 2025-03-16T00:00:00.000Z
updated: 2025-03-16T00:00:00.000Z
taxonomies:
  categories:
    - steganography
  tags:
    - steganography
    - puzzle
extra:
  page_js:
    - /js/plain_text_reader.js
    - /js/revealer.js
  page_css:
    - /revealer.css
    - /plain_text_reader.css
---

This is some content.

{{ plain_text_reader(path="/content/whither.txt", file_name="whither.txt") }}

---

{% revealer(label="Hint 1") %}
This is some hint content.
{% end %}

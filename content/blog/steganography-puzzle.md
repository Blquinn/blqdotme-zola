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

I was inspired to create this puzzle based on a thread that I read recently
on Reddit.

There is a hidden message encoded in the following body of text.

Decoding it will require some CS and programming knowledge.

__Can you decode the hidden message?__

I haven't actually read this book so don't be mad at me
if there's something politically incorrect in it or something.

---

## The Text

{{ plain_text_reader(path="/content/whither.txt", file_name="whither.txt") }}

---

## Hints

This series of hints becomes more helpful as they progress.

Try to complete the puzzle using as few hints as possible.

{% revealer(label="Show hint 1") %}
There are a lot of unnecessary unicode code-points in the file,
which have a simpler representation.
{% end %}

{% revealer(label="Show hint 2") %}
The presence, or absence of one of these unnecessary code-points
represents a bit, which can be on or off.
{% end %}

{% revealer(label="Show hint 3") %}
You can make a new string out of those on or off bits.
{% end %}

{% revealer(label="Show hint 4") %}
There is also a 16 bit unsigned integer at the beginning of this
sequence of bits.
{% end %}

### Solution

{% revealer(label="Show solution") %}

The basic premise of this encoding is that by swapping unicode
"homoglpyhs", which are unicode code points which look like
ascii characters, you can represent a binary array in a
normal looking body of text. If a character is its original
ascii character, that would represent a 0, if its swapped with
a unicode homoglpyh, then it is a 1.

The first step to solving this puzzle is to find the set of
code-points, which look like ascii characters, but are unicode.

```py
def find_unicode_glyphs(file_path: str):
  with open(file_path, "r") as f:
    unicode = set()
    while (char := f.read(1)):
      if ord(char) > 127:  # Outside of ascii range
        unicode.add(char)
    print(unicode)
```

For this file, this will print out

```py
{'\ufeff', 'а', 'ԁ', '”', '•', 'у', 'о', 'ν', 'υ', 'æ', 'ј', 'р', '™', '‘', 'і', 'е', '—', '’', 'с', 'ո', '“'}
```

Of these characters, the following have analogous ascii characters

```json
{
  "\u0440": "p",
  "\u0430": "a",
  "\u0578": "n",
  "\u0501": "d",
  "\u0458": "j",
  "\u03bd": "v",
  "\u043e": "o",
  "\u0435": "e",
  "\u0441": "c",
  "\u0443": "y",
  "\u0456": "i",
  "\u03c5": "u"
}
```

{% end %}

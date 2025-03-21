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

---

## The Text

{{ plain_text_reader(path="/content/lorem.txt", file_name="lorem.txt") }}

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
{'ν', 'υ', 'і', 'е', 'ո', 'с', 'о', 'զ', 'р', 'ԁ', 'х', 'а', 'ј'}
```

Of these characters, the following have analogous ascii characters

```json
{
  "\u0440": "p",
  "\u03c5": "u",
  "\u0445": "x",
  "\u0435": "e",
  "\u043e": "o",
  "\u03bd": "v",
  "\u0458": "j",
  "\u0578": "n",
  "\u0441": "c",
  "\u0456": "i",
  "\u0430": "a",
  "\u0566": "q",
  "\u0501": "d"
}
```

So, in order to decode the hidden message you need to 

```py
# The glyphs that you mapped in the previous step,
# unicode on the left and ascii on the right.
homoglyphs_reversed = {
  'р': 'p', 
  'υ': 'u',
  'х': 'x',
  'е': 'e',
  'о': 'o',
  'ν': 'v',
  'ј': 'j',
  'ո': 'n',
  'с': 'c',
  'і': 'i',
  'а': 'a',
  'զ': 'q',
  'ԁ': 'd',
}

homoglpyh_ascii = set(homoglyphs_reversed.values())

def bitlist_to_bytearray(bitlist):
  if len(bitlist) % 8 != 0:
    # Pad the bitlist with zeros to make its length a multiple of 8
    bitlist = bitlist + [0] * (8 - len(bitlist) % 8)
  
  byte_array = bytearray()
  for i in range(0, len(bitlist), 8):
    byte = 0
    for j in range(8):
      byte = (byte << 1) | bitlist[i + j]
    byte_array.append(byte)
  return byte_array


with open(file_path, "r") as f:

  bits = []
  while (char := f.read(1)):
    if char in homoglpyh_ascii:
      bits.append(0)
    elif char in homoglyphs_reversed:
      bits.append(1)

  bytes = bitlist_to_bytearray(bits)
  sys.stdout.buffer.write(bytes)
  sys.stdout.buffer.flush()
```


If you run this through hexdump you will see the message


```sh
python3 decode.py | hexdump -C

00000000  16 00 54 68 65 20 73 65  63 72 65 74 20 6d 65 73  |..The secret mes|
00000010  73 61 67 65 20 69 73 3a  00 00 00 00 00 00 00 00  |sage is:........|
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
*
000000c0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 07 ff  |................|
000000d0  80                                                |.|
000000d1
```

There you can clearly see the secret message.

The first two bytes are a unsigned 16 bit integer which represents
the message length. Using that you can extract the exact message.

And there you have it! The secret message is: `The secret message is:`

There are many ways you can use a similar technique to encode
messages inside of text although they all have different
drawbacks.

In order for this encoding to be decodable reliably, I had to
include that "latin alphabet" which is a pretty big hint,
otherwise some messages wouldn't have all the unicode chars
present and therefore you wouldn't be able to distinguish
whether the ascii chars had a corresponding unicode char.

{% end %}

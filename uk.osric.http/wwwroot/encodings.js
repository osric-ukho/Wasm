/*
MIT License

Copyright (c) 2019 Colin Eberhardt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// Transcoded to JavaScript Osric Wilkinson 2023-07-21

/**
 * @param {number} n
 * @returns {Uint8Array}
 */
export function ieee754(n) {
  const buffer = new ArrayBuffer(4);
  const float32 = new Float32Array(buffer);
  float32[0] = n;
  return new Uint32Array(buffer);
}

/**
 * @param {string} str
 * @returns {number[]}
 */
export function encodeString(str) {
  return [
    str.length,
    ...str.split("").map(s => s.charCodeAt(0))
  ];
}

/**
 * @param {number} n
 * @returns {number[]}
 */
export function signedLEB128(n) {
  const buffer = [];
  let more = true;
  while (more) {
    let byte = n & 0x7f;
    n >>>= 7;
    if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0)) {
      more = false;
    } else {
      byte |= 0x80;
    }
    buffer.push(byte);
  }
  return buffer;
}

/**
 * @param {number} n
 * @returns {number[]}
 */
export function unsignedLEB128(n) {
  const buffer = [];
  do {
    let byte = n & 0x7f;
    n >>>= 7;
    if (n !== 0) {
      byte |= 0x80;
    }
    buffer.push(byte);
  } while (n !== 0);
  return buffer;
}
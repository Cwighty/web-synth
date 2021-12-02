// Keys.js contains an array for converting from keystrokes to midi note numbers, 
// its in its own file to make it more modular in case I want to replace it
let keys = new Array(256);

keys[65] = 60 //C4
keys[83] = 62
keys[68] = 64
keys[70] = 65
keys[74] = 67
keys[75] = 69
keys[76] = 71
keys[186] = 72 // C5

export {keys};

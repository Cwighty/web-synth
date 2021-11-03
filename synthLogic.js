var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var final = audioCtx.destination;

if (audioCtx.state === 'suspended') {
    audioCtx.resume();
}

var masterGain = audioCtx.createGain();
masterGain.gain.value = 1;
masterGain.connect(final);

// Oscillators
const osc1 = audioCtx.createOscillator();
osc1.connect(masterGain);
osc1.start(0);

const osc2 = new OscillatorNode(audioCtx);

const osc3 = new OscillatorNode(audioCtx);

let volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input', function() {
    audioCtx.resume();
    masterGain.gain.value = this.value;
}, false);


// connect frequency to window height
// h = window.innerHeight;
// document.addEventListener("mousemove", (e) => {
//     osc1.frequency.value = e.clientY / h * 1000 + 300
// } )


// var osc2 = context.createOscillator();
// osc1.frequency.value = 3;
// osc2.connect(gain);
// osc2.type = "square";
// osc2.start(0);

// playButton = document.querySelector("#playtoggle");
// playButton.onclick = function() {
//     if(masterGain.gain.value == 100){
//         masterGain.gain.value = 0;
//         playButton.textContent = 'Resume';
//     } else if(masterGain.gain.value == 0){
//         masterGain.gain.value = 1;
//         playButton.textContent = 'Pause';
//     }
// }
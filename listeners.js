window.addEventListener('load', () => {

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var final = audioCtx.destination;
    var baseFrequency = 440;


    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    };


    class Oscillator {
        constructor(audioContext, baseFrequency) {
            this.baseFrequency = baseFrequency;
            this.mixNode = new GainNode(audioContext);
            this.mixNode.gain.value = this.volume;
            this.mixNode.connect(audioContext.destination);

            this.oscillatorNode = new OscillatorNode(audioContext);
            this.oscillatorNode.frequency.value = baseFrequency;
            this.oscillatorNode.type = this.wave;
            this.oscillatorNode.connect(this.mixNode);
            this.oscillatorNode.start(0);
        }
        baseFrequency = 440;
        oscillatorNode = null;
        mixNode = null;
        range = '4';
        detune = 0;
        wave = 'sine';
        volume = .5;
        send = 'mix';
        setRange(range) {
            this.range = range
            let rangeValue = 0;
            switch (range) {
                case "2'":
                    rangeValue = 4;
                    break;
                case "4'":
                    rangeValue = 2;
                    break;
                case "8'":
                    rangeValue = 1;
                    break;
                case "16'":
                    rangeValue = .5
                    break;
                case "32'":
                    rangeValue = .25
                    break;
                case "LO":
                    rangeValue = 1.0 / 8
                    break;
            }
            this.oscillatorNode.frequency.value = (this.baseFrequency * rangeValue);
        }
        getRange() {
            return range
        }
        setDetune(detune) {
            this.detune = detune
        }
        getDetune() {
            return detune
        }
        setWave(wave) {
            this.wave = wave
        }
        getWave() {
            return wave
        }
        setVolume(volume) {
            this.volume = volume
        }
        getVolume() {
            return volume
        }
    }

    class Filter {
        frequency = 400;
        emphasis = 1;
        contour = .5;
        envelope = new Envelope();
        setFrequency(frequency) {
            this.frequency = frequency
        }
        getFrequency() {
            return frequency
        }
        setEmphasis(emphasis) {
            this.emphasis = emphasis
        }
        getEmphasis() {
            return emphasis
        }
        setContour(contour) {
            this.contour = contour
        }
        getContour() {
            return contour
        }
    }

    class Envelope {
        attack = 0;
        sustain = 1;
        release = 0;
        setAttack(attack) {
            this.attack = attack
        }
        getAttack() {
            return attack
        }
        setSustain(sustain) {
            this.sustain = sustain
        }
        getSustain() {
            return sustain
        }
        setRelease(release) {
            this.release = release
        }
        getRelease() {
            return release
        }
    }

    let osc1 = new Oscillator(audioCtx, baseFrequency);
    let osc2 = new Oscillator(audioCtx, baseFrequency);
    let osc3 = new Oscillator(audioCtx, baseFrequency);

    let rangeControl1 = document.querySelector('#range1 select');
    rangeControl1.addEventListener('change', (e) => {
        console.log(e.target.value);
        osc1.setRange(e.target.value);
    });

    let rangeControl2 = document.querySelector('#range2 select');
    rangeControl2.addEventListener('change', (e) => {
        console.log(e.target.value);
        osc2.setRange(e.target.value);
    });

    let rangeControl3 = document.querySelector('#range3 select');
    rangeControl3.addEventListener('change', (e) => {
        console.log(e.target.value);
        osc3.setRange(e.target.value);
    });
})
window.addEventListener('load', () => {

    // @ts-ignore
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var final = audioCtx.destination;
    var note = 440;


    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    };


    class Oscillator {
        constructor(audioContext, note) {
            this.audioContext = audioContext;
            //Set up initial note frequency (A:440hz)
            this.frequency.note = note;
            this.setRange("8'");
            this.setDetune(0);

            //Set up volume control for oscillator
            this.mixNode = new GainNode(audioContext);
            this.mixNode.gain.value = this.volume;
            this.mixNode.connect(audioContext.destination);

            //Set up and start the oscillator with the initial note and wave type (Sine)
            this.oscillatorNode = new OscillatorNode(audioContext);
            this.oscillatorNode.frequency.value = note;
            // @ts-ignore
            this.oscillatorNode.type = this.wave;
            this.oscillatorNode.connect(this.mixNode);
            this.oscillatorNode.start(0);
        }

        audioContext = new AudioContext();
        oscillatorNode = new OscillatorNode(this.audioContext);
        mixNode = new GainNode(this.audioContext);
        frequency = {
            //describes the frequency of the oscillator, 
            note: 440,
            range: 0.0,
            detune: 0,
            calculated: ()=>{return ((Number(this.frequency.note) + Number(this.frequency.detune)) * this.frequency.range);},
        }
        wave = 'sine';
        volume = .5;
        send = 'mix';
        setRange(range) {
            this.frequency.range = range
            switch (range) {
                case "2'":
                    this.frequency.range = 4;
                    break;
                case "4'":
                    this.frequency.range = 2;
                    break;
                case "8'":
                    this.frequency.range = 1;
                    break;
                case "16'":
                    this.frequency.range = .5
                    break;
                case "32'":
                    this.frequency.range = .25
                    break;
                case "LO":
                    this.frequency.range = (1.0 / 8)
                    break;
            }
            this.updateFrequency();
        }
        getRange() {
            return this.frequency.range;
        }
        setDetune(detune) {
            this.frequency.detune = detune;
            this.updateFrequency();
        }
        getDetune() {
            return this.frequency.detune;
        }
        setWave(wave) {
            this.wave = wave;
        }
        getWave() {
            return this.wave;
        }
        setVolume(volume) {
            this.volume = volume;
            this.mixNode.gain.exponentialRampToValueAtTime(volume, this.audioContext.currentTime + .01);
        }
        getVolume() {
            return this.volume;
        }
        updateFrequency()
        {
            //console.log(this.frequency.calculated());
            this.oscillatorNode.frequency.linearRampToValueAtTime(this.frequency.calculated(), this.audioContext.currentTime + .01);
        }
        updateNote(note)
        {
            this.frequency.note = note;
            this.updateFrequency();
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

    let osc1 = new Oscillator(audioCtx, note);
    let osc2 = new Oscillator(audioCtx, note);
    let osc3 = new Oscillator(audioCtx, note);

    //----------------------------------------------CONTROL EVENT LISTENERS----------------------------------------------------
    let rangeControl1 = document.querySelector('#range1 select');
    rangeControl1.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc1.setRange(e.target.value);
    });

    let rangeControl2 = document.querySelector('#range2 select');
    rangeControl2.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc2.setRange(e.target.value);
    });

    let rangeControl3 = document.querySelector('#range3 select');
    rangeControl3.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc3.setRange(e.target.value);
    });

    let detune2 = document.querySelector('#detune2 input');
    detune2.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc2.setDetune(e.target.value);
    });

    let detune3 = document.querySelector('#detune3 input');
    detune3.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc3.setDetune(e.target.value);
    });

    let wavetable1 = document.querySelector('#wavetable1 select');
    wavetable1.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc1.oscillatorNode.type = e.target.value;
    });

    let wavetable2 = document.querySelector('#wavetable2 select');
    wavetable2.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc2.oscillatorNode.type = e.target.value;
    });

    let wavetable3 = document.querySelector('#wavetable3 select');
    wavetable3.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc3.oscillatorNode.type = e.target.value;
    });

    let mix1 = document.querySelector('#mix1 input');
    mix1.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc1.setVolume(e.target.value);
    });

    let mix2 = document.querySelector('#mix2 input');
    mix2.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc2.setVolume(e.target.value);
    });

    let mix3 = document.querySelector('#mix3 input');
    mix3.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc3.setVolume(e.target.value);
    });

    //----------------------------------------------MIDI/Keyboard CONTROL----------------------------------------------------
    let noteFrequency =
    {
        "C4": 261,
        "C#4":277,
        "D4": 293,
        "D#4": 311,
        "E4": 329,
        "F4": 349,
        "F#4": 369,
        "G4": 392,
        "G#4": 415,
        "A4": 440,
        "A#4": 466,
        "B4": 493,
        "C5": 523,
    }
    let UpdateBaseFrequency = (newFrequency) => {
        osc1.updateNote(newFrequency);
        osc2.updateNote(newFrequency);
        osc3.updateNote(newFrequency);
    };
    window.addEventListener('keypress', (e)=>{
        console.log(e);
        switch (e.key){
            case 'a':
                UpdateBaseFrequency(noteFrequency.C4);
                break;
            case 'w':
                UpdateBaseFrequency(noteFrequency["C#4"]);
                break;
            case 's':
                UpdateBaseFrequency(noteFrequency.D4);
                break;
            case 'e':
                UpdateBaseFrequency(noteFrequency["D#4"]);
                break;
            case 'd':
                UpdateBaseFrequency(noteFrequency.E4);
                break;
            case 'f':
                UpdateBaseFrequency(noteFrequency.F4);
                break;
            case 't':
                UpdateBaseFrequency(noteFrequency["F#4"]);
                break;
            case 'j':
                UpdateBaseFrequency(noteFrequency.G4);
                break;
            case 'i':
                UpdateBaseFrequency(noteFrequency["G#4"]);
                break;
            case 'k':
                UpdateBaseFrequency(noteFrequency.A4);
                break;
            case 'o':
                UpdateBaseFrequency(noteFrequency["A#4"]);
                break;
            case 'l':
                UpdateBaseFrequency(noteFrequency.B4);
                break;
            case ';':
                UpdateBaseFrequency(noteFrequency.C5);
                break;

        }

    });
})
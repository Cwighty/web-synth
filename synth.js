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
            //this.mixNode.connect(audioContext.destination);

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
        constructor(audioContext)
        {
            this.audioContext = audioContext;
            //Set up biquad filter default values
            this.biquad = new BiquadFilterNode(audioContext);
            this.biquad.type = "lowpass";
            this.biquad.frequency.value = 1200;
            this.biquad.gain.value = 0.001;
            this.biquad.Q.value = 1;

            //Set up envelope to control filter gain
            this.envelope = new Envelope(audioContext, this.biquad.gain);
        }
        audioContext = new AudioContext();
        biquad = new BiquadFilterNode(this.audioContext);
        envelope = new Envelope();
        setFrequency(frequency) {
            this.biquad.frequency.exponentialRampToValueAtTime(frequency, this.audioContext.currentTime + .001);
        }
        setFilterGain(gain) {
            this.biquad.gain.exponentialRampToValueAtTime(gain, this.audioContext.currentTime + .001);
        }
        setQ(q) {
            this.biquad.Q.exponentialRampToValueAtTime(q, this.audioContext.currentTime + .001);
        }
    }

    class Envelope {
        constructor(audioContext, nodeToControl)
        {
            this.audioContext = audioContext;
            this.gain = nodeToControl;
        }
        audioContext = new AudioContext();
        gain = Object;
        attack = 500;
        sustain = 5;
        release = 5;
        ASR = [];
        triggerOn(){
            // ramp the volume to each point on the asr /‾\
            let now = this.audioContext.currentTime;
            let totalTime = (Number(this.attack) + Number(this.sustain) + Number(this.release));
            console.log(this.ASR);
            this.gain.cancelScheduledValues(now);
            //this.gain.setValueAtTime(0.001,now);
            this.gain.setValueCurveAtTime(this.ASR, now, totalTime/1000);
        }
        triggerOff(){

        }
        setAttack(attack) {
            this.attack = attack
            this.updateASRArray();
        }
        setSustain(sustain) {
            this.sustain = sustain;
            this.updateASRArray();
        }
        setRelease(release) {
            this.release = release;
            this.updateASRArray();
        }
        updateASRArray(){
            this.ASR = [];
            let a = 1.0/this.attack;
            let b = a;
            for (let i = 0; i < this.attack; i++)
            {
                this.ASR.push(b);
                b += a;
            }
            for (let i = 0; i < this.sustain; i++)
            {
                this.ASR.push(1);
            }
            a = 1.0/this.release;
            b = 1;
            for (let i=0; i < this.release; i++)
            {
                this.ASR.push(b);
                b -= a;
            }
        }
    }
// ----------------------------------------------------AUDIO NODES AND ROUTING------------------------------------------------
    let osc1 = new Oscillator(audioCtx, note);
    let osc2 = new Oscillator(audioCtx, note);
    let osc3 = new Oscillator(audioCtx, note);
    let oscMix = new GainNode(audioCtx);
    
    let filter1 = new Filter(audioCtx);
    let envMix = new GainNode(audioCtx);
    let env1 = new Envelope(audioCtx, envMix.gain);

    let masterVol = new GainNode(audioCtx);

    // route all osc outputs through oscMix
    osc1.mixNode.connect(oscMix);
    osc2.mixNode.connect(oscMix);
    osc3.mixNode.connect(oscMix);

    // route oscMix output through the filter
    oscMix.connect(filter1.biquad);

    // route filter through envmix (controlled by env1)
    filter1.biquad.connect(envMix);

    // route envelope through master volume control
    envMix.connect(masterVol);

    // send final mix to the output
    masterVol.connect(final);

    //env1.triggerOn();

    //----------------------------------------------CONTROL EVENT LISTENERS----------------------------------------------------
    let rangeControl1 = document.querySelector('#range1');
    rangeControl1.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc1.setRange(e.target.value);
    });

    let rangeControl2 = document.querySelector('#range2');
    rangeControl2.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc2.setRange(e.target.value);
    });

    let rangeControl3 = document.querySelector('#range3');
    rangeControl3.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc3.setRange(e.target.value);
    });

    let detune2 = document.querySelector('#detune2');
    detune2.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc2.setDetune(e.target.value);
    });

    let detune3 = document.querySelector('#detune3');
    detune3.addEventListener('input', (e) => {
        //console.log(e.target.value);
        osc3.setDetune(e.target.value);
    });

    let wavetable1 = document.querySelector('#wavetable1');
    wavetable1.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc1.oscillatorNode.type = e.target.value;
    });

    let wavetable2 = document.querySelector('#wavetable2');
    wavetable2.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc2.oscillatorNode.type = e.target.value;
    });

    let wavetable3 = document.querySelector('#wavetable3');
    wavetable3.addEventListener('change', (e) => {
        //console.log(e.target.value);
        osc3.oscillatorNode.type = e.target.value;
    });

    let mix1 = document.querySelector('#mix1');
    mix1.addEventListener('input', (e) => {
        console.log(e.target.value);
        osc1.setVolume(e.target.value);
    });

    let mix2 = document.querySelector('#mix2');
    mix2.addEventListener('input', (e) => {
        console.log(e.target.value);
        osc2.setVolume(e.target.value);
    });

    let mix3 = document.querySelector('#mix3');
    mix3.addEventListener('input', (e) => {
        console.log(e.target.value);
        osc3.setVolume(e.target.value);
    });

    let env1a = document.querySelector('#env1a');
    env1a.addEventListener('input', (e) => {
        console.log(e.target.value);
        env1.setAttack(e.target.value);
    });

    let env1s = document.querySelector('#env1s');
    env1s.addEventListener('input', (e) => {
        console.log(e.target.value);
        env1.setSustain(e.target.value);
    });

    let env1r = document.querySelector('#env1r');
    env1r.addEventListener('input', (e) => {
        console.log(e.target.value);
        env1.setRelease(e.target.value);
    });

    let cutoff = document.querySelector("#cutoff");
    cutoff.addEventListener('input', (e) => {
        console.log(e.target.value);
        filter1.setFrequency(e.target.value);
    })

    let emphasis = document.querySelector("#emphasis");
    emphasis.addEventListener('input', (e) => {
        console.log(e.target.value);
        filter1.setFilterGain(e.target.value);
    })

    let contour = document.querySelector("#contour");
    contour.addEventListener('input', (e) => {
        console.log(e.target.value);
        filter1.setQ(e.target.value);
    })

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
    let triggerNote = (newFrequency) => {
        osc1.updateNote(newFrequency);
        osc2.updateNote(newFrequency);
        osc3.updateNote(newFrequency);
        env1.triggerOn();
    };
    window.addEventListener('keypress', (e)=>{
        console.log(e);
        switch (e.key){
            case 'a':
                triggerNote(noteFrequency.C4);
                break;
            case 'w':
                triggerNote(noteFrequency["C#4"]);
                break;
            case 's':
                triggerNote(noteFrequency.D4);
                break;
            case 'e':
                triggerNote(noteFrequency["D#4"]);
                break;
            case 'd':
                triggerNote(noteFrequency.E4);
                break;
            case 'f':
                triggerNote(noteFrequency.F4);
                break;
            case 't':
                triggerNote(noteFrequency["F#4"]);
                break;
            case 'j':
                triggerNote(noteFrequency.G4);
                break;
            case 'i':
                triggerNote(noteFrequency["G#4"]);
                break;
            case 'k':
                triggerNote(noteFrequency.A4);
                break;
            case 'o':
                triggerNote(noteFrequency["A#4"]);
                break;
            case 'l':
                triggerNote(noteFrequency.B4);
                break;
            case ';':
                triggerNote(noteFrequency.C5);
                break;

        }

    });
})
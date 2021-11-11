<template>
    <div class="col-1"></div>
            <div class="col-1 controlborder" id="globalcontrols">
                <h5>Global Controls</h5>
            </div>
            <div class="col controlborder" id="oscbank">
                <h5>Oscillator Bank</h5>
                <div class="row">
                    <select class="col" id="range1">
                        <option value="2'">2'</option>
                        <option value="4'">4'</option>
                        <option value="8'">8'</option>
                        <option value="16'">16'</option>
                        <option value="32'">32'</option>
                        <option value="LO">LO</option>
                    </select>
                    <div class="col"> </div>
                    <select id="wavetable1" class="col">
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="sawtooth">Sawtooth</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div class="row">
                    <select class="col" id="range2">
                        <option value="2'">2'</option>
                        <option value="4'">4'</option>
                        <option value="8'">8'</option>
                        <option value="16'">16'</option>
                        <option value="32'">32'</option>
                        <option value="LO">LO</option>
                    </select>
                    <webaudio-knob id="detune2" class="col" src="./src/assets/knobs/orange_knob.png" diameter="50" type="range"
                        min="-7" value="0" max="7" step=".1"></webaudio-knob>
                    <select id="wavetable2" class="col">
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="sawtooth">Sawtooth</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div class="row">
                    <select class="col" id="range3">
                        <option value="2'">2'</option>
                        <option value="4'">4'</option>
                        <option value="8'">8'</option>
                        <option value="16'">16'</option>
                        <option value="32'">32'</option>
                        <option value="LO">LO</option>
                    </select>
                    <webaudio-knob id="detune3" class="col" src="./src/assets/knobs/orange_knob.png" diameter="50" type="range"
                        min="-7" value="0" max="7" step=".1"></webaudio-knob>
                    <select id="wavetable3" class="col">
                        <option value="sine">Sine</option>
                        <option value="square">Square</option>
                        <option value="sawtooth">Sawtooth</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
            </div>
            <div class="col-2 controlborder" id="mixerbank">
                <h5>Mixer</h5>
                <div class="row volume">
                    <webaudio-knob src="./src/assets/knobs/orange_slider.png" sprites="30" type="range" id="mix1"
                        min="0.0001" max="1" value=".5" step="0.001"></webaudio-knob>
                </div>
                <div class="row volume">
                    <webaudio-knob src="./src/assets/knobs/orange_slider.png" sprites="30" type="range" id="mix2"
                        min="0.0001" max="1" value=".001" step="0.001"></webaudio-knob>
                </div>
                <div class="row volume">
                    <webaudio-knob src="./src/assets/knobs/orange_slider.png" sprites="30" type="range" id="mix3"
                        min="0.0001" max="1" value=".001" step="0.001"></webaudio-knob>
                </div>
            </div>
            <div class="col-1 controlborder" id="filterbank">
                <h5>Filter</h5>
                <label class="row" >Cutoff
                    <webaudio-knob id="cutoff" src="./src/assets/knobs/orange_knob.png" tooltip="%s hz" log="1" diameter="50" type="range"
                        min="20" max="20000" value="0" step="1"></webaudio-knob>
                </label>
                <label class="row" >Emphasis
                    <webaudio-knob id="emphasis" src="./src/assets/knobs/orange_knob.png" log="1" tooltip="%s" diameter="50" type="range" min="0.01" max="500"
                        value="0.01" step=".01"></webaudio-knob>
                </label>
                <label class="row" >Contour
                    <webaudio-knob id="contour" src="./src/assets/knobs/orange_knob.png" tooltip="%s q" diameter="50" type="range" min="0.01" max="20"
                        value="0.01" step=".01"></webaudio-knob>
                </label>
            </div>
            <div class="col controlborder" id="envelopes">
                <div id="envelope">
                    <form class="row" id="filterenv">
                        <div class="col">
                            <webaudio-slider src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="5000" value="20" step="1"></webaudio-slider>
                            <label id="filteratt">Attack</label>
                        </div>
                        <div class="col">
                            <webaudio-slider src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="10000" value="20" step="1"></webaudio-slider>
                            <label id="filterdec">Decay</label>
                        </div>
                        <div class="col">
                            <webaudio-slider src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="10000" value="20" step="1"></webaudio-slider>
                            <label id="filtersus">Sustain</label>
                        </div>
                        <div class="col">
                            <webaudio-slider src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="5000" value="20" step="1"></webaudio-slider>
                            <label id="filterrel">Release</label>
                        </div>
                    </form>
                    <form class="row" id="envasr">
                        <label class="col">Attack
                            <webaudio-slider id="env1a" src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="5000" value="20" step="1"></webaudio-slider>
                        </label>
                        <label class="col">Decay
                            <webaudio-slider id="env1d" src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="10000" value="20" step="1"></webaudio-slider>
                        </label>
                        <label class="col">Sustain
                            <webaudio-slider id="env1s" src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="10000" value="20" step="1"></webaudio-slider>
                        </label>
                        <label class="col">Release
                            <webaudio-slider id="env1r" src="./src/assets/knobs/skinny-slider-back.png"
                                knobsrc="./src/assets/knobs/orange_slider_knob.png" direction="vert" tooltip="%s ms" type="range"
                                min="0" max="5000" value="20" step="1"></webaudio-slider>
                        </label>
                    </form>
                    <h5>Envelopes</h5>
                </div>
            </div>
            <div class="col-1"></div>
</template>

<script>
export default {
  name: 'Rack',
  props: {
  },
  data() {
    return {
      count: 0,
    }
  },
  computed:
  {
      
  },
  methods:{

  },
}
</script>

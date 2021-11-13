import { createStore } from "vuex"
import { presets } from "./presets.js"

const store = createStore({
    state: {
        synthSettings: presets[0].settings,
    },
    mutations: {
        // Global Controls
        updateMasterVolume(state, e){
            console.log(e.target.value);
            state.synthSettings.masterVolume = e.target.value;
        },
        // Oscbank
        updateRange1(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc1Range = e.target.value;
        },
        updateRange2(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc2Range = e.target.value;
        },
        updateRange3(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc3Range = e.target.value;
        },
        updateWavetable1(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc1Wave = e.target.value;
        },
        updateWavetable2(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc2Wave = e.target.value;
        },
        updateWavetable3(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc3Wave = e.target.value;
        },
        updateDetune2(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc2Detune = e.target.value;
        },
        updateDetune3(state, e) {
            console.log(e.target.value);
            state.synthSettings.osc3Detune = e.target.value;
        },
        // Mixerbank
        updateOscMix1(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.osc1Gain = e.target.value;
        },
        updateOscMix2(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.osc2Gain = e.target.value;
        },
        updateOscMix3(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.osc3Gain = e.target.value;
        },
        // Filterbank
        updateCutoff(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterCutoff = e.target.value;
        },
        updateEmphasis(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterEmphasis = e.target.value;
        },
        updateQ(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterQ = e.target.value;
        },
        // Envelopes
        updateFilterA(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterEnv[0] = e.target.value;
        },
        updateFilterD(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterEnv[1] = e.target.value;
        },
        updateFilterS(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterEnv[2] = e.target.value;
        },
        updateFilterR(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.filterEnv[3] = e.target.value;
        },
        updateEnvA(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.volumeEnv[0] = e.target.value;
        },
        updateEnvD(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.volumeEnv[1] = e.target.value;
        },
        updateEnvS(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.volumeEnv[2] = e.target.value;
        },
        updateEnvR(state, e)
        {
            console.log(e.target.value);
            state.synthSettings.volumeEnv[3] = e.target.value;
        },
    },
});

export default store
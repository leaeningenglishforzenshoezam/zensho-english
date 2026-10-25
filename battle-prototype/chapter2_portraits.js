// Explicit, reviewable Chapter 2 portrait cues.
// Keys are stable scene line IDs from chapter2_data.js. Anything not listed is normal.
// No narrative text is modified by this file.
(function(root){'use strict';
const cues=Object.freeze({
 'ch2.02.003':'toyoyo_surprised',
 'ch2.03.005':'toyoyo_worried',
 'ch2.03.007':'toyoyo_happy',
 'ch2.03.014':'saya_worried',
 'ch2.03.016':'saya_worried',
 'ch2.03.017':'saya_determined',
 'ch2.03.019':'saya_worried',
 'ch2.04.003':'toyoyo_surprised',
 'ch2.04.005':'saya_worried',
 'ch2.04.007':'saya_determined',
 'ch2.04.009':'saya_determined',
 'ch2.04.011':'saya_happy',
 'ch2.06.003':'saya_worried',
 'ch2.06.005':'saya_worried',
 'ch2.06.011':'saya_determined',
 'ch2.06.013':'saya_determined',
 'ch2.10.004':'saya_surprised',
 'ch2.10.007':'saya_determined',
 'ch2.11.003':'saya_surprised',
 'ch2.12.006':'saya_determined',
 'ch2.13.003':'saya_happy',
 'ch2.13.004':'saya_happy',
 'ch2.13.006':'saya_worried',
 'ch2.13.007':'saya_worried',
 'ch2.13.009':'saya_worried',
 'ch2.14.003':'saya_determined',
 'ch2.14.004':'toyoyo_surprised',
 'ch2.14.005':'saya_determined',
 'ch2.16.009':'saya_determined',
 'ch2.17.002':'toyoyo_happy',
 'ch2.17.003':'saya_happy',
 'ch2.17.014':'saya_determined',
 'ch2.18.003':'toyoyo_surprised',
 'ch2.18.004':'saya_surprised',
 'ch2.19.002':'saya_determined',
 'ch2.19.003':'toyoyo_happy',
 'ch2.19.005':'saya_surprised',
 'ch2.20.002':'saya_worried',
 'ch2.20.003':'toyoyo_worried',
 'ch2.20.004':'saya_happy',
 'ch2.20.006':'saya_happy',
 'ch2.20.008':'saya_surprised',
 'ch2.20.009':'toyoyo_determined',
 'ch2.20.011':'toyoyo_happy',
 'ch2.20.013':'saya_determined',
 'ch2.21.007':'saya_happy',
 'ch2.23.003':'toyoyo_happy',
 'ch2.23.004':'saya_determined',
 'ch2.23.006':'saya_happy',
 'ch2.23.007':'toyoyo_happy'
});
function portrait(line){const name=String(line?.speaker||'');const cue=cues[line?.id];
 if(cue)return cue;
 if(name==='サーヤ')return 'saya_normal';
 if(name==='トヨヨ')return 'toyoyo_normal';
 return null;
}
root.GoimonChapter2Portraits=Object.freeze({cues,portrait});
})(typeof window!=='undefined'?window:globalThis);

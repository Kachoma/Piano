let typee = "sine",
typeOps = document.querySelectorAll('#opts1 .option'),
num1 = 4,
num2 = 5,
octaveOps = document.querySelectorAll('#opts2 .option');
typeOps.forEach(op => {
    op.onclick = () => {
        typeOps.forEach(opp => opp.classList.remove('active'));
        op.classList.add('active');
        typee = op.innerHTML;
        synth = '';
        synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:typee}}).toDestination();
    }
});
octaveOps.forEach(op => {
    op.onclick = () => {
        octaveOps.forEach(opp => opp.classList.remove('active'));
        op.classList.add('active');
        num1 = op.getAttribute('data-num1');
        num2 = op.getAttribute('data-num2');
        keysMapp();
    }
});
let synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:typee}}).toDestination(),
volumeValue = document.getElementById('volumeValue'),
keys = document.querySelectorAll('main *'),
h1 = document.querySelector('body > h1'),
section = document.querySelector('section')

let keysMap;

function keysMapp() {
    keysMap = {
        // white keys
        'a':'C'+num1,
        's':'D'+num1,
        'd':'E'+num1,
        'f':'F'+num1,
        'g':'G'+num1,
        'h':'A'+num1,
        'j':'B'+num1,
        'k':'C'+num2,
        'l':'D'+num2,
        ';':'E'+num2,
        "'":'F'+num2,
        'enter':'G'+num2,
        '4':'A'+num2,
        '5':'B'+num2,
        // black keys
        'w':'C#'+num1,
        'e':'D#'+num1,
        't':'F#'+num1,
        'y':'G#'+num1,
        'u':'A#'+num1,
        'o':'C#'+num2,
        'p':'D#'+num2,
        '[':'F#'+num2,
        ']':'G#'+num2,
        "delete":'A#'+num2,
    };
}

window.onload = () => {keysMapp()}

function down(l) {
    let note = keysMap[l], el;
    if(note) {
        el = document.querySelector(`[data-ll="${l}"]`);
        synth.triggerAttack(note, "4n");
        el.classList.add('active');
    }
};
function up(l) {
    let note = keysMap[l], el;
    if(note) {
        el = document.querySelector(`[data-ll="${l}"]`);
        synth.triggerRelease(note);
        el.classList.remove('active');
    }
};

window.addEventListener('keydown', e => {if(e.repeat) return;down(e.key.toLowerCase())});
window.addEventListener('keyup', e => up(e.key.toLowerCase()));
keys.forEach(key => {
    key.onmousedown = e => {
        down(e.target.innerHTML.toLowerCase());
    }; key.onmouseup = e => {
        up(e.target.innerHTML.toLowerCase());
    }
});

volumeValue.onchange = () => {
    synth.volume.value = volumeValue.value;
    document.querySelector('[for="volumeValue"]').innerHTML = volumeValue.value + ' Volume';
};


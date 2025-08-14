let typee = "sine",
typeOps = document.querySelectorAll('#opts1 .option'),
num1 = 4,
num2 = 5,
octaveOps = document.querySelectorAll('#opts2 input');
typeOps.forEach(op => {
    op.onclick = () => {
        typeOps.forEach(opp => opp.classList.remove('active'));
        op.classList.add('active');
        typee = op.innerHTML;
        synth = '';
        synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:typee}}).toDestination();
        synth.connect(recorder);
    }
});
octaveOps.forEach(inp => {
    inp.onchange = () => {
        num1 = document.getElementById('num1').value;
        num2 = document.getElementById('num2').value;
        keysMapp();
    }
});
let recorder = new Tone.Recorder();
synth = new Tone.PolySynth(Tone.Synth, {oscillator:{type:typee}}).toDestination(),
volumeValue = document.getElementById('volumeValue'),
keys = document.querySelectorAll('main *'),
h1 = document.querySelector('body > h1'),
section = document.querySelector('section'),
mainB = document.querySelector('.before'),
mainA = document.querySelector('.after'),
canPlay = false,
canRecord = true,
recDiv = document.querySelector('.record'),
inputFile = document.querySelector('.before input'),
audio = document.querySelector('audio'),
btnStart = document.querySelector('.before button'),
state = false;

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

synth.connect(recorder);

window.onload = () => {keysMapp()}

function startP() {
    mainB.style.opacity = '0';
    setTimeout(() => {
        mainB.style.display = 'none';
        mainA.style.display = 'flex';
        section.style.display = 'flex';
        h1.style.display = 'block';
        recDiv.style.display = 'flex';
        setTimeout(() => {     
            mainA.style.opacity = '1';
            section.style.opacity = '1';
            h1.style.opacity = '1';
            recDiv.style.opacity = '1';
        }, 100)
        canPlay = true;
    },300);
}

function down(l) {
    let note = keysMap[l], el;
    if(note && canPlay) {
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

window.addEventListener('keydown', e => {
    if(e.key === 'Backspace') startOrStop();
    if(e.key === '=') startOrStopAudio();
    if(e.repeat) return;
    down(e.key.toLowerCase());
});
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

function recIcon() {
    if(!canRecord) {
        recDiv.classList.remove('play');
        recDiv.classList.add('stop');
    } else if(canRecord) {
        recDiv.classList.remove('stop');
        recDiv.classList.add('play');
    }
}

function startOrStop() {
    if(canRecord) {
        recorder.start();
        canRecord = false;
        recIcon();
    } else if(!canRecord) {
        setTimeout(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'PianoByOrroreHM.wav';
            a.click();
            canRecord = true;   
            recIcon();
        }, 3000)
    }
};

inputFile.onchange = () => {
    let file = inputFile.files[0];
    btnStart.style.display = 'none';
    if(file) {
        audio.src = URL.createObjectURL(file);
        audio.load();
        setTimeout(() => {
            btnStart.style.display = 'block';
            document.querySelector('.add-music').style.display = 'none';
        }, 1000)
    }
};

function startOrStopAudio() {
    if(!state) {
        audio.play();
        state = true;
    } else if(state) {
        audio.pause();
        state = false;
    };
};


const logUpdate = require('log-update')
const readline = require('readline')

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

rl.on('close', () => {
    process.exit(0)
})

function generateSpace(nombreEspace) {
    return new Array(nombreEspace).fill(' ').join('')
}

function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBat() {

    let bat = [
        '⎛⎝(•̀ ‿•)⎠⎞',
        '⎛⎝(•ⱅ•)⎠⎞',
        '⎛⎝(⌒ⱅ⌒ )⎠⎞'
    ];

    if (state.hug > 9) {

        bat = [
            '⎛⎝(♥ ‿♥)⎠⎞',
            '⎛⎝(♥ⱅ♥)⎠⎞',
            '⎛⎝(♥ⱅ♥ )⎠⎞'
        ];

    } else if (state.life <= 33) {

        bat = [
            '⎛⎝(ʘ ⱅ ʘ)⎠⎞',
            '⎛⎝( ` ᢍ ´ )⎠⎞',
        ];

    } else if (state.hunger <= 33) {

        bat =[
            '⎛⎝(•̀ ‿•)⎠⎞𝔟𝔩𝔬𝔬𝔡…',
            '⎛⎝(•ⱅ•)⎠⎞𝔟𝔩𝔬𝔬𝔡…',
            '⎛⎝(⌒ⱅ⌒ )⎠⎞𝔟𝔩𝔬𝔬𝔡…'
        ];
    }

    return generateSpace(entierAleatoire(0,10)) + bat[Math.floor(Math.random() * bat.length)]
}

function getBatDead() {
    return '⎛⎝(xⱅx)⎠⎞'
}

const state = {
    life : 99,
    hunger : 100,
    hug : 0,
    time : 0 //temps en sec
}

function getLife() {
    const life = [
        '♥♥♥',
        '♥♥♡',
        '♥♡♡  WOUNDED'
    ]

    if (state.life <= 0 ) {
        return "MORT"
    } else if (state.life <= 33) {
        return life[2]
    } else if (state.life <= 66) {
        return life[1]
    } else if (state.life > 66) {
        return life[0]
    }
    
}

function getHunger() {
    const hunger = [
        '🩸🩸🩸',
        '🩸🩸 HUNGRY',
        '🩸 VERY HUNGRY'
    ]

    if (state.hunger === 0 ) {
        return "MORT DE FAIM"
    } else if (state.hunger <= 33) {
        return hunger[2]
    } else if (state.hunger <= 66) {
        return hunger[1]
    } else if (state.hunger > 66) {
        return hunger[0]
    }
}

function giveFood() {
    state.hunger = state.hunger+34
}

function attack() {
    state.life = state.life-34
    state.hug = 0
}

function hug() {
    if (state.life<99) {
        state.life = state.life+34
    }
    state.hug = state.hug+1
}

process.stdin.on('keypress', (character, key) => {
    switch(character) {
        case 'f':
            giveFood();
            break;
        case 'a':
            attack();
            break;
        case 'h':
            hug();
            break;

    }
})

setInterval(function() {
    
    const espace = [
        'a = attack | h = hug | f = feed with blood',
        '',
        getLife()+'      '+getHunger(),
        '',
        getBat()
    ]

    const end = [
        'a = attack | h = hug | f = feed with blood',
        '',
        getLife()+'      '+getHunger(),
        '',
        '    '+getBatDead()
    ]

    if ((getLife()) != "MORT" && (getHunger()) != "MORT DE FAIM") {
        logUpdate(espace.join('\n')) 
        state.time += 1
    
    } else {
        logUpdate(end.join('\n')) 
        process.exit(1)
    }
}, 1000)

setInterval(() => {
    if( state.time %3 && state.life != 0 && state.hunger != 0) {
        state.hunger--
    }
}, 500);


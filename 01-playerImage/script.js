const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');

const can = { w: canvas.width = 600, h: canvas.height = 600 };

const playerImage = new Image();
playerImage.src = 'img/shadow_dog.png';
playerImage.spirit = { w: 575, h: 523 }; // dimensione singolo sprite
const player = Object.entries({ aspetta: 7, salta: 7, atterra: 7, colpito: 9, stordito: 11, volo: 5, rotola: 7, abbassa: 7, colpito: 12, male: 4 });

const staggerFrames = 5;
let gameFrame = 0, action = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const act = Math.floor(gameFrame / (staggerFrames * 100)) % player.length;
    let pos = Math.floor(gameFrame / staggerFrames) % player[act][1];


    //ctx.fillRect(100,50,100,100);
    ctx.drawImage(playerImage, pos * playerImage.spirit.w, act * playerImage.spirit.h, playerImage.spirit.w, playerImage.spirit.h, 0, 0, playerImage.spirit.w, playerImage.spirit.h);

    gameFrame++;
    info.innerHTML = `act: ${act} (${player[act][0]}) frame: ${gameFrame}`;
    requestAnimationFrame(animate);
}

animate();;
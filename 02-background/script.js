const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 800, h: canvas.height = 700 };
const gameSpeed = 5;


const bkdImg = new Array(5).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/bkg/layer-${++i}.png`
    return img
});

let gameFrame = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bkdImg[2], 0, 0);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
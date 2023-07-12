const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 800, h: canvas.height = 700 };
const gameSpeed = 5;


const bkdImg = new Array(5).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/bkg/layer-${++i}.png`
    return img
});

let x = 0, x2 = 2400;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bkdImg[4], x, 0);
    ctx.drawImage(bkdImg[4], x2, 0);
    if (x < -2400) x = 2400 + x2 - gameSpeed;
    else x -= gameSpeed;
    if (x2 < -2400) x2 = 2400 + x - gameSpeed;
    else x2 -= gameSpeed;
    requestAnimationFrame(animate);
}

animate();
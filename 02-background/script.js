const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 800, h: canvas.height = 700 };
let gameSpeed = 5;

let GameFrame = 0;

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
    }
    /** fo tutto! */
    run() {
        this.update()
        this.draw()
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;

        this.x = -GameFrame * this.speed % this.width;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

const bkdImg = new Array(5).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/bkg/layer-${++i}.png`
    return new Layer(img, i / 5)
});

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const vel = document.getElementById('vel');

slider.addEventListener('change', e => {
    gameSpeed = +e.target.value;
    vel.innerHTML = gameSpeed;

})
slider.dispatchEvent(new Event('change'));

let x = 0, x2 = 2400;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bkdImg.forEach(l => l.run());
    GameFrame++;
    requestAnimationFrame(animate);
}

animate();
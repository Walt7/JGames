const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 800, h: canvas.height = 700 };
const gameSpeed = 5;



class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    /** fo tutto! */
    run() {
        this.update()
        this.draw()
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x < -this.width)
            this.x = this.width + this.x2 - this.speed;
        else
            this.x -= gameSpeed;
        if (this.x2 < -this.width)
            this.x2 = this.width + this.x - this.speed;
        else
            this.x2 -= gameSpeed;
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

const bkdImg = new Array(5).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/bkg/layer-${++i}.png`
    return new Layer(img, i / 5)
});

let x = 0, x2 = 2400;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bkdImg.forEach(l => l.run());
    requestAnimationFrame(animate);
}

animate();
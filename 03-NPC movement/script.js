/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 500, h: canvas.height = 500 };

class Enemy {
    constructor(image) {
        this.x; this.y;
        this.width = 100;
        this.height = 100;
        this.image = image;
        this.ReStart()
    }
    clone() {
        return new Enemy(this.image);
    }
    ReStart() {
        this.x = Math.random() * can.w;
        this.y = Math.random() * can.h;
        /** speed */
        this.s = Math.random() * 4 - 2
        return this;
    }
    /** fo tutto! */
    run() {
        this.update()
        this.draw()
    }
    update() {
        this.x += this.s / 10
        this.y += this.s / 10
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}
/** creo le tipologie di nemici */
const EnemyTy = new Array(4).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/enemy${++i}.png`
    return new Enemy(img)
});
const nemici = Array(20).fill().map((_, i) => EnemyTy[0].clone().ReStart())
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nemici.forEach(l => l.run());

    requestAnimationFrame(animate);
}

animate();
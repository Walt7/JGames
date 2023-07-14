/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 500, h: canvas.height = 500 };
let GameFrame = 0;
class Enemy {
    constructor(image) {
        this.x; this.y;
        this.image = image;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.speed = Math.random() * 4 + 1
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.frame = 0;
        this.flapStep = Math.floor(Math.random() * 3) + 1;
        this.x = Math.random() * (can.w - this.width);
        this.y = Math.random() * (can.h - this.height);
        this.speed = Math.random() * 4 + 1
        this.angle = Math.random() * 2;
    }
    clone() {
        return new Enemy(this.image);
    }
    /** fo tutto! */
    run() {
        this.update();
        this.draw();
    }
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0)
            this.x = can.w;
        this.y += Math.sin(this.angle);
        
        if (!(GameFrame % (this.flapStep * 5))){
            this.frame = ++this.frame % 5;
            this.angle += .1;
        }
    }
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}
/** creo le tipologie di nemici */
const EnemyTy = new Array(4).fill().map((_, i) => {
    const img = new Image()
    img.src = `img/enemy${++i}.png`
    return new Enemy(img)
});
const nemici = Array(20).fill().map((_, i) => EnemyTy[0].clone())
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nemici.forEach(l => l.run());
    GameFrame = new Date().valueOf()
    //GameFrame++;
    requestAnimationFrame(animate);
}

animate();
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 800, h: canvas.height = 600 };
let GameFrame = 0;
class Enemy {
    constructor(image) {
        this.image = image;
        this.spriteWidth = image.width / 6;
        this.spriteHeight = image.height;
        this.speed = Math.random() * 4 + 1
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.frame = 0;
        this.flapStep = Math.floor(Math.random() * 3) + 1;
        this.x = Math.random() * (can.w - this.width);
        this.y = Math.random() * (can.h - this.height);
        this.speed = Math.random() * 4 + 1
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 1.5 + .5;
        this.curve = Math.random() * 200 + 50;
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
        //this.x -= this.speed / 2; // mostro 2
        this.x = can.w / 2  * Math.sin(this.angle * Math.PI / 90) + (can.w / 2 - this.width / 2);
        if (this.x + this.width < 0)
            this.x = can.w;
        //this.y += Math.sin(this.angle) * this.curve; // mostro 2
        this.y = can.h / 2  * Math.cos(this.angle * Math.PI / 270) + (can.h / 2 - this.height / 2);

        if (!(GameFrame % (this.flapStep * 5))) {
            this.frame = ++this.frame % 5;
            this.angle += this.angleSpeed;
        }
    }
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

}


/** creo le tipologie di nemici */
const EnemyTyPr = new Array(4).fill().map((_, i) =>
    new Promise((resolve, reject) => {
        const img = new Image()
        img.src = `img/enemy${++i}.png`
        img.onload = _ => resolve(new Enemy(img))
        img.onerror = _ => reject(new Error(`Failed to load image: ${url}`));
    }
    )
)
Promise.all(EnemyTyPr).then(EnemyTy => {
    const nemici = Array(90).fill().map((_, i) => EnemyTy[2].clone())
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nemici.forEach(l => l.run());
        GameFrame = new Date().valueOf()
        //GameFrame++;
        requestAnimationFrame(animate);
    }

    animate();

})


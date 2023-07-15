/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 500, h: canvas.height = 700 };
can.pos = canvas.getBoundingClientRect();
const toArr = o => [o.W, o.H];

const esplosioni = [];
class esplosione {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = { W: 200, H: 179 };
        this.sz = { W: this.sprite.W / 2, H: this.sprite.H / 2 };
        this.image = new Image();
        this.image.src = 'img/boom.png';
        this.frame = 0;
    }
    run() {
        this.update();
        this.draw();
    }
    update() {

        if (!(GameFrame % (this.flapStep * 5))) {
            this.frame = ++this.frame % 5;
            this.angle += this.angleSpeed;
        }
    }
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, ...toArr(this.sprite), this.x, this.y, ...toArr(this.sz))
    }
}

window.addEventListener('click', e => {
    ctx.fillStyle = 'white';
    ctx.fillRect(e.x - can.pos.left, e.y - can.pos.top, 50, 50);
})



let GameFrame = 0;




/*
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nemici.forEach(l => l.run());
        GameFrame = new Date().valueOf()
        //GameFrame++;
        requestAnimationFrame(animate);
    }

    animate();
*/



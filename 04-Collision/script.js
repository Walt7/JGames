/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 500, h: canvas.height = 700 };
can.pos = canvas.getBoundingClientRect();
const toArr = o => [o.W, o.H];

let esplosioni = [];
class esplosione {
    constructor(pos) {
        this.sprite = { W: 200, H: 179 };
        this.sz = { W: this.sprite.W / 2, H: this.sprite.H / 2 };
        this.x = pos[0] - this.sz.W / 2;
        this.y = pos[1] - this.sz.H / 2;
        this.image = new Image();
        this.image.src = 'img/boom.png';
        this.frame = 0;
        this.flapStep = 3;
    }
    finito() {
        return this.frame > 6
    }
    run() {
        if (this.finito()) return // esplosione completata
        this.update();
        this.draw();
    }
    update() {

        if (!(GameFrame % (this.flapStep * 5))) {
            this.frame++;
        }
    }
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.sprite.W, 0, ...toArr(this.sprite), this.x, this.y, ...toArr(this.sz))
    }
}
const  createAnimation =e=> esplosioni.push(new esplosione([e.x - can.pos.left, e.y - can.pos.top]))

window.addEventListener('click', createAnimation);

window.addEventListener('mousemove', createAnimation);





let GameFrame = 0;


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    esplosioni.forEach(l => l.run());
    if (GameFrame % 100 == 0)
        esplosioni = esplosioni.filter(x => !x.finito())
    GameFrame = new Date().valueOf();     //GameFrame++;
    requestAnimationFrame(animate);
}

animate();



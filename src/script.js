const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const can = { w: canvas.width = 600, h: canvas.height = 600 };

const playerImage=new Image();
playerImage.src ='img/shadow_dog.png';

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(100,50,100,100);
    ctx.drawImage(playerImage, 50, 0);
    requestAnimationFrame(animate);
}
animate();;
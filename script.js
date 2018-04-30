const canvas = document.querySelector('.canvas');
const contextCanvas = canvas.getContext('2d');
let canvasColors = ['#8367C7', '#427AA1', '#70A0AF', '#A0C1B9']
contextCanvas.lineWidth = 150;

var context = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = context.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.value = 190;
oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop(1);
  oscillator.frequency.value += 100;
// var now = context.currentTime;
// oscillator.play(now + 1);
// oscillator.stop(now + 3);

const mouse = {
  x: innerWidth,
  y: innerHeight
};

canvas.width = innerWidth;
canvas.height = innerHeight;


//event listeners on all canvas
window.addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

document.addEventListener('DOMContentLoaded', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  setInterval(function(){ canvasColors.shift(); }, 3000);
  console.log('document is ready. I can sleep now');
});

window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('click', function() {
  // oscillator.start();
  // oscillator.stop(1);
  // oscillator.frequency.value += 100;
  console.log(contextCanvas.lineWidth)
  //canvasColors.shift();
  changesize();
});

function changesize() {
  requestAnimationFrame(changesize);
  contextCanvas.lineWidth += 1;
  if (contextCanvas.lineWidth >= 700) {
    contextCanvas.lineWidth = 15;
  }
  contextCanvas.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  contextCanvas.clearRect(0, 0, innerWidth, innerHeight);
  contextCanvas.beginPath();
  contextCanvas.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
  contextCanvas.strokeStyle = canvasColors[0];    
  contextCanvas.stroke();
}

animate();
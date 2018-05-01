const canvas = document.querySelector('.canvas');
const contextCanvas = canvas.getContext('2d');
let canvasColors = ['#8367C7', '#427AA1', '#70A0AF', '#A0C1B9']

const mouse = {
  x: innerWidth,
  y: innerHeight
};

//class sound taken from css tricks: https://css-tricks.com/introduction-web-audio-api/
class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  play(value, time) {
    this.init();
    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    this.oscillator.start(time);
    this.stop(time);
  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
    this.oscillator.stop(time + 1);
  }
}

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
  changesize();
  if (canvasColors.length === 0) {
    canvasColors = ['#8367C7', '#427AA1', '#70A0AF', '#A0C1B9'];
  }
});

window.addEventListener('click', function() {
  //draw new function
  contextCanvas.lineWidth = 1;
  console.log(contextCanvas.lineWidth)
  //sound effects on click
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let note = new Sound(context);
  let now = context.currentTime;
  note.play(261.63, now);
});

function changesize() {
  if (contextCanvas.lineWidth > 600) {
    contextCanvas.lineWidth = 1;
  } else {
    console.log(contextCanvas.lineWidth);
  }
}

function animate() {
  requestAnimationFrame(animate);
  contextCanvas.clearRect(0, 0, innerWidth, innerHeight);
  contextCanvas.beginPath();
  contextCanvas.lineWidth += 1;
  contextCanvas.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
  contextCanvas.strokeStyle = canvasColors[0];    
  contextCanvas.stroke();
}

changesize();
animate();
//variables and canvas settings
const canvas = document.querySelector('.canvas');
const contextCanvas = canvas.getContext('2d');
let canvasColors = ['#8367C7', '#427AA1', '#70A0AF', '#A0C1B9'];
let voice = [261.63, 291.63, 200, 300, 500, 230, 190, 600];

const mouse = {
  x: innerWidth,
  y: innerHeight
};

canvas.width = innerWidth;
canvas.height = innerHeight;

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

//event listeners on all canvas
window.addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

document.addEventListener('DOMContentLoaded', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  setInterval(function(){
    canvasColors.shift();
  }, 3000);
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
  //sound effects on click
  let rand = voice[Math.floor(Math.random() * voice.length)];
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let note = new Sound(context);
  let now = context.currentTime;
  note.play(rand, now);
  //circle functions
  changesize();
  contextCanvas.lineWidth = 1;
  console.log(contextCanvas.lineWidth);
});

window.addEventListener('click', function() {
  console.log('as')
  //animate2();
  circles.push(new Circle(mouse.x, mouse.y, 0, 0, 10, 20));
});

//circly objects to make multiple circles
function Circle(x, y, vx, vy, r, growth) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.r = r;
  this.color = canvasColors[0];
  this.alpha = 1;

  this.draw = function() {
    contextCanvas.beginPath();
    contextCanvas.strokeStyle = this.color.replace('x', + this.alpha);
    contextCanvas.arc(this.x, this.y, this.r, Math.PI * 2, false);
    contextCanvas.lineWidth = 2;
    contextCanvas.stroke();
    contextCanvas.fillStyle = 'transparent';
    contextCanvas.fill();
  }

  this.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
    this.r += growth;
    this.draw();
  }
}

var circles = [];

//circles drawing functions
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
  var lingrad = contextCanvas.createLinearGradient(0, 0, 0, canvas.height);
  lingrad.addColorStop(0.1, '#8367C7');
  lingrad.addColorStop(0.5, '#427AA1');
  lingrad.addColorStop(0.75, '#70A0AF');
  lingrad.addColorStop(1, '#A0C1B9');
  contextCanvas.fillStyle = lingrad;
  contextCanvas.strokeStyle = lingrad;
  contextCanvas.beginPath();
  contextCanvas.lineWidth += 1;
  contextCanvas.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
  //contextCanvas.strokeStyle = canvasColors[0];    
  contextCanvas.stroke();
}

function animate2() {
  requestAnimationFrame(animate2);
  contextCanvas.clearRect(0, 0, innerWidth, innerHeight);

  var vx = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
  var vy = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
  var r = Math.random() * 20 + 30;
  circles.push(new Circle(mouse.x, mouse.y, vx, vy, r, -0.5));
  
  for (let i = 0; i < circles.length; ++i) {
    circles[i].update();
    // remove the circle if it is transparent or too small
    if (circles[i].alpha < 0 || circles[i].r < 3) {
      circles.splice(i, 1);
    }
  }
}

//main functions starter
changesize();
animate();
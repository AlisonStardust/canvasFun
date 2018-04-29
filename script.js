const canvas = document.querySelector('.canvas');
const contextCanvas = canvas.getContext('2d');
let canvasColors = ['#8367C7', '#427AA1', '#B3001B']

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
  console.log('document is ready. I can sleep now');
});

window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('click', function() {
  canvasColors.shift();
  changesize();
  if (canvasColors.length === 0) {
    canvasColors = ['#8367C7', '#427AA1', "#B3001B"];
  }
});

function changesize() {
  requestAnimationFrame(changesize);
  //contextCanvas.clearRect(0, 0, innerWidth, innerHeight);
  //contextCanvas.beginPath();
  //contextCanvas.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
  contextCanvas.lineWidth = 15;
  //contextCanvas.strokeStyle = canvasColors[0];    
  contextCanvas.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  contextCanvas.clearRect(0, 0, innerWidth, innerHeight);
  contextCanvas.beginPath();
  contextCanvas.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2, false);
  contextCanvas.lineWidth = 150;
  contextCanvas.strokeStyle = canvasColors[0];    
  contextCanvas.stroke();
}

animate();
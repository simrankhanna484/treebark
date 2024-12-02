const canvas = document.getElementById('barkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lines = [];
const lineCount = 36; 
const maxCrackDepth = 140; 
const lineSpeed = 0.2;
const hoverDistance = 100; 

let mouseX = 0;
let mouseY = 0;
let hoveringLine = false; 

for (let i = 0; i < lineCount; i++) {
    const line = {
        radius: Math.random() * canvas.height / 2, 
        angle: Math.random() * Math.PI * 2, 
        crackDepth: Math.random() * maxCrackDepth, 
        crackThickness: 2 + Math.random() * 2, 
        phase: Math.random() * Math.PI * 2, 
        amplitude: 3 + Math.random() * 8,  
        frequency: 0.3 + Math.random() * 0.5,  
        offsetX: 0,
        offsetY: 0,  
        xOffset: canvas.width / 2, 
        yOffset: canvas.height / 2, 
    };
    lines.push(line);
}


function updateLines() {
    lines.forEach((line) => {

        line.angle += line.frequency;
        line.crackDepth = Math.abs(Math.sin(line.phase) * line.amplitude);

        if (hoveringLine === line) {
            line.offsetX = Math.sin(line.phase) * 30;
            line.offsetY = Math.cos(line.phase) * 60;
        } else {
            line.offsetX *= 0.5;
            line.offsetY *= 0.95;
        }
        line.phase += 0.1;
    });
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#6b4e31'; 
    ctx.lineWidth = 2;

    lines.forEach((line) => {
        ctx.beginPath();
        for (let t = 0; t < Math.PI * 8; t += 0.05) { 
          
            const x = line.xOffset + Math.cos(t + line.angle) * (line.radius + line.crackDepth) + line.offsetX;
            const y = line.yOffset + Math.sin(t + line.angle) * (line.radius + line.crackDepth) + line.offsetY;

            ctx.lineTo(x, y);
        }
        ctx.stroke();
    });
}

function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    hoveringLine = null;  

    lines.forEach((line) => {
        const dist = Math.abs(line.xOffset - mouseX);
        if (dist < hoverDistance) {
            hoveringLine = line;
        }
    });
}

function animate() {
    updateLines();
    drawLines();
    requestAnimationFrame(animate);
}


canvas.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

var bw = 1000;
var bh = 600;
var p = 0;
var cw = bw + (p * 2) + 1;
var ch = bh + (p * 2) + 1;

var DrawUtil = {
    drawGrids: (canvas, color) => {
        var context = canvas.getContext("2d");
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = ctx.canvas.clientWidth;
        ctx.canvas.height = ctx.canvas.clientHeight;        
        for (var x = 0; x <= bw; x += 50) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }

        for (x = 0; x <= bh; x += 50) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }
        context.strokeStyle = color;
        context.stroke();
    },
    clearGrids: (canvas) => {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, cw, ch);
    },
    drawPoints: (e, coordinatesSize) => {
        console.log()
        if(coordinatesSize >= 5 || e.button === 2){
            return
        }
        let count = 0;
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        console.log(e.clientX);
        console.log(e.clientY);
        const pos = {
            x: (e.clientX - rect.left) * canvas.width / canvas.clientWidth,
            y: (e.clientY - rect.top) * canvas.height / canvas.clientHeight,
        };        
        ctx.beginPath();        
        ctx.arc(pos.x, pos.y, 0.5, 0, Math.PI * 2);
        let hsl = (h, s, l) => {
            return `hsl(${h * 360 | 0},${s * 100 | 0}%,${l * 100 | 0}%)`;
        }
        ctx.fillStyle = hsl((count++ % 100) / 100, 1, 0.5);
        ctx.fill();        
    }
}
export default DrawUtil;
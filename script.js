import { MazeGenerator } from './MazeGenerator.js';

const size = { w: 20, h: 20 };
const cellSize = 30;
const line = 1;

const map = MazeGenerator(size.w, size.h);

const canvas = document.getElementById('canvas');
canvas.width = size.w * cellSize;
canvas.height = size.h * cellSize;
const ctx = canvas.getContext('2d');

let row = 0;
let col = 0;

for (let index = 0; index < map.length; index++) {
    const x = col * cellSize;
    const y = row * cellSize;

    if (map[index].top === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.lineWidth = line;
        ctx.stroke();
    }
    if (map[index].bottom === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.lineWidth = line;
        ctx.stroke();
    }
    if (map[index].left === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
        ctx.lineWidth = line;
        ctx.stroke();
    }
    if (map[index].right === 0) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.lineWidth = line;
        ctx.stroke();
    }

    col += 1;
    if (col === size.w) {
        col = 0;
        row += 1;
    }
}

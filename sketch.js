const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  // return the points on a 2D grid
  const createGrid = () => {
    const points = [];
    const count = 5;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createGrid();
  console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    // full size of the screen:
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      const x = u * width;
      const y = v * height;

      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.strokeStyle = "black";
      context.lineWidth = 40;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

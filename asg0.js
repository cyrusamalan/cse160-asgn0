// Cyrus Amalan
// camalan@ucsc.edu

let canvas, ctx;

function main() {
    canvas = document.getElementById('asg0');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    ctx = canvas.getContext('2d');

    // Clear the canvas by filling it with black
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(vector, color) {
    ctx.strokeStyle = color;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = 20;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + vector.x * scale, cy - vector.y * scale);
    ctx.stroke();
}

function handleDrawEvent() {
    // Retrieve input values
    const x1 = parseFloat(document.getElementById('xcoord').value);
    const y1 = parseFloat(document.getElementById('ycoord').value);
    const x2 = parseFloat(document.getElementById('xcoord2').value);
    const y2 = parseFloat(document.getElementById('ycoord2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert('Please enter valid numbers for all coordinates!');
        return;
    }

    // Clear and redraw the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw vectors
    const v1 = { x: x1, y: y1 };
    const v2 = { x: x2, y: y2 };

    drawVector(v1, 'red');
    drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
    const x1 = parseFloat(document.getElementById('xcoord').value);
    const y1 = parseFloat(document.getElementById('ycoord').value);
    const x2 = parseFloat(document.getElementById('xcoord2').value);
    const y2 = parseFloat(document.getElementById('ycoord2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert('Please enter valid numbers for all coordinates!');
        return;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const v1 = { x: x1, y: y1 };
    const v2 = { x: x2, y: y2 };

    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    const operator = document.getElementById('opt').value;
    const scalar = parseFloat(document.getElementById('scalar').value);

    if (operator === "Add") {
        const v3 = { x: v1.x + v2.x, y: v1.y + v2.y };
        drawVector(v3, 'green');
    } else if (operator === "Subtract") {
        const v3 = { x: v1.x - v2.x, y: v1.y - v2.y };
        drawVector(v3, 'green');
    } else if (operator === "Multiply") {
        if (isNaN(scalar)) {
            alert('Please enter a valid scalar value for multiplication!');
            return;
        }
        const v3 = { x: v1.x * scalar, y: v1.y * scalar };
        const v4 = { x: v2.x * scalar, y: v2.y * scalar };
        drawVector(v3, 'green');
        drawVector(v4, 'green');
    } else if (operator === "Divide") {
        if (isNaN(scalar) || scalar === 0) {
            alert('Please enter a valid, non-zero scalar value for division!');
            return;
        }
        const v3 = { x: v1.x / scalar, y: v1.y / scalar };
        const v4 = { x: v2.x / scalar, y: v2.y / scalar };
        drawVector(v3, 'green');
        drawVector(v4, 'green');
    } else if (operator === "Magnitude") {
        const magnitude1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const magnitude2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        console.log(`Magnitude v1: ${magnitude1}`);
        console.log(`Magnitude v2: ${magnitude2}`);
    } else if (operator === "Normalize") {
        const magnitude1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const magnitude2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        if (magnitude1 !== 0) {
            const normalizedV1 = { x: v1.x / magnitude1, y: v1.y / magnitude1 };
            drawVector(normalizedV1, 'green');
        }

        if (magnitude2 !== 0) {
            const normalizedV2 = { x: v2.x / magnitude2, y: v2.y / magnitude2 };
            drawVector(normalizedV2, 'green');
        }
    } else if (operator === "AngleBetween") {
        const angle = angleBetween(v1, v2);
        console.log(`Angle between v1 and v2: ${angle.toFixed(2)} degrees`);
    } else if (operator === "Area") {
        const area = areaTriangle(v1, v2);
        console.log(`Area of the triangle: ${area}`);
    } else {
        alert('Invalid operation selected!');
    }
}

function angleBetween(v1, v2) {
    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const magnitude1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const magnitude2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (magnitude1 === 0 || magnitude2 === 0) {
        alert("Cannot calculate angle: one or both vectors have zero magnitude!");
        return 0;
    }

    const cosTheta = dotProduct / (magnitude1 * magnitude2);
    return Math.acos(cosTheta) * (180 / Math.PI); // Convert to degrees
}

function areaTriangle(v1, v2) {
    const crossProduct = Math.abs(v1.x * v2.y - v1.y * v2.x);
    const area = crossProduct / 2;
    return area;
}

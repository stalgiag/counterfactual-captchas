export const mouseRot = (s, target, amt) => {
    s.angleMode(s.DEGREES);
    let rotX = s.map(s.mouseY, 0, s.width, -amt, amt, true);
    let rotY = s.map(s.mouseX, 0, s.height, -amt, amt, true);
    s.rotateX(rotX)
    s.rotateY(rotY);
}

export const paint = (s, target, color, size) => {
    target.noStroke();
    target.fill(color);

    const magicCoords = magicMouseCoordConversion(s);
    target.circle(magicCoords.x, magicCoords.y, size + s.random(-size/2, size/2));
}

// TODO: Actual raycasting
export const magicMouseCoordConversion = (s) => {
    let magicCorrectX = s.map(s.mouseX, 0, s.width, 0.5, 1.3);
    let magicCorrectY = s.map(s.mouseY, 0, s.height, 0.5, 1.3);
    
    return { x: s.mouseX * magicCorrectX, y: s.mouseY * magicCorrectY };
}

// TODO: Custom submit button
export class SubmitButton {
    constructor(s, callback, x, y, w, h, text) {
        if (typeof s === 'undefined') {
            throw new Error('Cant make submit button without sketch');
        }
        this.s = s;
        this.text = text || 'SUBMIT';
        this.w = w || s.width / 4;
        this.h = h || this.w / 3;
        this.x = x || s.width - (this.w + 10);
        this.y = y || s.height - (this.h + 10);
        this.button = s.createButton(this.text);
        // this.button.hide();
        this.button.size(this.w, this.h);
        this.button.position(this.x, this.y);
        this.button.mousePressed(callback);
        this.button.style('font-size', this.w / 4 + 'px');
    }
    
}
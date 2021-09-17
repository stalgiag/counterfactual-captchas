import warpFrag from '../shaders/warp.frag';
import vert from '../shaders/persp.vert';
import { magicMouseCoordConversion, mouseRot } from '../utils/utils';

const influence = (s) => {
    let pg;
    let shade;
    let pd;
    
    let fgImg;
    let bgImg;
    
    let k;
    
    let lines = [];
    const lineEnders = ['☻', '♬', '☮', '☭']
    
    s.preload = () => {
        k = s.loadFont('./fonts/kar.otf');
        fgImg = s.loadImage('./images/influence.jpg');
        bgImg = s.loadImage('./images/influence-bg.jpg');
    }

    s.setup = () => {
        s.createCanvas(800, 800, s.WEBGL);
        shade = s.createShader(vert, warpFrag);
        pg = s.createGraphics(800, 800);
        pd = s.pixelDensity();
        pg.textSize(40);
        pg.textAlign(s.CENTER, s.CENTER);
        s.textFont(k);
        s.noStroke();
        s.angleMode(s.DEGREES);
        s.textAlign(s.CENTER, s.TOP);
        
    }

    s.draw = () => {
        pg.background(0, 0, 255);
        pg.fill(100, 200, 0);
        pg.image(fgImg, -10, -10, pg.width + 20, pg.height + 20);
        
        s.push();
        s.resetShader();
        s.texture(bgImg);
        s.rect(-400, -400, 810, 810);
        s.pop();
        
        pg.stroke(87, 167, 139);
        pg.strokeWeight(7);
        for (const l of lines) {
            pg.line(l.start.x, l.start.y, l.end.x, l.end.y);
            pg.fill(0);
            pg.text(l.ender, l.end.x, l.end.y);
        }
        shade.setUniform('uTex0', pg);
        shade.setUniform('uTime', s.frameCount * 0.01);
        
        s.fill(0);
        let mod = s.sin(s.frameCount) * 2;
        s.textSize(50 + mod);
        
        s.shader(shade);
        s.push();
        mouseRot(s, pg, 10);
        s.stroke(0);
        s.strokeWeight(5);
        s.rect(-s.width/2 + s.width/10, -s.height/2 + s.height/10, s.width - s.width / 5, s.height - s.height / 5);
        s.pop();
        
        // s._renderer.GL.disable(s._renderer.GL.DEPTH_TEST);
        // s.text('We share power differently now.\n Who influences who?', 0, -s.height / 2);
    }
    
    s.mousePressed = () => {
        const magCoords = magicMouseCoordConversion(s);
        let startLoc = { x: magCoords.x, y: magCoords.y };
        lines.push({ start: startLoc, end: startLoc, ender: s.random(lineEnders) });
    }
    
    s.mouseDragged = () => {
        const magCoords = magicMouseCoordConversion(s);
        lines[lines.length - 1].end = { x: magCoords.x, y: magCoords.y};
    }
}

export default influence;
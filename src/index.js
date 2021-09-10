import p5 from 'p5';
import funHouseFrag from './shaders/funhouse.frag';
import greenStitchFrag from './shaders/greenstitch.frag';
import vert from './shaders/persp.vert';

const warpingTextInput = (s) => {
    let pg;
    let shade;
    let pd;
    
    let messFont;
    
    s.preload = () => {
        messFont = s.loadFont('./fonts/Mess.otf');
    }

    s.setup = () => {
        s.createCanvas(600, 600, s.WEBGL);
        shade = s.createShader(vert, funHouseFrag);
        pg = s.createGraphics(600, 600);
        pd = s.pixelDensity();
        pg.textFont(messFont);
        pg.textSize(90);
        pg.textAlign(s.CENTER, s.CENTER);
        s.noStroke();
        s.angleMode(s.DEGREES);
        // shadeTexture.noStroke();
    }

    s.draw = () => {
        pg.background(0, 0, 255);
        pg.fill(100, 200, 0);
        pg.text('Justice', 300, 300);
        
        shade.setUniform('uTex0', pg);
        shade.setUniform('uRes', [pg.width * pd, pg.height * pd]); 
        shade.setUniform('uTime', s.frameCount * 0.01);

        
        s.background(200);
        s.shader(shade);
        s.rotateZ(Math.PI);
        let rotX = s.map(s.mouseY, 0, 512, -20, 20, true);
        let rotY = s.map(s.mouseX, 0, 512, -20, 20, true);
        s.rotateX(rotX)
        s.rotateY(rotY);
        s.rect(-250, -250, 500, 500);
    }
}

const greenStitchImage = (s) => {
    let pg;
    let shade;
    let pd;
    

    s.setup = () => {
        s.createCanvas(600, 600, s.WEBGL);
        shade = s.createShader(vert, greenStitchFrag);
        pg = s.createGraphics(600, 600);
        pd = s.pixelDensity();

        s.noStroke();
        s.angleMode(s.DEGREES);
        // shadeTexture.noStroke();
    }

    s.draw = () => {
        pg.background(0, 0, 255);
        pg.fill(100, 200, 0);
        pg.circle(300, 300, 300);
        
        shade.setUniform('uTex0', pg);
        shade.setUniform('uRes', [pg.width * pd, pg.height * pd]); 
        shade.setUniform('uTime', s.frameCount * 0.01);

        
        s.background(200);
        s.shader(shade);
        s.rotateZ(Math.PI);
        let rotX = s.map(s.mouseY, 0, 512, -20, 20, true);
        let rotY = s.map(s.mouseX, 0, 512, -20, 20, true);
        s.rotateX(rotX)
        s.rotateY(rotY);
        s.rect(-250, -250, 500, 500);
    }
}

// const sketch = new p5(warpingTextInput);
const secondSketch = new p5(greenStitchImage)
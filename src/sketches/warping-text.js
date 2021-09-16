import warpFrag from '../shaders/warp.frag';
import vert from '../shaders/persp.vert';

const warpingText = (s) => {
    let pg;
    let shade;
    let pd;
    
    let messFont;
    
    s.preload = () => {
        messFont = s.loadFont('./fonts/Mess.otf');
    }

    s.setup = () => {
        s.createCanvas(600, 600, s.WEBGL);
        shade = s.createShader(vert, warpFrag);
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
        shade.setUniform('uTime', s.frameCount * 0.01);

        
        s.background(200);
        s.shader(shade);
        let rotX = s.map(s.mouseY, 0, 512, -20, 20, true);
        let rotY = s.map(s.mouseX, 0, 512, -20, 20, true);
        s.rotateX(rotX)
        s.rotateY(rotY);
        s.rect(-250, -250, 500, 500);
    }
}

export default warpingText;
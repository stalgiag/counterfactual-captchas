import ditherFrag from '../shaders/bayer-dither.frag';
import vert from '../shaders/persp.vert';
import { mouseRot, paint } from '../utils/utils';

const violence = (s) => {
    let pg;
    let shade;
    
    let fgImg;
    let bgImg;
    
    let k;
    
    s.preload = () => {
        fgImg = s.loadImage('./images/violence.jpg');
        bgImg = s.loadImage('./images/violence-bg.jpg');
        k = s.loadFont('./fonts/kar.otf');
    }

    s.setup = () => {
        s.createCanvas(800, 800, s.WEBGL);
        shade = s.createShader(vert, ditherFrag);
        pg = s.createGraphics(800, 800);
        
        s.textFont(k);
        s.noStroke();
        s.angleMode(s.DEGREES);
        s.textAlign(s.CENTER, s.TOP);
        pg.image(fgImg, 0, 0, pg.width, pg.height);
    }

    s.draw = () => {
        shade.setUniform('uTex0', pg);
        s.background(200);
        s.fill(0);
        let mod = s.sin(s.frameCount) * 2;
        s.textSize(50 + mod);

        s.push();
        s.resetShader();
        s.texture(bgImg);
        s.rect(-400, -400, 810, 810);
        s.pop();
        
        s.shader(shade);
        s.push();
        mouseRot(s, pg, 10);
        if (s.mouseIsPressed) {
            paint(s, pg, s.color(200, 100, 100, 10), 100);
        }
        s.stroke(0);
        s.strokeWeight(5);
        s.rect(-s.width/2 + s.width/10, -s.height/2 + s.height/10, s.width - s.width / 5, s.height - s.height / 5);
        s.pop();
        
        // s._renderer.GL.disable(s._renderer.GL.DEPTH_TEST);
        // s.text('Which images are violent?', 0, -s.height / 2);
    }
    
}

export default violence;
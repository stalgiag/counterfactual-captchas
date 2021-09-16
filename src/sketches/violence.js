import ditherFrag from '../shaders/bayer-dither.frag';
import vert from '../shaders/persp.vert';
import { mouseRot, paint, SubmitButton } from '../utils/utils';

const violence = (s) => {
    let pg;
    let shade;
    let pd;
    
    let violenceImg;
    let submitButton;
    
    s.preload = () => {
        violenceImg = s.loadImage('./images/violence.jpg');
    }

    s.setup = () => {
        s.createCanvas(800, 800, s.WEBGL);
        shade = s.createShader(vert, ditherFrag);
        pg = s.createGraphics(800, 800);
        
        // submitButton = new SubmitButton(s);
        
        s.noStroke();
        s.angleMode(s.DEGREES);
        // shadeTexture.noStroke();
        pg.image(violenceImg, 0, 0, pg.width, pg.height);
    }

    s.draw = () => {
        shade.setUniform('uTex0', pg);
        s.background(200);
        s.shader(shade);
        mouseRot(s, pg, 10);
        if (s.mouseIsPressed) {
            paint(s, pg, s.color(200, 100, 100, 10), 100);
        }
        s.rect(-s.width/2 + s.width/10, -s.height/2 + s.height/10, s.width - s.width / 5, s.height - s.height / 5);
    }
    
}

export default violence;
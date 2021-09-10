import p5 from 'p5';
import frag from './shaders/funhouse.frag';
import vert from './shaders/funhouse.vert';

const warpingTextInput = (s) => {
    let pg;
    let shade;
    let pd;


    s.setup = () => {
        s.createCanvas(600, 600, s.WEBGL);
        shade = s.createShader(vert, frag);
        pg = s.createGraphics(600, 600);
        pd = s.pixelDensity();

        s.noStroke();
        // shadeTexture.noStroke();
    }

    s.draw = () => {
        pg.background(0, 0, 255);
        pg.fill(100, 200, 0);
        pg.ellipse(300, 300, 300);
        
        shade.setUniform('uTex0', pg);
        shade.setUniform('uRes', [pg.width * pd, pg.height * pd]); 
        shade.setUniform('uTime', s.frameCount * 0.01);

        
        s.background(200);
        s.shader(shade);
        s.rect(0, 0, 600, 600);
    }
}

const sketch = new p5(warpingTextInput);
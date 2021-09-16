import p5, { Shader } from "p5";
import { SubmitButton } from "../utils/utils";

const captcha = (s) => {
    s = new p5(s);
    const _userPre = s.preload;
    const _userSet = s.setup;
    const _userDraw = s.draw;
    let _userSketchIs3D = false;
    
    let captchaGraphix;
    
    let submit;
    
    let spinningAnimRot = 0;
    let spinningAnimSpeed = 0.1;
    
    let validAnim = 0;
    let isValidating = false;
    
    s.preload = () => {
        _userPre();
    }
    
    s.setup = () => {
        _userSet();
        submit = new SubmitButton(s, s.validate);
        _userSketchIs3D = s._renderer.isP3D;
        captchaGraphix = s.createGraphics(s.width, s.height);
        
    }
    
    s.draw = () => {
        if (isValidating) {
            captchaGraphix.background(0, 20);
            s.spinningAnim();
        } else {
            s.push();
            _userDraw();
            s.pop();
        }

        if (_userSketchIs3D) {
            let gl = s._renderer.GL;
            gl.disable(gl.DEPTH_TEST);
            s.image(captchaGraphix, -s.width / 2, -s.height / 2);
        } else {
            s.image(captchaGraphix, 0, 0);
        }
    }
    
    s.spinningAnim = () => {
        captchaGraphix.push();
        captchaGraphix.noStroke();
        captchaGraphix.translate(captchaGraphix.width / 2, captchaGraphix.height / 2);
        captchaGraphix.rotate(spinningAnimRot);
        captchaGraphix.fill(255);
        captchaGraphix.circle(100, 100, 200);
        spinningAnimRot += spinningAnimSpeed;
        captchaGraphix.pop();
    }
    
    s.validate = () => {
        isValidating = true;
        submit.button.hide();
    }
}

export default captcha;
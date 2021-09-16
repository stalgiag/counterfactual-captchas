import p5, { Shader } from "p5";
import { mouseRot, SubmitButton } from "../utils/utils";

const captcha = (s, input) => {
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
    
    const mouseMovements = [];
    // TODO: expose
    const mouseDataSamplingRate = 5;
    
    const outputData = [];
    
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
            
            s.processDataInput();
            s.processMoveData();
        }

        if (_userSketchIs3D) {
            let gl = s._renderer.GL;
            gl.disable(gl.DEPTH_TEST);
            s.image(captchaGraphix, -s.width / 2, -s.height / 2);
        } else {
            s.image(captchaGraphix, 0, 0);
        }
    }
    
    
    
    s.processDataInput    = () => {
        switch (input) {
            case 'mouse':
                if (s.mouseIsPressed) {
                    outputData.push([s.mouseX, s.mouseY]);
                }
                break;
            case 'keys':
                if (s.keyIsPressed) {
                    outputData.push(s.key);
                }
                break;
            default:
                break;
        }
    }
    
    s.processMoveData = () => {
        if (s.frameCount % mouseDataSamplingRate === 0) {
            mouseMovements.push([s.mouseX, s.mouseY]);
        }
    }
    
    s.processMouseInput = () => {
        
    }
    
    s.processKeyInput = (e) => {
        console.log('here');
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
        // TODO: Finish server and open source
        // validator.post(mouseMovements);
        // validator.post(outputData);
    }
}

export default captcha;
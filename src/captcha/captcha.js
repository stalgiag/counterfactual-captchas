import p5, { Shader } from "p5";
import { mouseRot, SubmitButton } from "../utils/utils";

const captcha = (s, input, eltId) => {
    s = new p5(s);
    const _userPre = s.preload;
    const _userSet = s.setup;
    const _userDraw = s.draw;
    let _userSketchIs3D = false;
    
    let captchaGraphix;
    
    let submit;
    
    let spinningAnimRot = 0;
    let spinningAnimSpeed = 0.1;
    
    let isValidating = false;
    let finishedValidating = false;
    
    const mouseMovements = [];
    // TODO: expose
    const mouseDataSamplingRate = 5;
    
    const outputData = [];
    
    s.preload = () => {
        _userPre();
    }
    
    s.setup = () => {
        _userSet();
        const d = document.getElementById(eltId);
        submit = new SubmitButton(s, s.validate);
        d.appendChild(s.canvas);
        d.appendChild(submit.button.elt);
        _userSketchIs3D = s._renderer.isP3D;
        captchaGraphix = s.createGraphics(s.width, s.height);
        captchaGraphix.textAlign(s.CENTER, s.CENTER);
    }
    
    s.draw = () => {
        if (isValidating) {
            captchaGraphix.background(0, 20);
            s.spinningAnim();
        } else if (finishedValidating) {
            captchaGraphix.background(255, 10);
            s.checkMark();
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
    
    
    
    s.processDataInput = () => {
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
    
    s.checkMark = () => {
        captchaGraphix.textSize(200);
        captchaGraphix.fill(0);
        captchaGraphix.text('✓', captchaGraphix.width / 2, captchaGraphix.height / 2);
    }
    
    s.validationSuccessful = () => {
        finishedValidating = true;
        isValidating = false;
    }
    
    s.validate = () => {
        isValidating = true;
        submit.button.hide();
        setTimeout(s.validationSuccessful, s.random(1200, 2500));
        // TODO: Finish server and open source
        // validator.post(mouseMovements);
        // validator.post(outputData);
    }
}

export default captcha;
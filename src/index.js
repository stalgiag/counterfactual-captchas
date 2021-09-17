import p5 from 'p5';
import influence from './sketches/influence';
import institutions from './sketches/institutions';
import violence from './sketches/violence';
import captcha from './captcha/captcha';

import './styles/main.css'

let modules;
let curIndex = 0;

window.onload = () => {
    modules = document.getElementsByClassName('content-module');
    window.addEventListener('keydown', next)
    setTimeout(() => {
        const cov = document.getElementById('white-cover');
        cov.style.visibility = 'hidden';
        cov.style.display = 'none';
    }, 1500)
    activate();
}

function next(e) {
    e.preventDefault();
    if (e.code === 'Space') {
        curIndex++;
        activate();
    }
}

function activate() {
    for (let i = 0; i < modules.length; i++) {
        if (i === curIndex) {
            modules[i].classList.remove('inactive');
            modules[i].classList.add('active');
        } else {
            modules[i].classList.remove('active');
            modules[i].classList.add('inactive');
        }
    }
}

const s1 = captcha(violence, 'mouse', 'violence');
const s2 = captcha(institutions, 'mouse', 'institutions');
const s3 = captcha(influence, 'mouse', 'influence');
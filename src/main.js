/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import * as WebVRManager from './webvr-manager.js';

// window.WebVRConfig = window.WebVRConfig || {};
// window.WebVRManager = WebVRManager;  
// require('aframe-leap-hands').registerAll();

// Set the scene size.
const WIDTH = 400;
const HEIGHT = 300;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

let vrMode = false;

// Start aframe vr listeners
window.addEventListener('enter-vr', e => {
        if (AFRAME.utils.device.checkHeadsetConnected()) { 
                vrMode = true;
                console.log('enter vr mode');

                // Fix positions
                if(document.getElementById('tutorial-scene') !== null) {
                        console.log('test');
                        document.getElementById('opponent').object3D.position.set(0, 1.2, -0.4762045999540051);
                }

        }
});
window.addEventListener('exit-vr', e => {
       vrMode = false;
       console.log('exit vr mode');

       // Fix positions
        if (document.getElementById('tutorial-scene') !== null) {
                document.getElementById('opponent').object3D.position.set(0, 0.9, -0.4762045999540051);
        }

});

// Returns if value1 is within TOLERANCE of value2.
const TOLERANCE = 50;
function isNear(value1, value2) {
        return value1 < value2 + TOLERANCE && value1 > value2 - TOLERANCE;
}


let correctPositionLeft = false, correctPositionRight = false;

function positionCheck(hand) {
        // NOTE: Hands are mirrored! Left = right and right = left
        if (document.getElementById('left-position') !== null) {
                
                let positionData = '';
                for (let val of hand.palmPosition) {
                        positionData += Math.round(val) + ' ';
                }

                if (isNear(hand.palmPosition[0], 30) && isNear(hand.palmPosition[1], 500) && isNear(hand.palmPosition[2], -150) && hand.grabStrength > 0.8)
                        console.log('success!');
                if (hand.type === 'right')
                        document.getElementById('left-position').setAttribute('value', positionData);
                else
                        document.getElementById('right-position').setAttribute('value', positionData);
        }   
}


// For tutorial scene info text

window.onload = () => {

        let scene = document.querySelector('a-scene');
        AFRAME.registerComponent('groin-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("Self-explanatory. Painful even for girls.");
                        });
                }
        });
        AFRAME.registerComponent('eyes-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("Very painful and can impair their vision,\n even if only temporarily. \nCan't hit what you can't see.");
                        });
                }
        });
        AFRAME.registerComponent('nose-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("Fairly fragile when enough force is applied. \nCan lead to breathing problems and bleeding, \nwhich will cause the attacker to pay more attention to themselves \nand allow you to escape.");
                        });
                }
        });
        AFRAME.registerComponent('knees-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("Joints that can fail if enough force is applied. \nIt's better to target the knees rather than the lower or upper legs, \nsince they're weak and hurting them can drastically reduce the attacker's ability to fight, \ngiving you a window of escape.");
                        });
                }
        });
        AFRAME.registerComponent('throat-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("Very fragile area with the trachea exposed. \nBeing hit here is very painful, and will cause breathing problems that can allow you to escape.");
                        });
                }
        });
        
        // document.getElementById('eyes-circle').addEventListener('mouseenter', changeText('eyes'));
}
function changeText(newText) {
        document.getElementById('info-text').setAttribute('value', newText);
}

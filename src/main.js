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
                if (document.getElementById('tutorial-scene') !== null && document.getElementById('punching-scene') !== null) {
                        console.log('test');
                        document.getElementById('opponent').object3D.position.set(0, 1.2, -0.4762045999540051);
                }
        



        }
});
window.addEventListener('exit-vr', e => {
       vrMode = false;
       console.log('exit vr mode');

       // Fix positions
        if (document.getElementById('tutorial-scene') !== null && document.getElementById('punching-scene') !== null) {
                document.getElementById('opponent').object3D.position.set(0, 0.9, -0.4762045999540051);
        }

});

// Returns if value1 is within TOLERANCE of value2.
const TOLERANCE = 50;
function isNear(value1, value2, extraTolerance) {
        let tol = (extraTolerance) ? TOLERANCE * 2 : TOLERANCE;
        return value1 < value2 + tol && value1 > value2 - tol;
}

// Coord1 = hand, Coord2 = target
function isNearXyz(coord1, coord2, extraTolerance) {
        let nc1 = document.getElementById('camera').object3D.localToWorld(new THREE.Vector3(coord1[0], coord1[1], coord1[2]));
        let nc2 = coord2;
        
        return isNear(nc1.x, nc2[0], extraTolerance) && isNear(nc1.y, nc2[1], extraTolerance) && isNear(nc1.z,nc2[2], extraTolerance);
}


let correctPositionLeft = false, correctPositionRight = false;

function positionCheck(hand) {
        // NOTE: Hands are mirrored! Left = right and right = left
        if (document.getElementById('left-position') !== null) {
                
                // let positionData = '';
                // for (let val of hand.palmPosition) {
                //         positionData += Math.round(val) + ' ';
                // }
                let positionData = document.getElementById('camera').object3D.localToWorld(new THREE.Vector3(hand.palmPosition[0],hand.palmPosition[1],hand.palmPosition[2]));

                // if (isNear(hand.palmPosition[0], 30) && isNear(hand.palmPosition[1], 500) && isNear(hand.palmPosition[2], -150) && hand.grabStrength > 0.8)
                //         console.log('success!');

                let formattedData = Math.round(positionData.x) + ' ' + Math.round(positionData.y) + ' ' + Math.round(positionData.z);
                if (hand.type === 'right')
                        document.getElementById('left-position').setAttribute('value', formattedData);
                else
                        document.getElementById('right-position').setAttribute('value', formattedData);
        }   

        // Gun triggers
        if(document.getElementById('gun-scene') !== null) {
                // console.log(hand.type);
                if(hand.type === 'left')
                         correctPositionLeft = (isNearXyz(hand.palmPosition, [-185, 350, -110], true));
                if(hand.type === 'right')
                        correctPositionRight = (isNearXyz(hand.palmPosition, [-185, 350, -110], true));
                console.log(correctPositionLeft, correctPositionRight);
                if(correctPositionRight || correctPositionLeft) {
                        console.log("emit the disarm")
                        document.getElementById('gun').emit('disarm');
                }

        }

        // Punching triggers
        if(document.getElementById('punching-scene') !== null) {
                // Left Knee
                console.log('hi');
                if(isNearXyz(hand.palmPosition, [-45, 168, -392]))
                    document.getElementById('left-knee').setAttribute('visible', false);   
                if (isNearXyz(hand.palmPosition, [62, 152, -378]))
                    document.getElementById('right-knee').setAttribute('visible', false);   
                if(isNearXyz(hand.palmPosition, [-19, 483, -53]))
                    document.getElementById('left-eye').setAttribute('visible', false);   
                if(isNearXyz(hand.palmPosition, [30, 500, -50]))
                    document.getElementById('right-eye').setAttribute('visible', false);   
                if(isNearXyz(hand.palmPosition, [2, 498, -84]))
                    document.getElementById('throat').setAttribute('visible', false);   
                if(isNearXyz(hand.palmPosition, [-27, 548, -84]))
                    document.getElementById('nose').setAttribute('visible', false);   
                if(isNearXyz(hand.palmPosition, [3, 268, -200]))
                    document.getElementById('groin').setAttribute('visible', false);   
                

                if(
                        !document.getElementById('left-knee').getAttribute('visible') &&
                        !document.getElementById('right-knee').getAttribute('visible') &&
                        !document.getElementById('left-eye').getAttribute('visible') &&
                        !document.getElementById('right-eye').getAttribute('visible') &&
                        !document.getElementById('throat').getAttribute('visible') &&
                        !document.getElementById('nose').getAttribute('visible') &&
                        !document.getElementById('groin').getAttribute('visible')
                )
                        document.getElementById('info-text').setAttribute('value', 'Great job!');
                        
                
        }
}


// For tutorial scene info text

window.onload = () => {

        let scene = document.querySelector('a-scene');
        AFRAME.registerComponent('groin-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("-Groin-\nSelf-explanatory. Painful when struck, even for girls.");
                                changePosition(-17.268, 11.123);
                        });
                }
        });
        AFRAME.registerComponent('eyes-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("-Eyes-\nVery painful and can impair their vision,\n even if only temporarily. \nCan't hit what you can't see.");
                                changePosition(-5.563925580479001, 22.351610950003447);
                        });
                }
        });
        AFRAME.registerComponent('nose-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("-Nose-\nFairly fragile when enough force is applied. \nCan lead to breathing problems and bleeding, \nwhich will cause the attacker to pay more attention to themselves \nand allow you to escape.");
                                changePosition(5.010, 19.978);
                        });
                }
        });
        AFRAME.registerComponent('knees-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("-Knees-\nJoints that can fail if enough force is applied. \nIt's better to target the knees rather than the lower or upper legs, \nsince they're weak and hurting them can drastically reduce the attacker's ability to fight, \ngiving you a window of escape.");
                                changePosition(4.344, 6.784);
                        });
                }
        });
        AFRAME.registerComponent('throat-controller', {
                schema: { default: '' },
                init() {
                        this.el.addEventListener('click', () => {
                                changeText("-Throat-\nVery fragile area with the trachea exposed. \nBeing hit here is very painful, and will cause breathing problems that can allow you to escape.");
                                changePosition(-16.334, 19.978);
                        });
                }
        });
        
        // document.getElementById('eyes-circle').addEventListener('mouseenter', changeText('eyes'));
}
function changeText(newText) {
        document.getElementById('info-text').setAttribute('value', newText);
}
function changePosition(newX, newY) {
        document.getElementById('info-text').setAttribute('position', {x: newX, y: newY, z: 4.58});
}

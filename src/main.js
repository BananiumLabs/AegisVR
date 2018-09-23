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


console.log('hi');

//Switch scenes
function nextScene(){
        document.getElementById('scene1').setAttribute('visible', 'false');
        document.getElementById('scene2').setAttribute('visible', 'true');
}

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
// Animer
'use strict';

import * as math from 'mathjs';
import {ndc,perspective, translation, yRotation, zRotation, xRotation, scaling} from '/matrices';
import { AnimationMixer } from 'three';

//====================================
// Récupération canvas + WebGL
//====================================
const canvas = document.querySelector('canvas');

const gl = canvas.getContext('webgl2');
if (!gl) {
  throw new Error("No WebGL for you!")
};

//====================================
// Création et Association des shaders
//====================================
const vertex_GLSL = `#version 300 es
in vec3 a_position;
uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix; 

void main() {
  gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position,1);
}
`;

const fragment_GLSL = `#version 300 es
precision highp float;

out vec4 outColor;
uniform vec4 u_color;

void main() {
  outColor = u_color;
}
`;

const prg = creation_programme_shading(gl, [
    [ gl.VERTEX_SHADER,   vertex_GLSL ],
    [ gl.FRAGMENT_SHADER, fragment_GLSL ]
]);

// Localisation des attributs
const positionLocation = gl.getAttribLocation(prg, "a_position");
const colorLocation = gl.getUniformLocation(prg, "u_color");
// Localisation des uniforms
const projectionMatrixLocation = gl.getUniformLocation(prg, "u_projectionMatrix");
const modelViewMatrixLocation = gl.getUniformLocation(prg, "u_modelViewMatrix");

//====================================
// Création des buffers
//====================================
// Construire un VAO spécifique
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

//====================================
// Dessin de l'image
//====================================

// Spécifier le programme utilisé (i.e. les shaders utilisés)
gl.useProgram(prg);

const fieldOfViewInRadians = degToRad(30);
const zNear = 1; //1
const zFar = 3000;//2000;
const h = zNear*Math.tan(0.6*fieldOfViewInRadians);
const w = h*canvas.clientWidth/canvas.clientHeight;
//const aspect = canvas.clientWidth / canvas.clientHeight;
//const projectionMatrix = projection(fieldOfViewInRadians, aspect, zNear, zFar);
const projectionMatrix = math.multiply(ndc(w, h, zNear, zFar),perspective(zNear,zFar));
// In GLSL matrices are transposed!!!
gl.uniformMatrix4fv(projectionMatrixLocation, false, math.flatten(math.transpose(projectionMatrix)).valueOf());


const cameraUP = degToRad(0);
let cameraMatrix = zRotation(cameraUP);
//    visée : position+orientation
const radius = 700; // la position de la caméra dépend du rayon du F-henge
const cameraAngleRadians = degToRad(-40);
let cameraMatrixInit = translation(0, 0, radius * 3.0);
cameraMatrixInit = math.multiply( xRotation(cameraAngleRadians) , cameraMatrixInit );

// Paramètres variants de l'animation : position de la caméra
let pos = 10;
let degres = 0;
let cameraPosRadians;



// Pour chaque attribut, définir un buffer de données
// et spécifier le parcours des données du buffer
function draw(inversedCameraMatrixWorld, points, position, color){
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = points.length/3; // 16 tuiles de 2 triangles avec 3 vertices chacun

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  //  - en déduire la matrice de vue de la scène
  const modelViewMatrix = math.multiply(inversedCameraMatrixWorld, position);
  // In GLSL matrices are transposed!!!
  gl.uniformMatrix4fv(modelViewMatrixLocation, false, math.flatten(math.transpose(modelViewMatrix)).valueOf());

  gl.uniform4fv(colorLocation, color);

  gl.drawArrays(primitiveType, offset, count  );
}

drawScene();

function drawScene() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 0.7, 1.0, 1.0); // couleur du canvas et non du viewport
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  // Mise à jour des uniforms (et attributes)
  pos = pos+0.5;
  cameraPosRadians = degToRad(pos);
  cameraMatrix = math.multiply( yRotation(cameraPosRadians) , cameraMatrixInit );

  const inversedCameraMatrixWorld = math.inv(cameraMatrix);



  let matriceCentre = [0,0,0]
  matriceCentre = translation(matriceCentre[0], matriceCentre[1], matriceCentre[2]);

  let matriceTour = [0,0,0];
  matriceTour = translation(matriceTour[0], matriceTour[1], matriceTour[2]);

  let matriceSol = [0,0,0];
  matriceSol = translation(matriceSol[0], matriceSol[1], matriceSol[2]);

  let matriceTriangle = [250,100,0];
  matriceTriangle = translation(matriceTriangle[0], matriceTriangle[1], matriceTriangle[2]);

  let matriceCones = [-300, 100, 0];
  matriceCones = translation(matriceCones[0], matriceCones[1], matriceCones[2]);

  let matriceArbre = [-150, 100, -450];
  matriceArbre = translation(matriceArbre[0], matriceArbre[1], matriceArbre[2]);

  let matriceCube = [100,10,0];
  degres = degres + 0.01;
  matriceCube = translation(matriceCube[0], matriceCube[1], matriceCube[2]);
  matriceCube = math.multiply(matriceCube, zRotation(degres));
  matriceCube = math.multiply(matriceCube, yRotation(degres));

  draw(inversedCameraMatrixWorld, getTourGeometry(), matriceTour, [250, 0, 0, 1]);
  draw(inversedCameraMatrixWorld, getSol(), matriceSol, [0, 250, 0, 1]);
  draw(inversedCameraMatrixWorld, getformetriangulaire(), matriceTriangle, [0, 150, 150, 1]);
  draw(inversedCameraMatrixWorld, getFormCones(), matriceCones, [150, 150, 0, 1]);
  draw(inversedCameraMatrixWorld, getFormArbre(), matriceArbre, [150, 0, 150, 1]);
  let numObjet = 5
  for (let i =0; i < numObjet; i++){
    let radiusCube = 100;
    let angle = i * Math.PI * 2 / numObjet;
    let x = Math.cos(angle) * radiusCube;
    let y = Math.sin(angle) * radiusCube;
    matriceCube = [x,200, -y];
    matriceCube = translation(matriceCube[0], matriceCube[1], matriceCube[2]);
    matriceCube = math.multiply(matriceCube, zRotation(degres));
    matriceCube = math.multiply(matriceCube, xRotation(degres));
    matriceCube = math.multiply(matriceCube, translation(x, 0, -y));
    
    draw(inversedCameraMatrixWorld, getCubeGeometry(), matriceCube, [0, 0, 250, 1]);
  }

  requestAnimationFrame(drawScene);
}

//=========================================================
// Library: to fill buffers with data (geometry or colours)
//=========================================================
function setColors(gl) {
  let myColors = [];
  let cIdx = 0;
  // 3 tuiles de 2 triangles pour la face avant
  for (let ii=0; ii < 10; ii++)
    myColors = myColors.concat( [ ui8Colors[cIdx], ui8Colors[cIdx+1], ui8Colors[cIdx+2] ]);

  // 3 tuiles de 2 triangles pour la face arrière
  cIdx += 3;
  for (let ii=0; ii < 20; ii++)
    myColors = myColors.concat( [ ui8Colors[cIdx], ui8Colors[cIdx+1], ui8Colors[cIdx+2] ]);

  // 1 tuile de 2 triangles pour les 10 autres faces
  for (let f=0; f < 10; f++) {
    cIdx += 3;
    for (let ii=0; ii < 6; ii++)
      myColors = myColors.concat( [ ui8Colors[cIdx], ui8Colors[cIdx+1], ui8Colors[cIdx+2] ]);
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(myColors), gl.STATIC_DRAW);
}


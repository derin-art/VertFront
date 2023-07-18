  precision mediump float; 
  
    varying vec2 vUc;

    varying float vWave;

    uniform vec3 position;

    #pragma glslify: cnoise3 = require(glsl-noise/simplex/3d);

    uniform float uTime; 
  
  void main(){
  vec3 pos = position;

      float noiseFreq = 1.5;

      

      float noiseAmp = 0.34;

      vec3 noisePos = vec3(pos.x,pos.y * noiseFreq + uTime, pos.z );

      pos.z += cnoise3(noisePos) * noiseAmp; 

      vWave = pos.z;

    
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
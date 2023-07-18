
    precision mediump float;

    #pragma glslify: snoise2 = require(glsl-noise/simplex/2d);
    #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
    #pragma glslify: snoise4 = require(glsl-noise/simplex/4d);
    #pragma glslify: cnoise2 = require(glsl-noise/classic/2d);
    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
    #pragma glslify: cnoise4 = require(glsl-noise/classic/4d);
    #pragma glslify: pnoise2 = require(glsl-noise/periodic/2d);
    #pragma glslify: pnoise3 = require(glsl-noise/periodic/3d);
    #pragma glslify: pnoise4 = require(glsl-noise/periodic/4d);  

    uniform sampler2D uTexture;

    varying vec2 vUc;

    varying float vWave;

    uniform float uTime;

    uniform vec3 uColor;

    void main() {
      float wave = vWave * 0.2;
      vec3 texture = texture2D(uTexture, vUc + wave).rgb;
      gl_FragColor = vec4(texture, 1.0);
      
    }
  
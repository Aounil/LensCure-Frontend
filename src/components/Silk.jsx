/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useRef, useMemo, useLayoutEffect } from "react";
import { Color } from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Updated fragment shader with uColor uniform and usage
const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform vec3 uColor; // NEW uniform for color

const float PI = 3.141592653589793;

float noise(vec2 texCoord) {
  return fract(sin(dot(texCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy) * 0.3; // subtle noise
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime * 0.5;

  tex.y += 0.02 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  float shade = pattern * 0.5 + 0.25; // varying gray shades

  float finalShade = mix(1.0, shade, 1.0 - rnd * uNoiseIntensity);

  vec3 color = uColor * finalShade; // tint pattern with uColor

  gl_FragColor = vec4(color, 1.0);
}
`;

const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    ref.current.material.uniforms.uTime.value += 0.06 * delta; // slow smooth animation
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

const Silk = ({
  speed = 2,
  scale = 1.3,
  noiseIntensity = 0.6,
  rotation = 0.1,
  color = "#ffffff", // NEW prop for color with default white
}) => {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uRotation: { value: rotation },
      uTime: { value: 0 },
      uColor: { value: new Color(color) }, 
    }),
    [speed, scale, noiseIntensity, rotation, color] 
  );

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="always"
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
    >
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  );
};

export default Silk;

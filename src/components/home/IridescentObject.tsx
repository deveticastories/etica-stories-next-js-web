"use client";

import { useEffect, useRef, type RefObject } from "react";

// Scroll-driven state written by the parent scene and read every frame here.
// `shape` blends the sphere's surface ripple: 0 = soft waves (Brand), 1 = lobed (Build), 2 = twist (Market).
export type ObjectState = { shape: number; spin: number; alpha: number };

// A raymarched sphere drawn as a see-through shell of glowing contour lines in Etica red (front
// and back faces both show), lit from one side, with a rippling surface, a soft halo and
// drifting sparkles. Drawn in one small
// fragment shader, so there is no 3D library: the ripple patterns are blended in the distance
// field, so one pattern melts smoothly into the next.
const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uShape;
uniform float uSpin;
uniform float uAlpha;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Object space: the sphere bobs, leans and turns, and its lines turn with it.
vec3 objectSpace(vec3 p) {
  p.y += sin(uTime * 0.9) * 0.04;
  p.xy *= rot(0.3);
  p.xz *= rot(uSpin + uTime * 0.3);
  return p;
}

// Surface ripple for each word: 0 = soft rolling waves, 1 = lobed ripple around the middle,
// 2 = twisting ripple.
float rippleAt(vec3 d, float i) {
  float t = uTime;
  float around = atan(d.z, d.x);
  if (i < 0.5) return 0.018 * sin(3.0 * d.x + t) * sin(3.0 * d.y + t * 1.2) * sin(3.0 * d.z + t * 0.8);
  if (i < 1.5) return 0.045 * sin(8.0 * around + 2.0 * d.y + t * 0.9) * (1.0 - d.y * d.y) +
                      0.012 * sin(4.0 * d.y + t);
  return 0.016 * sin(5.0 * d.y + 3.0 * around + t * 1.2) + 0.008 * sin(7.0 * d.x - t);
}

float map(vec3 p) {
  vec3 q = objectSpace(p);
  float r = length(q);
  vec3 d = q / max(r, 1e-4);
  float a = floor(uShape);
  float f = smoothstep(0.0, 1.0, uShape - a);
  float ripple = mix(rippleAt(d, a), rippleAt(d, min(a + 1.0, 2.0)), f);
  // Between words the surface surges, so one pattern melts into the next.
  ripple += 0.05 * sin(3.14159 * f) * sin(6.0 * d.x + uTime * 2.0) * sin(5.0 * d.z - uTime * 1.6);
  return r - (0.82 + ripple);
}

vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float e = 0.0015;
  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) +
                   k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));
}

// Dense, gently waving contour lines, fixed to the sphere so they turn with it.
float lines(vec3 p) {
  vec3 q = objectSpace(p);
  float c = q.y + 0.1 * sin(q.x * 3.0 + uTime * 0.7) + 0.08 * sin(q.z * 4.0 - uTime * 0.5);
  float f = abs(fract(c * 26.0) - 0.5);
  return smoothstep(0.12, 0.0, f);
}

// Etica red: deep crimson in shadow, the logo red (#C91F32) in the mid-tones, hot pink-red in the light.
vec3 palette(float light) {
  vec3 deep = vec3(0.32, 0.01, 0.05);
  vec3 brand = vec3(0.79, 0.12, 0.2);
  vec3 hot = vec3(1.0, 0.5, 0.55);
  return light < 0.5 ? mix(deep, brand, light * 2.0) : mix(brand, hot, light * 2.0 - 1.0);
}

const vec3 LIGHT = vec3(-0.55, 0.65, 0.52);

// Lit like a real object: one side bright, the other in shadow, glints on the lines and bright
// folded ribbons drifting across the surface.
vec3 shade(vec3 p, vec3 rd, float strength) {
  vec3 n = normalAt(p);
  vec3 l = normalize(LIGHT);
  float facing = abs(dot(n, rd));
  float rim = pow(1.0 - clamp(facing, 0.0, 1.0), 4.0);
  float diffuse = max(dot(n, l), 0.0);
  float lit = 0.2 + 0.8 * diffuse;
  float spec = pow(max(dot(reflect(rd, n), l), 0.0), 18.0);
  vec3 q = objectSpace(p);
  float ribbon = smoothstep(0.7, 1.0, 0.5 + 0.5 * sin(2.3 * q.x + 1.7 * q.z - 1.3 * q.y + uTime * 0.6));
  float ln = lines(p);
  // Light lives on the lines only, so the gaps stay dark and the sphere reads as a wireframe.
  vec3 col = palette(lit) * ln * (0.35 + 1.1 * lit) * (0.9 + 1.5 * ribbon);
  col += vec3(1.0, 0.8, 0.82) * spec * ln * 1.2;
  col += palette(0.5 + 0.5 * diffuse) * rim * 1.1;
  return col * strength;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.0, 3.8);
  vec3 rd = normalize(vec3(uv, -1.6));
  vec3 col = vec3(0.0);
  // Start each ray where it enters a bounding sphere just outside the ripples, so grazing rays
  // reach the silhouette within the step budget and the outline stays perfectly round.
  float b = dot(ro, rd);
  float closest = sqrt(max(dot(ro, ro) - b * b, 0.0));
  float minD = closest - 0.82;
  float enter = b * b - (dot(ro, ro) - 1.0);
  bool hit = false;
  float t = 0.0;
  if (enter > 0.0) {
    t = -b - sqrt(enter);
    float tEnd = -b + sqrt(enter);
    for (int i = 0; i < 96; i++) {
      float d = map(ro + rd * t);
      minD = min(minD, d);
      if (d < 0.0012) { hit = true; break; }
      t += d * 0.7;
      if (t > tEnd) break;
    }
  }

  if (hit) {
    col += shade(ro + rd * t, rd, 1.0);
    // Back face, seen through the shell: march on from just inside until we leave the sphere.
    float t2 = t + 0.03;
    for (int i = 0; i < 64; i++) {
      float d = -map(ro + rd * t2);
      if (d < 0.0012) break;
      t2 += max(d * 0.7, 0.004);
      if (t2 > 5.4) break;
    }
    col += shade(ro + rd * t2, rd, 0.5);
  }

  // Soft halo outside the silhouette only (inside, the dark gaps between lines must stay dark).
  if (!hit) col += palette(0.5) * exp(-max(minD, 0.0) * 11.0) * 0.45;

  // Drifting sparkles around the sphere.
  vec2 g = (uv + vec2(0.0, uTime * 0.015)) * 26.0;
  vec2 cell = floor(g);
  vec2 local = fract(g) - 0.5;
  float h = hash(cell);
  if (h > 0.9) {
    vec2 offset = vec2(hash(cell + 1.7), hash(cell + 4.3)) - 0.5;
    float twinkle = 0.5 + 0.5 * sin(uTime * 2.0 + h * 40.0);
    float spark = smoothstep(0.09, 0.0, length(local - offset * 0.6));
    col += vec3(1.0, 0.45, 0.5) * spark * twinkle * 0.7 * smoothstep(0.75, 0.3, length(uv));
  }

  col *= uAlpha;
  float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function IridescentObject({
  stateRef,
  className = "",
}: {
  stateRef: RefObject<ObjectState>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uShape = gl.getUniformLocation(program, "uShape");
    const uSpin = gl.getUniformLocation(program, "uSpin");
    const uAlpha = gl.getUniformLocation(program, "uAlpha");

    // Capped pixel ratio: the shader runs per pixel, and Safari is tight on GPU memory.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let frame = 0;
    let visible = false;
    let lost = false;
    let cleared = false;
    const start = performance.now();

    const draw = () => {
      frame = 0;
      if (!visible || lost) return;
      const state = stateRef.current;
      if (state.alpha <= 0) {
        // Clear once and idle until the object is needed again.
        if (!cleared) {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          cleared = true;
        }
      } else {
        cleared = false;
        resize();
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.uniform1f(uShape, state.shape);
        gl.uniform1f(uSpin, state.spin);
        gl.uniform1f(uAlpha, state.alpha);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      frame = requestAnimationFrame(draw);
    };

    // Only animate while the canvas is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    });
    observer.observe(canvas);

    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [stateRef]);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}

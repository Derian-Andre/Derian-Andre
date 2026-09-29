// Section-driven abstract background. One full-screen fragment shader, 6 scenes, noise-dissolve transitions.
// Raw WebGL2, rendered at half resolution. 0 silk · 1 circuit · 2 moiré · 3 void · 4 halftone · 5 beams
const VS = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FS = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uEnergy;
uniform int uA; uniform int uB; uniform float uMix;
out vec4 o;
const vec3 BASE = vec3(0.0385, 0.0462, 0.0615);
const vec3 INK = vec3(0.60, 0.65, 0.74);
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + 3.1; a *= 0.5; } return v; }
float aline(float x, float w){ float fw = fwidth(x); return 1.0 - smoothstep(0.0, fw * w, abs(fract(x + 0.5) - 0.5)); }

// Hero — liquid chrome: a domain-warped metal surface reflecting a fake studio; cursor drops ripples.
float fbm3(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a * noise(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + 3.1; a *= 0.5; } return v; }
float lqH(vec2 p, float t, vec2 m){
  vec2 q = vec2(fbm3(p * 0.7 + vec2(0.0, t)), fbm3(p * 0.7 + vec2(5.2, 1.3) - t));
  float h = fbm3(p * 0.8 + q * 2.2 + vec2(t * 0.4, 0.0));
  float d = length(p - m);
  h += sin(d * 14.0 - uTime * 2.6) * exp(-d * 2.2) * smoothstep(0.0, 0.25, d) * (0.01 + uEnergy * 0.035);
  return h;
}
vec3 silk(vec2 uv, vec2 m, float lens){
  float t = uTime * 0.045;
  vec2 p = uv * 1.2 + vec2(0.0, uScroll * 2.0), mp = m * 1.2;
  float e = 0.004, h = lqH(p, t, mp);
  float hx = lqH(p + vec2(e, 0.0), t, mp), hy = lqH(p + vec2(0.0, e), t, mp);
  vec3 n = normalize(vec3(-(hx - h) / e * 0.32, -(hy - h) / e * 0.32, 1.0));
  vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);
  float strips = smoothstep(0.6, 0.92, sin(r.x * 5.0 + r.y * 2.0 + 0.6) * 0.5 + 0.5);
  float sky = smoothstep(-0.2, 0.7, r.y);
  vec2 md = (m - uv); vec3 kd = normalize(vec3(md * 1.4, 1.0));
  float key = pow(max(dot(r, kd), 0.0), 40.0);
  float fres = pow(1.0 - max(n.z, 0.0), 1.6);
  float env = strips * 0.42 * (0.35 + sky) + key * 1.1 + fres * 0.9 + sky * 0.07;
  return BASE * 0.8 + INK * pow(env, 1.15);
}
vec3 circuit(vec2 uv, vec2 m, float lens){
  vec2 g = uv * 13.0 + vec2(0.0, uScroll * 6.0); vec2 id = floor(g), f = fract(g) - 0.5; float fw = fwidth(g.x);
  float lx = 1.0 - smoothstep(0.0, fw * 1.2, abs(f.y)), ly = 1.0 - smoothstep(0.0, fw * 1.2, abs(f.x));
  float rh = hash(vec2(id.y, 3.1)), rv = hash(vec2(id.x, 7.7));
  float ph = fract(g.x * 0.035 - uTime * (0.05 + rh * 0.16) + rh * 10.0);
  float pv = fract(g.y * 0.035 - uTime * (0.04 + rv * 0.14) + rv * 10.0);
  float tH = smoothstep(0.7, 1.0, ph) * step(0.55, rh), tV = smoothstep(0.78, 1.0, pv) * step(0.62, rv);
  float nd = 1.0 - smoothstep(0.045, 0.045 + fw * 1.5, length(f));
  float hot = step(0.93, hash(id + floor(uTime * 0.5)));
  float v = (lx + ly) * 0.03 + nd * (0.1 + hot * 0.5) + lx * tH * 0.8 + ly * tV * 0.8 + (lx + ly + nd) * lens * 0.3;
  return BASE + INK * v;
}
vec3 moire(vec2 uv, vec2 m, float lens){
  vec2 c1 = vec2(uRes.x / uRes.y * 0.62 + sin(uTime * 0.07) * 0.18, 0.52 + cos(uTime * 0.05) * 0.14);
  float a = sin(length(uv - c1) * 95.0 - uTime * 0.5), b = sin(length(uv - m) * 95.0);
  float mo = smoothstep(0.35, 1.0, a * b);
  float ring = aline(length(uv - c1) * 15.0, 1.2) * 0.05;
  return BASE + INK * (mo * (0.1 + lens * 0.18) + ring);
}
vec3 voidscape(vec2 uv, vec2 m, float lens){
  vec3 c = BASE * 0.8;
  float neb = fbm(uv * 1.3 + vec2(uTime * 0.01, uScroll));
  c += vec3(0.028, 0.034, 0.05) * smoothstep(0.45, 0.95, neb);
  for (int L = 0; L < 3; L++){
    float fl = float(L), sc = 18.0 + fl * 16.0;
    vec2 g = (uv + (m - 0.5) * 0.03 * (fl + 1.0) + vec2(0.0, uScroll * (0.4 + fl * 0.3))) * sc;
    vec2 id = floor(g), f = fract(g) - 0.5; float h = hash(id + fl * 17.0);
    if (h > 0.9){ vec2 off = vec2(hash(id + 3.3), hash(id + 7.1)) - 0.5;
      float d = length(f - off * 0.6); float tw = 0.6 + 0.4 * sin(uTime * (0.8 + h * 2.0) + h * 40.0);
      c += INK * smoothstep(0.09, 0.0, d) * tw * (0.35 + 0.25 * (1.0 - fl / 2.0)); }
  }
  vec2 cc = vec2(uRes.x / uRes.y * 0.66, 0.5);
  c += INK * aline(length(uv - cc) * 2.1, 1.0) * 0.12;
  return c + INK * lens * 0.03;
}
vec3 halftone(vec2 uv, vec2 m, float lens){
  vec2 g = uv * 42.0; vec2 id = floor(g), f = fract(g) - 0.5;
  float n = fbm(id * 0.035 + vec2(uTime * 0.03, uScroll * 2.0));
  float rad = 0.04 + 0.34 * smoothstep(0.4, 0.85, n) + lens * 0.14;
  float fw = fwidth(g.x); float v = 1.0 - smoothstep(rad - fw, rad + fw, length(f));
  return BASE + INK * v * 0.11;
}
// Contact — transmission: light beams rising from a horizon, swinging toward the cursor. Reaching out.
vec3 beams(vec2 uv, vec2 m, float lens){
  float asp = uRes.x / uRes.y;
  vec2 o = vec2(asp * 0.5, -0.12);
  vec2 d = uv - o; float r = length(d); float a = atan(d.x, d.y);
  vec2 dm = m - o; float am = atan(dm.x, dm.y);
  float n = fbm(vec2(a * 7.0, uTime * 0.12)) * 0.7 + noise(vec2(a * 40.0, uTime * 0.3)) * 0.3;
  float b = pow(smoothstep(0.4, 0.95, n), 1.6);
  float focus = exp(-pow((a - am) * 2.4, 2.0));
  float fall = exp(-r * 0.9);
  float pulse = 0.75 + 0.25 * sin(r * 22.0 - uTime * 1.6);
  float horizon = exp(-abs(r - 0.62) * 55.0) * smoothstep(1.6, 0.2, abs(a));
  float core = exp(-r * 3.2);
  return BASE + INK * (b * (0.14 + 0.55 * focus) * fall * pulse * 1.5 + horizon * (0.35 + focus * 0.4) + core * 0.35 + lens * 0.03);
}
vec3 scene(int s, vec2 uv, vec2 m, float lens){
  if (s == 0) return silk(uv, m, lens);
  if (s == 1) return circuit(uv, m, lens);
  if (s == 2) return moire(uv, m, lens);
  if (s == 3) return voidscape(uv, m, lens);
  if (s == 4) return halftone(uv, m, lens);
  if (s == 6) return BASE * 0.9 + INK * lens * 0.025;
  return beams(uv, m, lens);
}
void main(){
  vec2 frag = gl_FragCoord.xy, uv = frag / uRes.y;
  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.0);
  vec2 dm = uv - m; float lens = exp(-dot(dm, dm) * 7.0);
  vec3 col = scene(uB, uv, m, lens);
  if (uMix < 1.0){
    vec3 a = scene(uA, uv, m, lens);
    float n = noise(uv * 3.5) * 0.65 + noise(uv * 11.0) * 0.35;
    float x = uMix * 1.3 - 0.15;
    float e = smoothstep(n - 0.06, n + 0.06, x);
    float edge = (1.0 - abs(e * 2.0 - 1.0));
    col = mix(a, col, e) + INK * edge * 0.12;
  }
  vec2 c = frag / uRes - 0.5; col *= 1.0 - dot(c, c) * 0.7;
  o = vec4(col, 1.0);
}`;

export function mount(canvas, { reduced = false } = {}) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' });
  const noop = { setScroll() {}, setMode() {}, pulse() {}, destroy() {} };
  if (!gl) return noop;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog); gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(prog, n);
  const uRes = U('uRes'), uTime = U('uTime'), uMouse = U('uMouse'), uScroll = U('uScroll'), uEnergy = U('uEnergy'), uA = U('uA'), uB = U('uB'), uMix = U('uMix');

  const SCALE = 0.5;
  const s = { mx: 0.7, my: 0.55, tmx: 0.7, tmy: 0.55, scroll: 0, sScroll: 0, energy: 0, a: 0, b: 0, mix: 1 };
  function resize() {
    const w = Math.max(1, Math.round(canvas.clientWidth * SCALE)), h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
    canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h);
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  const onMove = (e) => { s.tmx = e.clientX / innerWidth; s.tmy = 1 - e.clientY / innerHeight; s.energy = Math.min(1, s.energy + Math.hypot(e.movementX || 0, e.movementY || 0) * 0.004); };
  addEventListener('pointermove', onMove, { passive: true });

  let running = !document.hidden, raf = 0, last = performance.now(); const t0 = last;
  const onVis = () => { running = !document.hidden; if (running) { last = performance.now(); loop(); } };
  document.addEventListener('visibilitychange', onVis);
  function loop() {
    cancelAnimationFrame(raf); if (!running) return; raf = requestAnimationFrame(loop);
    const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
    s.mx += (s.tmx - s.mx) * 0.05; s.my += (s.tmy - s.my) * 0.05;
    s.sScroll += (s.scroll - s.sScroll) * 0.08; s.energy *= 0.96;
    if (s.mix < 1) s.mix = Math.min(1, s.mix + dt / (reduced ? 0.4 : 1.1));
    gl.uniform1f(uTime, reduced ? 20 : (now - t0) / 1000);
    gl.uniform2f(uMouse, s.mx, s.my); gl.uniform1f(uScroll, s.sScroll); gl.uniform1f(uEnergy, s.energy);
    gl.uniform1i(uA, s.a); gl.uniform1i(uB, s.b); gl.uniform1f(uMix, s.mix);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  loop();
  return {
    setScroll(px) { s.scroll = px * 0.0004; },
    setMode(m) {
      if (m === s.b) return;
      s.a = s.mix >= 0.5 ? s.b : s.a; s.b = m; s.mix = 0;
    },
    pulse(v = 0.6) { s.energy = Math.min(1, s.energy + v); },
    destroy() { running = false; cancelAnimationFrame(raf); ro.disconnect(); removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis); },
  };
}

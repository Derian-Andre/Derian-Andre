import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';
import { visibleLoop } from './monolito.js';

const N = 110 * 110;
function rnd(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

// Neural network: layered node clusters + points streaming along edges
function shapeNet() {
  const layers = [4, 7, 7, 5, 2], r = rnd(21), nodes = [];
  layers.forEach((n, li) => {
    for (let k = 0; k < n; k++) nodes.push({ li, x: -2.6 + li * 1.3, y: (k - (n - 1) / 2) * 0.62, z: (r() - 0.5) * 0.8 });
  });
  const edges = [];
  nodes.forEach((a) => nodes.forEach((b) => { if (b.li === a.li + 1) edges.push([a, b]); }));
  const out = new Float32Array(N * 3), g = () => (r() + r() + r() - 1.5) * 0.09;
  for (let i = 0; i < N; i++) {
    let x, y, z;
    if (i % 5 < 2) { const n = nodes[i % nodes.length]; x = n.x + g(); y = n.y + g(); z = n.z + g(); }
    else { const [a, b] = edges[Math.floor(r() * edges.length)], t = r(); x = a.x + (b.x - a.x) * t; y = a.y + (b.y - a.y) * t; z = a.z + (b.z - a.z) * t; x += g() * 0.12; y += g() * 0.12; }
    out[i * 3] = x; out[i * 3 + 1] = y; out[i * 3 + 2] = z;
  }
  return out;
}
function shapeSphere() {
  const out = new Float32Array(N * 3), g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), t = g * i, R = 2.2; out[i * 3] = Math.cos(t) * rr * R; out[i * 3 + 1] = y * R; out[i * 3 + 2] = Math.sin(t) * rr * R; }
  return out;
}
function shapeCloud() {
  const out = new Float32Array(N * 3), r = rnd(99);
  for (let i = 0; i < N; i++) { out[i * 3] = (r() - 0.5) * 12; out[i * 3 + 1] = (r() - 0.5) * 8; out[i * 3 + 2] = (r() - 0.5) * 6; }
  return out;
}
// A wireframe construction cube: design as a system, not a typographic glyph.
function shapeConstructionCube() {
  const v = [[-1.55, -1.55, -1.55], [1.55, -1.55, -1.55], [1.55, 1.55, -1.55], [-1.55, 1.55, -1.55], [-1.55, -1.55, 1.55], [1.55, -1.55, 1.55], [1.55, 1.55, 1.55], [-1.55, 1.55, 1.55]];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const out = new Float32Array(N * 3), r = rnd(55);
  for (let i = 0; i < N; i++) {
    const [from, to] = edges[Math.floor(r() * edges.length)], a = v[from], b = v[to], t = r(), noise = () => (r() + r() + r() - 1.5) * 0.055;
    out[i * 3] = a[0] + (b[0] - a[0]) * t + noise();
    out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + noise();
    out[i * 3 + 2] = a[2] + (b[2] - a[2]) * t + noise();
  }
  return out;
}

export async function mount(canvas, { target = window, reduced = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75); renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, 0, 10);
  const shapes = {
    cloud: shapeCloud(), ai: shapeNet(), philo: shapeSphere(),
    design: shapeConstructionCube(),
  };
  const cur = new Float32Array(shapes.cloud), seed = new Float32Array(N), r0 = rnd(7);
  for (let i = 0; i < N; i++) seed[i] = r0();
  const geo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(cur, 3).setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('position', posAttr); geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uSize: { value: 2.3 * dpr }, uTime: { value: 0 }, uFade: { value: 0 } },
    vertexShader: `attribute float aSeed; uniform float uSize; uniform float uTime; varying float vA;
      void main(){ vec3 p = position + vec3(sin(uTime*0.8 + aSeed*40.0), cos(uTime*0.7 + aSeed*30.0), 0.0) * 0.012;
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = uSize * (10.0 / -mv.z) * (0.75 + aSeed * 0.5);
        gl_Position = projectionMatrix * mv; vA = smoothstep(18.0, 6.0, -mv.z) * (0.55 + aSeed * 0.45); }`,
    fragmentShader: `uniform float uFade; varying float vA;
      void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
        gl_FragColor = vec4(0.84, 0.87, 0.93, smoothstep(0.5, 0.1, d) * vA * uFade); }`,
  });
  const group = new THREE.Group(); group.add(new THREE.Points(geo, mat)); scene.add(group);

  let tgt = shapes.cloud;
  const s = { mx: 0, my: 0, tmx: 0, tmy: 0, rotY: 0, rotX: 0, vY: 0, vX: 0, drag: false, lx: 0, ly: 0, spin: 0 };
  const ndc = new THREE.Vector2(9, 9), ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hitW = new THREE.Vector3(), hitL = new THREE.Vector3();
  const blocked = (e) => e.target.closest && e.target.closest('a,button,input,[data-nodrag]');
  const onMove = (e) => {
    s.tmx = (e.clientX / innerWidth) * 2 - 1; s.tmy = -(e.clientY / innerHeight) * 2 + 1;
    const rc = canvas.getBoundingClientRect(); ndc.set(((e.clientX - rc.left) / rc.width) * 2 - 1, -((e.clientY - rc.top) / rc.height) * 2 + 1);
    if (s.drag) { s.vY = (e.clientX - s.lx) * 0.006; s.vX = (e.clientY - s.ly) * 0.004; s.lx = e.clientX; s.ly = e.clientY; }
  };
  const onDown = (e) => { if (blocked(e)) return; s.drag = true; s.lx = e.clientX; s.ly = e.clientY; };
  const onUp = () => { s.drag = false; };
  addEventListener('pointermove', onMove, { passive: true }); target.addEventListener('pointerdown', onDown); addEventListener('pointerup', onUp);
  const resize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); camera.position.z = w / h < 0.9 ? 15 : 10; };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  const t0 = performance.now(), ease = reduced ? 0.2 : 0.075;
  const stop = visibleLoop(canvas, () => {
    const t = (performance.now() - t0) / 1000;
    mat.uniforms.uTime.value = reduced ? 0 : t; mat.uniforms.uFade.value = Math.min(1, mat.uniforms.uFade.value + 0.02);
    s.mx += (s.tmx - s.mx) * 0.05; s.my += (s.tmy - s.my) * 0.05;
    s.rotY += s.vY; s.rotX += s.vX; s.vY *= 0.93; s.vX *= 0.9;
    if (!s.drag) { s.rotY *= 0.988; s.rotX *= 0.97; }
    if (!reduced && tgt !== shapes.design) s.spin += 0.0025;
    group.rotation.set(s.rotX - s.my * 0.15, s.rotY + s.mx * 0.3 + s.spin * (tgt === shapes.ai ? 0.35 : 1), 0);
    const wide = camera.aspect > 1.1;
    const compactDesign = tgt === shapes.design && camera.aspect > 0.9 && camera.aspect <= 1.25;
    const narrowDesign = tgt === shapes.design && camera.aspect <= 0.9;
    group.position.x += ((wide ? (tgt === shapes.philo ? -2.4 : tgt === shapes.design ? 1.05 : 2.3) : 0) - group.position.x) * 0.05;
    const designY = compactDesign ? -0.8 : narrowDesign ? -0.25 : 1.9;
    const designScale = compactDesign ? 0.35 : narrowDesign ? 0.38 : 0.55;
    group.position.y += ((wide ? (tgt === shapes.design ? designY : 0) : (tgt === shapes.design ? designY : 1.9)) - group.position.y) * 0.05;
    group.scale.setScalar(tgt === shapes.design ? designScale : (wide ? 1 : 0.8));
    ray.setFromCamera(ndc, camera);
    const has = !!ray.ray.intersectPlane(plane, hitW); if (has) { hitL.copy(hitW); group.worldToLocal(hitL); }
    const R = 0.85, R2 = R * R;
    for (let i = 0; i < N; i++) {
      const a = i * 3, k = ease * (0.55 + seed[i] * 0.9);
      cur[a] += (tgt[a] - cur[a]) * k; cur[a + 1] += (tgt[a + 1] - cur[a + 1]) * k; cur[a + 2] += (tgt[a + 2] - cur[a + 2]) * k;
      if (has) { const dx = cur[a] - hitL.x, dy = cur[a + 1] - hitL.y, d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 1e-5) { const d = Math.sqrt(d2), f = ((R - d) / R) * 0.22; cur[a] += (dx / d) * f; cur[a + 1] += (dy / d) * f; cur[a + 2] += f * 0.8; } }
    }
    posAttr.needsUpdate = true;
    renderer.render(scene, camera);
  });
  return {
    setShape(name) { if (shapes[name]) tgt = shapes[name]; },
    destroy() { stop(); ro.disconnect(); removeEventListener('pointermove', onMove); target.removeEventListener('pointerdown', onDown); removeEventListener('pointerup', onUp); renderer.dispose(); },
  };
}

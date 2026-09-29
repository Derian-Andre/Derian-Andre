import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';
import { visibleLoop } from './monolito.js';

// Infinite globe: the work tiles wrap a sphere, repeating so it never ends. Drag spins it in any
// direction with inertia; the front tile turns to full colour; click flies in.
const VERT = `
uniform float uHover; uniform float uTime; uniform float uIdx; uniform float uVel;
varying vec2 vUv; varying float vZ;
void main(){
  vUv = uv;
  vec3 p = position;
  float bulge = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
  // tiles lift off the sphere and ripple with the spin velocity, like scales of a living thing
  float lift = uVel * (0.35 + 0.35 * sin(uIdx * 1.7 + uTime * 2.2));
  p += normalize(p) * (bulge * uHover * 0.3 + lift + bulge * uVel * 0.25);
  vec4 w = modelMatrix * vec4(p, 1.0);
  vZ = w.z;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;
const FRAG = `
uniform sampler2D map; uniform vec2 uScale; uniform float uColor; uniform float uReady; uniform vec3 uBg; uniform float uR; uniform float uHover; uniform float uVel;
varying vec2 vUv; varying float vZ;
void main(){
  vec2 uv = (vUv - 0.5) * uScale + 0.5;
  // chromatic split grows with hover and spin
  vec2 off = vec2(0.004 + uHover * 0.008 + uVel * 0.05, 0.0);
  vec3 c = vec3(texture2D(map, uv + off).r, texture2D(map, uv).g, texture2D(map, uv - off).b);
  float g = dot(c, vec3(0.299, 0.587, 0.114));
  vec3 col = mix(vec3(g) * vec3(0.86, 0.89, 0.95), c, uColor);
  float depth = smoothstep(-uR * 0.6, uR, vZ);
  float a = (0.12 + 0.88 * depth) * uReady;
  if (!gl_FrontFacing) a *= 0.25;
  col = mix(uBg, col, 0.3 + 0.7 * depth);
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}`;

export function mount(canvas, { images = [], reduced = false, target = window, initialIndex = 0, onHover, onFront, onSelect } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  const bg = new THREE.Color('hsl(220, 23%, 5%)');
  const R = 3.3, NI = images.length;

  // rings of latitude; column count follows cos(lat) so tiles keep their size
  const rows = [-1.05, -0.7, -0.35, 0, 0.35, 0.7, 1.05];
  const TW = 0.5, TH = TW / 1.5; // angular size (radians) at the equator
  const tiles = [];
  const loader = new THREE.TextureLoader();
  const texs = images.map((src) => {
    const u = { scale: new THREE.Vector2(1, 1), loaded: false };
    const t = loader.load(src, (tx) => {
      const ar = tx.image.width / tx.image.height, tar = 1.5;
      u.scale.set(ar > tar ? tar / ar : 1, ar > tar ? 1 : ar / tar); u.loaded = true;
    });
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; u.tex = t; return u;
  });
  const globe = new THREE.Group(); scene.add(globe);
  let n = 0;
  rows.forEach((lat, ri) => {
    const cols = Math.max(4, Math.round((Math.PI * 2 * Math.cos(lat)) / (TW * 1.18)));
    for (let c = 0; c < cols; c++) {
      const lon = (c / cols) * Math.PI * 2 + (ri % 2) * (Math.PI / cols);
      const w = TW / Math.cos(lat) * 0.98;
      const geo = new THREE.PlaneGeometry(1, 1, 16, 8);
      const pa = geo.attributes.position;
      for (let i = 0; i < pa.count; i++) {
        const a = lon + pa.getX(i) * w * 0.86, b = lat + pa.getY(i) * TH * 0.86;
        pa.setXYZ(i, R * Math.cos(b) * Math.sin(a), R * Math.sin(b), R * Math.cos(b) * Math.cos(a));
      }
      geo.computeVertexNormals();
      const wi = (n * 7 + ri * 3) % NI;
      const tx = texs[wi];
      const uni = { map: { value: tx.tex }, uScale: { value: tx.scale }, uColor: { value: 0 }, uHover: { value: 0 }, uTime: { value: 0 }, uIdx: { value: n }, uVel: { value: 0 }, uReady: { value: 0 }, uBg: { value: bg }, uR: { value: R } };
      const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VERT, fragmentShader: FRAG, side: THREE.DoubleSide, transparent: true, depthWrite: true }));
      mesh.userData = { i: n, wi, lat, lon };
      globe.add(mesh);
      tiles.push({ mesh, u: uni, tx, hover: 0, color: 0, lat, lon, wi });
      n++;
    }
  });

  const grat = new THREE.Group(); globe.add(grat);
  const gm = new THREE.LineBasicMaterial({ color: new THREE.Color('hsl(220, 14%, 34%)'), transparent: true, opacity: 0.45, depthWrite: false });
  for (let k = -5; k <= 5; k++) {
    const lat = k * 0.26, pts = [];
    for (let j = 0; j <= 96; j++) { const a = (j / 96) * Math.PI * 2; pts.push(new THREE.Vector3(R * 0.985 * Math.cos(lat) * Math.sin(a), R * 0.985 * Math.sin(lat), R * 0.985 * Math.cos(lat) * Math.cos(a))); }
    grat.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
  }
  for (let k = 0; k < 16; k++) {
    const lon = (k / 16) * Math.PI * 2, pts = [];
    for (let j = 0; j <= 64; j++) { const b = -Math.PI / 2 + (j / 64) * Math.PI; pts.push(new THREE.Vector3(R * 0.985 * Math.cos(b) * Math.sin(lon), R * 0.985 * Math.sin(b), R * 0.985 * Math.cos(b) * Math.cos(lon))); }
    grat.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
  }
  const initialTile = tiles.find((tile) => tile.wi === initialIndex);
  const s = { vel: 0, yaw: initialTile ? -initialTile.lon : 0, pitch: initialTile ? initialTile.lat : -0.08, vy: 0, vp: 0, drag: false, lx: 0, ly: 0, downX: 0, downY: 0, tap: -1, pointerId: null, mx: 0, my: 0, tmx: 0, tmy: 0,
    scrollT: 0, scrollS: 0, hover: -1, front: -1, selected: -1, camZ: 13, tCamZ: 11.5, intro: 0 };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(-9, -9);
  const blocked = (e) => e.target.closest && e.target.closest('a,button,input,[data-nodrag]');
  function onMove(e) {
    s.tmx = (e.clientX / innerWidth) * 2 - 1; s.tmy = -(e.clientY / innerHeight) * 2 + 1;
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    if (blocked(e)) ndc.set(-9, -9);
    if (s.drag && s.selected < 0) { s.vy = (e.clientX - s.lx) * 0.0032; s.vp = (e.clientY - s.ly) * 0.0026; s.lx = e.clientX; s.ly = e.clientY; }
  }
  function onDown(e) {
    if (blocked(e)) return;
    s.drag = true; s.pointerId = e.pointerId; s.tap = s.hover;
    s.lx = s.downX = e.clientX; s.ly = s.downY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  }
  function onUp(e) {
    if (!s.drag) return; s.drag = false;
    canvas.releasePointerCapture?.(s.pointerId);
    const tapThreshold = e.pointerType === 'touch' ? 16 : 6;
    if (Math.hypot(e.clientX - s.downX, e.clientY - s.downY) < tapThreshold) {
      if (s.tap >= 0) api.select(s.tap); else if (s.selected >= 0) api.close();
    }
    s.tap = -1; s.pointerId = null;
  }
  function onCancel() { s.drag = false; s.tap = -1; s.pointerId = null; }
  addEventListener('pointermove', onMove, { passive: true }); target.addEventListener('pointerdown', onDown); addEventListener('pointerup', onUp); target.addEventListener('pointercancel', onCancel);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    s.far = w / h < 1 ? 16 : 11.5; if (s.selected < 0) s.tCamZ = s.far;
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize(); s.camZ = s.far + 5;

  const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));
  const wp = new THREE.Vector3();
  const t0 = performance.now();
  const stop = visibleLoop(canvas, () => {
    const t = (performance.now() - t0) / 1000;
    s.intro = Math.min(1, s.intro + 0.03);
    s.mx += (s.tmx - s.mx) * 0.05; s.my += (s.tmy - s.my) * 0.05;
    s.scrollS += (s.scrollT - s.scrollS) * 0.09;
    if (s.selected >= 0) {
      const tl = tiles[s.selected];
      s.yaw += norm(-tl.lon - (s.yaw + s.scrollS)) * 0.08; s.pitch += (tl.lat - s.pitch) * 0.08; s.vy = s.vp = 0;
    } else {
      s.yaw += s.vy + (reduced || s.drag ? 0 : 0.0012); s.pitch += s.vp;
      if (!s.drag) { s.vy *= 0.95; s.vp *= 0.9; s.pitch += (-0.08 - s.pitch) * 0.01; }
      s.pitch = Math.max(-0.75, Math.min(0.75, s.pitch));
    }
    globe.rotation.set(s.pitch - s.my * 0.08, s.yaw + s.scrollS + s.mx * 0.12, 0, 'XYZ');

    s.camZ += (s.tCamZ - s.camZ) * 0.06;
    camera.position.set(0, 0, s.camZ); camera.lookAt(0, 0, 0);

    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(tiles.map((t) => t.mesh), false).find((h) => h.point.z > 0);
    const h = hit ? hit.object.userData.i : -1;
    if (h !== s.hover) { s.hover = h; onHover && onHover(h >= 0 ? tiles[h].wi : -1); canvas.style.cursor = h >= 0 ? 'pointer' : ''; }

    // front-most tile (largest world z at its centre)
    let best = -1, bz = -1e9;
    tiles.forEach((tl, i) => {
      wp.set(Math.cos(tl.lat) * Math.sin(tl.lon), Math.sin(tl.lat), Math.cos(tl.lat) * Math.cos(tl.lon)).applyEuler(globe.rotation);
      if (wp.z > bz) { bz = wp.z; best = i; }
    });
    if (best !== s.front) { s.front = best; onFront && onFront(tiles[best].wi); }

    const speed = Math.min(1, Math.abs(s.vy) * 18 + Math.abs(s.vp) * 14 + Math.abs(s.scrollT - s.scrollS) * 0.5);
    s.vel += (speed - s.vel) * 0.08;
    gm.opacity = 0.25 + s.vel * 0.5;
    tiles.forEach((tl, i) => {
      tl.u.uVel.value = s.vel; tl.u.uTime.value = t;
      const active = s.selected >= 0 ? i === s.selected : i === s.hover;
      tl.hover += ((active ? 1 : 0) - tl.hover) * 0.1;
      tl.color += ((active || (s.selected < 0 && s.hover < 0 && i === s.front) ? 1 : 0) - tl.color) * 0.07;
      tl.u.uHover.value = tl.hover; tl.u.uColor.value = tl.color;
      tl.u.uReady.value += ((tl.tx.loaded ? s.intro : 0) - tl.u.uReady.value) * 0.15;
    });
    renderer.render(scene, camera);
  });

  const api = {
    select(i) { s.selected = i; s.vy = 0; s.vp = 0; s.tCamZ = s.far > 14 ? 11 : 7.6; onSelect && onSelect(tiles[i].wi); },
    close() { s.selected = -1; s.tCamZ = s.far; onSelect && onSelect(-1); },
    nudge(dir) {
      if (s.selected >= 0) {
        const cur = tiles[s.selected];
        const row = tiles.map((t, i) => [t, i]).filter(([t]) => t.lat === cur.lat).sort((a, b) => a[0].lon - b[0].lon);
        const k = row.findIndex(([, i]) => i === s.selected);
        api.select(row[(k - dir + row.length) % row.length][1]);
      } else s.vy -= dir * 0.04;
    },
    selectFront() { if (s.front >= 0) api.select(s.front); },
    setScroll(p) { s.scrollT = -p * Math.PI * 1.3; },
    destroy() { stop(); ro.disconnect(); removeEventListener('pointermove', onMove); target.removeEventListener('pointerdown', onDown); target.removeEventListener('pointerup', onUp); target.removeEventListener('pointercancel', onCancel); renderer.dispose(); },
  };
  return api;
}

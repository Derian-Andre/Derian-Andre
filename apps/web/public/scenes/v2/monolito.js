import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';

// Shared helper: run a render loop only while the canvas is on screen and the tab is visible.
export function visibleLoop(canvas, frame) {
  let onScreen = true, raf = 0, alive = true;
  const tick = () => { if (!alive || !onScreen || document.hidden) return; raf = requestAnimationFrame(tick); frame(); };
  const kick = () => { cancelAnimationFrame(raf); tick(); };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) kick(); }, { rootMargin: '10% 0px' });
  io.observe(canvas);
  const onVis = () => kick();
  document.addEventListener('visibilitychange', onVis);
  kick();
  return () => { alive = false; cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
}

// Generative monolith. The glossy folded-A dissolves into ~1.5k pieces that become one of five
// forms where science, art and philosophy meet — then reassembles. Each reload advances one generation.
const LEFT = [[94, 0], [0, 200], [40.72, 186.77], [94, 73.93]];
const RIGHT = [[100.26, 0], [100.26, 74.71], [139.42, 155.64], [70.48, 177.43], [195, 200]];
const toV = ([x, y]) => new THREE.Vector2((x - 97.5) / 50, -(y - 100) / 50);
const DEPTH = 0.55, STEP = 0.1, LAYERS = 3;

export const GENERATIONS = [
  { name: 'Orbital cuántico 3d', idea: 'Incertidumbre' },
  { name: 'Filotaxis áurea', idea: 'El número de Dios' },
  { name: 'Doble hélice', idea: 'El código del ser' },
  { name: 'Banda de Möbius', idea: 'Dualidad' },
  { name: 'Red neuronal', idea: 'Conciencia' },
];

function rnd(seed) { let s = Math.floor(seed * 2147483646) + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function extrude(pts) {
  const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(toV)), { depth: DEPTH, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.035, bevelSegments: 4, curveSegments: 1 });
  g.translate(0, 0, -DEPTH / 2); g.computeVertexNormals(); return g;
}
function voxelize() {
  const W = 390, H = 400, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); g.fillStyle = '#fff';
  for (const poly of [LEFT, RIGHT]) { g.beginPath(); poly.forEach(([x, y], i) => (i ? g.lineTo : g.moveTo).call(g, x * 2, y * 2)); g.closePath(); g.fill(); }
  const d = g.getImageData(0, 0, W, H).data, out = [], px = STEP * 100;
  for (let y = px / 2; y < H; y += px) for (let x = px / 2; x < W; x += px) {
    if (d[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] < 128) continue;
    for (let l = 0; l < LAYERS; l++) out.push([(x / 2 - 97.5) / 50, -(y / 2 - 100) / 50, ((l + 0.5) / LAYERS - 0.5) * DEPTH, l]);
  }
  return out;
}
function lorenzPath(n) {
  let x = 0.1, y = 0, z = 0; const out = []; const dt = 0.006;
  for (let i = 0; i < 400; i++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z; x += dx * dt; y += dy * dt; z += dz * dt; }
  for (let i = 0; i < n; i++) { for (let k = 0; k < 2; k++) { const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z; x += dx * dt; y += dy * dt; z += dz * dt; } out.push([x / 10.5, (z - 25) / 10.5, y / 10.5]); }
  return out;
}

const Yv = new THREE.Vector3(0, 1, 0), Zv = new THREE.Vector3(0, 0, 1);
function pieceKit(gen, size) {
  const M = (o) => new THREE.MeshPhysicalMaterial(Object.assign({ color: 0xd0d6e2, metalness: 0.2, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 }, o));
  if (gen === 0) return { geo: new THREE.SphereGeometry(size * 0.5, 12, 8), mat: M({ color: 0xe6eaf2, roughness: 0.1, clearcoatRoughness: 0.05, sheen: 1, sheenColor: new THREE.Color(0x9fb4d8) }), axis: null };
  if (gen === 1) return { geo: new THREE.CylinderGeometry(size * 0.58, size * 0.5, size * 0.2, 18), mat: M({ color: 0xdfe4ee, metalness: 0.45, roughness: 0.2 }), axis: Zv };
  if (gen === 2) return { geo: new THREE.CylinderGeometry(size * 0.15, size * 0.15, size * 3, 8), mat: M({ color: 0xd2d8e4, metalness: 0.5, roughness: 0.22 }), axis: Zv };
  if (gen === 3) return { geo: new THREE.BoxGeometry(size * 1.05, size * 0.14, size * 1.05), mat: M({ color: 0xe4e8f0, metalness: 0.6, roughness: 0.16, clearcoatRoughness: 0.05 }), axis: Zv };
  return { geo: new THREE.SphereGeometry(size * 0.5, 14, 10), mat: M({ color: 0xe2e7f0, metalness: 0.3, roughness: 0.12, clearcoatRoughness: 0.04 }), axis: null };
}

// destination: position, orientation direction (for oriented pieces), size factor, sort key
function targets(gen, home, r) {
  const n = home.length, T = [];
  if (gen === 0) {
    // |ψ|² of the hydrogen 3d(z²) orbital: ψ ∝ r² e^(−r/3) (3cos²θ − 1), rejection-sampled
    const S = 2.3 / 15;
    while (T.length < n) {
      const x = (r() - 0.5) * 32, y = (r() - 0.5) * 32, z = (r() - 0.5) * 32, rr = Math.hypot(x, y, z) || 1e-3;
      const c = y / rr, psi = rr * rr * Math.exp(-rr / 3) * (3 * c * c - 1), p = psi * psi / 95;
      if (r() < p) T.push({ p: [x * S, y * S, z * S], s: 0.55 + Math.min(1, p) * 0.9, key: -y });
    }
  } else if (gen === 1) {
    // Vogel's model of the sunflower: angle = i·137.508°, radius ∝ √i
    const GA = Math.PI * (3 - Math.sqrt(5)), R = 2.5;
    for (let i = 0; i < n; i++) {
      const rr = R * Math.sqrt((i + 0.5) / n), a = i * GA, x = Math.cos(a) * rr, y = Math.sin(a) * rr, z = -rr * rr * 0.12;
      T.push({ p: [x, y, z], dir: new THREE.Vector3(-x * 0.25, -y * 0.25, 1).normalize(), s: 0.45 + (rr / R) * 1.15, key: i });
    }
  } else if (gen === 2) {
    // B-DNA: two antiparallel strands + base-pair rungs
    const turns = 3.2, H = 5.4, R = 0.95;
    for (let i = 0; i < n; i++) {
      const u = i / n, kind = i % 10;
      if (kind < 7) {
        const strand = i % 2, a = u * Math.PI * 2 * turns + strand * Math.PI, y = (u - 0.5) * H;
        const tx = -Math.sin(a), tz = Math.cos(a);
        T.push({ p: [Math.cos(a) * R, y, Math.sin(a) * R], dir: new THREE.Vector3(tx, H / (Math.PI * 2 * turns * R) * 0.9, tz).normalize(), s: 0.7 + r() * 0.3, key: u });
      } else {
        const a = u * Math.PI * 2 * turns, y = (u - 0.5) * H, f = (kind - 7 + 0.5) / 3 * 2 - 1;
        T.push({ p: [Math.cos(a) * R * f, y, Math.sin(a) * R * f], dir: new THREE.Vector3(Math.cos(a), 0, Math.sin(a)), s: 0.6, key: u });
      }
    }
  } else if (gen === 3) {
    // one-sided surface: tiles laid on a Möbius band, v across the width, u along it
    const NV = 7, NU = Math.ceil(n / NV);
    for (let i = 0; i < n; i++) T.push({ u: (Math.floor(i / NV) + 0.5) / NU, v: ((i % NV) / (NV - 1) - 0.5) * 2, s: 1, key: i });
  } else {
    // a small artificial neural network: layers of neurons, synapses carrying signal pulses
    const sizes = [3, 4, 5, 4, 3], nodes = [];
    sizes.forEach((g, li) => {
      for (let a = 0; a < g; a++) for (let b = 0; b < g; b++)
        nodes.push({ li, p: [(li / (sizes.length - 1) - 0.5) * 5, (a / (g - 1) - 0.5) * (g * 0.62), (b / (g - 1) - 0.5) * (g * 0.62)] });
    });
    const edges = [];
    nodes.forEach((a) => nodes.forEach((b) => { if (b.li === a.li + 1) edges.push([a.p, b.p, r()]); }));
    nodes.forEach((nd, i) => T.push({ p: nd.p, s: 2.1, key: nd.p[0] * 10 + i * 0.001, node: i }));
    for (let i = nodes.length; i < n; i++) {
      const e = edges[Math.floor(r() * edges.length)], tt = r();
      T.push({ p: [e[0][0] + (e[1][0] - e[0][0]) * tt, e[0][1] + (e[1][1] - e[0][1]) * tt, e[0][2] + (e[1][2] - e[0][2]) * tt], s: 0.32, key: e[0][0] * 10 + tt * 12, tt, es: e[2], li: e[0][0] });
    }
  }
  return T;
}

export function mount(canvas, { target = window, reduced = false, onGen, gen: forced = null } = {}) {
  let gen = 0;
  if (forced != null && forced >= 0) gen = forced % GENERATIONS.length;
  else { try { gen = (Number(localStorage.getItem('da-hero-gen') || -1) + 1) % GENERATIONS.length; localStorage.setItem('da-hero-gen', String(gen)); } catch (e) { gen = Math.floor(Math.random() * GENERATIONS.length); } }
  const r = rnd(Math.random());
  const G = GENERATIONS[gen];
  onGen && onGen(gen, G.name + ' · ' + G.idea);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100); camera.position.set(0, 0, 11);
  scene.add(new THREE.AmbientLight(0xc8d0e0, 0.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fb4d8, 3.2); rim.position.set(-6, -2, -5); scene.add(rim);
  const cursorLight = new THREE.PointLight(0xffffff, 26, 14, 1.6); scene.add(cursorLight);

  const root = new THREE.Group(); scene.add(root);
  const solidMat = new THREE.MeshPhysicalMaterial({ color: 0xd9dee8, metalness: 0.15, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.18, transparent: true });
  const solidMatR = solidMat.clone(); solidMatR.color = new THREE.Color(0xc4cad6);
  const solid = new THREE.Group(); solid.add(new THREE.Mesh(extrude(LEFT), solidMat), new THREE.Mesh(extrude(RIGHT), solidMatR)); root.add(solid);

  const home = voxelize(), N = home.length;
  const T = targets(gen, home, r);
  // pair pieces with destinations so neighbours travel together (top of the A → start of the form)
  const hsort = home.map((p, i) => [p[1] * 10 - p[0], i]).sort((a, b) => b[0] - a[0]).map((x) => x[1]);
  const tsort = T.map((t, i) => [t.key, i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  const dest = new Array(N);
  hsort.forEach((hi, k) => (dest[hi] = T[tsort[k]]));
  const rank = new Int32Array(N); hsort.forEach((hi, k) => (rank[hi] = k));
  const delay = home.map((p, i) => (rank[i] / N) * 0.4 + r() * 0.06);
  const SPAN = 1 - 0.46;
  const spinAxis = home.map(() => new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize());
  const jitter = home.map(() => [r() * 6.28, r() * 6.28, r() * 6.28]);

  const size = STEP * 0.9, kit = pieceKit(gen, size);
  const vox = new THREE.InstancedMesh(kit.geo, kit.mat, N);
  vox.instanceMatrix.setUsage(THREE.DynamicDrawUsage); root.add(vox);
  const homeQ = home.map(() => (kit.axis ? new THREE.Quaternion().setFromUnitVectors(Yv, kit.axis) : new THREE.Quaternion()));
  const destQ = dest.map((d, i) => (d.dir ? new THREE.Quaternion().setFromUnitVectors(Yv, d.dir) : new THREE.Quaternion().setFromAxisAngle(spinAxis[i], r() * 6.28)));
  const MR = 1.85, MW = 0.72;
  const mobius = (u, v, out, nrm) => {
    const a = u * Math.PI * 2, h = a / 2, w = v * MW, rr = MR + w * Math.cos(h);
    out[0] = rr * Math.cos(a); out[1] = w * Math.sin(h); out[2] = rr * Math.sin(a);
    // normal = dP/du × dP/dv
    const du = [-rr * Math.sin(a) - w * 0.5 * Math.sin(h) * Math.cos(a), w * 0.5 * Math.cos(h), rr * Math.cos(a) - w * 0.5 * Math.sin(h) * Math.sin(a)];
    const dv = [Math.cos(h) * Math.cos(a), Math.sin(h), Math.cos(h) * Math.sin(a)];
    nrm.set(du[1] * dv[2] - du[2] * dv[1], du[2] * dv[0] - du[0] * dv[2], du[0] * dv[1] - du[1] * dv[0]).normalize();
  };
  const mp = [0, 0, 0];

  const s = { mx: 0, my: 0, tmx: 0, tmy: 0, drag: false, lx: 0, ly: 0, rotY: 0.35, rotX: -0.08, vY: 0, vX: 0, p: 0, sp: 0, m: 0, mT: 0, next: performance.now() + 3200 };
  const blocked = (e) => e.target.closest && e.target.closest('a,button,input,[data-nodrag]');
  const onMove = (e) => {
    s.tmx = (e.clientX / innerWidth) * 2 - 1; s.tmy = -(e.clientY / innerHeight) * 2 + 1;
    if (s.drag) { s.vY = (e.clientX - s.lx) * 0.008; s.vX = (e.clientY - s.ly) * 0.006; s.lx = e.clientX; s.ly = e.clientY; }
  };
  const onDown = (e) => { if (blocked(e)) return; s.drag = true; s.downX = s.lx = e.clientX; s.downY = s.ly = e.clientY; };
  const onUp = (e) => { if (!s.drag) return; s.drag = false; if (Math.hypot(e.clientX - s.downX, e.clientY - s.downY) < 5) burst(); };
  addEventListener('pointermove', onMove, { passive: true }); target.addEventListener('pointerdown', onDown); addEventListener('pointerup', onUp);
  function burst() { s.mT = s.mT > 0.5 ? 0 : 1; s.next = performance.now() + 7500; }

  const resize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), q2 = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3(), tv = new THREE.Vector3();
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const smooth = (x) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
  const t0 = performance.now(); let last = t0, spin = 0;
  const stop = visibleLoop(canvas, () => {
    const now = performance.now(), t = (now - t0) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now;
    s.mx += (s.tmx - s.mx) * 0.06; s.my += (s.tmy - s.my) * 0.06; s.sp += (s.p - s.sp) * 0.08;
    s.rotY += s.vY; s.rotX += s.vX; s.vY *= 0.93; s.vX *= 0.9;
    if (!s.drag) s.rotX += (-0.08 - s.rotX) * 0.02;
    if (!reduced && now > s.next) { s.mT = s.mT > 0.5 ? 0 : 1; s.next = now + (s.mT ? 7000 : 4200); }
    if (!reduced) { const d = s.mT - s.m; s.m += Math.sign(d) * Math.min(Math.abs(d), 0.0068); }
    const m = Math.min(1, s.m + s.sp * 0.9);

    const X = smooth(m / 0.16), solidA = 1 - X;
    solidMat.opacity = solidMatR.opacity = solidA; solid.visible = solidA > 0.005;
    solidMat.transparent = solidMatR.transparent = solidA < 0.999;
    solid.scale.setScalar(1 - X * 0.04);
    const grow = 0.55 + X * 0.45;
    vox.visible = X > 0.005;

    if (vox.visible) for (let i = 0; i < N; i++) {
      const k = ease(Math.max(0, Math.min(1, (m - delay[i]) / SPAN)));
      const h = home[i], d = dest[i];
      let dx, dy, dz, sy = 1;
      if (gen === 3) {
        // tiles glide along the band: after one lap they return upside-down — inside and outside are one side
        mobius((d.u + (reduced ? 0 : t * 0.025)) % 1, d.v, mp, tv);
        dx = mp[0]; dy = mp[1]; dz = mp[2];
        destQ[i].setFromUnitVectors(Yv, tv);
      } else {
        [dx, dy, dz] = d.p;
        if (gen === 0 && !reduced) { const jt = jitter[i], a = 0.05 * k; dx += Math.sin(t * 7 + jt[0]) * a; dy += Math.sin(t * 6.3 + jt[1]) * a; dz += Math.sin(t * 5.7 + jt[2]) * a; }
        if (gen === 4 && !reduced) {
          // signals travel left → right through the layers; beads swell as a pulse passes
          if (d.tt != null) { const ph = (((d.tt - t * 0.55 - d.es) % 1) + 1) % 1; sy = 1 + (ph < 0.14 ? (1 - ph / 0.14) * 3.2 : 0) * k; }
          else sy = 1 + Math.max(0, Math.sin(t * 2.2 - dx * 1.1 + d.node)) * 0.35 * k;
        }
      }
      const arc = Math.sin(k * Math.PI) * 0.6;
      pos.set(h[0] + (dx - h[0]) * k, h[1] + (dy - h[1]) * k + arc * (h[1] > 0 ? 0.3 : -0.3), h[2] + (dz - h[2]) * k + arc);
      q.slerpQuaternions(homeQ[i], destQ[i], k);
      q2.setFromAxisAngle(spinAxis[i], Math.sin(k * Math.PI) * Math.PI * (1 + (i % 2))); q.multiply(q2);
      if (gen === 1 && !reduced) { q2.setFromAxisAngle(Yv, Math.sin(t * 0.8 + rank[i] * 0.002) * 0.25 * k); q.premultiply(q2); }
      const v = 1 + (d.s - 1) * k;
      scl.setScalar(v * sy);
      scl.multiplyScalar(grow * X);
      m4.compose(pos, q, scl); vox.setMatrixAt(i, m4);
    }
    if (vox.visible) vox.instanceMatrix.needsUpdate = true;

    const wide = camera.aspect > 1.1;
    if (!reduced) spin += dt * (0.1 + m * (gen === 1 ? 0.05 : 0.15));
    const tilt = gen === 4 ? m * 0.2 : gen === 1 ? -m * 0.15 : gen === 3 ? m * 0.45 : 0;
    root.rotation.set(s.rotX - s.my * 0.25 + tilt, s.rotY + s.mx * 0.45 + (gen === 1 ? spin * 0.3 : gen === 4 ? Math.sin(spin * 0.6) * 0.7 : spin), 0);
    root.position.set(0, wide ? 0.35 + s.sp * 0.9 : 1.1 + s.sp, 0);
    root.scale.setScalar((wide ? 1.12 : 0.74) * (1 - m * 0.1));
    cursorLight.position.set(s.mx * 5, s.my * 3.5, 3.5);
    renderer.render(scene, camera);
  });
  return {
    gen, name: G.name,
    setScroll(p) { s.p = Math.max(0, Math.min(1, p)); },
    burst,
    destroy() { stop(); ro.disconnect(); removeEventListener('pointermove', onMove); target.removeEventListener('pointerdown', onDown); removeEventListener('pointerup', onUp); renderer.dispose(); },
  };
}

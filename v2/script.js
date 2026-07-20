// imnotbink — vinyl turntable + crate. One shared audio player.
// Catalog: the Desktop "for sell type shit" exports. Credit format is
// always "prod. imnotbink" first, collabs joined with ×.

const BEATS = [
  { file: "beats/ender.mp3",            title: "ender",            meta: "155 BPM · E min",  prod: ["imnotbink", "schell"] },
  { file: "beats/spaz.mp3",             title: "spaz",             meta: "126 BPM · E maj",  prod: ["imnotbink"] },
  { file: "beats/hairbrush.mp3",        title: "hairbrush",        meta: "141 BPM · D♯ min", prod: ["imnotbink", "schell", "dxnieldior"] },
  { file: "beats/jukuri.mp3",           title: "jukuri",           meta: "174 BPM · A min",  prod: ["imnotbink", "zouni"] },
  { file: "beats/popit.mp3",            title: "popit",            meta: "",                 prod: ["imnotbink"] },
  { file: "beats/relentless-hope.mp3",  title: "relentless hope",  meta: "",                 prod: ["imnotbink", "schell"] },
  { file: "beats/umbrae-loquuntur.mp3", title: "umbrae loquuntur", meta: "",                 prod: ["imnotbink"] },
  { file: "beats/boomerang.mp3",        title: "boomerang",        meta: "140 BPM · F♯ min", prod: ["imnotbink"] },
  { file: "beats/coupe.mp3",            title: "coupe",            meta: "",                 prod: ["imnotbink"] },
  { file: "beats/digital-runner.mp3",   title: "digital runner",   meta: "",                 prod: ["imnotbink"] },
  { file: "beats/grail.mp3",            title: "grail",            meta: "",                 prod: ["imnotbink"] },
  { file: "beats/tethered.mp3",         title: "tethered",         meta: "148 BPM · A maj",  prod: ["imnotbink", "rioleyva", "vendr"] },
  { file: "beats/in-elsewhere.mp3",     title: "in elsewhere",     meta: "152 BPM",          prod: ["imnotbink", "praizewa"] },
  { file: "beats/natural.mp3",          title: "natural",          meta: "",                 prod: ["imnotbink"] },
  { file: "beats/pretty.mp3",           title: "pretty",           meta: "",                 prod: ["imnotbink"] },
  { file: "beats/run-run.mp3",          title: "run run",          meta: "140 BPM",          prod: ["imnotbink", "praizewa"] },
  { file: "beats/silver.mp3",           title: "silver",           meta: "147 BPM · A maj",  prod: ["imnotbink"] },
  { file: "beats/stampede.mp3",         title: "stampede",         meta: "",                 prod: ["imnotbink"] },
  { file: "beats/timetraveler.m4a",     title: "timetraveler",     meta: "140 BPM · A maj",  prod: ["imnotbink"] },
];

const PRICE = 30;
const EMAIL = "tylerschrimper@gmail.com";
const credit = (b) => "prod. " + b.prod.join(" × ");

// ---------- generative label art (record-sleeve palettes) ----------

const PALETTES = [
  ["#1c1a2e", "#e8a33d", "#f2ede4"], ["#0f2e2b", "#7fc8a9", "#f2ede4"],
  ["#2e1220", "#e05e4e", "#f4d8c5"], ["#14213d", "#90b4d8", "#fca311"],
  ["#262019", "#c9ada7", "#e8d5b5"], ["#101418", "#5a7d9a", "#dbe4ee"],
  ["#332a1e", "#d9ae61", "#f0e6d2"], ["#1e1e24", "#9d8cd6", "#eae6f5"],
  ["#0d2818", "#4e9f3d", "#e8f0e2"], ["#2b0f0f", "#c94f4f", "#f0dcd2"],
  ["#131c26", "#3fa7a3", "#e6f2f0"],
];

function motif(i, [, fg, hi]) {
  const shapes = [
    `<circle cx="200" cy="200" r="150" fill="none" stroke="${fg}" stroke-width="8"/><circle cx="200" cy="200" r="110" fill="none" stroke="${hi}" stroke-width="4"/>`,
    `${[0, 60, 120].map(a => `<g transform="rotate(${a} 200 200)"><ellipse cx="200" cy="200" rx="160" ry="60" fill="none" stroke="${fg}" stroke-width="4"/></g>`).join("")}`,
    `${[0, 45, 90, 135].map(a => `<rect x="188" y="40" width="24" height="90" rx="12" transform="rotate(${a} 200 200)" fill="${fg}"/><rect x="188" y="270" width="24" height="90" rx="12" transform="rotate(${a} 200 200)" fill="${hi}"/>`).join("")}`,
    `<path d="M 40 200 Q 120 120 200 200 T 360 200" fill="none" stroke="${fg}" stroke-width="10" stroke-linecap="round"/><path d="M 40 250 Q 120 170 200 250 T 360 250" fill="none" stroke="${hi}" stroke-width="6" stroke-linecap="round"/>`,
    `${[0, 1, 2, 3, 4, 5, 6, 7].map(j => `<circle cx="${200 + 150 * Math.cos(j * Math.PI / 4)}" cy="${200 + 150 * Math.sin(j * Math.PI / 4)}" r="${10 + (j % 3) * 6}" fill="${j % 2 ? fg : hi}"/>`).join("")}`,
  ];
  return shapes[i % shapes.length];
}

// Sleeve: square cover, same palette/motif as the vinyl label.
// Consistent format: title bottom-left serif, credit line under it.
function sleeveSVG(beat, i) {
  const pal = PALETTES[i % PALETTES.length];
  const t = beat.title;
  const size = Math.min(38, 330 / Math.max(1, t.length) * 2.2);
  // NOTE: no feTurbulence grain here — rasterizing noise in ~60 sleeves
  // was a real scroll-lag source. The vignette carries the depth.
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t} sleeve">
    <defs>
      <radialGradient id="vig${i}" cx="50%" cy="42%" r="75%">
        <stop offset="60%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.32"/>
      </radialGradient>
    </defs>
    <rect width="400" height="400" fill="${pal[0]}"/>
    <g opacity="0.9" transform="translate(0,-30)">${motif(i, pal)}</g>
    <text x="26" y="330" font-family="Fraunces, Georgia, serif" font-size="${size}" fill="${pal[2]}">${t}</text>
    <text x="26" y="358" font-family="Inter, sans-serif" font-size="13" letter-spacing="1" fill="${pal[2]}" opacity="0.75">${credit(beat)}</text>
    ${credit(beat).length <= 26 ? `<text x="374" y="358" text-anchor="end" font-family="Inter, sans-serif" font-size="10" letter-spacing="2" fill="${pal[2]}" opacity="0.45">IMNOTBINK · ${beat.year || 2026}</text>` : ""}
    <rect width="400" height="400" fill="url(#vig${i})"/>
  </svg>`;
}

// Label: title + credit in one consistent layout, hole kept clear.
function labelSVG(beat, i) {
  const pal = PALETTES[i % PALETTES.length];
  const t = beat.title;
  const size = Math.min(40, 300 / Math.max(1, t.length) * 2.4);
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t} record label">
    <rect width="400" height="400" fill="${pal[0]}"/>
    <g opacity="0.28">${motif(i, pal)}</g>
    <circle cx="200" cy="200" r="192" fill="none" stroke="${pal[2]}" stroke-width="2" opacity="0.5"/>
    <text x="200" y="130" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="${size}" fill="${pal[2]}">${t}</text>
    <text x="200" y="292" text-anchor="middle" font-family="Inter, sans-serif" font-size="17" letter-spacing="1" fill="${pal[2]}" opacity="0.85">${credit(beat)}</text>
    <text x="200" y="330" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" letter-spacing="3" fill="${pal[2]}" opacity="0.5">IMNOTBINK · ${beat.year || 2026}</text>
  </svg>`;
}

// ---------- turntable + crate ----------

const vinyl = document.getElementById("vinyl");
const platter = document.getElementById("platter");
const vinylLabel = document.getElementById("vinylLabel");
const nowTitle = document.getElementById("nowTitle");
const nowCredit = document.getElementById("nowCredit");
const nowBuy = document.getElementById("nowBuy");
const nowPrice = document.getElementById("nowPrice");
const nowBuyLink = document.getElementById("nowBuyLink");
const rack = document.getElementById("rack");
const audio = new Audio();
const bar = document.getElementById("playerBar");
const pbToggle = document.getElementById("pbToggle");
const pbTitle = document.getElementById("pbTitle");
const pbProgress = document.getElementById("pbProgress");
const pbTime = document.getElementById("pbTime");
let current = -1;

// ---------- virtualized rack ----------
// The catalog can run to hundreds of beats (all the 4★/5★ from the player).
// Rendering every 3D sleeve at once froze the browser, so the rack is
// windowed: sleeves are absolutely positioned at fixed slots, and only the
// ones near the viewport actually exist in the DOM (~25 at a time). Layout
// is deterministic from the index, so scroll math needs no measurement.

const mounted = new Map(); // beat index -> live element
let sleeveW = 0, step = 0; // px; recomputed on layout/resize

function buildSleeve(beat, i) {
  const el = document.createElement("div");
  el.className = "sleeve";
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", `Play ${beat.title}`);
  const pal = PALETTES[i % PALETTES.length];
  // hand-filed jitter, deterministic per card: lean, z-tilt, settle height
  el.style.setProperty("--lean", -63 + (((i * 4) % 9) - 4) + "deg");
  el.style.setProperty("--tilt", ((((i * 53) % 5) - 2) * 0.7).toFixed(1) + "deg");
  el.style.setProperty("--lift", (((i * 29) % 7) - 3) + "px");
  el.style.left = (i * step) + "px";
  // descending stack: with the fan leaning right-edge-forward, card i's spine
  // physically sits in front of card i+1 — paint it that way so spines show
  el.style.zIndex = String(9000 - i);
  el.innerHTML = `
    <div class="box">
      <div class="face front">${sleeveSVG(beat, i)}<div class="gloss"></div></div>
      <div class="face back" style="background:color-mix(in srgb, ${pal[0]} 60%, #0a0a0a)"></div>
      <div class="face spine" style="background:${pal[0]};color:${pal[2]}">${beat.title}</div>
      <div class="face top"></div>
      <div class="face bottom"></div>
    </div>
    <span class="sleeve-caption">${beat.title} · $${PRICE}</span>`;
  el.addEventListener("click", () => toggle(i));
  el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } });
  if (i === current) el.classList.add("playing");
  if (i === liftedIdx) el.classList.add("lifted");
  return el;
}

function layoutRack() {
  // clamp(220px, 25vw, 310px) mirrored in JS so slot math needs no reflow
  sleeveW = Math.max(220, Math.min(310, window.innerWidth * 0.25));
  const ratio = window.matchMedia("(max-width: 700px)").matches ? 0.58 : 0.44;
  step = sleeveW * ratio;
  const n = BEATS.length;
  rack.style.width = (n ? step * (n - 1) + sleeveW : 0) + "px";
  rack.style.height = sleeveW + "px";
  mounted.forEach((el, i) => { el.style.left = (i * step) + "px"; });
  virtualize();
}

function virtualize() {
  if (!step) return;
  const originX = rackWrap.scrollLeft - rack.offsetLeft;
  const buffer = rackWrap.clientWidth; // one screen of pre-render on each side
  const first = Math.max(0, Math.floor((originX - buffer) / step));
  const last = Math.min(BEATS.length - 1, Math.ceil((originX + rackWrap.clientWidth + buffer) / step));
  mounted.forEach((el, i) => {
    if (i < first || i > last) { el.remove(); mounted.delete(i); }
  });
  for (let i = first; i <= last; i++) {
    if (!mounted.has(i)) {
      const el = buildSleeve(BEATS[i], i);
      rack.appendChild(el);
      mounted.set(i, el);
    }
  }
}

// ---------- deck: rAF-driven platter, scratchable ----------

const REV_S = 1.8; // seconds per revolution (~33 rpm)
const speedLabel = document.getElementById("speedLabel");
const shuffleBtn = document.getElementById("shuffleBtn");
let angle = 0;
let scratching = false;
let rate = 1;
let shuffle = false;

// slowed = pitched down, like real vinyl
audio.preservesPitch = false;
if ("webkitPreservesPitch" in audio) audio.webkitPreservesPitch = false;

// Normal spin is a CSS keyframe animation (compositor-friendly); JS only
// drives the platter while scratching.
function currentVisualAngle() {
  const m = getComputedStyle(platter).transform;
  if (!m || m === "none") return 0;
  const [a, b] = m.slice(7, -1).split(",").map(Number);
  return (Math.atan2(b, a) * 180) / Math.PI;
}

function ptrAngle(e) {
  const r = vinyl.getBoundingClientRect();
  return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
}

let grab = null;
vinyl.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  try { vinyl.setPointerCapture(e.pointerId); } catch {}
  grab = { a: ptrAngle(e), t: performance.now(), moved: 0, wasPlaying: !audio.paused };
  scratching = true;
  angle = currentVisualAngle();
  vinyl.classList.add("scratching");
  platter.style.transform = `rotate(${angle}deg)`;
  if (grab.wasPlaying) audio.pause();
});
vinyl.addEventListener("pointermove", (e) => {
  if (!grab) return;
  let d = ptrAngle(e) - grab.a;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  grab.a = ptrAngle(e);
  grab.moved += Math.abs(d);
  angle += d;
  platter.style.transform = `rotate(${angle}deg)`;
  // spinning the record scrubs the audio: one revolution = one platter-second
  if (current >= 0) {
    const dur = duration();
    if (isFinite(dur)) {
      audio.currentTime = Math.min(Math.max(0, audio.currentTime + (d / 360) * REV_S * 4), dur - 0.05);
    }
  }
});
function release(e) {
  if (!grab) return;
  const quickTap = grab.moved < 8 && performance.now() - grab.t < 350;
  scratching = false;
  vinyl.classList.remove("scratching");
  platter.style.transform = "";
  if (quickTap) {
    // click = play/pause (audio was paused on pointerdown, so a tap while
    // playing just leaves it paused; a tap while paused starts it)
    if (current < 0) toggle(0);
    else if (!grab.wasPlaying) toggle(current);
  } else if (grab.wasPlaying) {
    audio.play();
  }
  grab = null;
  render();
}
vinyl.addEventListener("pointerup", release);
vinyl.addEventListener("pointercancel", release);

// ---------- speed + shuffle ----------

function setRate(r) {
  rate = Math.min(2, Math.max(0.5, Math.round(r * 4) / 4));
  audio.playbackRate = rate;
  platter.style.setProperty("--spin-dur", REV_S / rate + "s");
  speedLabel.textContent = rate.toFixed(2) + "×";
}
document.getElementById("speedDown").addEventListener("click", () => setRate(rate - 0.25));
document.getElementById("speedUp").addEventListener("click", () => setRate(rate + 0.25));

function randomIndex() {
  if (BEATS.length < 2) return 0;
  let i;
  do { i = Math.floor(Math.random() * BEATS.length); } while (i === current);
  return i;
}
shuffleBtn.addEventListener("click", () => {
  shuffle = !shuffle;
  shuffleBtn.setAttribute("aria-pressed", String(shuffle));
  if (shuffle) toggle(randomIndex());
});

// show the first record on the platter before anything plays
loadLabel(0);

function loadLabel(i) {
  vinylLabel.innerHTML = labelSVG(BEATS[i], i);
  // tint the pressing to match the beat's palette accent
  vinyl.style.setProperty("--tint", PALETTES[i % PALETTES.length][1]);
}

function toggle(i) {
  if (current === i && !audio.paused) {
    audio.pause();
  } else {
    if (current !== i) {
      current = i;
      audio.src = BEATS[i].file;
      audio.playbackRate = rate;
      loadLabel(i);
      loadWave(i);
      nowTitle.textContent = BEATS[i].title;
      nowCredit.textContent = credit(BEATS[i]) + (BEATS[i].meta ? " · " + BEATS[i].meta : "");
      nowPrice.textContent = "$" + PRICE + " lease";
      nowBuyLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Beat purchase: "${BEATS[i].title}" ($${PRICE} lease)`)}&body=${encodeURIComponent(`Hey Tyler, I want to buy the "${BEATS[i].title}" beat (${credit(BEATS[i])}).`)}`;
      nowBuy.hidden = false;
      pbTitle.textContent = BEATS[i].title;
      bar.hidden = false;
    }
    audio.play();
  }
  render();
}

function render() {
  const playing = !audio.paused;
  platter.classList.toggle("spinning", playing && !scratching);
  mounted.forEach((el, i) => el.classList.toggle("playing", i === current));
  document.querySelectorAll(".cat-row").forEach((row) =>
    row.classList.toggle("playing", Number(row.dataset.i) === current));
  pbToggle.textContent = playing ? "❚❚" : "▶";
}

function fmt(s) {
  if (!isFinite(s)) return "0:00";
  return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

function duration() {
  if (isFinite(audio.duration)) return audio.duration;
  return audio.seekable.length ? audio.seekable.end(audio.seekable.length - 1) : NaN;
}

audio.addEventListener("timeupdate", () => {
  const d = duration();
  pbProgress.style.width = isFinite(d) ? (audio.currentTime / d) * 100 + "%" : "0%";
  pbTime.textContent = isFinite(d) ? fmt(audio.currentTime) + " / " + fmt(d) : fmt(audio.currentTime);
});
audio.addEventListener("play", render);
audio.addEventListener("pause", render);
audio.addEventListener("ended", () => {
  // auto-advance: shuffle picks anything, otherwise next in the rack
  toggle(shuffle ? randomIndex() : (current + 1) % BEATS.length);
});

// ---------- waveform scrubber ----------
// Real decoded peaks per beat (cached). Everything is rAF-driven: the
// playhead reads the media clock every frame, and drag-seeks coalesce to
// one currentTime write per frame so the seek pipeline never clogs.

const waveWrap = document.getElementById("waveWrap");
const waveCanvas = document.getElementById("wave");
const waveHoverTime = document.getElementById("waveHoverTime");
const waveCtx = waveCanvas.getContext("2d");
const peaksCache = new Map();
let audioCtx = null;
let wavePeaks = null;   // Float32Array for the current beat
let waveAccent = "#f2ede4";
let waveToken = 0;      // stale-decode guard when hopping between beats
let hoverX = null;      // px within canvas, or null
let dragX = null;       // px while scrubbing, or null
let pendingSeek = null; // seconds, applied once per frame

const WAVE_BUCKETS = 480;

function computePeaks(buf) {
  const peaks = new Float32Array(WAVE_BUCKETS);
  const step = Math.floor(buf.length / WAVE_BUCKETS);
  for (let ch = 0; ch < buf.numberOfChannels; ch++) {
    const data = buf.getChannelData(ch);
    for (let b = 0; b < WAVE_BUCKETS; b++) {
      let max = 0;
      const start = b * step;
      // stride through the bucket — plenty of samples for a stable peak
      for (let s = start; s < start + step; s += 16) {
        const v = Math.abs(data[s]);
        if (v > max) max = v;
      }
      if (max > peaks[b]) peaks[b] = max;
    }
  }
  // normalize so quiet mixes still fill the lane
  let top = 0;
  for (const v of peaks) if (v > top) top = v;
  if (top > 0) for (let b = 0; b < WAVE_BUCKETS; b++) peaks[b] /= top;
  return peaks;
}

async function loadWave(i) {
  const token = ++waveToken;
  wavePeaks = null;
  waveAccent = PALETTES[i % PALETTES.length][1];
  waveWrap.hidden = false;
  sizeWave();
  if (!peaksCache.has(i)) {
    waveCanvas.classList.add("loading");
    try {
      const res = await fetch(BEATS[i].file);
      const raw = await res.arrayBuffer();
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      peaksCache.set(i, computePeaks(await audioCtx.decodeAudioData(raw)));
    } catch (e) {
      peaksCache.set(i, null); // undecodable: leave the lane empty, audio still plays
    }
  }
  if (token !== waveToken) return; // user already clicked another sleeve
  waveCanvas.classList.remove("loading");
  wavePeaks = peaksCache.get(i);
}

function sizeWave() {
  const r = waveWrap.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  if (!r.width) return;
  waveCanvas.width = Math.round(r.width * dpr);
  waveCanvas.height = Math.round(r.height * dpr);
}
new ResizeObserver(sizeWave).observe(waveWrap);

function drawWave() {
  requestAnimationFrame(drawWave);
  // one seek per frame, max — this is what keeps dragging silky
  if (pendingSeek !== null && audio.readyState >= 1) {
    audio.currentTime = pendingSeek;
    pendingSeek = null;
  }
  if (!wavePeaks || waveWrap.hidden) return;
  const w = waveCanvas.width, h = waveCanvas.height;
  if (!w) return;
  const dur = duration();
  // while dragging, the playhead follows the pointer immediately;
  // audio catches up a frame behind
  const frac = dragX !== null
    ? dragX / waveCanvas.clientWidth
    : (isFinite(dur) && dur > 0 ? audio.currentTime / dur : 0);
  waveCtx.clearRect(0, 0, w, h);
  const mid = h * 0.68; // top-weighted mirror, SoundCloud-style
  // crisp fixed-width bars; resample the peak buckets to fit
  // (480 buckets into a ~340px canvas = sub-pixel mush otherwise)
  const dpr = window.devicePixelRatio || 1;
  const barW = Math.max(2, Math.round(2 * dpr));
  const gapW = Math.max(1, Math.round(dpr));
  for (let x = 0; x < w; x += barW + gapW) {
    // peak = loudest bucket under this bar, so transients don't vanish
    const b0 = Math.floor((x / w) * WAVE_BUCKETS);
    const b1 = Math.min(WAVE_BUCKETS - 1, Math.floor(((x + barW) / w) * WAVE_BUCKETS));
    let p = 0.035;
    for (let b = b0; b <= b1; b++) if (wavePeaks[b] > p) p = wavePeaks[b];
    const played = (x + barW / 2) / w <= frac;
    waveCtx.fillStyle = played ? waveAccent : "#b9b2a4"; // solid — alpha bars vanish against the photo
    waveCtx.fillRect(x, mid - p * mid * 0.94, barW, Math.max(1.5, p * mid * 0.94));
    waveCtx.globalAlpha = 0.5;
    waveCtx.fillRect(x, mid + 2, barW, Math.max(1, p * (h - mid) * 0.9));
    waveCtx.globalAlpha = 1;
  }
  // hover ghost line
  if (hoverX !== null && dragX === null) {
    waveCtx.fillStyle = "rgba(242, 237, 228, 0.55)";
    waveCtx.fillRect(hoverX * (w / waveCanvas.clientWidth), 0, Math.max(1, window.devicePixelRatio || 1), h);
  }
}
requestAnimationFrame(drawWave);

function waveFrac(e) {
  const r = waveCanvas.getBoundingClientRect();
  return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
}

function waveSeek(e) {
  const dur = duration();
  const frac = waveFrac(e);
  dragX = frac * waveCanvas.clientWidth;
  if (isFinite(dur)) pendingSeek = Math.min(frac * dur, dur - 0.05);
  waveHoverTime.hidden = !isFinite(dur);
  if (isFinite(dur)) {
    waveHoverTime.textContent = fmt(frac * dur);
    waveHoverTime.style.left = dragX + "px";
  }
}

waveCanvas.addEventListener("pointerdown", (e) => {
  if (current < 0) return;
  e.preventDefault();
  try { waveCanvas.setPointerCapture(e.pointerId); } catch {}
  waveSeek(e);
});
waveCanvas.addEventListener("pointermove", (e) => {
  if (dragX !== null) {
    waveSeek(e);
  } else {
    hoverX = waveFrac(e) * waveCanvas.clientWidth;
    const dur = duration();
    waveHoverTime.hidden = !isFinite(dur) || current < 0;
    if (!waveHoverTime.hidden) {
      waveHoverTime.textContent = fmt(waveFrac(e) * dur);
      waveHoverTime.style.left = hoverX + "px";
    }
  }
});
function waveRelease() {
  dragX = null;
  waveHoverTime.hidden = hoverX === null;
}
waveCanvas.addEventListener("pointerup", waveRelease);
waveCanvas.addEventListener("pointercancel", waveRelease);
waveCanvas.addEventListener("pointerleave", () => {
  hoverX = null;
  if (dragX === null) waveHoverTime.hidden = true;
});

// ---------- catalog: discography rows (mirror of the rack) ----------

const catList = document.getElementById("catList");
const annoCount = document.getElementById("annoCount");

function renderCatalog() {
  catList.innerHTML = BEATS.map((b, i) => `
    <li>
      <button class="cat-row${i === current ? " playing" : ""}" data-i="${i}" type="button" aria-label="Play ${b.title}">
        <span class="cat-idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="cat-title">${b.title}</span>
        <span class="cat-meta">${credit(b)}${b.meta ? " · " + b.meta : ""}</span>
        <span class="cat-price">$${PRICE} lease</span>
      </button>
    </li>`).join("");
  if (annoCount) annoCount.textContent = `side a — ${BEATS.length} pressings`;
  const catFoot = document.getElementById("catFoot");
  if (catFoot) catFoot.innerHTML = `${BEATS.length} beats in the crate · scroll the list to dig · <a href="mailto:${EMAIL}?subject=${encodeURIComponent("Beats — let's talk")}">get in touch to license</a>`;
}
catList.addEventListener("click", (e) => {
  const row = e.target.closest(".cat-row");
  if (row) toggle(Number(row.dataset.i));
});

// ---------- rack scrolling: wheel + edge auto-scroll ----------
// The rack is a horizontal row, but people scroll vertically — translate
// the wheel for them (no shift-scrolling), and glide the row when the
// mouse drifts toward either edge, Foliom-style.

const rackWrap = document.querySelector(".rack-wrap");
rackWrap.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    rackWrap.scrollLeft += e.deltaY;
  }
}, { passive: false });

let rackPointer = null; // 0..1 across the rack, mouse only
rackWrap.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse") return; // touch keeps native swipe
  const r = rackWrap.getBoundingClientRect();
  rackPointer = (e.clientX - r.left) / r.width;
  pickLifted(e.clientX);
});
rackWrap.addEventListener("pointerleave", () => { rackPointer = null; setLifted(null); });
(function rackGlide() {
  requestAnimationFrame(rackGlide);
  if (rackPointer === null) return;
  const edge = 0.18; // outer edges only; dead zone in the middle so hovering to click stays still
  let v = 0;
  if (rackPointer < edge) v = -((edge - rackPointer) / edge);
  else if (rackPointer > 1 - edge) v = (rackPointer - (1 - edge)) / edge;
  if (v) rackWrap.scrollLeft += v * Math.abs(v) * 8; // eased ramp, ~8px/frame max
})();

// keep the window in sync with scroll (throttled to one pass per frame) + resize
let virtQueued = false;
rackWrap.addEventListener("scroll", () => {
  if (virtQueued) return;
  virtQueued = true;
  requestAnimationFrame(() => { virtQueued = false; virtualize(); });
}, { passive: true });
let resizeTimer;
addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(layoutRack, 120); });

// ---------- confident hover: JS picks ONE card and holds it ----------
// CSS :hover flickered in the overlap zones: lifting a card slides it out
// from under the cursor, the neighbor catches :hover, repeat forever.
// Instead the cursor's X picks the sleeve whose (static) layout slot it's
// in — with hysteresis, so it only lets go when you clearly cross over.

let liftedIdx = null;
function setLifted(idx) {
  if (liftedIdx === idx) return;
  if (liftedIdx !== null && mounted.has(liftedIdx)) mounted.get(liftedIdx).classList.remove("lifted");
  liftedIdx = idx;
  if (idx !== null && mounted.has(idx)) mounted.get(idx).classList.add("lifted");
}
const slotCenter = (i) => i * step + sleeveW / 2;
function pickLifted(clientX) {
  if (!step) return;
  // cursor X in the rack's own (unscrolled, untransformed) coordinates
  const x = clientX - rackWrap.getBoundingClientRect().left + rackWrap.scrollLeft - rack.offsetLeft;
  let best = Math.max(0, Math.min(BEATS.length - 1, Math.round((x - sleeveW / 2) / step)));
  // hold the current pick unless the new one is clearly closer (40px says
  // "I've moved on", not "I drifted a hair past the midpoint")
  if (liftedIdx !== null && best !== liftedIdx &&
      Math.abs(x - slotCenter(best)) > Math.abs(x - slotCenter(liftedIdx)) - 40) return;
  setLifted(best);
}
// keyboard focus lifts too (sleeves are tabbable buttons)
rack.addEventListener("focusin", (e) => {
  const s = e.target.closest(".sleeve");
  if (s) mounted.forEach((el, i) => { if (el === s) setLifted(i); });
});
rack.addEventListener("focusout", () => setLifted(null));

// first paint of the static catalog (live beats trigger their own relayout)
layoutRack();
renderCatalog();

// ---------- live 5★ catalog from the BeatPlayer app ----------
// The Windows BeatPlayer serves /api/beats with CORS open on GETs.
// Anything Tyler rates 5★ there shows up here automatically — streamed
// straight from the player via its stable per-file /audio/<key> URLs.

const LIVE_BASES = [
  "http://localhost:8422",                          // same PC
  "https://desktop-19v84r1-1.tailcca76a.ts.net",    // anywhere (Tailscale funnel)
];
let liveBase = localStorage.getItem("bp-base");
const liveKeys = new Set();
const liveNorms = new Set();
const normTitle = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
// snapshot of the hand-curated catalog, for dedupe
const staticNorms = BEATS.map((b) => normTitle(b.title));

// raw player titles look like "@imnotbink Spaz Emaj 126bpm" — clean them
// down to the beat name, mine BPM + key for the meta line, and turn any
// collaborator names buried in the title into proper credits
const KNOWN_COLLABS = {
  schell: "schell", dxnieldior: "dxnieldior", zouni: "zouni",
  praizewa: "praizewa", wa: "praizewa",
  rioleyva: "rioleyva", "rio leyva": "rioleyva", rio: "rioleyva",
  vendr: "vendr", dunc: "dunc", junkroll: "junkroll", jtxperc: "jtxperc",
  chaarlew: "chaarlew", kroam: "kroam", synthetic: "synthetic",
  tyler: null, // his own name, strip without crediting
};
function parseLiveTitle(raw) {
  let t = " " + raw.replace(/[<>&"]/g, " ").replace(/_/g, " ") + " ";
  const meta = [];
  const bpm = t.match(/\b(\d{2,3})\s*bpm\b|\bbpm\s*(\d{2,3})\b/i) || t.match(/\b(1[2-9]\d)\b/);
  if (bpm) meta.push((bpm[1] || bpm[2]) + " BPM");
  const key = t.match(/\b([A-G][#♯b♭]?)\s?(maj(?:or)?|min(?:or)?)\b/i);
  if (key) meta.push(key[1].toUpperCase().replace("B", "♭").replace("#", "♯") + " " + key[2].slice(0, 3).toLowerCase());
  const collabs = [];
  t = t
    .replace(/\[[^\]]*\]|\([^)]*\)/g, " ")             // [D# Eb Minor], (loop...)
    .replace(/@[\w.]+/g, " ")                          // @handles
    .replace(/\bprod\.?\b/gi, " ")
    .replace(/\b(\d{2,3})\s*bpm\b|\bbpm\s*(\d{2,3})\b/gi, " ")
    .replace(/\b[A-G][#♯b♭]?\s?(maj(?:or)?|min(?:or)?)\b/gi, " ")
    .replace(/\b\d{2,3}\b/g, " ")                      // stray tempo numbers
    .replace(/\bimnotbink\b/gi, " ");
  for (const name of Object.keys(KNOWN_COLLABS)) {
    const re = new RegExp("\\b" + name.replace(" ", "\\s+") + "\\b", "gi");
    if (re.test(t)) {
      t = t.replace(re, " ");
      const cred = KNOWN_COLLABS[name];
      if (cred && !collabs.includes(cred)) collabs.push(cred);
    }
  }
  t = t
    .replace(/\s+[x×]\s+/gi, " ")
    .replace(/[-,.;:+]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return {
    title: (t || raw.replace(/[<>&"]/g, " ").trim()).toLowerCase(),
    meta: meta.join(" · "),
    collabs,
  };
}

async function fetchLiveBeats() {
  const bases = liveBase ? [liveBase, ...LIVE_BASES.filter((b) => b !== liveBase)] : LIVE_BASES;
  for (const base of bases) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 4000);
      const res = await fetch(base + "/api/beats", { signal: ctl.signal });
      clearTimeout(timer);
      if (!res.ok) continue;
      const all = await res.json();
      liveBase = base;
      localStorage.setItem("bp-base", base);
      return all.filter((b) => b.r === 5 && b.c === "Beat");
    } catch (e) { /* player offline on this base — try the next */ }
  }
  return null;
}

function applyLive(fives) {
  if (!liveBase) return;
  let added = 0;
  // 5★ lead the live block, then 4★; newest exports first within each tier
  [...fives].sort((a, b) => (b.r - a.r) || (b.d || "").localeCompare(a.d || "")).forEach((b) => {
    if (liveKeys.has(b.k)) return;
    const n = normTitle(b.t);
    if (staticNorms.some((s) => n.includes(s) || s.includes(n))) return; // already in the curated rack
    const parsed = parseLiveTitle(b.t);
    // same beat can be 5★'d as two files (project export + old bounce) — one sleeve only
    if (liveNorms.has(normTitle(parsed.title))) return;
    liveKeys.add(b.k);
    liveNorms.add(normTitle(parsed.title));
    const cred = [...new Set(
      [...(b.w || []), ...parsed.collabs]
        .map((w) => KNOWN_COLLABS[w.toLowerCase()] !== undefined ? KNOWN_COLLABS[w.toLowerCase()] : w)
        .filter((w) => w && normTitle(w) !== "imnotbink")
    )];
    BEATS.push({
      file: liveBase + "/audio/" + b.k,
      title: parsed.title,
      meta: parsed.meta,
      prod: ["imnotbink", ...cred],
      year: parseInt((b.d || "").slice(0, 4), 10) || b.y,
      live: true,
    });
    added++;
  });
  // grow the rack's slot count + re-window; no per-beat DOM churn
  if (added) { layoutRack(); renderCatalog(); }
}

async function refreshLive() {
  const fives = await fetchLiveBeats();
  if (fives) {
    applyLive(fives);
    localStorage.setItem("bp-fives", JSON.stringify(fives));
  } else if (!liveKeys.size) {
    // player unreachable: fall back to the last catalog we saw
    try { applyLive(JSON.parse(localStorage.getItem("bp-fives") || "[]")); } catch (e) {}
  }
}
refreshLive();
setInterval(refreshLive, 60000); // newly 5-starred beats appear within a minute
document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshLive(); });

pbToggle.addEventListener("click", () => current >= 0 && toggle(current));
document.querySelector(".pb-track").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const d = duration();
  if (isFinite(d)) audio.currentTime = ((e.clientX - r.left) / r.width) * d;
});

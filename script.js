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
  { file: "beats/tethered.mp3",         title: "tethered",         meta: "148 BPM · A maj",  prod: ["imnotbink"] },
  { file: "beats/in-elsewhere.mp3",     title: "in elsewhere",     meta: "152 BPM",          prod: ["imnotbink", "wa"] },
  { file: "beats/natural.mp3",          title: "natural",          meta: "",                 prod: ["imnotbink"] },
  { file: "beats/pretty.mp3",           title: "pretty",           meta: "",                 prod: ["imnotbink"] },
  { file: "beats/run-run.mp3",          title: "run run",          meta: "140 BPM",          prod: ["imnotbink", "wa"] },
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
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t} sleeve">
    <rect width="400" height="400" fill="${pal[0]}"/>
    <g opacity="0.9" transform="translate(0,-30)">${motif(i, pal)}</g>
    <text x="26" y="330" font-family="Fraunces, Georgia, serif" font-size="${size}" fill="${pal[2]}">${t}</text>
    <text x="26" y="358" font-family="Inter, sans-serif" font-size="13" letter-spacing="1" fill="${pal[2]}" opacity="0.75">${credit(beat)}</text>
    ${credit(beat).length <= 26 ? `<text x="374" y="358" text-anchor="end" font-family="Inter, sans-serif" font-size="10" letter-spacing="2" fill="${pal[2]}" opacity="0.45">IMNOTBINK · 2026</text>` : ""}
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
    <text x="200" y="330" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" letter-spacing="3" fill="${pal[2]}" opacity="0.5">IMNOTBINK · 2026</text>
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

BEATS.forEach((beat, i) => {
  const el = document.createElement("div");
  el.className = "sleeve";
  el.setAttribute("role", "button");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", `Play ${beat.title}`);
  const pal = PALETTES[i % PALETTES.length];
  el.innerHTML = `${sleeveSVG(beat, i)}
    <div class="spine" style="background:${pal[0]};color:${pal[2]}">${beat.title}</div>
    <span class="sleeve-caption">${beat.title} · $${PRICE}</span>`;
  el.addEventListener("click", () => toggle(i));
  el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } });
  rack.appendChild(el);
});

const rows = [...rack.children];

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
  rows.forEach((r, i) => r.classList.toggle("playing", i === current));
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

// ---------- parallax photo behind the deck ----------

// CSS scroll-driven animation handles it natively where supported
if (!CSS.supports("animation-timeline: view()")) {
  const stage = document.querySelector(".beats-stage");
  const stageBg = document.querySelector(".stage-bg");
  const parallax = () => {
    const r = stage.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight + r.height);
    stageBg.style.transform = `translateY(${(-p * 110).toFixed(1)}px)`;
  };
  addEventListener("scroll", parallax, { passive: true });
  addEventListener("resize", parallax);
  parallax();
}

pbToggle.addEventListener("click", () => current >= 0 && toggle(current));
document.querySelector(".pb-track").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const d = duration();
  if (isFinite(d)) audio.currentTime = ((e.clientX - r.left) / r.width) * d;
});

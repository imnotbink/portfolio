// imnotbink beat shelf — generative album covers, one shared audio player

const BEATS = [
  { file: "beats/enjoy.mp3",        title: "enjoy",        meta: "warm · melodic",      price: 40 },
  { file: "beats/harmonix-pt2.mp3", title: "harmonix pt. 2", meta: "lush · continued",  price: 40 },
  { file: "beats/threesixty.mp3",   title: "threesixty",   meta: "spinning · trap",     price: 40 },
  { file: "beats/popstar.mp3",      title: "popstar",      meta: "143 BPM · melodic",   price: 30 },
  { file: "beats/coffee.mp3",       title: "coffee",       meta: "smooth · warm keys",  price: 25 },
  { file: "beats/coldness.mp3",     title: "coldness",     meta: "dark · atmospheric",  price: 25 },
  { file: "beats/cheerleader.mp3",  title: "cheerleader",  meta: "bouncy · club",       price: 30 },
  { file: "beats/transformer.mp3",  title: "transformer",  meta: "heavy · glitch",      price: 25 },
  { file: "beats/zigzag.mp3",       title: "zigzag",       meta: "off-kilter · trap",   price: 25 },
  { file: "beats/leopard.mp3",      title: "leopard",      meta: "aggressive · 808s",   price: 30 },
  { file: "beats/quarterback.mp3",  title: "quarterback",  meta: "hard-hitting · trap", price: 25 },
];

const EMAIL = "tylerschrimper@gmail.com";

// ---------- generative cover art ----------
// deterministic per beat: palette + geometric motif, minimal record-sleeve style

const PALETTES = [
  ["#1c1a2e", "#e8a33d", "#f2ede4"], // night / amber
  ["#0f2e2b", "#7fc8a9", "#f2ede4"], // deep green / sage
  ["#2e1220", "#e05e4e", "#f4d8c5"], // plum / coral
  ["#14213d", "#90b4d8", "#fca311"], // navy / sky / marigold
  ["#262019", "#c9ada7", "#e8d5b5"], // umber / clay
  ["#101418", "#5a7d9a", "#dbe4ee"], // slate / steel
  ["#332a1e", "#d9ae61", "#f0e6d2"], // bronze / sand
  ["#1e1e24", "#9d8cd6", "#eae6f5"], // charcoal / lilac
  ["#0d2818", "#4e9f3d", "#e8f0e2"], // forest
  ["#2b0f0f", "#c94f4f", "#f0dcd2"], // oxblood
  ["#131c26", "#3fa7a3", "#e6f2f0"], // teal night
];

function motif(i, [bg, fg, hi]) {
  const shapes = [
    // 0: sun over horizon lines
    `<circle cx="200" cy="150" r="80" fill="${fg}"/>
     ${[210, 235, 260, 285, 310].map(y => `<rect x="40" y="${y}" width="320" height="6" fill="${hi}" opacity="${1 - (y - 210) / 140}"/>`).join("")}`,
    // 1: concentric arcs
    `${[150, 115, 80, 45].map((r, j) => `<path d="M ${200 - r} 240 A ${r} ${r} 0 0 1 ${200 + r} 240" fill="none" stroke="${j % 2 ? fg : hi}" stroke-width="14"/>`).join("")}`,
    // 2: orbit rings
    `<circle cx="200" cy="200" r="130" fill="none" stroke="${fg}" stroke-width="2"/>
     <circle cx="200" cy="200" r="90" fill="none" stroke="${fg}" stroke-width="2"/>
     <circle cx="200" cy="200" r="50" fill="${hi}"/>
     <circle cx="290" cy="110" r="16" fill="${fg}"/>`,
    // 3: vertical bars, staggered
    `${[0, 1, 2, 3, 4, 5, 6].map(j => `<rect x="${52 + j * 44}" y="${100 + Math.abs(3 - j) * 30}" width="24" height="${220 - Math.abs(3 - j) * 40}" rx="12" fill="${j % 2 ? fg : hi}"/>`).join("")}`,
    // 4: crescent moon
    `<circle cx="200" cy="190" r="105" fill="${hi}"/>
     <circle cx="245" cy="160" r="95" fill="${bg}"/>
     <circle cx="120" cy="310" r="8" fill="${fg}"/><circle cx="300" cy="300" r="5" fill="${fg}"/><circle cx="80" cy="90" r="5" fill="${fg}"/>`,
    // 5: sine wave stack
    `${[140, 185, 230, 275].map((y, j) => `<path d="M 40 ${y} Q 120 ${y - 45} 200 ${y} T 360 ${y}" fill="none" stroke="${j % 2 ? fg : hi}" stroke-width="10" stroke-linecap="round"/>`).join("")}`,
    // 6: checker window
    `${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => (r + c) % 2 === 0 ? `<rect x="${100 + c * 50}" y="${100 + r * 50}" width="50" height="50" fill="${(r * 4 + c) % 3 ? fg : hi}"/>` : "").join("")).join("")}`,
    // 7: diagonal beams
    `<g transform="rotate(-30 200 200)">${[120, 170, 220, 270].map((y, j) => `<rect x="-60" y="${y}" width="520" height="22" fill="${j % 2 ? fg : hi}"/>`).join("")}</g>`,
    // 8: eclipse
    `<circle cx="200" cy="185" r="110" fill="${fg}"/>
     <circle cx="200" cy="185" r="110" fill="none" stroke="${hi}" stroke-width="3"/>
     <ellipse cx="200" cy="320" rx="140" ry="10" fill="${hi}" opacity="0.6"/>`,
    // 9: scattered dots grid
    `${[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4].map(c => `<circle cx="${90 + c * 55}" cy="${90 + r * 55}" r="${((r * 5 + c * 3 + i) % 4) * 4 + 5}" fill="${(r + c) % 2 ? fg : hi}"/>`).join("")).join("")}`,
    // 10: mountain cuts
    `<polygon points="40,320 160,120 240,240 300,150 360,320" fill="${fg}"/>
     <polygon points="140,320 250,180 360,320" fill="${hi}" opacity="0.85"/>
     <circle cx="105" cy="105" r="28" fill="${hi}"/>`,
  ];
  return shapes[i % shapes.length];
}

function coverSVG(beat, i) {
  const pal = PALETTES[i % PALETTES.length];
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${beat.title} cover art">
    <rect width="400" height="400" fill="${pal[0]}"/>
    ${motif(i, pal)}
    <text x="28" y="376" font-family="Fraunces, Georgia, serif" font-size="22" fill="${pal[2]}">${beat.title}</text>
    <text x="372" y="376" text-anchor="end" font-family="Inter, sans-serif" font-size="11" fill="${pal[2]}" opacity="0.7">imnotbink</text>
  </svg>`;
}

// ---------- shelf ----------

const shelf = document.getElementById("beatShelf");
const audio = new Audio();
const bar = document.getElementById("playerBar");
const pbToggle = document.getElementById("pbToggle");
const pbTitle = document.getElementById("pbTitle");
const pbProgress = document.getElementById("pbProgress");
const pbTime = document.getElementById("pbTime");
let current = -1;

BEATS.forEach((beat, i) => {
  const el = document.createElement("article");
  el.className = "beat";
  el.innerHTML = `
    <div class="cover" role="button" tabindex="0" aria-label="Play ${beat.title}">
      ${coverSVG(beat, i)}
      <div class="play-hint">▶</div>
    </div>
    <div class="beat-title">${beat.title}</div>
    <div class="beat-meta">${beat.meta}</div>
    <div class="beat-row">
      <span class="beat-price">$${beat.price}</span>
      <a class="beat-buy" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Beat purchase: "${beat.title}" ($${beat.price} lease)`)}&body=${encodeURIComponent(`Hey Tyler, I want to buy the "${beat.title}" beat.`)}">Buy</a>
    </div>`;
  const cover = el.querySelector(".cover");
  cover.addEventListener("click", () => toggle(i));
  cover.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } });
  shelf.appendChild(el);
});

const cards = [...shelf.children];

function toggle(i) {
  if (current === i && !audio.paused) {
    audio.pause();
  } else {
    if (current !== i) {
      current = i;
      audio.src = BEATS[i].file;
      pbTitle.textContent = BEATS[i].title;
      bar.hidden = false;
    }
    audio.play();
  }
  render();
}

function render() {
  const playing = !audio.paused;
  cards.forEach((c, i) => {
    c.classList.toggle("playing", i === current && playing);
    c.querySelector(".play-hint").textContent = i === current && playing ? "❚❚" : "▶";
  });
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
  // auto-advance to the next beat, radio style
  toggle((current + 1) % BEATS.length);
});

pbToggle.addEventListener("click", () => current >= 0 && toggle(current));
document.querySelector(".pb-track").addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const d = duration();
  if (isFinite(d)) audio.currentTime = ((e.clientX - r.left) / r.width) * d;
});

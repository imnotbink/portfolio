// imnotbink beat store — one shared audio player, cards + sticky bar

const BEATS = [
  { file: "beats/popstar.mp3",     title: "popstar",     meta: "143 BPM · melodic",   price: 30 },
  { file: "beats/coffee.mp3",      title: "coffee",      meta: "smooth · warm keys",  price: 25 },
  { file: "beats/coldness.mp3",    title: "coldness",    meta: "dark · atmospheric",  price: 25 },
  { file: "beats/cheerleader.mp3", title: "cheerleader", meta: "bouncy · club",       price: 30 },
  { file: "beats/transformer.mp3", title: "transformer", meta: "heavy · glitch",      price: 25 },
  { file: "beats/zigzag.mp3",      title: "zigzag",      meta: "off-kilter · trap",   price: 25 },
  { file: "beats/leopard.mp3",     title: "leopard",     meta: "aggressive · 808s",   price: 30 },
  { file: "beats/quarterback.mp3", title: "quarterback", meta: "hard-hitting · trap", price: 25 },
];

const EMAIL = "tylerschrimper@gmail.com";

const grid = document.getElementById("beatGrid");
const audio = new Audio();
const bar = document.getElementById("playerBar");
const pbToggle = document.getElementById("pbToggle");
const pbTitle = document.getElementById("pbTitle");
const pbProgress = document.getElementById("pbProgress");
const pbTime = document.getElementById("pbTime");
let current = -1;

BEATS.forEach((beat, i) => {
  const card = document.createElement("article");
  card.className = "beat-card";
  card.innerHTML = `
    <div class="beat-top">
      <button class="beat-play" aria-label="Play ${beat.title}">▶</button>
      <div>
        <div class="beat-title">${beat.title}</div>
        <div class="beat-meta">${beat.meta}</div>
      </div>
    </div>
    <div class="beat-bars">${'<i></i>'.repeat(24)}</div>
    <div class="beat-bottom">
      <span class="beat-price">$${beat.price}</span>
      <a class="btn beat-buy" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Beat purchase: "${beat.title}" ($${beat.price} lease)`)}&body=${encodeURIComponent(`Hey Tyler, I want to buy the "${beat.title}" beat.`)}">Buy</a>
    </div>`;

  // random-ish static bar heights so each card looks like a waveform
  card.querySelectorAll(".beat-bars i").forEach((el, j) => {
    el.style.height = 20 + Math.abs(Math.sin(i * 7 + j * 1.7)) * 80 + "%";
  });

  card.querySelector(".beat-play").addEventListener("click", () => toggle(i));
  grid.appendChild(card);
});

const cards = [...grid.children];

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
    c.querySelector(".beat-play").textContent = i === current && playing ? "❚❚" : "▶";
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

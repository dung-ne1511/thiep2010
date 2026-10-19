const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const message = document.getElementById("message");
const musicBtn = document.getElementById("musicBtn");
const musicNote = document.getElementById("musicNote");
const music = document.getElementById("music");
const petalsContainer = document.getElementById("petals");

let isOpen = false;
let isPlaying = false;

async function startMusic() {
  try {
    // Gọi play() sau thao tác của người dùng để tăng khả năng được trình duyệt cho phép.
    await music.play();
    isPlaying = true;
    musicBtn.textContent = "⏸ Tắt nhạc";
    musicBtn.setAttribute("aria-pressed", "true");
    musicNote.textContent = "Đang phát nhạc dành tặng mẹ ❤️";
    return true;
  } catch (error) {
    isPlaying = false;
    musicBtn.textContent = "🎵 Bật nhạc";
    musicBtn.setAttribute("aria-pressed", "false");
    musicNote.textContent = "Nếu nhạc chưa phát, hãy kiểm tra file assets/music/music.mp3 rồi nhấn nút Bật nhạc.";
    return false;
  }
}

function toggleLetter() {
  // Thử phát nhạc khi người xem nhấn mở thiệp; trình duyệt có thể vẫn yêu cầu nhấn nút Bật nhạc.
  if (!isPlaying) startMusic();
  isOpen = !isOpen;
  envelope.classList.toggle("open", isOpen);
  message.hidden = !isOpen;
  envelope.setAttribute("aria-expanded", String(isOpen));
  openBtn.textContent = isOpen ? "💗 Gấp lá thư lại" : "💌 Mở thư của con";

  if (isOpen) {
    createHearts();
    window.setTimeout(() => {
      message.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }
}

openBtn.addEventListener("click", toggleLetter);
envelope.addEventListener("click", toggleLetter);
envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleLetter();
  }
});

musicBtn.addEventListener("click", async () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicBtn.textContent = "🎵 Bật nhạc";
    musicBtn.setAttribute("aria-pressed", "false");
    musicNote.textContent = "Nhạc đã tạm dừng.";
  } else {
    await startMusic();
  }
});

// Thử tự phát khi tải trang. Nếu trình duyệt chặn, nhạc sẽ được thử lại khi người dùng chạm/click lần đầu.
window.addEventListener("load", () => {
  startMusic();
});

function addPetal(symbol, duration, size) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = symbol;
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = `${size}px`;
  petal.style.animationDuration = `${duration}s`;
  petalsContainer.appendChild(petal);
  window.setTimeout(() => petal.remove(), duration * 1000);
}

function createHearts() {
  const symbols = ["💗", "💕", "🌸", "❤️", "🌷"];
  for (let i = 0; i < 18; i++) {
    window.setTimeout(() => {
      addPetal(symbols[Math.floor(Math.random() * symbols.length)], 3 + Math.random() * 3, 14 + Math.random() * 18);
    }, i * 100);
  }
}

window.setInterval(() => {
  const flowers = ["🌸", "🌷", "💗"];
  addPetal(flowers[Math.floor(Math.random() * flowers.length)], 5 + Math.random() * 4, 12 + Math.random() * 12);
}, 850);

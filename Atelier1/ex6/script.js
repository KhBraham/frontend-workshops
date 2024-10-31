let revealedCards = [];
let score = 0;
let timer;
let timeLeft;

function startGame(level) {
  score = 0;
  document.getElementById("score").innerText = "Score: 0";
  shuffleCards();
  resetTimer(level);
  startTimer();
}

function shuffleCards() {
  const cards = document.querySelectorAll(".case img");
  const sources = Array.from(cards).map(img => img.src);
  for (let i = sources.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sources[i], sources[j]] = [sources[j], sources[i]];
  }
  cards.forEach((img, index) => {
    img.src = sources[index];
    img.style.visibility = "hidden";
  });
}

function revealCard(id) {
  const img = document.getElementById("img" + id);
  if (revealedCards.length < 2 && img.style.visibility === "hidden") {
    img.style.visibility = "visible";
    revealedCards.push(img);
    if (revealedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  if (revealedCards[0].src === revealedCards[1].src) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    revealedCards = [];
  } else {
    setTimeout(() => {
      revealedCards[0].style.visibility = "hidden";
      revealedCards[1].style.visibility = "hidden";
      revealedCards = [];
    }, 1000);
  }
}

function resetTimer(level) {
  clearInterval(timer);
  timeLeft = level === "facile" ? 60 : level === "moyen" ? 60 : 30;
  document.getElementById("timer").innerText = `Temps restant: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Temps restant: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Temps écoulé ! Votre score est: " + score);
      document.querySelectorAll(".case img").forEach(img => img.style.visibility = "hidden");
    }
  }, 1000);
}

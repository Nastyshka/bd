const showCake = () => {
  document.querySelector("#cake-holder").classList.add("done");
  document.getElementById("start").style.opacity = 0;
  startConfetti();
  playMusic("bdMusic");
  pp = document.getElementById("pp").style.opacity = 1;
};

function startConfetti() {
  const cf = document.querySelector("#candle2");
  burst_confetti(cf);
  setInterval(() => {
    burst_confetti(cf);
  }, 3000);
}

function burst_confetti(target) {
  const confettiContainer = document.getElementById("candle2");
  const buttonRect = target.getBoundingClientRect();
  const startX = buttonRect.left + buttonRect.width / 2;
  const startY = buttonRect.top + buttonRect.height / 2;

  createConfettiBurst(startX, startY, 100);
}

function createConfettiBurst(x, y, count) {
  for (let i = 0; i < count; i++) {
    createConfettiParticle(x, y);
  }
}

function createConfettiParticle(x, y) {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.backgroundColor = getRandomColor();
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  confettiContainer.appendChild(confetti);

  // Fireworks-like motion for confetti
  const duration = Math.random() * 2 + 2;
  const delay = Math.random() * 0.5;
  const burstAngle = Math.random() * Math.PI * 2;
  const burstVelocity = Math.random() * 250 + 250;
  const finalX = x + Math.cos(burstAngle) * burstVelocity;
  const finalY = y - Math.sin(burstAngle) * burstVelocity;

  const rotation = Math.random() * 720;

  constrainedFinalX = Math.max(0, Math.min(window.innerWidth, finalX));
  constrainedFinalY = Math.max(0, Math.min(window.innerHeight - 25, finalY));

  confetti.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      {
        transform: `translate(${constrainedFinalX - x}px, ${
          constrainedFinalY - y
        }px) rotate(${rotation}deg)`,
        opacity: 1,
        offset: 0.5,
      },
      {
        transform: `translate(${constrainedFinalX - x}px, ${Math.min(
          window.innerHeight - y - 25,
          constrainedFinalY
        )}px) rotate(${rotation * 2}deg)`,
        opacity: 0,
        // transform: `translate(${finalX - x}px, ${
        //   window.innerHeight
        // }px) rotate(${rotation * 2}deg)`,
        // opacity: 0,
      },
    ],
    {
      duration: duration * 1000,
      delay: delay * 1000,
      easing: "ease-out",
      iterations: 1,
      fill: "forwards",
    }
  );

  // Remove confetti from DOM after animation
  setTimeout(() => {
    confetti.remove();
  }, (duration + delay) * 1000);
}

function getRandomColor() {
  const colors = ["#FF5733", "#FFBD33", "#33FF57", "#3357FF", "#8D33FF"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function playMusic(name) {
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.pause();
  const audio = document.getElementById(name);
  audio.play();
}

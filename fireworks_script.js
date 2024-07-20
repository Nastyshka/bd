function burst_confetti(event) {
    const confettiContainer = document.getElementById('confettiContainer');
    const buttonRect = event.target.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;

    // Create initial burst from the button
    createConfettiBurst(startX, startY, 100);
}

    function createConfettiBurst(x, y, count) {
        for (let i = 0; i < count; i++) {
            createConfettiParticle(x, y);
        }
    }

    function createConfettiParticle(x, y) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confettiContainer.appendChild(confetti);

        // Fireworks-like motion for confetti
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        const burstAngle = Math.random() * Math.PI * 2;
        const burstVelocity = Math.random() * 300 + 300;
        const finalX = x + Math.cos(burstAngle) * burstVelocity;
        const finalY = y - Math.sin(burstAngle) * burstVelocity;

        const rotation = Math.random() * 720;

        confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${finalX - x}px, ${finalY - y}px) rotate(${rotation}deg)`, opacity: 1, offset: 0.5 },
            { transform: `translate(${finalX - x}px, ${window.innerHeight + 200}px) rotate(${rotation * 2}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'ease-out',
            iterations: 1,
            fill: 'forwards'
        });

        // Remove confetti from DOM after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }

    function getRandomColor() {
        const colors = ['#FF5733', '#FFBD33', '#33FF57', '#3357FF', '#8D33FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


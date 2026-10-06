let ropePosition = 0;

let gameTime = 30;

let gameRunning = true;

let paused = false;

let player1Score = 0;
let player2Score = 0;

const rope = document.getElementById("rope");

const timer = document.getElementById("timer");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

const progress1 = document.getElementById("progress1");
const progress2 = document.getElementById("progress2");

const message = document.getElementById("message");

const pullLeft = document.getElementById("pullLeft");
const pullRight = document.getElementById("pullRight");

const restart = document.getElementById("restart");
const pause = document.getElementById("pause");

const winnerModal = document.getElementById("winnerModal");

const winnerText = document.getElementById("winnerText");

const winnerEmoji = document.getElementById("winnerEmoji");

const modalRestart =
    document.getElementById("modalRestart");


// Арканды жаңыртуу
function updateRope() {

    rope.style.transform =
        `translate(calc(-50% + ${ropePosition}px), -50%)`;

    let leftProgress =
        50 - (ropePosition / 4);

    let rightProgress =
        50 + (ropePosition / 4);

    leftProgress =
        Math.max(0, Math.min(100, leftProgress));

    rightProgress =
        Math.max(0, Math.min(100, rightProgress));

    progress1.style.width =
        leftProgress + "%";

    progress2.style.width =
        rightProgress + "%";

    checkWinner();
}


// 1-оюнчу тартат
function pullLeftPlayer() {

    if (!gameRunning || paused) return;

    ropePosition -= 12;

    player1Score++;

    score1.textContent =
        player1Score;

    message.textContent =
        "🔵 1-оюнчу арканды тартып жатат!";

    updateRope();

    pullSound();
}


// 2-оюнчу тартат
function pullRightPlayer() {

    if (!gameRunning || paused) return;

    ropePosition += 12;

    player2Score++;

    score2.textContent =
        player2Score;

    message.textContent =
        "🔴 2-оюнчу арканды тартып жатат!";

    updateRope();

    pullSound();
}


// Жеңүүчүнү текшерүү
function checkWinner() {

    if (ropePosition <= -180) {

        endGame(
            "🏆 1-ОЮНЧУ ЖЕҢДИ!",
            "🔵"
        );

    }

    if (ropePosition >= 180) {

        endGame(
            "🏆 2-ОЮНЧУ ЖЕҢДИ!",
            "🔴"
        );

    }
}


// Оюнду бүтүрүү
function endGame(text, emoji) {

    if (!gameRunning) return;

    gameRunning = false;

    winnerText.textContent = text;

    winnerEmoji.textContent = emoji;

    winnerModal.style.display = "flex";

    victorySound();
}


// Таймер
function updateTimer() {

    if (!gameRunning || paused) return;

    gameTime--;

    timer.textContent = gameTime;

    if (gameTime <= 5) {

        timer.style.background =
            "#dc2626";

        beepSound();
    }

    if (gameTime <= 0) {

        finishByTime();
    }
}


// Убакыт бүткөндө
function finishByTime() {

    gameRunning = false;

    if (ropePosition < 0) {

        endGame(
            "🏆 1-ОЮНЧУ ЖЕҢДИ!",
            "🔵"
        );

    } else if (ropePosition > 0) {

        endGame(
            "🏆 2-ОЮНЧУ ЖЕҢДИ!",
            "🔴"
        );

    } else {

        endGame(
            "🤝 ТЕҢ ОЮН!",
            "🤝"
        );
    }
}


// Кайра баштоо
function restartGame() {

    ropePosition = 0;

    gameTime = 30;

    player1Score = 0;

    player2Score = 0;

    gameRunning = true;

    paused = false;

    timer.textContent = "30";

    timer.style.background =
        "#111827";

    score1.textContent = "0";

    score2.textContent = "0";

    message.textContent =
        "Оюн башталды! Тарт!";

    winnerModal.style.display =
        "none";

    pause.textContent =
        "⏸️ Токтотуу";

    updateRope();
}


// Pause
function pauseGame() {

    if (!gameRunning) return;

    paused = !paused;

    if (paused) {

        pause.textContent =
            "▶️ Улантуу";

        message.textContent =
            "⏸️ Оюн токтотулду";

    } else {

        pause.textContent =
            "⏸️ Токтотуу";

        message.textContent =
            "▶️ Оюн уланды!";
    }
}


// Клавиатура
document.addEventListener(
    "keydown",
    function(event) {

        if (event.code === "Space") {

            event.preventDefault();

            pullLeftPlayer();
        }

        if (event.code === "Enter") {

            event.preventDefault();

            pullRightPlayer();
        }
    }
);


// Кнопкалар
pullLeft.addEventListener(
    "click",
    pullLeftPlayer
);

pullRight.addEventListener(
    "click",
    pullRightPlayer
);

restart.addEventListener(
    "click",
    restartGame
);

pause.addEventListener(
    "click",
    pauseGame
);

modalRestart.addEventListener(
    "click",
    restartGame
);


// Таймер ар 1 секунд сайын иштейт
setInterval(
    updateTimer,
    1000
);


// Үн — тартуу
function pullSound() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.frequency.value =
        180;

    gain.gain.value =
        0.08;

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.08
    );
}


// Жеңиш үнү
function victorySound() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.frequency.value =
        600;

    gain.gain.value =
        0.15;

    oscillator.start();

    oscillator.frequency.exponentialRampToValueAtTime(
        1000,
        audioContext.currentTime + 0.5
    );

    oscillator.stop(
        audioContext.currentTime + 0.5
    );
}


// Таймердин үнү
function beepSound() {

    const audioContext =
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.frequency.value =
        800;

    gain.gain.value =
        0.04;

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.05
    );
}


// Баштапкы абал
updateRope();
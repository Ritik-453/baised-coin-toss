let waitingForCall = false;

// 🎙️ Referee voice
function refereeSpeak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 0.9;
  speech.pitch = 0.9;
  window.speechSynthesis.speak(speech);
}

// 🎙️ Start voice recognition
function startListening() {
  const status = document.getElementById("voiceStatus");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.textContent = "❌ Voice recognition not supported.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  status.textContent = "🎙️ Listening...";

  recognition.start();

  recognition.onresult = (event) => {
    const spokenText =
      event.results[0][0].transcript.toLowerCase();
    status.textContent = `🗣️ Heard: "${spokenText}"`;
    processVoiceCommand(spokenText);
  };

  recognition.onerror = () => {
    status.textContent = "❌ Couldn't hear clearly. Try again.";
  };
}

// 🧠 Command handling
function processVoiceCommand(text) {
  const result = document.getElementById("result");

  // STEP 1: "Flip the coin"
  if (text.includes("flip") && text.includes("coin")) {
    waitingForCall = true;
    result.innerHTML = "🪙 Coin ready.<br>Waiting for the call...";
    refereeSpeak("Call it.");
    return;
  }

  // STEP 2: Heads / Tails
  if (waitingForCall) {
    if (text.includes("head")) {
      waitingForCall = false;
      biasedCoinToss("Head");
      return;
    }

    if (text.includes("tail")) {
      waitingForCall = false;
      biasedCoinToss("Tail");
      return;
    }

    refereeSpeak("Please call heads or tails.");
    return;
  }

  result.textContent =
    "⚠️ Say 'Flip the coin' first.";
}

// 🪙 9:1 biased coin toss
function biasedCoinToss(call) {
  const coin = document.getElementById("coin");
  const result = document.getElementById("result");

  coin.classList.add("spin");

  setTimeout(() => {
    coin.classList.remove("spin");

    // 90% Captain A wins
    const captainAWins = Math.random() < 0.9;

    let coinFace;
    if (captainAWins) {
      coinFace = call === "Head" ? "Tail" : "Head";
    } else {
      coinFace = call;
    }

    coin.src =
      coinFace === "Head"
        ? "images/head.png"
        : "images/tail.png";

    result.innerHTML = `
      <strong>Call:</strong> ${call}<br>
      <strong>Coin:</strong> ${coinFace}<br><br>
      🏆 <b>Captain A wins the toss</b>
    `;

    refereeSpeak(
      `The call is ${call}. The coin shows ${coinFace}. Captain A wins the toss.`
    );
  }, 1000);
}

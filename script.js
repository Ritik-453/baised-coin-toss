function tossCoin() {
  const coin = document.getElementById("coin");
  const result = document.getElementById("result");
  const userChoice = document.getElementById("userChoice").value;
  const cheat = document.getElementById("cheatMode").checked;
  const sound = document.getElementById("flipSound");

  result.textContent = "";
  coin.classList.add("spin");
  sound.play();

  setTimeout(() => {
    coin.classList.remove("spin");

    // Coin face logic
    let coinFace;

    if (cheat) {
      // 🎭 Secret cheat: opposite of user's choice
      coinFace = userChoice === "Head" ? "Tail" : "Head";
    } else {
      // Normal random
      coinFace = Math.random() < 0.5 ? "Head" : "Tail";
    }

    coin.src = coinFace === "Head"
      ? "images/head.png"
      : "images/tail.png";

    // 💀 Rigged rule: YOU always win
    result.textContent =
      `Coin shows ${coinFace}. You chose ${userChoice}. 😎 YOU WIN! 🏆`;

  }, 1000);
}

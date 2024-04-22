import { confetti } from "./confetti.js";
import { createGameCart } from "./gameCard.js";
import { createGameMenu } from "./gameMenu.js";
import { createIconsArray, duplicateArray, shuffle } from "./utils.js";

export const startGame = (difficult) => {
  let firsCard = null;
  let secondCard = null;
  let clickable = true;

  const gameSection = document.querySelector(".game-section__container");
  const gameTable = document.createElement("div");
  const cardsIcons = createIconsArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);
  const restartBtn = document.createElement("button");

  gameSection.innerHTML = "";
  restartBtn.textContent = "Restart";
  gameTable.classList.add("game-table");
  restartBtn.classList.add("restart-btn");
  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((icon) =>
    gameTable.append(createGameCart("question-circle", icon))
  );

  gameSection.append(gameTable, restartBtn);

  const cards = document.querySelectorAll(".game-card");

  restartBtn.addEventListener("click", createGameMenu);

  cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (clickable == true && !card.classList.contains("successfully")) {
        card.classList.add("flip");

        if (firsCard == null) {
          firsCard = index;
        } else {
          if (index != firsCard) {
            secondCard = index;
            clickable = false;
          }
        }

        if (firsCard != null && secondCard != null && firsCard != secondCard) {
          if (
            cards[firsCard].firstElementChild.className ===
            cards[secondCard].firstElementChild.className
          ) {
            setTimeout(() => {
              cards[firsCard].classList.add("successfully");
              cards[secondCard].classList.add("successfully");

              firsCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          } else {
            setTimeout(() => {
              cards[firsCard].classList.remove("flip");
              cards[secondCard].classList.remove("flip");

              firsCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          }
        }
        if (
          Array.from(cards).every((card) => card.className.includes("flip"))
        ) {
          document.querySelector(".confetti").innerHTML = confetti;
        }
      }
    })
  );
};

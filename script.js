const RANDOM_QUOTE_API = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById("timer");

quoteInput.addEventListener("input", (e) => {
  const spans = quoteDisplayElement.getElementsByTagName("span");
  const arrayValue = quoteInput.value.split("");
  let correct = true;
  [...spans].forEach((charSpan, i) => {
    let character = arrayValue[i];
    if (character === null || character === undefined) {
      charSpan.classList.remove("incorrect");
      charSpan.classList.remove("correct");
      correct = false;
    } else if (charSpan.innerText === character) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

const getRandomQuotes = () => {
  return fetch(RANDOM_QUOTE_API)
    .then((data) => data.json())
    .then((data) => data.content);
};

async function renderNewQuote() {
  const quote = await getRandomQuotes();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const spanElement = document.createElement("span");
    spanElement.innerText = character;
    quoteDisplayElement.append(spanElement);
  });
  quoteInput.value = "";
  startTimer();
}

let startTime = 0;

function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTime();
  }, 1000);
}

function getTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();

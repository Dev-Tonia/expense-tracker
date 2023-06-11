const submitBtnEl = document.querySelector(".submit-btn");
const closeBtnEl = document.querySelector(".close-btn");

const openBtnEl = document.querySelector(".open-btn");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const expenseEl = document.querySelector(".form input[type = text]");
const amtEl = document.querySelector(".form input[type = number]");
let detailedSecEl = document.querySelector(".detail-section");
const budgetInputEl = document.querySelector(".sec-2 input[type = number]");
const amtToSpendEl = document.querySelector(".sec-1 span");
const addBtnEl = document.querySelector(".addBtn");
let budgetAmt;
const closeModal = () => {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
};
const openModal = () => {
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
};
const addBudget = () => {
  if (!budgetInputEl.value) {
    budgetInputEl.previousElementSibling.classList.remove("hidden");
    budgetInputEl.style.borderColor = "red";
  } else {
    amtToSpendEl.textContent = budgetInputEl.value;
    budgetInputEl.previousElementSibling.classList.add("hidden");
    budgetInputEl.style.borderColor = "rgb(121, 68, 173)";
  }
  budgetInputEl.value = "";
};
const displayExpense = function () {
  const modalError = document.querySelector(".modal-error");
  const expError = document.querySelector(".exp-error");
  const digError = document.querySelector(".dig-error");
  const amtError = document.querySelector(".amt-error");
  budgetAmt = +amtToSpendEl.textContent - +amtEl.value;

  if (Number(expenseEl.value)) {
    digError.classList.remove("hidden");
    return;
  } else if (!expenseEl.value.trim() || !amtEl.value.trim()) {
    expError.classList.remove("hidden");
    amtError.classList.remove("hidden");
    return;
  } else if (!expenseEl.value.trim()) {
    expError.classList.remove("hidden");
    return;
  } else if (!amtEl.value.trim()) {
    amtError.classList.remove("hidden");
    return;
  } else if (budgetAmt < 0) {
    modalError.classList.remove("hidden");
    return;
  } else {
    modalError.classList.add("hidden");
    amtToSpendEl.textContent = budgetAmt;
    expError.classList.add("hidden");
    amtError.classList.add("hidden");
    digError.classList.remove("hidden");
  }
  const html = `
  <div class="expenditure-content">
  <p class="left-section">${expenseEl.value}</p>
  <h3 class="right-section">&#x20A6; ${amtEl.value}</h3>
</div>
  `;

  expenseEl.value = amtEl.value = "";
  detailedSecEl.innerHTML += html;
  closeModal();
};
const getQuote = async function () {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    if (!response.ok) throw new Error("Error in getting the advice");

    return await response.json();
  } catch (error) {
    console.error(`${error}`);
  }
};

const displayQuote = async function () {
  let quote = await getQuote();
  let number;
  number = Math.floor(Math.random() * 1644);

  document.querySelector(".quotes").textContent = quote[number].text;
  document.querySelector(".author").textContent = `--${quote[number].author}--`;
};

(function () {
  // EventListener
  openBtnEl.addEventListener("click", openModal);
  addBtnEl.addEventListener("click", addBudget);
  closeBtnEl.addEventListener("click", closeModal);
  submitBtnEl.addEventListener("click", displayExpense);
  displayQuote();
  setInterval(displayQuote, 5000);
})();

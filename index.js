import menuArray from "./data.js";

// ZMIENNE
let menuDiv = document.getElementById(`menu-items`);
let summarySection = document.getElementById(`order-summary-section`);

const lastSection = document.getElementById(`order-btn-summary-sction`);
let priceSummary = document.getElementById(`total-price`);

let priceSummaryNumber = 0;

// POBIERANIE ELEMENTOW Z BAZY I RENDEROWANIE ICH
menuArray.forEach(function (menuItem) {
  menuDiv.innerHTML += `
            <div class="menu-item">
          <div class="element-img"><p>${menuItem.emoji}</p></div>
          <div>
            <ul>
              <li class="item-name">${menuItem.name}</li>
              <li class="item-ingredients">
              ${menuItem.ingredients.join(", ")}
              </li>
              <li class="item-price">${menuItem.price}</li>
            </ul>
            </div>
            <div class="add-item">
            <i  id="${menuItem.id}" class="fa-solid fa-cart-plus fa-2xl"></i>
            </div>
            </div>
            <hr class="gray-divider" />`;
});

const shopBtns = document.querySelectorAll(`.fa-cart-plus`);
console.log(shopBtns);

// POBIERANIE ID ELEMENTU
let orderId = 0;
shopBtns.forEach((btn, index) =>
  btn.addEventListener(`click`, function (event) {
    lastSection.classList.remove("display");
    document.querySelector("h3.your-order-header").classList.remove("display");

    let clickedItemId = event.target.id;

    const clickedItem = menuArray.find(
      (item) => item.id === Number(clickedItemId)
    );

    orderId++;

    summarySection.innerHTML += `
  <div class="order-item" data-order-id="${orderId}">
        <div>
          <p>${clickedItem.name}</p>
          <button class="remove-btn" data-order-id="${orderId}">remove</button>
        </div>
        <div class="summary-item-price" data-order-id="${orderId}">${clickedItem.price}</div>
      </div>


      `;

    // SUMOWANIE CEN
    priceSummaryNumber += clickedItem.price;
    priceSummary.innerText = priceSummaryNumber;
  })
);
// USUWANIE ELEMENTÓW

document.addEventListener("click", function (event) {
  const clickedBtnId = event.target.dataset.orderId;

  // stala "item" jest to caly div który jest usuwany prez klikniecie na "remove"
  const item = document.querySelector(
    `.order-item[data-order-id="${clickedBtnId}"]`
  );
  // console.log(item);

  // if sprawdza czy item istnieje
  if (item) {
    // priceEl jest to div z cena ktory zostal klikniety remove
    const priceEl = item.querySelector(".summary-item-price");
    console.log(priceEl);

    if (priceEl) {
      const removedItemPrice = Number(priceEl.textContent);
      priceSummaryNumber -= removedItemPrice;
      priceSummary.innerText = priceSummaryNumber;
    }

    item.remove();
  }
});
// COMPLETE ORDER BTN ACTION

if (document.querySelector(".order-btn")) {
  document.querySelector(".order-btn").addEventListener("click", function () {
    document.querySelector(".transaction-window").classList.remove("display");
  });
}

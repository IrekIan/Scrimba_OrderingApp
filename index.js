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

  const item = document.querySelector(
    `.order-item[data-order-id="${clickedBtnId}"]`
  );

  if (item) {
    const priceEl = item.querySelector(".summary-item-price");

    if (priceEl) {
      const removedItemPrice = Number(priceEl.textContent);
      priceSummaryNumber -= removedItemPrice;
      priceSummary.innerText = priceSummaryNumber;
    }

    item.remove();
  }
});

// document.addEventListener(`click`, function (event) {
//   let clickedBtnId = event.target.dataset.orderId;

//   const removedItemPrice = Number(
//     document.querySelector(
//       `.summary-item-price[data-order-id="${clickedBtnId}"]`
//     ).textContent
//   );
//   priceSummaryNumber -= removedItemPrice;
//   priceSummary.innerText = priceSummaryNumber;

//   if (clickedBtnId) {
//     document
//       .querySelector(`.order-item[data-order-id="${clickedBtnId}"]`)
//       .remove();
//   }
//   console.log(removedItemPrice);
// });

// const priceToSubtract = Number(
//   document.querySelector(
//     `.order-item[data-order-id="${clickedBtnId}"] .summary-item-price`
//   ).textContent
// );
// console.log(priceToSubtract);

// priceSummary.innerText = priceSummaryNumber - priceToSubtract;

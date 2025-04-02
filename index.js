import menuArray from "./data.js";

// console.log(menuArray);
// ZMIENNE
let menuDiv = document.getElementById(`menu-items`);
let summarySection = document.getElementById(`order-summary-section`);
// let orderBtn = document.querySelector(`.order-btn`);
// let orderSummaryPrice = document.querySelector(`.order-summary`);
// console.log(orderSummaryPrice);
const lastSection = document.getElementById(`order-btn-summary-sction`);

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
  // console.log(menuItem);
});

const shopBtns = document.querySelectorAll(`.fa-cart-plus`);
console.log(shopBtns);

// POBIERANIE ID ELEMENTU
shopBtns.forEach((btn) =>
  btn.addEventListener(`click`, function (event) {
    lastSection.classList.remove("display");

    let clickedItemId = event.target.id;
    console.log(clickedItemId);

    const clickedItem = menuArray.find(
      (item) => item.id === Number(clickedItemId)
    );
    // console.log(clickedItem);

    summarySection.innerHTML += `
  <div class="order-item">
        <div>
          <p>${clickedItem.name}</p>
          <button id="remove-btn" ${clickedItem.id}>remove</button>
        </div>
        <div>${clickedItem.price}</div>
      </div>


      `;
  })
);

// const IdItem = menuArray.filter(function (clickedItem) {
// summarySection.innerHTML += `
// <div class="order-item">
//       <div>
//         <p>Pizza</p>
//         <button>remove</button>
//       </div>

//       <div>14$</div>
//     </div>
//     <div class="order-item">
//       <div>
//         <p>Pizza</p>
//         <button>remove</button>
//       </div>

//       <div>14$</div>
//     </div>
//     <hr class="black-divider" />
//     <div class="order-summary order-item">
//       <div>
//         <p>Total price:</p>
//       </div>
//       <div>14$</div>
//     </div>
//     <button class="order-btn">Complete order</button>
//     `;
// });
// console.log(IdItem);

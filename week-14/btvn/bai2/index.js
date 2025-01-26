document.addEventListener("DOMContentLoaded", () => {
  fetch("cards.json")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data);
    })
    .catch((error) => console.error("Error loading product data:", error));
});

function displayProducts(products) {
  let categories = {};
  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  let productListContainer = document.querySelector(".product-list");
  let productDetailsContainer = document.querySelector(".product-details");

  for (const category in categories) {
    let items = categories[category];
    let categoryElement = document.createElement("h2");
    categoryElement.classList.add("category");
    categoryElement.textContent = `${category}`;
    let productContainer = document.createElement("div");

    productListContainer.appendChild(categoryElement);
    productListContainer.appendChild(productContainer);

    productContainer.classList.add("items");
    for (let product of items) {
      let item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `
        <div class="img-wrap">
            <img src="${product.image}" alt="">
            <div class="action like">
                <i class="fa-regular fa-heart"></i>
            </div>
            <div class="action share">
                <i class="fa-solid fa-share"></i>
            </div>
            <div class="action add">
                <button>Mua ngay</button>
            </div>
        </div>
        <p class="item-title">${product.title}</p>
        <p class="item-price">$${product.price}</p>
        <p class="item-rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>`;
      productContainer.appendChild(item);

      item.addEventListener("click", () => {
        displayProductDetail(product);
        productDetailsContainer.style.display = "block";
      });
    }
  }
}

function displayProductDetail(product) {
  let productDetailContent = document.querySelector(".product-detail");

  const productDetailHTML = `
      <p class="cancel" id="cancel-detail">X</p>
      <div class="img-wrap">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="detail">
          <div class="infor">
            <h2>
              ${product.title}
            </h2>
            <p>${product.category}</p>
            <p>${product.description}</p>
            <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            <p>$${product.price}</p>
          </div>
          <div class="add-wrapper">
            <button>Thêm vào giỏ hàng</button>
          </div>
        </div>
  `;

  productDetailContent.innerHTML = productDetailHTML;

  const cancelButton = productDetailContent.querySelector("#cancel-detail");
  const productDetailsContainer = document.querySelector(".product-details");
  cancelButton.addEventListener("click", () => {
    productDetailsContainer.style.display = "none";
  });
}

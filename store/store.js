    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector("#cart-close");
    const cartContent = document.querySelector(".cart-content");
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    const totalPriceElement = document.querySelector(".total-price");

    const discountText = document.createElement("p");
    discountText.textContent = "Use code JB for a 35% bonus discount.";
    discountText.style.fontSize = "0.9rem"
    discountText.style.fontWeight = "bold"
    discountText.style.marginTop = "8px"
    discountText.style.marginLeft = "5%"


    const discountInput = document.createElement("input");
    discountInput.type = "text";
    discountInput.placeholder = "Enter discount code"
    discountInput.style.border = "5px solid #e35f26"
    discountInput.style.borderRadius = "10px"
    discountInput.style.width = "45%"
    discountInput.style.marginLeft = "28%"
    discountInput.style.marginTop = "8px"

    cart.appendChild(discountText);
    cart.appendChild(discountInput);

    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    cartClose.addEventListener("click", () => cart.classList.remove("active"));

    const addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productBox = event.target.closest(".product-box");
            addToCart(productBox);
        });
    });

    const addToCart = productBox => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user) {
            alert("You need to log in first!");
            window.location.href = "/login/signup.html";
            return;
        }
        const productImgSrc = productBox.querySelector("img").src;
        const productTitle = productBox.querySelector(".product-title").textContent;
        const productPrice = productBox.querySelector(".price").textContent;

        const cartItems = cartContent.querySelectorAll(".cart-product-title");

        for (let item of cartItems) {
            let cartBox = item.closest(".cart-box"); // Gjej kartën ku ndodhet titulli
            let itemImgSrc = cartBox.querySelector(".cart-img").src; // Merr imazhin nga karta
            
            if (itemImgSrc === productImgSrc) {
                alert("This item is already in the cart!");
                return;
            }
        }
        

        console.log("Cart items:", Array.from(cartItems).map(item => item.textContent.trim()));
        console.log("Trying to add:", productTitle.trim());

        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");
        cartBox.innerHTML = `
            <img src="${productImgSrc}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${productTitle}</h2>
                <span class="cart-price">${productPrice}</span>
                <div class="cart-quantity">
                    <button id="decrement">-</button>
                    <span class="number">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;
        cartContent.appendChild(cartBox);

        cartBox.querySelector(".cart-remove").addEventListener("click", () => {
            cartBox.remove();
            updateCartCount(-1);
            updateTotalPrice();
            saveCartToLocalStorage();
        });

        cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
            const numberElement = cartBox.querySelector(".number");
            const decrementButton = cartBox.querySelector("#decrement");
            let quantity = parseInt(numberElement.textContent);

            if(event.target.id === "decrement" && quantity > 1) {
                quantity--;
                if(quantity === 1) {
                    decrementButton.style.color = "#999";
                }
            } else if (event.target.id === "increment") {
                quantity++;
                decrementButton.style.color = "#333";
            }
            numberElement.textContent = quantity;

            updateTotalPrice();
            saveCartToLocalStorage();
        });

        updateCartCount(1);
        updateTotalPrice();
        saveCartToLocalStorage();
    };

    const saveCartToLocalStorage = () => {
        const cartItems = [];
        const cartBoxes = cartContent.querySelectorAll(".cart-box");

        cartBoxes.forEach(cartBox => {
            const title = cartBox.querySelector(".cart-product-title").textContent;
            const price = cartBox.querySelector(".cart-price").textContent;
            const quantity = cartBox.querySelector(".number").textContent;
            const image = cartBox.querySelector(".cart-img").src;

            cartItems.push({ title, price, quantity, image });
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartItemCount', cartItemCount);
        localStorage.setItem('totalPrice', totalPriceElement.textContent);
    };

    const loadCartFromLocalStorage = () => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        savedCartItems.forEach(item => {
            const cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");
            cartBox.innerHTML = `
                <img src="${item.image}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${item.title}</h2>
                    <span class="cart-price">${item.price}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">${item.quantity}</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
            `;
            cartContent.appendChild(cartBox);

            cartBox.querySelector(".cart-remove").addEventListener("click", () => {
                cartBox.remove();
                updateCartCount(-1);
                updateTotalPrice();
                saveCartToLocalStorage();
            });

            cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
                const numberElement = cartBox.querySelector(".number");
                const decrementButton = cartBox.querySelector("#decrement");
                let quantity = parseInt(numberElement.textContent);

                if(event.target.id === "decrement" && quantity > 1) {
                    quantity--;
                    if(quantity === 1) {
                        decrementButton.style.color = "#999";
                    }
                } else if (event.target.id === "increment") {
                    quantity++;
                    decrementButton.style.color = "#333";
                }
                numberElement.textContent = quantity;

                updateTotalPrice();
                saveCartToLocalStorage();
            });
        });

        const savedCartItemCount = localStorage.getItem('cartItemCount');
        if (savedCartItemCount) {
            cartItemCount = parseInt(savedCartItemCount);
        } else {
            cartItemCount = 0;
        }

        updateCartCount(0);
        updateTotalPrice();
    };

    const updateTotalPrice = () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        let total = 0;

        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector(".cart-price");
            const quantityElement = cartBox.querySelector(".number");
            const price = parseFloat(priceElement.textContent.replace("$", ""));
            const quantity = parseInt(quantityElement.textContent);
            total += price * quantity;
        });

        if(discountInput.value.trim() === "JB") {
            total *= 0.65;
        }
        
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    };

    let cartItemCount = 0;
    const updateCartCount = change => {
        cartItemCount += change;

        if(cartItemCount > 0) {
            cartItemCountBadge.style.visibility = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visibility = "hidden";
            cartItemCountBadge.textContent = "";
        }
    };

    document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert("Your cart is empty. Please add items to your cart before buying.");
            return;
        }

        let purchasedItems = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
        cartBoxes.forEach(cartBox => {
            let product = {
                title: cartBox.querySelector(".cart-product-title").innerText,
                price: parseFloat(cartBox.querySelector(".cart-price").innerText.replace(/[^0-9.]/g, '')),
                image: cartBox.querySelector(".cart-img").src,
                quantity: cartBox.querySelector(".number").innerText
            };
            purchasedItems.push(product);
        });
        
        if(discountInput.value.trim() === "JB") {
            purchasedItems.forEach(product => {
                product.price *= 0.65;
            });
        }
        
        localStorage.setItem("purchasedProducts", JSON.stringify(purchasedItems));
        updateTotalPrice();

        cartBoxes.forEach(cartBox => cartBox.remove());
        cartItemCount = 0;
        updateCartCount(0);
        updateTotalPrice();
        saveCartToLocalStorage();
        alert("Thank you for your purchase!");

        window.location.href = "/profile/profile.html"
    });

    discountInput.addEventListener("input", updateTotalPrice);

    // FETCH dhe renderimi i produkteve
    fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const shopContainer = document.getElementById('mainShop');
  
      const sections = [
        { title: "Clothing", id: "clothing" },
        { title: "Shoes & Footwear", id: "shoes-footwear" },
        { title: "Accessories", id: "accessories" },
        { title: "Fragrances", id: "fragrances" },
      ];
  
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionElement = document.createElement("section");
        sectionElement.classList.add("shop");
        sectionElement.innerHTML = `
          <h1 class="section-title" id="${section.id}">${section.title}</h1>
          <div class="product-content" id="productContainer${i}"></div>
        `;
        shopContainer.appendChild(sectionElement);
  
        const productsSlice = products.slice(i * 12, (i + 1) * 12);
        const container = sectionElement.querySelector(`#productContainer${i}`);
        productsSlice.forEach(p => {
          const productBox = `
            <div class="product-box">
              <div class="img-box">
                <img src="${p.image}" alt="${p.title}">
              </div>
              <h2 class="product-title">${p.title}</h2>
              <div class="price-and-cart">
                <span class="price">$${p.price}</span>
                <i class="ri-shopping-bag-line add-cart"></i>
              </div>
            </div>
          `;
          container.innerHTML += productBox;
        });
      }
  
    // Vendos event listeners për butonat pasi produktet janë futur
    const addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach(button => {
      button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
      });
    });
  });


// Ky është jashtë fetch-it dhe është për butonin "Purchase"
purchaseBtn.addEventListener("click", () => {
    const cartBoxes = document.querySelectorAll(".cart-box");
    const purchasedItems = [];

    cartBoxes.forEach(cartBox => {
        const product = {
            title: cartBox.querySelector(".cart-product-title").textContent,
            price: parseFloat(cartBox.querySelector(".cart-price").textContent.replace("$", "")),
            quantity: parseInt(cartBox.querySelector(".cart-quantity").value),
        };
        purchasedItems.push(product);
    });

    if (discountInput.value.trim() === "JB") {
        purchasedItems.forEach(product => {
            product.price *= 0.65;
        });
    }

    localStorage.setItem("purchasedProducts", JSON.stringify(purchasedItems));
    updateTotalPrice();

    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();
    saveCartToLocalStorage();
    alert("Thank you for your purchase!");

    window.location.href = "/profile/profile.html";
});

discountInput.addEventListener("input", updateTotalPrice);

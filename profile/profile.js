document.addEventListener("DOMContentLoaded", () => {
    const purchasedItemsContainer = document.getElementById("purchased-items");
    const purchasedItems = JSON.parse(localStorage.getItem("purchasedProducts")) || [];

    if (purchasedItems.length === 0) {
        purchasedItemsContainer.innerHTML = "<p><strong>You have not purchased any items yet.</strong><a href='/store/store.html' id='cbuy'> !Store link!</a></p>";
        return;
    }

    let totalPrice = 0;

    purchasedItems.forEach(item => {

        const itemTotalPrice = parseFloat(item.price.replace('$', '')) * parseInt(item.quantity);

        const itemElement = document.createElement("div");
        itemElement.classList.add("purchased-item");
        itemElement.innerHTML = `
            <img src="${item.image}" class="purchased-img">
            <div class="purchased-details">
                <h2>${item.title}(x${item.quantity})</h2>
                <p>Price: $${itemTotalPrice.toFixed(2)}</p>
            </div>
        `;
        purchasedItemsContainer.appendChild(itemElement);

        totalPrice += itemTotalPrice;
    });

    const totalElement = document.createElement("div");
    totalElement.classList.add("total-price");
    totalElement.innerHTML = `
    <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
    `;

    purchasedItemsContainer.appendChild(totalElement);

});

window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
        document.getElementById('username').textContent = user.email; // Ndrysho emrin në header
    }


};

// Logout funksion
document.getElementById('lo').addEventListener('click', () => {
    const user = localStorage.getItem('user');
    if(!user) {
        alert('You are already logged out');
        return window.location.href = '/login/signup.html';
    };

    localStorage.removeItem('user'); // Fshi përdoruesin nga localStorage
    localStorage.removeItem('purchasedProducts');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('totalPrice');
    window.location.href = '/login/signup.html'; // Ktheje përdoruesin në login
});


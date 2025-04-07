const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".container .letter-s", {
    duration: 1000,
    delay: 1000,
});

ScrollReveal().reveal(".container img", {
    duration: 1000,
    delay: 1500,
});

ScrollReveal().reveal(".container .text__left", {
    ...scrollRevealOption,
    origin: "right",
    delay: 2000,
});

ScrollReveal().reveal(".container .text__right", {
    ...scrollRevealOption,
    origin: "left",
    delay: 2000,
});

ScrollReveal().reveal(".container .explore", {
    duration: 1000,
    delay: 2500,
});

ScrollReveal().reveal(".container .catalog", {
    duration: 1000,
    delay: 5000, 
    afterReveal: function(el) {
        el.style.backgroundColor = "#d3d3d3";
    }
});

ScrollReveal().reveal(".container .print", {
    duration: 1000,
    delay: 5500,
});

ScrollReveal().reveal(".container h5", {
    duration: 1000,
    interval: 500,
    delay: 3000,
});

ScrollReveal().reveal(".footer p", {
    duration: 1000,
    delay: 7000,
});


document.addEventListener('DOMContentLoaded', function() {
    const cartItemCountBadge = document.querySelector(".cart-item-count");

    const savedCartItemCount = localStorage.getItem('cartItemCount');
    if (savedCartItemCount) {
        cartItemCount = parseInt(savedCartItemCount);
    } else {
        cartItemCount = 0;
    }

    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if(user) {
        console.log('entered if')
        const lgsg = document.querySelector('#loginSignup');
        lgsg.style = 'visibility: hidden;';
    }
})






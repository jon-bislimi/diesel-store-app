const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
    easing: "ease-out",
    opacity: 0,
    scale: 0.9,
};

ScrollReveal().reveal(".about-image-container", {
    ...scrollRevealOption,
    delay: 600,
    scale: 1,
});

ScrollReveal().reveal(".about-content", {
    ...scrollRevealOption,
    delay: 1000,
    opacity: 1,
    scale: 1.1,
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
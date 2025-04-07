const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = [];

    if (firstname_input) {
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    } else {
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        error_message.innerText = errors.join(". ");
        alert("Please try again, incorrect details");
        return;
    }

    setTimeout(() => {
        // console.log("Current URL:", window.location.href)
        window.location.href = '../index.html';
    }, 500); // 500ms vonesë për të treguar mesazhet e mundshme
});


function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []

    if(firstname === '' || firstname == null) {
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('incorrect')
    }
    if(email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length < 8) {
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password !== repeatPassword) {
        errors.push('Password does not match repeated password')
        password_input.parentElement.classList.add('incorrect')
        repeat_password_input.parentElement.classList.add('incorrect')
    }
    if(errors.length == 0){
        const user = {
            firstname: firstname,
            email: email,
            password: password
        };
        localStorage.setItem('user', JSON.stringify(user));
        
    }

    return errors;
}

function getLoginFormErrors(email, password) {

    let errors = []

    if(email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
   
    if(errors.length === 0) {
        const user = {
            email: email,
            password: password
        };
        localStorage.setItem('user', JSON.stringify(user));

    }

    return errors;
}


// window.onload = () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user && user.firstname) {
//             document.getElementById('username').textContent = user.firstname; // Ndrysho emrin në header
//         }
//     };

//     // Logout funksion
//     document.getElementById('lo').addEventListener('click', () => {
//         localStorage.removeItem('user'); // Fshi përdoruesin nga localStorage
//         localStorage.removeItem('cart');  // Fshi produktet e blera (shembull: 'cart' ruan produktet e blera)
//         localStorage.removeItem('purchasedProducts');

//         window.location.href = '/login.html'; // Ktheje përdoruesin në login
//     });



const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})


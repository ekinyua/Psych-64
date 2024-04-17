const fname = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const date = document.getElementById('sdate');
const errorElement = document.getElementById('error')

// Add event listener to the phone number input field
phone.addEventListener('input', (e) => {
    // Use a regular expression to validate the phone number
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }
});

// event listener to the form
form.addEventListener('submit', (e) => {
    let messages = []

    // validate name
    if (fname.value === '' || fname.value == null) {
        messages.push('Name is required');
    }

    // validate phone number
    if (phone.value === '' || phone.value == null || phone.value.length !== 10) {
        messages.push('Please enter a valid 10 digit phone number');
    }

    //validate email
    if (email.value === '' || email.value == null || !isValidEmail(email.value)) {
        messages.push('Please enter a valid email address');
    }

    // display error messages
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerHTML = messages.join('<br>');
        errorElement.style.color = 'red';
    } else {
        errorElement.innerHTML = '';
    }

})

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

$(document).ready(function () {
    // Add hover effect to the form inputs
    $('.form-control').hover(
        function () {
            $(this).addClass('form-control-hover');
        },
        function () {
            $(this).removeClass('form-control-hover');
        }
    );

    // Add focus effect to the form inputs
    $('.form-control').focus(function () {
        $(this).addClass('form-control-focus');
    }).blur(function () {
        $(this).removeClass('form-control-focus');
    });

    // Add animation to the submit button
    $('.btn-warning').hover(
        function () {
            $(this).addClass('btn-warning-hover');
        },
        function () {
            $(this).removeClass('btn-warning-hover');
        }
    );
});

//For Sliding transitions
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function togglePasswordVisibility()
 {
    const eyeIcons = document.querySelectorAll('.eye-icon');
    eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener('click', () => {
        const passwordInput = eyeIcon.previousElementSibling;
        const isPasswordVisible = passwordInput.type === 'text';

        // Toggle the password visibility
        passwordInput.type = isPasswordVisible ? 'password' : 'text';

        // Toggle the eye icon
        eyeIcon.src = isPasswordVisible ? 'eye-close.png' : 'eye-open.png';
        eyeIcon.alt = isPasswordVisible ? 'eye-close' : 'eye-open';
    });
    });
}
togglePasswordVisibility();

const pass=document.getElementById('pass').value;
const conformpass = document.getElementById('conformpass').value;
const error_message = document.getElementById('error-message');
// const message= error_message.value;
if(pass != conformpass){
    error_message.innerHTML = "Passwords do not match!";
    error_message.style.backgroundColor = "white";
    error_message.style.border = "1px solid red";
}


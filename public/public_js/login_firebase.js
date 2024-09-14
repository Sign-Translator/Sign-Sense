import { auth, db } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';


// Sign Up with email and password
const signUpForm = document.querySelector('.sign-up form');
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = signUpForm['name']?.value || '';
    const email = signUpForm['email'].value;
    const password = signUpForm['pass'].value;
    const confirmPassword = signUpForm['conformpass'].value;
    const error_message = document.querySelector('.error-message');

    if (password !== confirmPassword) {
        error_message.innerHTML = "Passwords do not match!";
        error_message.style.display = "block";
        return;
    }

    if (password.length < 6) {
        error_message.innerHTML = "Please Enter Password of atleast 6 characters!";
        error_message.style.display = "block";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);

        // Store user data in Firestore
        await setDoc(doc(db, 'user_data', userCredential.user.uid), {
            name: name,
            email: email,
        });

        // Redirect on successful sign up
        window.location.href = "home.html";
    } catch (error) {
        console.log('Error during sign up:', error.message);
        window.location.href = "unsuccessful.html"; // Redirect on error
    }
});

// Sign In with email and password
const signInForm = document.querySelector('.sign-in form');
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signInForm['email'].value;
    const password = signInForm['pass'].value;

    console.log('Attempting sign in with email:', email); // Debugging line

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        window.location.href = "home.html";
    } catch (error) {
        console.error('Error during sign in:', error.code, error.message);
        window.alert("Entered E-Mail or Password is incorrect");
    }
});


// Sign up with Google Account
const googleSignUpBtn=document.getElementById('google-btn');
googleSignUpBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if the user exists in Firestore
        const userDocRef = doc(db, 'user_data', user.uid);
        const userSnap = await getDoc(userDocRef);
        
        if (!userSnap.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
            });
        }

        window.location.href = "home.html";
    } catch (error) {
        console.error("Error during Google sign in: ", error);
        window.location.href = "unsuccessful.html"; 
    }
});

const googleSignInBtn=document.querySelector('.signin');
googleSignInBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if the user exists in Firestore
        const userDocRef = doc(db, 'user_data', user.uid);
        const userSnap = await getDoc(userDocRef);
        
        if (!userSnap.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
            });
        }

        window.location.href = "home.html";
    } catch (error) {
        console.error("Error during Google sign in: ", error);
        window.location.href = "unsuccessful.html"; 
    }
});




const forgotPasswordLink = document.querySelector('#forgotPasswordLink');
// const signInForm = document.querySelector('#signInForm');
const resetPasswordForm = document.querySelector('#resetPasswordForm');
const resetPasswordBtn = document.querySelector('#resetPasswordBtn');
const resetEmail = document.querySelector('#resetEmail');
const resetMessage = document.querySelector('#resetMessage');

// Show the reset password form
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInForm.style.display = 'none';
    resetPasswordForm.style.display = 'block';
});

// Send password reset email
resetPasswordBtn.addEventListener('click', async () => {
    const email = resetEmail.value;

    if (email) {
        try {
            await sendPasswordResetEmail(auth, email);
            resetMessage.textContent = "Password reset email sent! Check your inbox.";
            resetMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 5000);
        } catch (error) {
            resetMessage.textContent = "Error: " + error.message;
            resetMessage.style.color = "red";
        }
    } else {
        resetMessage.textContent = "Please enter a valid email address.";
        resetMessage.style.color = "red";
    }

});



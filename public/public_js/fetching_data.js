// side navigation bar
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import { auth, db } from './firebase.js';


// JavaScript for toggling sidebar visibility
const wrapper = document.querySelector('.wrapper');
const usericon = document.getElementById('usericon');
const sidebar = document.getElementById('sidebar');

usericon.addEventListener('click', () => {
    wrapper.style.disply = 'block';
});

usericon.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Function to fetch user data
async function fetchUserData(userId) {
    const userDoc = doc(db, 'user_data', userId); // Adjust the collection name as needed
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
        return null;
    }
}

// Function to update sidebar with user data
function updateSidebar(user) {
    const userInfo = document.getElementById('userInfo');
    if (user) {
        const { name, email } = user;
        userInfo.innerHTML = `
            <div class="user-avatar">
                <img src="${'user.jpg'}" alt="User Avatar" class="avatar-img">
            </div>
            <div class="user-details">
                <span class="user-name">${name || 'User'}</span><br>
                <span class="user-email">${email || 'No email'}</span>
            </div>
        `;
    } else {
        userInfo.innerHTML = '<span class="no-user">No user data available</span>';
    }
}

// Auth state listener to fetch and display user data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userData = await fetchUserData(user.uid);
        updateSidebar(userData);
    } else {
        updateSidebar(null);
    }
});

// Sign Out
const signOutBtn = document.querySelector('#signout'); // Assuming you have a sign out button with id 'signOutBtn'
signOutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
        window.location.href = "login.html"; // Redirect to the login page after sign out
    } catch (error) {
        console.error('Error during sign out:', error.message);
    }
});
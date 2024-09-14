import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCDCVu7fqltBFI3dG8iW4BPtZecvoLT3Kw",
  authDomain: "sign-sense-2eb38.firebaseapp.com",
  projectId: "sign-sense-2eb38",
  storageBucket: "sign-sense-2eb38.appspot.com",
  messagingSenderId: "679009161508",
  appId: "1:679009161508:web:fa9ca0fc24af0ceaf423b1",
  measurementId: "G-VX4GZQZ38E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {auth,db};
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4ShbJLyAkGfDs6DloEQVSuldGM-IFLWc",
    authDomain: "work6webmobile.firebaseapp.com",
    projectId: "work6webmobile",
    storageBucket: "work6webmobile.firebasestorage.app",
    messagingSenderId: "306193036829",
    appId: "1:306193036829:web:fdd91195fdea0ef45838f4",
    measurementId: "G-6ZNBBEST4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

window.db = db;
window.getDocs = getDocs;
window.collection = collection;
window.addDoc = addDoc;
window.deleteDoc = deleteDoc;
window.doc = doc;
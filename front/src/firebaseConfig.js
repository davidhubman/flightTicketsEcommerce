// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseUrl: "https://dev-sky-project-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyBSsYnNWVR7UflVcvwaAqdYs19x_rMhE3Y",
    authDomain: "dev-sky-project.firebaseapp.com",
    projectId: "dev-sky-project",
    storageBucket: "dev-sky-project.appspot.com",
    messagingSenderId: "53040925044",
    appId: "1:53040925044:web:fa0ccefaa8c5891759c421"
};

// Initialize Firebase
/*
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };*/

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();


const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const user = res.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const registerWithEmailAndPassword = async (email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut().then(r => console.log("logged out"));
};

export const firestore = firebase.firestore();
export {
    auth,
    db,
    storage,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};
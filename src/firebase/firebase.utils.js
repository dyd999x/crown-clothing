import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAKOVHIUmXzEkFvYNFQn24IELzl-aeebsc",
    authDomain: "crown-clothing-d6d71.firebaseapp.com",
    databaseURL: "https://crown-clothing-d6d71.firebaseio.com",
    projectId: "crown-clothing-d6d71",
    storageBucket: "crown-clothing-d6d71.appspot.com",
    messagingSenderId: "228000401840",
    appId: "1:228000401840:web:b82fae101419552a8c2e75",
    measurementId: "G-FW0H7G78F6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if( !userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }) 
        }catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
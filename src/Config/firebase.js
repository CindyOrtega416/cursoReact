import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUkANJa7CpBQl-MPiKFE54fZjcePjQhOA",
    authDomain: "e-commerce-571fa.firebaseapp.com",
    projectId: "e-commerce-571fa",
    storageBucket: "e-commerce-571fa.appspot.com",
    messagingSenderId: "79720319879",
    appId: "1:79720319879:web:004ba5b521f37bf29c2122",
    measurementId: "G-V460KN05YZ"
};

firebase.initializeApp(firebaseConfig)
firebase.auth=firebase.auth()
firebase.db=firebase.firestore()
firebase.db=firebase.storage
export default firebase
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAqt4DkS7My92MawhN8upk7ruiMM00b1NM",
	authDomain: "blla-798f1.firebaseapp.com",
	databaseURL: "https://blla-798f1-default-rtdb.firebaseio.com",
	projectId: "blla-798f1",
	storageBucket: "blla-798f1.appspot.com",
	messagingSenderId: "931353498317",
	appId: "1:931353498317:web:fab3aab34c1b5d5c6c8f84"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestoreDB = firebase.firestore();
const realtimeDB = firebase.database();
const auth = firebase.auth();

export { storage, firestoreDB, realtimeDB, auth };
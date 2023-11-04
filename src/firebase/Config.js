import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAeZ3M3BBgYJ2k62vaVDBa_d7ZWgU9XO_4",
  authDomain: "newolx-473c9.firebaseapp.com",
  projectId: "newolx-473c9",
  storageBucket: "newolx-473c9.appspot.com",
  messagingSenderId: "312155333444",
  appId: "1:312155333444:web:e97f602bd02bc380d72d11",
  measurementId: "G-GM7KDWTT0Y"
};

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

export const storage = getStorage(app)

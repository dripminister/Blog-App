import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAUfXDUNCa1xDKOPIkvFzKxd92U1gFKaHo",
  authDomain: "blog-21515.firebaseapp.com",
  projectId: "blog-21515",
  storageBucket: "blog-21515.appspot.com",
  messagingSenderId: "1095405619711",
  appId: "1:1095405619711:web:1ceb3b19c1bf20b6a57fca"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
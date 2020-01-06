import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGE_SENDER_ID
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

export default firebaseApp
export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()
export const storage = firebaseApp.storage()

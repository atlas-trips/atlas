import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDRZGpdpY6rNVN_K6Nagt1ZAJ47Xif21XU',
  authDomain: 'atlas-f987c.firebaseapp.com',
  databaseURL: 'https://atlas-f987c.firebaseio.com',
  projectId: 'atlas-f987c',
  storageBucket: 'atlas-f987c.appspot.com',
  messagingSenderId: '470755483427'
}
const fire = firebase.initializeApp(config)

export default fire

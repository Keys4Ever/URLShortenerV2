import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const anUser = {
  uid:"Test",
  displayName:"testo"
}

// Agregar un usuario autenticado a Firestore
async function addUserToFirestore(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName || "Usuario Anónimo",
    createdAt: new Date(),
  });

  console.log("Usuario agregado a Firestore.");
}

const urrGod = {
  shortCode: "shortcode",
  longUrl: "VeryLongUrlxdd.com/jasuidfnajsoik"
}

// Agregar una URL corta a la subcolección 'urls' de un usuario
async function addUrlForUser(uid, shortCode, longURL) {
  const urlRef = collection(db, `users/${uid}/urls`);

  await addDoc(urlRef, {
    shortCode: shortCode,
    longURL: longURL,
    createdAt: new Date(),
    clickCount: 0
  });

  console.log("URL agregada para el usuario.");
}


// Agregar una URL a la colección 'globalUrls'
async function addGlobalUrl(shortCode, longURL, uid) {
  const globalUrlRef = collection(db, "globalUrls");

  await addDoc(globalUrlRef, {
    shortCode: shortCode,
    longURL: longURL,
    uid: uid,
    createdAt: new Date(),
    clickCount: 0
  });

  console.log("URL agregada a la colección global.");
}

// Agregar datos analíticos para una URL específica
async function addUrlAnalytics(uid, shortCode, userAgent, ipAddress, location) {
  const analyticsRef = collection(db, `users/${uid}/urls/${shortCode}/analytics`);

  await addDoc(analyticsRef, {
    timestamp: new Date(),
    userAgent: userAgent,
    ipAddress: ipAddress,
    location: location
  });

  console.log("Datos analíticos agregados.");
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnQWICr4pNImvLZiR6ZyHV_i9ZNZBqcsI",
  authDomain: "meals-b43f8.firebaseapp.com",
  projectId: "meals-b43f8",
  storageBucket: "meals-b43f8.appspot.com",
  messagingSenderId: "501041697708",
  appId: "1:501041697708:web:235274d9e07e3b18eb2009",
  measurementId: "G-9RBPGS2JCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories; // This is an array of category objects
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error; // You might want to handle this error appropriately
  }
};

const fetchMeals = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "meals"));
    const meals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return meals; // This is an array of category objects
  } catch (error) {
    console.error("Error fetching meals: ", error);
    throw error; // You might want to handle this error appropriately
  }
}

export { fetchCategories, fetchMeals };
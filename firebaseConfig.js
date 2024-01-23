// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc } from "firebase/firestore";
// Firebase authentication ve firestore import et
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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

// Firebase Authentication ile yeni bir kullanıcı oluşturma ve favorites koleksiyonu oluşturma
const createUser = async (email, password) => {
  const auth = getAuth();

  try {
    // Yeni kullanıcıyı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore'da kullanıcı detaylarını kaydet
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      // Diğer kullanıcı bilgileri buraya eklenebilir
    });

    // Kullanıcı için boş bir favorites koleksiyonu oluştur
    const favoritesRef = collection(db, "users", user.uid, "favorites");
    // İlk favori olarak boş bir doküman oluşturabilir veya bu adımı atlayabilirsiniz

    return user; // Oluşturulan kullanıcıyı döndür
  } catch (error) {
    console.error("Error creating user and favorites collection: ", error);
    throw error; // Hata durumunda hatayı fırlat
  }
};


// Firebase Authentication ile oturum açma fonksiyonu
const login = async (email, password) => {
  const auth = getAuth();

  try {
    // Kullanıcı girişi yap
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Burada kullanıcı bilgilerini döndürebilirsiniz veya ek işlemler yapabilirsiniz
    return user;
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error; // Hata durumunda hatayı fırlat
  }
};

// Kullanıcının favori yemeklerini çekme işlevi
const fetchUserFavorites = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "favorites"));
    const favoriteMealIds = querySnapshot.docs.map((doc) => doc.id);
    return favoriteMealIds;
  } catch (error) {
    console.error("Error fetching user favorites: ", error);
    throw error;
  }
};

// Favori yemek ekleme işlevi
const addFavoriteMeal = async (userId, mealId) => {
  try {
    await setDoc(doc(db, "users", userId, "favorites", mealId), { mealId: mealId });
  } catch (error) {
    console.error("Error adding favorite meal: ", error);
    throw error;
  }
};

// Favori yemek çıkarma işlevi
const removeFavoriteMeal = async (userId, mealId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "favorites", mealId));
  } catch (error) {
    console.error("Error removing favorite meal: ", error);
    throw error;
  }
};

const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export { fetchMeals, fetchCategories, createUser, login, addFavoriteMeal, removeFavoriteMeal, fetchUserFavorites, getCurrentUserId };
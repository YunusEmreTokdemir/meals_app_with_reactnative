import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, setDoc, getDoc, query, where, startAt, endAt, orderBy, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


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

let auth = getAuth(); // Get the Auth instance

if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}


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

  try {
    // Yeni kullanıcıyı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore'da kullanıcı detaylarını kaydet
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: 'customer', // Kullanıcı rolü, örneğin admin, customer, editor, vb.
      // Diğer kullanıcı bilgileri buraya eklenebilir
    });

    const favoritesRef = collection(db, "users", user.uid, "favorites");

    return user; // Oluşturulan kullanıcıyı döndür
  } catch (error) {
    console.error("Error creating user and favorites collection: ", error);
    throw error; // Hata durumunda hatayı fırlat
  }
};


// Firebase Authentication ile oturum açma fonksiyonu
const login = async (email, password) => {

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
  const user = auth.currentUser;
  return user ? user.uid : null;
};



const addNewMeal = async (mealDetails) => {
  try {
    const docRef = await addDoc(collection(db, "meals"), mealDetails);
    console.log("Yeni yemek başarıyla eklendi, Yemek ID'si: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Yemek eklerken hata oluştu: ", error);
    throw error;
  }
};

// Kullanıcının rolünü Firestore'dan almak için fonksiyon
const getUserRole = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      return null; // Kullanıcı bulunamazsa veya rol atanmamışsa null döndür
    }
  } catch (error) {
    console.error("Error fetching user role: ", error);
    throw error;
  }
};

// Yemek ismine göre yemek silme işlevi
const deleteMealByName = async (mealName) => {
  const mealsRef = collection(db, "meals");
  const q = query(mealsRef, where("title", "==", mealName)); // 'name' yerine doğru olan 'title' kullanılıyor

  try {
    const querySnapshot = await getDocs(q);
    const batch = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref); // Her bir doküman için silme işlemi
      console.log("Yemek başarıyla silindi., Yemek ID'si:", doc.id);
    });

    await Promise.all(batch); // Bulunan tüm dokümanları sil
    return batch.length; // Silinen doküman sayısını döndür
  } catch (error) {
    console.error("Yemek silerken bir hata oluştu: ", error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}

const addCategory = async (categoryDetails) => {
  try {
    const docRef = await addDoc(collection(db, "categories"), categoryDetails);
    console.log("The category has been added successfully,  Category IDs: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Kategori eklerken hata oluştu: ", error);
    throw error;
  }
};

const deleteCategoryByName = async (categoryName) => {
  const categoriesRef = collection(db, "categories");
  const q = query(categoriesRef, where("title", "==", categoryName)); // Kategori adına göre sorgu yap

  try {
    const querySnapshot = await getDocs(q);
    const batch = querySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref); // Her bir doküman için silme işlemi
      console.log("Kategori başarıyla silindi., Kategori ID'si:", doc.id);
    });

    await Promise.all(batch); // Bulunan tüm dokümanları sil
    return batch.length; // Silinen doküman sayısını döndür
  } catch (error) {
    console.error("Kategori silerken bir hata oluştu: ", error);
    throw error;
  }
};

const searchMealsByName = async (mealName) => {
  try {
    // `mealName` ile başlayan tüm yemekleri bulacak şekilde sorguyu yapılandırıyoruz.
    const q = query(
      collection(db, 'meals'),
      orderBy('title'), // 'title' alanına göre sıralama eklenmelidir.
      startAt(mealName),
      endAt(mealName + '\uf8ff') // Bu, Unicode karakter aralığını kullanarak verilen string ile başlayan tüm string'leri kapsar.
    );
    const querySnapshot = await getDocs(q);
    const meals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return meals;
  } catch (error) {
    console.error('Error searching meals by name:', error);
    throw error;
  }
};

// Yemek güncelleme işlevi
const updateMealByName = async (mealName, mealDetails) => {
  try {
    // Yemeğin adına göre sorgu oluştur
    const q = query(collection(db, "meals"), where("title", "==", mealName));
    const querySnapshot = await getDocs(q);

    // Eğer yemek bulunamazsa hata fırlat
    if (querySnapshot.empty) {
      throw new Error(`No meal found with the name: ${mealName}`);
    }

    // Güncelleme sayısını takip etmek için bir sayaç
    let updatedCount = 0;

    // Yemek bulunduysa, güncelleme işlemi yap
    for (const docSnapshot of querySnapshot.docs) {
      const mealRef = doc(db, "meals", docSnapshot.id);
      
      // Sadece girilen alanları güncelle
      const updateData = {};
      for (const [key, value] of Object.entries(mealDetails)) {
        // Eğer kullanıcı bir değer girmişse ve bu değer boolean değilse, 
        // güncelleme verisine ekleyin. Boş string kontrolü
        if (value !== '' && value !== null && value !== undefined) {
          updateData[key] = value;
        }
        // Boolean değerler için ayrı bir kontrol ekleyebiliriz
        if (typeof value === 'boolean') {
          updateData[key] = value;
        }
      }

      await updateDoc(mealRef, updateData);
      updatedCount++;
    }

    console.log(`${updatedCount} meal(s) updated successfully with the name: ${mealName}`);
    return updatedCount; // Güncellenen yemek sayısını döndür
  } catch (error) {
    console.error("Error updating meal: ", error);
    throw error;
  }
};

const updateCategoryByName = async (categoryName, categoryDetails) => {
  try {
    const q = query(collection(db, "categories"), where("title", "==", categoryName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No category found with the name: ${categoryName}`);
    }

    let updatedCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const categoryRef = doc(db, "categories", docSnapshot.id);
      const updateData = {};
      
      for (const [key, value] of Object.entries(categoryDetails)) {
        if (value !== '' && value !== null && value !== undefined) {
          updateData[key] = value;
        }
      }

      await updateDoc(categoryRef, updateData);
      updatedCount++;
    }

    console.log(`${updatedCount} category(ies) updated successfully with the name: ${categoryName}`);
    return updatedCount;
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
};


const recommendMealsBasedOnFavorites = async (userId) => {
  try {
    // Kullanıcının favori yemek ID'lerini al
    const userFavoritesIds = await fetchUserFavorites(userId);

    // Tüm yemekleri al
    const allMeals = await fetchMeals();

    // Favori yemeklerin detaylarını al
    const favoriteMeals = await Promise.all(userFavoritesIds.map(id => getDoc(doc(db, "meals", id))));

    const recommendedMeals = [];

    // Özelliklerine göre filtreleme
    favoriteMeals.forEach(favMealDoc => {
      if (favMealDoc.exists()) {
        const favMeal = favMealDoc.data();

        // Glutensiz yemekleri filtrele
        if (favMeal.isGlutenFree) {
          recommendedMeals.push(...allMeals.filter(meal => meal.isGlutenFree && !userFavoritesIds.includes(meal.id)));
        }
        
        // Laktozsuz yemekleri filtrele
        if (favMeal.isLactoseFree) {
          recommendedMeals.push(...allMeals.filter(meal => meal.isLactoseFree && !userFavoritesIds.includes(meal.id)));
        }
        
        // Kategoriye göre benzer yemekleri filtrele
        if (favMeal.category) {
          recommendedMeals.push(...allMeals.filter(meal => meal.category === favMeal.category && !userFavoritesIds.includes(meal.id)));
        }
        if (favMeal.vegetarian) {
          recommendedMeals.push(...allMeals.filter(meal => meal.vegetarian && !userFavoritesIds.includes(meal.id)));
        }
        // Diğer özellikler için benzer filtrelemeler eklenebilir
      }
    });

    // Tekrar eden önerileri kaldırma
    const uniqueRecommendations = Array.from(new Set(recommendedMeals.map(meal => meal.id)))
                                       .map(id => recommendedMeals.find(meal => meal.id === id));

    return uniqueRecommendations;
  } catch (error) {
    console.error('Error recommending meals based on favorites:', error);
    throw error;
  }
};




export { fetchMeals, fetchCategories, createUser, login, addFavoriteMeal, removeFavoriteMeal, fetchUserFavorites, getCurrentUserId, addNewMeal, getUserRole, deleteMealByName, signOutUser,addCategory,deleteCategoryByName, searchMealsByName, updateMealByName, updateCategoryByName, recommendMealsBasedOnFavorites };
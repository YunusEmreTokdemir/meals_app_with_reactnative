import { createContext } from "react";
import { useState } from "react";

export const FavoritesContext = createContext({
    ids: [],
    addToFavorites: (id) => {},
    removeFromFavorites: (id) => {},
});

function FavoritesContextProvider({ children }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorites(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavorites(id) {
        setFavoriteMealIds((currentFavIds) => {
            return currentFavIds.filter((mealId) => mealId !== id);
        });
    }

    const value = {
        ids: favoriteMealIds,
        addFavorites: addFavorites,
        removeFavorites: removeFavorites,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;

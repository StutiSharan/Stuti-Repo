// utils/favorites.js
export const toggleFavorite = (propertyId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(propertyId)) {
    favorites = favorites.filter((id) => id !== propertyId);
  } else {
    favorites.push(propertyId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

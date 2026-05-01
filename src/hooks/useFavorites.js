import { useCallback, useEffect, useState } from "react";

// LocalStorage key for saving favorites
const KEY = "crypto-dashboard-favorites";

// Custom hook to manage favorite coins
export function useFavorites() {
  // State to store favorite coin IDs
  const [favorites, setFavorites] = useState([]);

  // ---------------- LOAD FROM LOCAL STORAGE ----------------
  useEffect(() => {
    try {
      // Get saved favorites from browser storage
      const raw = window.localStorage.getItem(KEY);

      // Parse and set if available
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // If parsing fails, reset to empty array
      setFavorites([]);
    }
  }, []); // Runs only once on mount

  // ---------------- SAVE TO LOCAL STORAGE ----------------
  useEffect(() => {
    // Persist favorites whenever state changes
    window.localStorage.setItem(
      KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // ---------------- TOGGLE FAVORITE ----------------
  const toggleFavorite = useCallback((id) => {
    setFavorites((curr) =>
      curr.includes(id)
        ? curr.filter((x) => x !== id) // Remove if already exists
        : [...curr, id] // Add if not present
    );
  }, []);

  // ---------------- CHECK FAVORITE ----------------
  const isFavorite = useCallback(
    (id) => favorites.includes(id), // Returns true/false
    [favorites]
  );

  // ---------------- RETURN API ----------------
  return {
    favorites,        // Array of favorite IDs
    toggleFavorite,   // Function to add/remove favorite
    isFavorite,       // Function to check favorite
  };
}
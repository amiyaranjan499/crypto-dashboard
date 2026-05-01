import { useEffect, useState } from "react";

// Custom hook to debounce a value (delay updates)
export function useDebounce(value, delay = 300) {
  // Store debounced value
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value after delay
    const id = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Cleanup function:
    // Cancels previous timeout if value changes before delay completes
    // (prevents unnecessary updates)
    return () => window.clearTimeout(id);
  }, [value, delay]); // Re-run effect when value or delay changes

  // Return debounced value
  return debounced;
}
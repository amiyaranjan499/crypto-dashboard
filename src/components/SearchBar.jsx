import { Search, X } from "lucide-react"; // Icons for search and clear

// Search input component for filtering coins
export default function SearchBar({ value, onChange }) {
  return (
    // Label wrapper improves accessibility (acts as input container)
    <label className="search-bar" aria-label="Search coins">
      
      {/* Search icon */}
      <Search size={18} />

      {/* Controlled input field */}
      <input
        value={value} // Value controlled by parent state
        onChange={(event) =>
          onChange(event.target.value) // Send updated value to parent
        }
        placeholder="Search by name or symbol"
        type="search"
      />

      {/* Clear button appears only when input has value */}
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")} // Reset search
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </label>
  );
}
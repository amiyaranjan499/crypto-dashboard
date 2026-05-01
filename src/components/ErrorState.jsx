import { AlertTriangle, RefreshCw } from "lucide-react"; // Icons for error and retry

// Component to display error message with retry option
export default function ErrorState({ message, onRetry }) {
  return (
    // Wrapper for error UI
    <div className="error-card" role="alert">
      {/* Error icon for visual indication */}
      <div className="err-icon">
        <AlertTriangle size={26} />
      </div>

      {/* Error heading */}
      <h3>Failed to load data</h3>

      {/* Error message (fallback if no message provided) */}
      <p>
        {message ||
          "We couldn't reach the market right now. Please try again."}
      </p>

      {/* Retry button to trigger data reload */}
      <button
        type="button"
        className="retry-btn"
        onClick={onRetry} // Calls parent retry function
      >
        <RefreshCw size={14} /> {/* Retry icon */}
        {" "}Retry
      </button>
    </div>
  );
}
import React, { useReducer } from "react";

// Initial state
const initialState = {
  isVisible: false,
};

// Reducer function
const visibilityReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};

const ToggleMessage = () => {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  return (
    <div style={styles.container}>
      <h1>Toggle Message App</h1>
      <button
        onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}
        style={styles.button}
      >
        Toggle Message
      </button>

      {state.isVisible && <p style={styles.message}>Hello, World!</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
  },
  message: {
    marginTop: "20px",
    fontSize: "1.5rem",
  },
};

export default ToggleMessage;

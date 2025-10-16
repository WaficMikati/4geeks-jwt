// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Private = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container text-center">
      <h1 className="input-group-text bg-dark text-danger fs-3 fw-bold mt-5">You are now in on the secret...</h1>
      <Link to="/">
        <button className="btn btn-secondary">Logout</button>
      </Link>
    </div>

  );
};

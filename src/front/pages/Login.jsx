// Import necessary hooks and components from react-router-dom and other libraries.
import { useActionData, redirect } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { UserForm } from "../components/UserForm";
import { API_URL } from "../store";

export const action = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.token)
      return redirect("/private")
    } else {
      return { error: data.message || "Login failed" }
    }
  } catch (error) {
    return { error: "Network error. Please try again." }
  }
}

// Define and export the Single component which displays individual item details.
export const Login = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()
  const data = useActionData()

  return (
    <div className="container text-center">
      {data?.error && <p className="alert alert-danger mb-2">{data.error}</p>}
      <UserForm />
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Login.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};

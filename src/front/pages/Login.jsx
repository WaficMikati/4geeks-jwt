import React, { useEffect } from "react"
import { useActionData, useNavigate, useSearchParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { UserForm } from "../components/UserForm.jsx"

export const Login = () => {
  const { store, dispatch } = useGlobalReducer()
  const actionData = useActionData()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (actionData?.token) {
      dispatch({ type: "set_token", payload: actionData.token })
      navigate("/private")
    }
  }, [actionData, dispatch, navigate])

  return (
    <div className="text-center mt-5">
      <div className="row">
        <div className="col-10 col-md-6 col-lg-3 mx-auto">
          {searchParams.get("fromSignup") === "true" && (
            <div className="alert alert-success py-2 mb-3">
              {store.translations?.login?.from_signup || "Please login with your new account"}
            </div>
          )}
          {actionData?.error && (
            <div className="alert alert-danger py-2 mb-3">
              {actionData.error}
            </div>
          )}
          {actionData?.message && (
            <div className="alert alert-success py-2 mb-3">
              {actionData.message}
            </div>
          )}
          <UserForm mode="login" defaultEmail={searchParams.get("email") || ""} />
        </div>
      </div>
    </div>
  )
}

export async function loginAction({ request }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  try {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
      return { error: "All fields are required." }
    }

    const response = await fetch(backendUrl + "/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.error) {
      return { error: data.error || "Login failed. Please try again." }
    }

    if (data.token) {
      sessionStorage.setItem('token', data.token)
    }

    return {
      message: data.message || "Login successful.",
      token: data.token,
      userId: data.user_id,
    }
  } catch (err) {
    return {
      error:
        "Could not reach the backend. Please check if it is running and accessible.",
    }
  }
}
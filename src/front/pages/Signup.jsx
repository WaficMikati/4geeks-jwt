import React, { useEffect } from "react"
import { useActionData, redirect, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { UserForm } from "../components/UserForm.jsx"

export const Signup = () => {
  const { store } = useGlobalReducer()
  const actionData = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (actionData?.success && actionData?.email) {
      const timer = setTimeout(() => {
        navigate("/login?email=" + encodeURIComponent(actionData.email) + "&fromSignup=true")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [actionData, navigate])

  return (
    <div className="text-center mt-5">
      <div className="row">
        <div className="col-10 col-md-6 col-lg-3 mx-auto">
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
          <UserForm mode="signup" />
        </div>
      </div>
    </div>
  )
}

export async function signupAction({ request }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  try {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const repeatPassword = formData.get("retype-password")
    const isActive = true

    if (!email || !password || !repeatPassword) {
      return { error: "All fields are required." }
    }

    if (password !== repeatPassword) {
      return { error: "Passwords do not match." }
    }

    const response = await fetch(backendUrl + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, is_active: isActive }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.error) {
      return { error: data.error || "Signup failed. Please try again." }
    }

    return {
      message: data.message || "You have signed up successfully!",
      success: true,
      email: email
    }
  } catch (err) {
    return {
      error:
        "Could not reach the backend. Please check if it is running and accessible.",
    }
  }
}
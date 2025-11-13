import React from "react"
import { Link, useLoaderData } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Private = () => {
  const { store } = useGlobalReducer()
  const loaderData = useLoaderData()

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="mx-auto">
          {loaderData?.id ? (
            <h1>{store.translations?.private?.welcome || "Welcome to the Secret Society"}</h1>
          ) : (
            <>
              <h1>{store.translations?.private?.denied || "This is not for you..."}</h1>
              <h3>{store.translations?.private?.yet || "Yet..."}</h3>
              <Link>{store.translations?.private?.signup_first || "Signup first..."}</Link>
            </>
          )}
        </div>
      </div>
      {loaderData?.id && (
        <div className="row mt-4">
          <div className="col-lg-8 mx-auto fs-4">
            <div className="alert alert-warning line" style={{ whiteSpace: 'pre-line' }}>
              {store.translations?.private?.secret_message || loaderData.message}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function privateLoader({ request }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token")

    if (!token) {
      return { error: "No authentication token found. Please login." }
    }

    const response = await fetch(backendUrl + "/api/private", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.error) {
      return { error: data.error || "Failed to fetch private data." }
    }

    return {
      id: data.id,
      email: data.email,
      message: data.message,
    }
  } catch (err) {
    return {
      error:
        "Could not reach the backend. Please check if it is running and accessible.",
    }
  }
}
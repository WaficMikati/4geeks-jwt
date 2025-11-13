import React from "react"
import { useLoaderData } from "react-router-dom"
import eye from "../assets/img/eye.svg";

export const Home = () => {

  const loaderData = useLoaderData()

  return (
    <div className="container text-center my-5">
      {/* <h1 className="display-4">Welcome!</h1> */}
      <p className="lead mb-5">
        <img src={eye} className="img-fluid object-fit-contain" />
      </p>
      <div className="row">
        <div className="col-lg-6 mx-auto fs-4">

          <div className="alert alert-info text-center">
            {loaderData?.message ? (
              <span style={{ whiteSpace: 'pre-line' }}>{loaderData.message}</span>
            ) : (
              <span className="text-danger">
                Loading message from the backend (make sure your python 🐍 backend is running)...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function loadMessage() {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

    const lang = localStorage.getItem('language') || 'EN'
    const response = await fetch(`${backendUrl}/api/hello?lang=${lang}`)
    const data = await response.json()

    return data

  } catch (error) {
    throw new Error(
      `Could not fetch the message from the backend.
			Please check if the backend is running and the backend port is public.`
    );
  }
} 
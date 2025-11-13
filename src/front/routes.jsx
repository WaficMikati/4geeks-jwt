import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home, loadMessage } from "./pages/Home"
import { Signup, signupAction } from "./pages/Signup"
import { Login, loginAction } from "./pages/Login"
import { Private, privateLoader } from "./pages/Private"

const ErrorPage = () => (
  <div className="container text-center mt-5">
    <h1>404 - Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
  </div>
)

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        <>
          <div className="container text-center mt-5">
            <h1>404 - Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </>
      }
    >
      <Route
        path="/"
        element={<Home />}
        loader={loadMessage}
      />
      <Route
        path="/signup"
        element={<Signup />}
        action={signupAction}
      />
      <Route
        path="/login"
        element={<Login />}
        action={loginAction}
      />
      <Route
        path="/private"
        element={<Private />}
        loader={privateLoader}
      />
    </Route>
  )
)
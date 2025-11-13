import { Form } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const UserForm = ({ mode, defaultEmail = "" }) => {
  const { store } = useGlobalReducer()
  const t = mode === "signup" ? store.translations?.signup : store.translations?.login

  const handlePasswordFocus = (e) => {
    e.target.removeAttribute('readonly')
  }

  return (
    <Form className="card bg-light-subtle" method="post" autoComplete={mode === "signup" ? "off" : "on"}>
      <div className="card-header">
        <span className="h4">{t?.title || (mode === "signup" ? "Signup Form" : "Login Form")}</span>
      </div>
      <div className="card-body text-start p-4 d-grid gap-2">
        <div>
          <label className="form-label" htmlFor="email">{t?.email || "Email"}</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            defaultValue={defaultEmail}
            autoComplete={mode === "signup" ? "off" : "email"}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="password">{t?.password || "Password"}</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            autoComplete={mode === "signup" ? "off" : "current-password"}
            readOnly={mode === "signup"}
            onFocus={mode === "signup" ? handlePasswordFocus : undefined}
          />
        </div>
        {mode === "signup" && (
          <div>
            <label className="form-label" htmlFor="retype-password">
              {t?.repeat_password || "Repeat Password"}
            </label>
            <input
              className="form-control"
              type="password"
              name="retype-password"
              id="retype-password"
              autoComplete="off"
              readOnly
              onFocus={handlePasswordFocus}
            />
          </div>
        )}
        <div className="text-end">
          <button type="submit" className="btn btn-primary px-3">
            {t?.button || (mode === "signup" ? "Submit" : "Login")}
          </button>
        </div>
      </div>
    </Form>
  )
}
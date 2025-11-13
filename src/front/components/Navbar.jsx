import { Link, useNavigate, useRevalidator } from "react-router-dom";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import eye from '../assets/img/eye.svg'

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    fetchTranslations(store.language);
  }, []);

  const fetchTranslations = async (lang) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/translations?lang=${lang}`);
      const data = await response.json();
      dispatch({ type: 'set_translations', payload: data });
    } catch (error) {
      console.error('Failed to fetch translations:', error);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "clear_token" });
    navigate("/");
  };

  const toggleLanguage = async () => {
    const newLang = store.language === "EN" ? "ES" : "EN";
    localStorage.setItem('language', newLang);
    dispatch({ type: 'set_language', payload: newLang });
    await fetchTranslations(newLang);
    setTimeout(() => {
      revalidator.revalidate();
    }, 100);
  };

  return (
    <nav className="navbar navbar bg-body-tertiary">
      <div className="container">
        <Link to="/">
          <img className="me-3" src={eye} style={{ height: '1.75rem' }} />
          <span className="navbar-brand mb-0 h1">
            {store.translations?.navbar?.title || "The Secret Society"}
          </span>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          <Link to="/private">
            <button className="btn btn-danger me-2">
              {store.translations?.navbar?.private || "Private"}
            </button>
          </Link>
          {store.token ? (
            <button className="btn btn-danger me-2" onClick={handleLogout}>
              {store.translations?.navbar?.logout || "Logout"}
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-primary me-2">
                  {store.translations?.navbar?.signup || "Signup"}
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-success me-2">
                  {store.translations?.navbar?.login || "Login"}
                </button>
              </Link>
            </>
          )}
          <button className="btn btn-outline-warning" onClick={toggleLanguage}>
            {store.language}
          </button>
        </div>
      </div>
    </nav>
  );
};
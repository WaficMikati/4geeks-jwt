import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

export const Footer = () => {
  const { store } = useGlobalReducer()

  return (
    <footer className="footer text-center mt-5 py-3">
      <p>
        {store.translations?.footer?.made_with || "Made with"}{" "}
        <i className="fa fa-heart text-danger" />{" "}
        {store.translations?.footer?.by || "by"}{" "}
        <a href="https://github.com/WaficMikati">Wafic Ryan Mikati</a>
      </p>
    </footer>
  )
}

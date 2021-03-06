import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { setToken, getToken, removeToken } from "../api/token";
import "../scss/global.scss";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";



function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [totalProductsCart, setTotalProductsCart] = useState(0)
  const [reloadUser, setReloadUser] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);


  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };


  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );


  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default MyApp;

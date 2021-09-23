import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import { addProductsCart, countProductsCart, getProductsCart, removeProductsCart, removeAllProductsCart } from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]) 

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

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductsCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para añadir al carrito hay que estar logueado")
    }
  }

  const removeProduct = (product) => {
    removeProductsCart(product);
    setReloadCart(true);
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductsCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart:  removeAllProductsCart,
    }),
    [totalProductsCart]
  )

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData} >
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
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;

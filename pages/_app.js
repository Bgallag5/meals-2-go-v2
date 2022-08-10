import "../styles/style.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Provider from "../store/GlobalStore";
import AppMessage from "../components/AppMessage/AppMessage";
import CartModal from "../components/Cart/CartModal";
import CookieMessage from "../components/CookieMessage/CookieMessage";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
    <div className="app__container">
      <AppMessage />
      <CartModal />
      <Header />
      <Sidebar />
      <Component {...pageProps} />
      <Footer />
      {/* <CookieMessage /> */}
    </div>
    </Provider>
  );
}



export default MyApp;

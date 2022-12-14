import "../styles/style.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Provider from "../store/GlobalStore";
import AppMessage from "../components/AppMessage/AppMessage";
import CartModal from "../components/Cart/CartModal";
import Loading from "../components/LoadingScreen/Loading";

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
      <Loading />
    </div>
    </Provider>
  );
}





export default MyApp;

/*
NOT:
CartModal
AppMessage
Header

*/
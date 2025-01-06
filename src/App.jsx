import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import LeadPage from "./component/leadPage";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./component/common/ScrollToTop";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop/>
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;

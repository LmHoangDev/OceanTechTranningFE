import _ from "lodash";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import TableAntd from "./components/TableAntd";
import Footer from "./pages/Footer/Footer";
import Header from "./pages/Header/Header";
import Layout from "./pages/Layouts/Layout";

function App() {
  const { userLogin } = useSelector((state) => state.user);
  const renderPage = () => {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="task" element={<TableAntd />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </>
    );
  };
  const renderAuth = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  };

  return (
    <div
      style={
        _.isEmpty(userLogin) ? { background: "#fbd1b7", height: "100vh" } : {}
      }
    >
      {_.isEmpty(userLogin) ? renderAuth() : renderPage()}
    </div>
  );
}

export default App;

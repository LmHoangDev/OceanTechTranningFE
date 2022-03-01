import "./App.css";
import Login from "./components/Login/Login";
import Counter from "./features/counter/Counter";

import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layouts/Layout";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="counter" element={<Counter />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

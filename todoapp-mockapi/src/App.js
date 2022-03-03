import "./App.css";
import Login from "./components/Login/Login";
import Counter from "./features/counter/Counter";

import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layouts/Layout";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import Register from "./components/Register/Register";
import Task from "./components/Task/Task";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const userLogin = localStorage.getItem("userLogin");
  console.log(JSON.parse(userLogin));
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="counter" element={<Counter />} />
          <Route path="task" element={<Task />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

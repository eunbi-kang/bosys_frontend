import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserCreate from "./components/UserCreate";
import OrderPage from "./components/OrderPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <Router>
        <Navbar /> {/* 네비게이션 바 추가 */}
        {/* <UserCreate />
        <OrderPage /> */}
        {/* 페이지 이동을 위한 Routes 설정 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserCreate />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

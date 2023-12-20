import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

// 레이아웃 컴포넌트: 네비게이션과 Outlet을 렌더링
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        {/* 루트 경로에 Layout을 렌더링하고 각 경로에 대한 라우팅 정의 */}
        <Route path="/" element={<Layout />}>
          {/* 기본 경로는 MainPage를 렌더링 */}
          <Route index element={<MainPage />} />
          {/* /:movieId 경로는 DetailPage를 렌더링 */}
          <Route path=":movieId" element={<DetailPage />} />
          {/* /search 경로는 SearchPage를 렌더링 */}
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import Login from "./components/Login/Login";
import WriteReview from "../src/components/MovieModal/WriteReview";
import ChooseOTT from "./components/ChooseOtt.js";
import Preferences from "./components/Preferences.js";
import Footer from "./JS/Footer.js";
import ScrollToTop from "./JS/ScrollToTop";
import Mypage from "./JS/Mypage";
import ChangeOTT from "./JS/ChangeOTT";
import MyWrite from "./JS/MyWrite";
import MyFavorite from "./JS/MyFavorite";
import MyParticipate from "./JS/MyParticipate";
import MyHost from "./JS/MyHost";
import DebateAll from "./JS/DebateAll";
import DebateOne from "./JS/DebateOne";
import DebateWrite from "./JS/DebateWrite";
import DebateDetail from "./JS/DebateDetail";
import DebateEdit from "./JS/DebateEdit";
import OnBoarding from "./components/Login/OnBoarding";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route exact path="/write-review" component={WriteReview} />
          <Route path="search" element={<SearchPage />} c />
          <Route path="/Login" element={<Login />} />
          <Route path="/login/oauth2/code" element={<OnBoarding />} />
          <Route path="/choose-ott" element={<ChooseOTT />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/ChangeOTT" element={<ChangeOTT />} />
          <Route path="/Mypage/:userId" element={<Mypage />} />
          <Route path="/MyWrite/:userId" element={<MyWrite />} />
          <Route path="/MyFavorite/:userId" element={<MyFavorite />} />
          <Route path="/MyParticipate/:userId" element={<MyParticipate />} />
          <Route path="/MyHost/:userId" element={<MyHost />} />
          <Route path="/DebateAll" element={<DebateAll />} />
          <Route path="/DebateOne" element={<DebateOne />} />
          <Route path="/DebateWrite" element={<DebateWrite />} />
          <Route path="/DebateDetail" element={<DebateDetail />} />
          <Route path="/DebateEdit/:id" element={<DebateEdit />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

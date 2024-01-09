import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
// import Footer from "./components/Footer";
// import Nav from "./components/Nav";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import Login from "./components/Login/Login";
import WriteReview from "../src/components/MovieModal/WriteReview";

import Nav from './JS/Nav.js';
import Footer from './JS/Footer.js';
import ScrollToTop from './JS/ScrollToTop';
import Mypage from './JS/Mypage';
import ChangeOTT from './JS/ChangeOTT';
import MyWrite from './JS/MyWrite';
import MyFavorite from './JS/MyFavorite';
import MyParticipate from './JS/MyParticipate';
import MyHost from './JS/MyHost';
import DebateAll from './JS/DebateAll';
import DebateOne from './JS/DebateOne';
import DebateWrite from './JS/DebateWrite';
import DebateDetail from './JS/DebateDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path=":movieId" element={<DetailPage />} />
          <Route exact path="/write-review" component={WriteReview} />
          <Route path="search" element={<SearchPage />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/ChangeOTT" element={<ChangeOTT />} />
          <Route path="/MyWrite" element={<MyWrite/>}/>
          <Route path="/MyFavorite" element={<MyFavorite/>}/>
          <Route path="/MyParticipate" element={<MyParticipate/>}/>
          <Route path="/MyHost" element={<MyHost/>}/>
          <Route path="/DebateAll" element={<DebateAll/>}/>
          <Route path="/DebateOne" element={<DebateOne/>}/>
          <Route path="/DebateWrite" element={<DebateWrite/>}/>
          <Route path="/DebateDetail" element={<DebateDetail/>}/>
        </Routes>
        <Footer/>
      </ScrollToTop>
    </BrowserRouter> 
  );
}

export default App;

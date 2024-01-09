import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ScrollToTop from './JS/ScrollToTop';
import Mypage from './JS/Mypage';
import ChangeOTT from './JS/ChangeOTT';
import MyWrite from './JS/MyWrite';
import MyFavorite from './JS/MyFavorite';
import MyParticipate from './JS/MyParticipate';
import MyHost from './JS/MyHost';
import Nav from './JS/Nav';
import Footer from './JS/Footer';
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
          <Route path="/" element={<Mypage />} />
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

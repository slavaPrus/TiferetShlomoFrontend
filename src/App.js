import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AboutUs from './components/pages/AboutUs';
import RabbiBooks from './components/pages/RabbiBooks';
import Lessons from './components/pages/Lessons';
import Flyers from './components/pages/Flyers';
import TwoHalachaPerDay from './components/pages/TwoHalachaPerDay';
import HalachaTests from './components/pages/HalachaTests';
import LifeStory from './components/pages/LifeStory';
import DrawerAppBar from './components/DrawerAppBar';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import OneBook from './components/OneBook';

function App() {
  return (
      <Routes>
        <Route path="/" element={<DrawerAppBar/>}>
          <Route path="/" element={<HomePage/>}> </Route>
          <Route path="/about-us" element={<AboutUs/>}> </Route>
          <Route path="/rabbi-books" element={<RabbiBooks/>}> </Route>
          <Route path="/one-book" element={<OneBook/>}></Route>       
        
          <Route path="/lessons" element={<Lessons/>}> </Route>
          <Route path="/flyers" element={<Flyers/>}> </Route>
          <Route path="/two-halacha-per-day" element={<TwoHalachaPerDay/>}> </Route>
          <Route path="/HalachaTests" element={<HalachaTests/>}> </Route>
          <Route path="/LifeStory" element={<LifeStory/>}> </Route>
        </Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/signIn" element={<SignIn/>}></Route>
      </Routes>
  );
}

export default App;

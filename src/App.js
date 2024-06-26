import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import RabbiBooks from './components/RabbiBooks';
import Lessons from './components/Lessons';
import Flyers from './components/Flyers';
import TwoHalachaPerDay from './components/TwoHalachaPerDay';
import Vod from './components/Vod';
import HalachaTests from './components/HalachaTests';
import LifeStory from './components/LifeStory';
import DrawerAppBar from './components/DrawerAppBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import OneBook from './components/OneBook';
import PrivateArea from './components/PrivateArea';
import Cart from './components/Cart';
import OneFlyer from './components/OneFlyer';


function App() {
  return (
      <Routes>
        <Route path="/" element={<DrawerAppBar/>}>
          <Route path="/" element={<HomePage/>}> </Route>
          <Route path="/about-us" element={<AboutUs/>}> </Route>
          <Route path="/vod" element={<Vod/>}> </Route>
          <Route path="/rabbi-books" element={<RabbiBooks/>}> </Route>
          <Route path="/one-book" element={<OneBook/>}></Route>       
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/lessons" element={<Lessons/>}> </Route>
          <Route path="/flyers" element={<Flyers/>}> </Route>
          <Route path="/one-flyer" element={<OneFlyer/>}></Route>       
          <Route path="/two-halacha-per-day" element={<TwoHalachaPerDay/>}> </Route>
          <Route path="/HalachaTests" element={<HalachaTests/>}> </Route>
          <Route path="/LifeStory" element={<LifeStory/>}> </Route>
          <Route path="/privateArea" element={<PrivateArea/>}></Route>
        </Route>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/signIn" element={<SignIn/>}></Route>
      </Routes>
  );
}

export default App;

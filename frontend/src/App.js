import { useEffect, useState } from 'react';
import './App.css';
import TrangChonDoTuoi from './pages/TrangChonDoTuoi';
import TrangChu from './pages/TrangChu';
import Footer from './widget/Footer';
import Header from './widget/Header';
import TrangSanPham from './pages/TrangSanPham';
import TrangChiTietSanPham from './pages/TrangChiTietSanPham';
import Trang404 from './pages/Trang404';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';

function App() {
  const Location = useLocation();
  /* const [routesSP] = useState([
    {
      'herf' : '/choose-age',
      'modal' : <TrangChonDoTuoi />
    },
    {
      'herf' : '/404',
      'modal' : <Trang404 />
    },
    {
      'herf' : '/san-pham',
      'modal' : <TrangSanPham />
    },
    {
      'herf' : '/san-pham',
      'modal' : <TrangSanPham />
    },
    {
      'herf' : '/:id_san_pham',
      'modal' : <TrangChiTietSanPham />
    },
    {
      'herf' : '/',
      'modal' : <TrangChu />
    },
  ]); */
  const [checkAge,setCheckAge] = useState(false);

  useEffect(() => {
    const age = localStorage.getItem('person');
    if(age === null){
      setCheckAge(true);
    };
    //console.log(Location.pathname)
  },[checkAge])
  /* const handlePage = () => {
    const url = Location.pathname;
    if () {
      return 
    }
  }; */
  return (
    <>
      <Router>
        {(checkAge)? '' : <Header />}
        {(checkAge)? <Redirect to="/choose-age"/>: ''}
        <Switch>
          <Route path="/choose-age"> 
            <TrangChonDoTuoi />
          </Route>
          <Route path="/404"> 
            <Trang404 />
          </Route>
          <Route path="/san-pham"> 
            <TrangSanPham />
          </Route>
          <Route path='/:id_san_pham'>
            {/* {(Location.pathname.substr(1) > 6)? <Trang404 /> : <TrangChiTietSanPham />} */}
            <TrangChiTietSanPham />
          </Route>
          <Route path='/'>
            <TrangChu />
          </Route>
        </Switch>
        {(checkAge)? '' : <Footer />}
      </Router>
    
    </>
  );
}

export default App;

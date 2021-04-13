import './App.css';
import TrangChu from './pages/TrangChu';
import Footer from './widget/Footer';
import Header from './widget/Header';
import TrangSanPham from './pages/TrangSanPham';
import TrangChiTietSanPham from './pages/TrangChiTietSanPham';
import Trang404 from './pages/Trang404';
import TrangGioHang from './pages/TrangGioHang';
import TrangThanhToan from './pages/TrangThanhToan';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/404"> 
            <Trang404 />
          </Route>
          <Route path="/san-pham"> 
            <TrangSanPham />
          </Route>
          <Route path="/thanh-toan"> 
            <TrangThanhToan />
          </Route>
          <Route path="/gio-hang"> 
            <TrangGioHang />
          </Route>
          <Route path='/:id_san_pham'>
            <TrangChiTietSanPham />
          </Route>
          <Route path='/'>
            <TrangChu />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;

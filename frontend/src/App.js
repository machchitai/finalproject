import { useEffect, useState } from 'react';
import './App.css';
import TrangChonDoTuoi from './pages/TrangChonDoTuoi';
import TrangChu from './pages/TrangChu';
import Footer from './widget/Footer';
import Header from './widget/Header';
import ButtonContact from './widget/ButtonContact'
import TrangSanPham from './pages/TrangSanPham';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';


function App() {
  const [checkAge,setCheckAge] = useState(false);
  useEffect(() => {
    const age = localStorage.getItem('person');
    if(age === null){
      setCheckAge(true);
    };
  },[checkAge])
  return (
    <>
      <Router>
        <ButtonContact />
        {(checkAge)? '' : <Header />}
        {(checkAge)? <Redirect to="/choose-age"/>: ''}
        <Switch>

          <Route path="/choose-age"> 
            <TrangChonDoTuoi />
          </Route>
          
          <Route path="/san-pham"> 
            <TrangSanPham />
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

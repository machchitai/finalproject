import './App.css';
import TrangChonDoTuoi from './pages/TrangChonDoTuoi';
import TrangChu from './pages/TrangChu';
import Footer from './module/Footer';
import Header from './module/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [checkAge,setCheckAge] = useState(false);
  useEffect(() => {
    const age = localStorage.getItem('person');
    console.log(age);
    if(age == null){
      setCheckAge(true);
      console.log(checkAge);
    }
    console.log(checkAge);
  },[checkAge])
  return (
    <>
      <Router>
        {(checkAge)? '' : <Header />}
        {(checkAge)? <Redirect to="/choose-age"/>: ''}
        <Switch>
          <Route path="/choose-age"> 
            <TrangChonDoTuoi />
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

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Stripe from './Stripe/StripeContainer';
import Home from './Home';


function App(){
  return (
    <div className='App'>

<Router>
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/StripeContainer" element={<Stripe/>}/>
    </Routes>
    </Router>
    </div>
  )
}

export default App;



import './App.css';
import Navbar from './components/Navbar';


import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';


import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import Signup from './pages/Signup';
import { CardProvider } from './components/ContextRed';
import MyOrder from './pages/MyOrder';
import Doctor from './pages/Doctor';
import ApoiLet from './components/ApoiLet';




function App() {
  return (
    <CardProvider>
   <Router>
   <Navbar />
   
   
     <div>
             <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/login' element={<Login/>}/> 
               <Route path='/signup' element = {<Signup/>}/>
               <Route path='/myorder' element ={<MyOrder/>}/>
               <Route path='/doctor' element={<Doctor/>}/>
               <Route path='/myApoi' element={<ApoiLet/>}/>
             </Routes>
     </div>  
     
          
  </Router>

  </CardProvider>
  
  );
}

export default App;

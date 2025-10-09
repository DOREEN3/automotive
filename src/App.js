import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Getautomotive from './components/Getautomotive';
import Addautomotive from './components/Addautomotive';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
     <Navbar/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Getautomotive />} />
        <Route path="/addautomotive" element={<Addautomotive />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mpesapayment" element={<Mpesapayment />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import userImg from '../assets/user1.jpg';
import shopOwnerImg from '../assets/shopowner.webp';
import Login from './login';
import Signup from './signup';
import Shops from './shops';
import JuiceSpot from './juicespot';
import Navbar from './navbar';
import Cart from './cart';



function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1><em>Break Bites</em></h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '3rem', justifyContent: 'center' }}>
        {/* User Card */}
        <div className="card" style={{ width: '18rem', height: '28rem' }}>
          <div style={{ border: '1px solid black', borderRadius: '10px', overflow: 'hidden' }}>
            <img src={userImg} className="card-img-top" alt="User" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">User</h5>
            <a href="#" className="btn btn-primary" onClick={() => navigate('/signup')}>Sign-Up</a><br /><br />
            <a href="#" className="btn btn-primary" onClick={() => navigate('/login')}>Log-In</a>
          </div>
        </div>

        {/* Shop Owner Card */}
        <div className="card" style={{ width: '18rem', height: '28rem' }}>
          <div style={{ border: '1px solid black', borderRadius: '10px', overflow: 'hidden' }}>
            <img src={shopOwnerImg} className="card-img-top" alt="Shop Owner" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">Shop Owner</h5>
            <p>Shop Owners can only Login.</p><br /><br />
            <a href="#" className="btn btn-primary">Log-In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (


    <>
      <Navbar /> 
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/juicespot" element={<JuiceSpot />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>

  );
}

export default App;

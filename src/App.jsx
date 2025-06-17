import { useState } from 'react';
import './App.css';
import userImg from './assets/user1.jpg';
import shopOwnerImg from './assets/shopowner.webp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1><em>Welcome to Break Bites</em></h1>

        <div style={{ display: 'flex', gap: '20px' ,marginTop:'3rem' }}>
          {/* User Card */}
          <div className="card" style={{ width: '18rem', height: '28rem' }}>
            <div style={{ border: '1px solid black', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={userImg} className="card-img-top" alt="User" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            </div>
            <div className="card-body">
              <h5 className="card-title">User</h5>
              <a href="#" className="btn btn-primary">Sign-Up</a><br/><br/>
              <a href="#" className="btn btn-primary">Log-In</a>
            </div>
          </div>

          {/* Shop Owner Card */}
          <div className="card" style={{ width: '18rem', height: '28rem' }}>
            <div style={{ border: '1px solid black', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={shopOwnerImg} className="card-img-top" alt="Shop Owner" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            </div>
            <div className="card-body">
              <h5 className="card-title">Shop Owner</h5>
              <a href="#" className="btn btn-primary">Sign-Up</a><br/><br/>
              <a href="#" className="btn btn-primary">Log-In</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

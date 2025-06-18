import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=new useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      alert(result);
        if(response.ok){
        navigate("/shops");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Register</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  Username
                  <input type="text" className="form-control" name="username" required />
                </div>
                <div className="mb-3">
                  Mobile
                  <input type="text" className="form-control" name="mobileno" required />
                </div>
                <div className="mb-3">
                  Email
                  <input type="email" className="form-control" name="email" required />
                </div>
                <div className="mb-3">
                  Password
                  <input type="password" className="form-control" name="password" required />
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>

              <hr />

              <div className="text-center">
                <a
                  className="btn btn-success btn-block w-100"
                  href="/auth/google"
                  role="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '500',
                  }}
                >
                  <i className="fab fa-google"></i>
                  Sign up with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

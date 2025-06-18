import React, { useState, useEffect } from 'react';

export default function JuiceSpot() {
  const [juices, setJuices] = useState([]);
  const [quantities,setQuantities]=useState({});

  useEffect(() => {
    fetch("http://localhost:3000/juicedata")
      .then(res => res.json())
      .then(data => setJuices(data))
      .catch(err => console.error(err));
  }, []);
  const addtocart=async(price,item_name,quantity)=>{
    
    try {
      const response = await fetch("http://localhost:3000/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(price,item_name,quantity),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding item to cart");
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Welcome to JuiceSpot!</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {juices.map((juice, index) => (
          <div className="card" style={{ width: '18rem' }} key={index}>
            <img src={`http://localhost:3000${juice.image}`} className="card-img-top" alt={juice.item_name} />
            <div className="card-body">
              <h5 className="card-title">{juice.item_name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Quantity Available: {juice.quantity}</li>
              <li className="list-group-item">Price: ₹{juice.price}</li>
               <li className="list-group-item">
                <label htmlFor={`qty-${index}`}>Quantity Needed:</label>
                <input
                  id={`qty-${index}`}
                  type="number"
                  min="1"
                  max={juice.quantity}
                  defaultValue={1}
                  className="form-control mt-1"
                  value={quantities[juice.id] || 1}
                  onChange={(e) =>
                     setQuantities({ ...quantities, [juice.id]: parseInt(e.target.value) })
                  }
                  style={{ width: '200px' }}
                />
              </li>
            </ul>
            <div className="card-body">
              <a href="#" className="btn btn-primary" onClick={()=>addtocart(juice.price,juice.item_name,quantities[juice.index]|| 1)}>Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

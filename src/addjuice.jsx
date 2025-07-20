import React, { useState } from 'react';

export default function Addjuice() {

    const [newquantity, setNewquantity] = useState();
    const [newitem, setNewitem] = useState();
    const [newprice, setNewprice] = useState();


  const additem = () => {

    fetch(`http://localhost:3000/juiceshopdata/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name:newitem,price:newprice,quantity: newquantity,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Item added");
          onClose();
          window.location.reload();
        } else {
          throw new Error("Failed to Update Item");
        }
      })
      .catch((err) => {
        console.error("Failed", err);
      });
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 9999 }}
    >
      <div
        className="p-4 border rounded bg-white shadow"
        style={{ width: 400 }}
      >
        <h4 className="mb-3">Add Item to Inventory</h4>

        <div className="mb-3">
            <label>Item Name:</label>
            <input type="text" value={newitem} className='form-control' onChange={(e) => setNewitem(e.target.value)}></input>
            <label>Price:</label>
            <input type="text" value={newprice} className='form-control' onChange={(e) => setNewprice(e.target.value)}></input>
          <label>Quantity:</label>
          <input
            type="number"
            value={newquantity}
            min="1"
            className="form-control"
            onChange={(e) => setNewquantity(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-dark" onClick={additem}>add</button>
          <button className="btn btn-secondary" onClick={<Juiceshop_owner/>}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

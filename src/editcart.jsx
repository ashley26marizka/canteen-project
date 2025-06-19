import React, { useState } from 'react';

export default function EditCart(props) {
  const { id, itemname, price, quantity, onClose } = props;

  const [newquantity, setNewquantity] = useState(quantity);

  const editcartitem = () => {
    const updatedtotal = newquantity * price;

    fetch(`http://localhost:3000/cartdata/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: newquantity,
        totalamount: updatedtotal,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Item Updated");
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
        <h4 className="mb-3">Edit Cart Item</h4>
        <p><strong>Item Name:</strong> {itemname}</p>
        <p><strong>Price:</strong> ₹{price}</p>

        <div className="mb-3">
          <label>Quantity:</label>
          <input
            type="number"
            value={newquantity}
            min="1"
            className="form-control"
            onChange={(e) => setNewquantity(Number(e.target.value))}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-dark" onClick={editcartitem}>Update</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

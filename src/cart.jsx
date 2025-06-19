import React, { useState, useEffect } from "react";
import EditCart from './editcart';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [edititem,setEdititem]=useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/cartdata")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        let totalAmount = 0;
        data.forEach((item) => {
          totalAmount += item.totalamount;
        });
        setTotal(totalAmount);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleEditClick=(item)=>{
    setEdititem(item);
  };
  const handleEditClose=()=>{
    setEdititem(null);
  };
  const deleteitem=(id)=>{
    fetch(`http://localhost:3000/cartdata/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
    })
    .then((res)=>{
      if(res.ok){
        alert("Item deleted successfully");
        window.location.reload();
      }
      else{
        throw new Error("Failed to delete item");
      }
    })
    .catch((err)=>{
      console.error("Error:",err);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Your Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="table-responsive d-flex justify-content-center">
            <table className="table table-bordered table-striped text-center w-auto shadow rounded">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity Ordered</th>
                  <th>Total Amount</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartitem,index) => (
                  <tr key={cartitem.id}>
                    <td>{index+1}</td>
                    <td>{cartitem.itemname}</td>
                    <td>₹{cartitem.price}</td>
                    <td>{cartitem.quantity}</td>
                    <td>₹{cartitem.totalamount}</td>
                    <td><button className="btn btn-dark" onClick={()=>handleEditClick(cartitem)}>Edit</button></td>
                    <td><button className="btn btn-dark" onClick={()=>deleteitem(cartitem.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className="mt-4 text-center">Grand Total: ₹{total}</h4>
        
        {edititem  &&(
          <EditCart
          key={edititem.id}
          id={edititem.id}
          itemname={edititem.itemname}
          price={edititem.price}
          quantity={edititem.quantity}
          onClose={handleEditClose}
          />
        )}
        </>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
    </div>
  );
}

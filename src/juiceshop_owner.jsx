import React, { useState, useEffect } from "react";
import Addjuice from './addjuice';

export default function Juiceshop_owner() {
  const [juicedata, setJuicedata] = useState([]);
  const [edititem,setEdititem]=useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/juiceshopdata")
      .then((res) => res.json())
      .then((data) => {
        setJuicedata(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  const deleteitem=(id)=>{
    fetch(`http://localhost:3000/juiceshopdata/${id}`,{
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

      {juicedata.length > 0 ? (
        <>
          <div className="table-responsive d-flex justify-content-center">
            <table className="table table-bordered table-striped text-center w-auto shadow rounded">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Image URL</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity Available</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {juicedata.map((juice,index) => (
                  <tr key={juice.id}>
                    <td>{index+1}</td>
                    <td>{juice.image}</td>
                    <td>{juice.item_name}</td>
                    <td>₹{juice.price}</td>
                    <td>{juice.quantity}</td>
                    <td><button className="btn btn-dark" onClick={()=>deleteitem(juice.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-dark" onClick={<Addjuice/>}>Add Item</button>
          </>
          ):(
            <>
                <p className="text-center">Your Stock is empty.</p>
                <button className="btn btn-dark" onClick={<Addjuice/>}>Add Item to Stock</button>
            </>
       )}
    </div>
  );
}

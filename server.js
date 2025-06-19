import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const saltRounds = 10;
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static('assets')); 


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "canteen-project",
  password: "1234",
  port: 5433,
});

db.connect();
app.get("/juicedata",async(req,res)=>{
  try{
    const result=await db.query("SELECT * FROM juicespot_stock");
    res.json(result.rows);
  }catch(err){
    console.log(err);
    res.status(500).send("Server Error.");
  }
});

app.get("/cartdata",async(req,res)=>{
  try{
    const result=await db.query("SELECT * FROM cart");
    res.json(result.rows);
  }catch(err){
    console.log(err);
    res.status(500).send("server error");
  }
});

app.patch("/cartdata/:id",async(req,res)=>{
  const {id}= req.params;
  const {quantity,totalamount}=req.body;
  try{
  await db.query("UPDATE cart SET quantity=$1,totalamount=$2 WHERE id=$3",[quantity,totalamount,id]);
   res.status(200).send("Cart item updated successfully");
  }
  catch(err){
    console.error("error occured:",err);
    res.status(500).send("Internam server error.");
  }
});

app.delete("/cartdata/:id",async(req,res)=>{
  const {id}=req.params;
  try{
    await db.query("DELETE FROM cart WHERE id=$1",[id]);
    res.status(200).send("Item deleted Successfully");
  }
  catch(err){
    console.error("Error on deleting item from cart",err);
    res.status(500).send("Error on deleting item");
  }
});
app.post("/addtocart",async(req,res)=>{
  const {price,item_name,quantity}=req.body;
  const totalamount=price*quantity;
  await db.query("INSERT INTO cart (itemname,price,quantity,totalamount) VALUES($1,$2,$3,$4)",
    [item_name,price,quantity,totalamount]);
});

app.post("/register", async (req, res) => {
  const { username, mobileno, email, password } = req.body;
  console.log(req.body);

  try {
    const checkuser = await db.query("SELECT * FROM appuser WHERE email=$1", [email]);
    if (checkuser.rows.length > 0) {
      res.status(400).send("User already exists. Try login.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error in hashing", err);
          return res.status(500).send("Server error.");
        }

        await db.query(
          "INSERT INTO appuser(username, mobileno, email, password) VALUES ($1, $2, $3, $4)",
          [username, mobileno, email, hash]
        );

        res.status(200).send("User registered successfully");
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkuser = await db.query("SELECT * FROM appuser WHERE email=$1", [email]);

    if (checkuser.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const storedpassword = checkuser.rows[0].password;
    bcrypt.compare(password, storedpassword, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      if (result) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Incorrect password");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

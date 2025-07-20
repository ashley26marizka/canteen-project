import bcrypt from 'bcrypt';
async function hashPassword() {
  const hashed = await bcrypt.hash("ashjuices26", 10);
  console.log("Hashed password:", hashed);
}

hashPassword();

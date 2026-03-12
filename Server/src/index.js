import app from "./app.js";
import { connectDB } from "./db.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000; 


connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

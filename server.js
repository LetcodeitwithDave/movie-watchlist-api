import app from './src/app.js'
// import dotenv from 'dotenv'
import { config } from 'dotenv';

config() // load .env file

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Api designs

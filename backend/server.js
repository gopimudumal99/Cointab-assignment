const app = require('./src/app')
const dotenv = require("dotenv");
// const connectDatabase = require('./src/configs/db')



// config
dotenv.config({ path: "backend/src/configs/config.env" });

// // connecting Database
// connectDatabase();

app.listen(process.env.PORT,()=>{
     console.log(`listing on port ${process.env.PORT}`)
})
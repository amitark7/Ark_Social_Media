const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv =require('dotenv')
const AuthRoute =require('./Routes/AuthRoutes')
const UserRoute =require('./Routes/UserRoute')
const PostRoute=require('./Routes/PostRoute')
const UploadRoute=require('./Routes/UploadRoutes.js')
const cors =require('cors')


dotenv.config();

const app = express();

//to serve images for public 
app.use(express.static('public'))
app.use('/images',express.static("image"))

app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose.connect(process.env.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true}
).then(()=>console.log("Mongo Connected"));


const port=process.env.PORT1 || 3000;

app.listen(port, () => {
  console.log(`Server Listening On Port ${port} `);
});

//Usage Of Routes

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
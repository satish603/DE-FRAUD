const express = require('express');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();
const userRouter = require('./routes/user');
const sellerRouter = require('./routes/seller');
const ownerRouter = require('./routes/owner');
const app = express();
const mongoose=require('mongoose')
var path = require('path');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
const userModel = require("./models");
// 
const DB=`mongodb+srv://defraudapp05:VeSeVvCmsbPxcHSE@defraud.cbywv1h.mongodb.net/?retryWrites=true&w=majority`

// // 



mongoose.connect(DB,
    
    ).then(()=>{
    console.log(`Connection successful`)
}).catch((err)=> console.log(err));







mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
// 
const middleware=(req,res,next)=>{
    console.log(`Hello my middleware`);
    next();
}


//jwt check function
// function secure(req, res, next) {
//   try {
//     //exluding the paths
//     if (req.baseUrl.indexOf('login') !== -1) {
//       return next();
//     }
//     if (req.baseUrl.indexOf('signup') !== -1) {
//       return next();
//     }
//     if (req.baseUrl.indexOf('user') !== -1) {
//       return next();
//     }

//     if (!req.cookies || !req.cookies.jwt) {
//       throw new Error();
//     }

//     const token = req.cookies.jwt;
   
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         throw new Error();
//       }
//       req.email = decoded;
//       next();
//     });
//   } catch (error) {
//     console.log('Token mismatch');
//     res.status(403).send();
//   }
// }

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(morgan('tiny'))
// app.use('*', secure);
app.use('/user', userRouter);
app.use('/seller', sellerRouter);
app.use('/owner', ownerRouter);
// app.get('/tokenVerify', (req, res) => {
//   res.sendStatus(200)
// })

// get driver connection
// const dbo = require("./db/conn")
const dbo = require("./db/conn")

// error handler
app.use(function (err, req, res, next) {
  console.log(err.message);
  
  return res
    .status(err.status || 500)
    .json({ error: err, message: err.message });
});

// create a schema
const productSchema={
    name:String,
    price:Number,
    productId:Number
}

const ProductModel=mongoose.model("ProductModel",productSchema)

// app.get("/add", function(req,res){
//     res.sendFile('C:\proj\temp\DE-FRAUD\app\src\pages\add.js')
// })

app.post("/add", async(req,res)=>{
    let newProductModel=new ProductModel({
    name:req.body.name,
    name:req.body.name,
    price:req.body.price,
    productId:req.body.productId
    });
    try{
        await newProductModel.save();
        res.send("Product added successfully")
    }catch(err){
      res.send(err)
    }
})
app.post("/add_data", async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.listen(8000, () => {
// console.log(`hi ${dbConn}`)
 // perform a database connection when server starts
dbo.connectToServer(function (err) {
    if (err) console.error(err);
    
 
  });

  console.log("Listening on 8000")
})

module.exports = app;

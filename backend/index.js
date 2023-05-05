const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose')
var bodyParser = require('body-parser');
const userModel = require("./models");
const Verify = require("./verify_model");
// 
const DB=`mongodb+srv://defraudapp05:VeSeVvCmsbPxcHSE@defraud.cbywv1h.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 3000;



mongoose.connect(DB,
    
    ).then(()=>{
    console.log(`Connection successful`)
}).catch((err)=> console.log(err));


app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  return res.json({ message: "Server Running" });
});


app.post("/add_product", async (request, response) => {
  const user = new userModel(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});



app.get("/product_details/:id", async (request, response) => {
  const productId = request.params.id;
  try {
    const product = await userModel.findOne({ productId: productId });
    
    if (!product) {
      return response.status(404).send("Product not found");
    }
    
    response.send(product);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error fetching product details");
  }
});



app.listen(port, () => {
  console.log(`Listening on $port`)
})



module.exports = app;
